# Development breakdown tasks:
- Setup development environment: Install Node.js and the necessary packages (Discord.js, @octokit/rest). Create a new project directory and initialize it with "npm init".
- Create a new Discord bot: Create a new Discord bot and add it to the desired server. Generate a new Discord token and add it to the config file.
- Generate a GitHub token: Generate a new GitHub token and add it to the config file.
- Implement the "getDependencies" function: The code calls the "getDependencyIssueNumbers" function, which does not exist in the provided code. This function needs to be implemented to return an array of issue numbers for any dependencies that were provided.
- Implement the command listener: The code listens for messages and responds when a user types "!create task". Implement the command listener to listen for this specific command and trigger the process of collecting information from the user.
- Collect information from the user: Implement the code that prompts the user with a series of questions and collects the answers. Store the answers in an object.
- Create the GitHub issue: Once all the information has been collected, use the GitHub API to create a new issue on the specified repository.
- Error handling: Implement error handling to handle cases where the user does not provide all the required information or if there is an error creating the issue on GitHub.
- Testing and deployment: Test the bot thoroughly and deploy it to a server or hosting service.
# Test cases:

- Test if the bot replies to the correct message (i.e., "!create task").
- Test if the bot asks for the correct input at each step of the issue creation process.
- Test if the bot creates an issue on GitHub with the correct information provided by the user.
- Test if the bot handles errors properly and replies with an appropriate error message.
- Test if the bot can handle interruptions (e.g., if the user types a different command in the middle of the issue creation process).

## Components to test:

- Discord.js library: test if the Discord client is correctly initialized and can listen for messages and respond to them.
- @octokit/rest library: test if the Octokit client is correctly initialized and can create issues and milestones on GitHub.
- getDependencies.js module: test if the function can correctly retrieve the issue numbers of any dependencies provided by the user.
- Config.js module: test if the configuration file is correctly read and the tokens and owner name are retrieved.
- Message collector: test if the message collector can correctly collect the user's responses to the prompts and stop when all responses have been collected or when the time limit is reached.
- Issue body: test if the issue body is correctly constructed with the user's responses and the issue numbers of any dependencies provided by the user.
- Error handling: test if the bot can correctly handle errors (e.g., if the user does not provide all required information or if there is an error creating the issue on GitHub) and reply with an appropriate error message.

