const { Octokit } = require("@octokit/rest");
const config = require("./config");
const GITHUB_OWNER = config.GITHUB_OWNER;
const octokit = new Octokit({
  auth: config.GITHUB_TOKEN,
});

// Define an asynchronous function that takes an array of dependencies and a project name as parameters
async function getDependencyIssueNumbers(dependencies, project) {
  // Create an array to hold the issue numbers
  let issueNumbers = [];

  // Iterate through each dependency in the array
  for (const dep of dependencies) {
    // Remove the '#' character from the dependency string to get the issue number
    const issueNumber = dep.replace("#", "");

    try {
      // Use the Octokit instance to get the issue data for the given project and issue number
      const { data: issue } = await octokit.issues.get({
        owner: GITHUB_OWNER,
        repo: project,
        issue_number: issueNumber,
      });

      // If successful, add the issue number to the array of issue numbers
      issueNumbers.push(issueNumber);
    } catch (err) {
      // If there is an error, log it to the console
      console.error(err);
    }
  }

  // Return the array of issue numbers
  return issueNumbers;
}

// Export the getDependencyIssueNumbers function for use in other modules
module.exports = { getDependencyIssueNumbers };
