import { createInterface } from 'node:readline';
import { generateCommitScript } from './script.js';
import { executeScript } from './executor.js';

export function promptUser() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Please enter the username of the secondary GitHub account to sync commits from:", username => {
    rl.question("Please enter the starting year for the range of commits:", minYear => {
      rl.question("Please enter the ending year for the range of commits:", maxYear => {
        console.log("To ensure your commits are linked to your primary account, please provide the following details:")
        rl.question("Please enter the primary account's name:", committerName => {
          rl.question("Please enter the primary account's email: ", committerEmail => {
            rl.question("Would you like to execute the script immediately? (yes/no): ", execute => {
              rl.close();

              if (username && minYear && maxYear && committerName && committerEmail) {
                console.log("\nGenerating script...\n");

                generateCommitScript({
                  username: username, 
                  minYear: parseInt(minYear), 
                  maxYear: parseInt(maxYear),
                  committerName: committerName,
                  committerEmail: committerEmail
                })
                .then(() => {
                  if (execute.toLowerCase() === 'yes' || execute.toLowerCase() === 'y') {
                    console.log("Executing script...\n");
                    executeScript();
                  } else {
                    console.log("Script generation completed. You can run the script manually.");
                  }
                })
                .catch(error => {
                  console.error(`Error: ${error}`);
                });
              } else {
                console.log("Invalid input. Please provide all the required details.");
              }
            });
          });
        });
      });
    });
  });
}
