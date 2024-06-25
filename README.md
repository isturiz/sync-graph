# GitHub Commit Sync CLI

<img width="741" alt="image" src="https://github.com/isturiz/sync-graph/assets/57846457/bc20e910-8dff-4c92-a69a-344e19f8bb00">

This CLI tool allows you to sync GitHub contributions by generating commit scripts based on the contribution history of a GitHub user. Ideal for merging commit histories from different accounts into one visual contribution graph.

## Features

- **Fetch Contribution History**: Retrieves contribution history from any GitHub user.
- **Generate Commit Scripts**: Creates a shell script to replicate the commits locally.
- **Avoid Duplicate Commits**: Ensures that existing commits are not duplicated.
- **Unique Commit Messages**: Each commit has a unique message to avoid conflicts.

## Installation

Follow these steps to get started:

1. **Clone the repository**:
    ```sh
    git clone git@github.com:isturiz/sync-graph.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd sync-graph
    ```

3. **Install dependencies**:
    ```sh
    pnpm install
    ```

## Usage

Run the CLI with:

```sh
npm start
```
or (>node 22)
```sh
node --run start 
