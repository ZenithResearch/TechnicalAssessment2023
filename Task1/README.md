# Discord Plugin

This is a Node.js-based plugin for creating tasks on GitHub through Discord.

## Prerequisites

- Node.js v14 or later
- A Discord bot token
- A GitHub personal access token with the "repo" scope
- A GitHub repository owned by you or an organization that you belong to

## Installation

1. Clone this repository
2. Navigate to the project directory: `cd Task1`
3. Install the required packages: `npm install`
4. Create a `config.js` file at the root of the project and add the following:

   ```javascript
   module.exports = {
     DISCORD_TOKEN: "YOUR_DISCORD_BOT_TOKEN",
     GITHUB_TOKEN: "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN",
     GITHUB_OWNER: "YOUR_GITHUB_USERNAME_OR_ORGANIZATION"
   };
Replace YOUR_DISCORD_BOT_TOKEN with your actual Discord bot token, YOUR_GITHUB_PERSONAL_ACCESS_TOKEN with your actual GitHub personal access token, and YOUR_GITHUB_USERNAME_OR_ORGANIZATION with your actual GitHub username or organization name.

## Usage

1. Invite the Discord bot to your server using the following link: `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot` (replace YOUR_CLIENT_ID with your actual Discord bot's client ID).
2. In your Discord server, use the command `!create task` to start the task creation process.
3. Follow the prompts to enter the necessary information for the task (project name, assignees, title, tags, issue URL, minutes, and dependencies).
4. Once all information is provided, the plugin will create the task on GitHub and reply with a link to the new issue.

## Docker

This project includes a Dockerfile for containerization. To build and run the Docker image:

1. Build the Docker image: `docker compose up -d --build .`
2. Run the Docker container: `docker compose up`

Note that you will still need to create a config.js file and add it to the Docker image using the `-v` flag or another method.

