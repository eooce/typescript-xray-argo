import { exec } from 'child_process';

const startScriptPath = './src/scripts/start.sh';

const chmodChild = exec(`chmod +x ${startScriptPath}`);

chmodChild.stdout?.on('data', (data) => {
  console.log(`chmod stdout: ${data}`);
});

chmodChild.stderr?.on('data', (data) => {
  console.error(`chmod stderr: ${data}`);
});

chmodChild.on('close', (chmodCode) => {
  if (chmodCode === 0) {
    const startChild = exec(`bash ${startScriptPath}`);

    startChild.stdout?.on('data', (data) => {
      console.log(`${data}`);
    });

    startChild.stderr?.on('data', (data) => {
      console.error(`start.sh stderr: ${data}`);
    });

    startChild.on('close', (startCode) => {
      console.log(`start.sh child process exited with code ${startCode}`);
    });
  } else {
    console.error(`Failed to chmod start.sh. Exit code: ${chmodCode}`);
  }
});
