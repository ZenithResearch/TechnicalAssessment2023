// import libraries
const  Discord  = require('discord.js');
const { Octokit } = require("@octokit/rest");
const config = require('./config');


// create instance
const client = new Discord.Client({
  intents: [Discord.Intents.ALL],
});
const prefix ='!create task';
const DISCORD_TOKEN = config.DISCORD_TOKEN;
const GITHUB_TOKEN = config.GITHUB_TOKEN;
const GITHUB_OWNER = config.GITHUB_OWNER;

const octokit = new Octokit({
    auth: GITHUB_TOKEN
});

// activate bot when enter command "create task"
client.on("message", async (msg) => {
    // check the command valid and set time out for task creating
  if (msg.content === "!create task") {
    try {
      await msg.reply("What is the project name?");
      const filter = (m) => !m.author.bot;
      const collector = msg.channel.createMessageCollector(filter, { time: 1000000 });

      let answers = {};
        // collect answer
      collector.on("collect", (m) => {
        if (!answers.project) {
          answers.project = m.content;
          msg.reply(`Who should be assigned to the issue?`);
        } else if (!answers.assignees) {
          answers.assignees = [m.content];
          msg.reply(`What is the issue title?`);
        } else if (!answers.title) {
          answers.title = m.content;
          msg.reply(`Enter the issue tags separated by commas (e.g. tag1, tag2):`);
        } else if (!answers.tags) {
          answers.tags = m.content.split(",");
          msg.reply(`Enter the issue URL (if applicable):`);
        } else if (!answers.issueURL) {
          answers.issueURL = m.content;
          msg.reply(`How many minutes should be spent on the issue?`);
        } else if (!answers.minutes) {
          answers.minutes = m.content;
          msg.reply(`Enter any dependencies for the issue separated by commas (e.g. issue1, issue2):`);
        } else if (!answers.dependencies) {
          answers.dependencies = m.content.split(",");
          collector.stop();
        }
      });
        // rasie time out error
      collector.on("end", async (collected) => {
        if (Object.keys(answers).length < 7) {
          await msg.reply("Not all information was provided in time. Please try again.");
          return;
        }

        const issueBody = `Project: ${answers.project}\nAssignees: ${answers.assignees.join(", ")}\nTitle: ${
          answers.title
        }\nTags: ${answers.tags.join(", ")}\nIssue URL: ${answers.issueURL}\nMinutes: ${answers.minutes}\nDependencies: ${answers.dependencies.join(
          ", "
        )}`;
        // create issues by octokit
        const { data } = await octokit.issues.create({
            owner: GITHUB_OWNER,
            repo: answers.project,
            title: answers.title,
            body: issueBody,
            labels: answers.tags.concat("new issue"),
            assignees: answers.assignees,
            }).catch((err) => {
                console.error(err);
            throw new Error("Error creating issue.");
});

await msg.reply(`Issue successfully created: ${data.html_url}`);
      });
    } catch (err) {
      console.error(err);
      await msg.reply("Error creating issue. Please try again.");
    }
  }
});



      client.login(DISCORD_TOKEN);




