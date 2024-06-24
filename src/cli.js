import { createInterface } from 'node:readline';
import { generateCommitScript } from './script.js';
import { executeScript } from './executor.js';

export function promptUser() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Please enter GitHub username: ", username => {
    rl.question("Please enter the minimum year: ", minYear => {
      rl.question("Please enter the maximum year: ", maxYear => {
        rl.question("Would you like to execute the script immediately? (yes/no): ", execute => {
          rl.close();

          if (username && minYear && maxYear) {
            console.log("\nGenerating script...\n");

            generateCommitScript({username: username, minYear: parseInt(minYear), maxYear: parseInt(maxYear)})
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
}
