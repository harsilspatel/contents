contents
========


🤖 **Contents** helps generate table of contents with ease.

# Usage 🖱

1. Install the Contents GitHub App.
2. Create your markdown(s).
3. Open a new issue.
 
## GIF 🎞

<img src="screencaptures/usage.gif">


# Manual 📜
| Arguments     | Description           | Default  |
| ------------- |:-------------:| -----:|
| --path     | relative path of the markdown file from the root of the repo | README.md |
| --ref      | The name of the commit/branch/tag      | master branch |


# WIP 🚧
As of now the bot creates a comment of the table-of-contents in the opened issue. And the user has to perform the laborious task of copying the contents, navigating to the file in the correct branch, and pasting it. 

However, the functionality can be further streamlined by:
1. Creating a branch from the inputted branch
2. Prepending the file with it's table-of-contents
3. Creating a pull request from new branch to the parameter branch
4. Creating a comment referencing the PR in the opened issue.



# Motivation 💡
I took the initiative took convert the Wired Constitution from .docx to .markdown 
