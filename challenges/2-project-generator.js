const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const projectGenerator = (projectName, callback) => {
  const projectDir = path.join(__dirname, '..', projectName);

  fs.mkdir(projectDir, err => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(path.join(projectDir, 'index.js'), '', err => {
        if (err) {
          callback(err);
        } else {
          fs.writeFile(path.join(projectDir, '.gitignore'), 'node_modules', err => {
            if (err) {
              callback(err);
            } else {
              fs.mkdir(path.join(projectDir, 'spec'), err => {
                if (err) {
                  callback(err);
                } else {
                  fs.writeFile(path.join(projectDir, 'spec', 'index.test.js'), '', err => {
                    if (err) {
                      callback(err);
                    } else {
                      fs.writeFile(path.join(projectDir, 'README.md'), `# ${projectName}`, err => {
                        if (err) {
                          callback(err);
                        } else {
                          exec(`git init ${projectDir}`, err => {
                            if (err) {
                              callback(err);
                            } else {
                              fs.writeFile(path.join(projectDir, '.eslintrc.json'), '', err => {
                                if (err) {
                                  callback(err);
                                } else {
                                  fs.writeFile(
                                    path.join(projectDir, 'package.json'),
                                    JSON.stringify({ devDependencies: {} }),
                                    err => {
                                      if (err) {
                                        callback(err);
                                      } else {
                                        callback();
                                      }
                                    }
                                  );
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = projectGenerator;
