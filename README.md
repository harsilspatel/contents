contents
========

🤖 **Contents** helps generate table of contents with ease.
 
## GIF 🎞

<img src="screencaptures/usage.gif">
</br>

## Usage 🖱

1. Install the Contents GitHub App.
2. Create your markdown(s).
3. Open a new issue.
</br>

## Manual 📜
| Arguments     | Description           | Default  |
| ------------- |:-------------:| -----:|
| --path     | relative path of the markdown file from the root of the repo | README.md |
| --ref      | The name of the commit/branch/tag      | master branch |
</br>


## WIP 🚧
As of now, the bot creates a comment of the table-of-contents in the opened issue. Thereafter, the user has to perform the laborious task of copying the contents, navigating to the file in the correct branch, and pasting it. 

However, the functionality can be further streamlined by:
1. Creating a branch from the inputted branch
2. Prepending the file with it's table-of-contents
3. Creating a pull request from new branch to the inputted branch
4. Creating a comment referencing the PR in the opened issue.

Thereafter, the user has to simply review the PR and merge it. 
</br>


## Motivation 💡
When I took the initiative to convert the Wired Constitution from .docx to .markdown, it dawned upon me that the generation of ToC should be automated and that's when I set out on the mission to address the issue :D
