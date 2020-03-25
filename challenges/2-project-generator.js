const fs = require('fs');
const { spawn } = require('child_process');

function writeFile(pathToFile, contents, cb) {
  fs.writeFile(pathToFile, contents, err => {
    if (err) console.log(`${pathToFile} couldn't be written...`);
    cb();
  });
}

function initialiseAsGitRepo(projectName, cb) {
  const childProcess = spawn('git', ['init'], { stdio: 'inherit', cwd: `./${projectName}` });
  childProcess.on('exit', () => {
    const childProcess = spawn('git', ['status'], { stdio: 'inherit', cwd: `./${projectName}` });
    childProcess.on('data', console.log);
    childProcess.on('exit', cb);
  });
  childProcess.on('error', err => {
    console.log('something went wrong...');
    console.log(err);
    cb();
  });
}

function projectGenerator(projectName, cb) {
  fs.mkdir(`./${projectName}`, err => {
    fs.mkdir(`./${projectName}/spec`, err => {
      const filesToWrite = [
        { fileName: `./${projectName}/index.js`, data: '' },
        { fileName: `./${projectName}/.gitignore`, data: 'node_modules' },
        { fileName: `./${projectName}/spec/index.spec.js`, data: '' },
        { fileName: `./${projectName}/README.md`, data: `# ${projectName}` }
      ];
      let fileWritten = 0;
      filesToWrite.forEach(({ fileName, data }) => {
        writeFile(fileName, data, err => {
          fileWritten++;
          if (fileWritten === filesToWrite.length) initialiseAsGitRepo(projectName, cb);
        });
      });
    });
  });
}

module.exports = projectGenerator;
