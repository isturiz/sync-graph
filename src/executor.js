import { exec } from 'child_process';

export function executeScript() {
  exec('bash script.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return;
    }
  });
}
