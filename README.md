# GitHub Commit Sync CLI

<img width="741" alt="image" src="https://github.com/isturiz/sync-graph/assets/57846457/bc20e910-8dff-4c92-a69a-344e19f8bb00">

This CLI tool allows you to sync GitHub contributions by generating commit scripts based on the contribution history of a GitHub user. Ideal for merging commit histories from different accounts into one visual contribution graph.

## CHANGELOG

- 2024-10-20: Now the commits use 'No.' to express the number of commits instead of the '#' character to avoid conflicts with repository issues. - 

## Features

- **Fetch Contribution History**: Retrieves contribution history from any GitHub user.
- **Generate Commit Scripts**: Creates a shell script to replicate the commits locally.
- **Avoid Duplicate Commits**: Ensures that existing commits are not duplicated.
- **Unique Commit Messages**: Each commit has a unique message to avoid conflicts.

## Installation

Follow these steps to get started:

1. **Use the "Use template" button**

2. **Clone the repository**:
    ```sh
    git clone your_repository_from_template
    ```

2. **Navigate to the project directory**:
    ```sh
    cd your_repository
    ```

3. **Install dependencies**:
    ```sh
    pnpm install
    ```

## Usage

Run the CLI with:

```sh
pnpm start
```
or for Node.js version 22 and above:

```sh
node --run start 
```
You will be prompted to enter the GitHub username, the minimum year, and the maximum year for fetching contributions. Additionally, you can decide whether to execute the script immediately or not.

- Execute Immediately: If you choose `yes`, the commits will be generated and executed immediately.
- Generate Script Only: If you choose `no`, the commits will be generated in the `script.sh` file for manual execution later.

Once the script has been executed or generated, you can push the changes to your GitHub repository with:

```sh
git push origin main
```

### Similar Tools ⚒️
- [Git Synced](https://github.com/apappas1129/git-synced)

### Inspiration

This project was inspired by the work of [charpeni](https://github.com/charpeni) in [sync-external-contributions](https://github.com/charpeni/sync-external-contributions). However, since the original project is no longer maintained and doesn't work as of today, I created this project to fulfill the same need.
