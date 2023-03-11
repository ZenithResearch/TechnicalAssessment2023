# TechnicalAssessment2023


# Overview
Below are 3 tasks. You must complete the basic sections for both the Discord Plugin and Obsidian Plugin. Competitive applications should complete at least one extension as well. I have included a bonus AI/Data Science assessment which may be completed if you want to be completed for future AI/ML or Data Analytics Roles (if you wish to ONLY be considered for future data roles you do not need to complete the Plugin/Bot assessments).

## Instructions (read carefully before starting):
- Fork this repository
- add "bananawalnut" [bananawalnut (github.com)](https://github.com/bananawalnut) to your new private repository as a reviewer
- Retrieve proprietary code from our discord server

	*any code we provide you with for this task is the sole property of Zenith Ventures Incorporated and may not be reproduced or distributed in any way. Except for the sole purpose of completing this technical assessment in a private repository only accessible by Gabriel Atkinson (@bananawalnut)* 
	
- complete each task on a new branch
- when finished a task create a pull request to merge into main with "bananawalnut" as the reviewer 

## Each solution must include:
1. A detailed breakdown of tasks and a software development plan. 
2. Include diagrams where necessary and outline all test cases and components before writing any code
3. Include detailed documentation of code 
4. include detailed comments using full sentences and proper punctuation
5. Refactor mistakes in boilerplate code and add missing comments (A watchful eye is important when working with a team - you will need to review others code as well as write your own)
-----
# Task 1. (Discord Plugin)
Create a discord plugin and a build script to deploy it on GCP or AWS (can be terraform, cloud formation, python, shell, or any scripting language).

Basic:
based on the Issue template [ObsidianVault/Issue.md at main · ZenithResearch/ObsidianVault (github.com)](https://github.com/ZenithResearch/ObsidianVault/blob/main/templates/Issue.md). The plugin must provide users with a command to "create task". This command must take the users through a set of questions that will allow it to fill in the relevant sections of the Issue for the newly created task. Once the task has been created it must be added to the appropriate github repository as an issue.

Extensions.
1. Add the ability to create milestones and dependencies between tasks
2. Integrate openAI GPT3.5 or davinci-003 to automatically generate full sections of the issue from short form answers, and to create boilerplate unit tests based on the deliverables
	1. Allow for user review
	2. Add context to particular prompts such as "Using Python, or Java Script" in order to generate the best results. Get creative with this
	3. Add other questions for context with needed
3. Use OpenAI Embedding to suggest dependancies for new issues
4. Be Creative - I would love to see what you come up with.
-----
# Task 2. (Obsidian Plugin)
1. Use this obsidian vault: [ZenithResearch/ObsidianVault: Boilerplate of our vault. (github.com)](https://github.com/ZenithResearch/ObsidianVault)
2. You can find a sample obsidian plugin here: [obsidianmd/obsidian-sample-plugin (github.com)](https://github.com/obsidianmd/obsidian-sample-plugin) 
	- Clone This then download the sample main.ts from our discord

### Deliverables:

1. Create a build script to automatically build library into .obsidian/plugins folder
2. Modularize the code, and improve design patterns
3. Create a command to add a New Project In Projects Directory
4. Project Should Have a Dashboard, tasks directory, and wiki directory
	1. Dashboard should be templated
5. Projects should have a reference to their GitHub Project, and GitHub wiki in saved settings and/or YAML front matter
6. Use Templates as much as possible
7. Create a command to Create a Milestone (and GitHub Issue for this milestone)
	1. When a new task is created a task template should be generated and opened (use the quickadd or templater plugin API)
	2. The task can then be filled in normally
8. Create a command to Create a task (with a dependancy to its milestone) 
	1. When a new task is created a task template should be generated and opened (use the quickadd or templater plugin API)
	2. The task can then be filled in normally
9. Create a command to push changes to github
10. On load all tasks and wiki pages in github should be checked with the vault pages any differences should be pulled
11. On exit all changes must be pushed
12. Extension: Create the project dashboard using the data view plugin. I would love to see upcoming tasks and who they are assigned to as well as progress on all milestones

### Helpful Materials:
1. https://bagerbach.com/blog/weekly-review-obsidian
2. [bagerbach.com/blog/projects-and-goals-obsidian](https://bagerbach.com/blog/projects-and-goals-obsidian#updated-auto-tracking)
3. https://tfthacker.medium.com/obsidian-understanding-its-core-design-principles-7f3fafbd6e36
4. https://beingpax.medium.com/how-to-use-obsidian-dataview-a-complete-beginners-guide-2a275c274936
-----
# Task 3. (AI Model Training and Feature Selection)
Train neural networks, and a neural network generation service, to predict the monthly rent of a given properties using the provided rental listings datasets. 

directory structure (Download the zip from our discord and unzip into task_03 directory):
```
/
--/models
--/src
--/data
----/rental_listings
----/sale_listings
```
Basic:
Using the datasets provided compile, train, and test one neural network for each location (each dataset contains data for separate locations). You may attempt to create a single neural network if it performs as well as the average of the individual neural networks for each location.

## Note: you must compare polar coordinates from the city centre, longitude and latitude, and 1 hot encoding neighborhoods as features in your feature selection process

1. Write a report outlining your hyper parameters, feature selection, and performance (the key metric should be Mean Average Error but include any other insightful performance metrics that you see fit)
2. Save all compiled models to the models directory 
	1. Extend the subdirectory structure and use good naming conventions to enable parameterized retrieval of the appropriate model based on the location being predicted
3. Create a function (with any helper functions needed to ensure modular coding) that generates, compiles, and trains a new model for any region based on the insights from you report
4. Create an OOP based service to predict the rental prices for the sale_listings of a given region

Extensions:
1. Create three new services using the same OOP design patterns as the "Predict" service from the basic section *the first two (DataCollect and DataClean) will be done by refactoring the zumper_scraper*
	1. DataCollect
		1. This service is only responsible for scraping rental properties into a dataframe
		2. it should return a dataframe for use by another service and/or save it for future use by another service
		3. if saving ensure you extend the directory structure for parameterized retreival
		4. Test the scraper on Port Coquitlem, BC; Calgary, AB; Barrie, ON; Toronto, ON
	2. DataClean
		1. This service is responsible for cleaning data from the DataCollect service for use in the model train service
	3. ModelTrain
		1. This service will generate, compile, and train a new neural network if no neural network exists for the region
		2. if a neural network exists for a region it will simply retrain (update weights) of the existing model **using only data that it wasn't previously trained on. or a combination of data depending on evaluation**. The new performance should be evaluated on old and new data, both together and separately
			1. Select your own evaluation criteria to decide whether to use the updated weights or to rollback to the old weights. Provide well documented reasoning for your evaluation criteria.
