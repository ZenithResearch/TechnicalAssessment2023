// Import necessary libraries
const Discord = require("discord.js");
const { Octokit } = require("@octokit/rest");
const config = require("./config");
const { getDependencyIssueNumbers } = require("./getDependencies");

// Create a new instance of the Discord client with all the intents enabled
const client = new Discord.Client({
  intents: [Discord.Intents.ALL],
});
// Set the command prefix and retrieve the Discord and GitHub tokens and owner name from the config file
const prefix = "!create task";
const DISCORD_TOKEN = config.DISCORD_TOKEN;
const GITHUB_TOKEN = config.GITHUB_TOKEN;
const GITHUB_OWNER = config.GITHUB_OWNER;
// Create a new instance of the Octokit REST client for accessing the GitHub API with the provided GitHub token
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Listen for messages and respond when a user types "!create task"
client.on("message", async (msg) => {
  // check the command valid and set time out for task creating
  if (msg.content === "!create task") {
    try {
      await msg.reply("What is the project name?");
      const filter = (m) => !m.author.bot;
      const collector = msg.channel.createMessageCollector(filter, {
        time: 1000000,
      });
      // Create an object to store the user's responses
      let answers = {};
      // Collect the user's responses to the prompts
      collector.on("collect", (m) => {
        if (!answers.project) {
          answers.project = m.content;
          msg.reply(`Who should be assigned to the issue?`);
        } else if (!answers.assignees) {
          answers.assignees = [m.content];
          msg.reply(`What is the issue title?`);
        } else if (!answers.title) {
          answers.title = m.content;
          msg.reply(
            `Enter the issue tags separated by commas (e.g. tag1, tag2):`
          );
        } else if (!answers.tags) {
          answers.tags = m.content.split(",");
          msg.reply(`Enter the issue URL (if applicable):`);
        } else if (!answers.issueURL) {
          answers.issueURL = m.content;
          msg.reply(`How many minutes should be spent on the issue?`);
        } else if (!answers.minutes) {
          answers.minutes = m.content;
          msg.reply(
            `Enter any dependencies for the issue separated by commas (e.g. issue1, issue2):`
          );
        } else if (!answers.dependencies) {
          answers.dependencies = m.content.split(",");
          msg.reply(`Enter the task description:`);
        } else if (!answers.description) {
          answers.description = m.content;
          msg.reply(`Enter any pending decisions for the task:`);
        } else if (!answers.pendingDecisions) {
          answers.pendingDecisions = m.content;
          msg.reply(
            `Enter the acceptance criteria / deliverables for the task:`
          );
        } else if (!answers.acceptanceCriteria) {
          answers.acceptanceCriteria = m.content;
          msg.reply(
            `Enter a milestone name for the issue (or type "none" for no milestone):`
          );
        } else if (!answers.milestone) {
          answers.milestone = m.content;
          if (answers.milestone.toLowerCase() === "none") {
            answers.milestone = null;
            collector.stop();
          } else {
            msg.reply(`Enter a description for the milestone:`);
          }
        } else if (!answers.milestoneDescription) {
          answers.milestoneDescription = m.content;
          collector.stop();
        }
      });
      // Once all responses have been collected, create the issue on GitHub
      collector.on("end", async (collected) => {
        if (Object.keys(answers).length < 7) {
          await msg.reply(
            "Not all information was provided in time. Please try again."
          );
          return;
        }
        // Get the issue numbers for any dependencies
        const dependencyIssueNumbers = await getDependencyIssueNumbers(
          answers.dependencies,
          answers.project
        );
        // Create the body of the issue using the user's responses and the dependency issue numbers
        const issueBody = `Project: ${
          answers.project
        }\nAssignees: ${answers.assignees.join(", ")}\nTitle: ${
          answers.title
        }\nTags: ${answers.tags.join(", ")}\nIssue URL: ${
          answers.issueURL
        }\nMinutes: ${answers.minutes}\nDependencies: ${dependencyIssueNumbers
          .map((num) => `#${num}`)
         }\n\nTask Description:${answers.description}
          \nPending Decisions:${answers.pendingDecisions}
          \nAcceptance Criteria/Deliverables:${answers.acceptanceCriteria}`;

        // check if milestone should be created
        let milestoneNumber = null;
        if (answers.milestone) {
          const { data: milestone } = await octokit.issues.createMilestone({
            owner: GITHUB_OWNER,
            repo: answers.project,
            title: answers.milestone,
            description: answers.milestoneDescription,
          });
          milestoneNumber = milestone.number;
        }

        // create issues by octokit
        const { data } = await octokit.issues.create({
          owner: GITHUB_OWNER,
          repo: answers.project,
          title: answers.title,
          body: issueBody,
          labels: answers.tags.concat("new issue"),
          assignees: answers.assignees,
          milestone: milestoneNumber,
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
