const projectGenerator = require('../challenges/2-project-generator');
const fs = require('fs');
const removeProject = require('./utils.js');

const TEST_PROJECT_NAME = 'my_new_project';

describe('project_generator', () => {
  beforeEach(done => removeProject(TEST_PROJECT_NAME, done));
  afterAll(done => removeProject(TEST_PROJECT_NAME, done));

  test('writes a new project with the specified name', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.access('./my_new_project', fs.constants.F_OK, (err, stats) => {
        expect(err).toBe(null); // <-- will be null if directory exists
        done();
      });
    });
  });
  test('project has an index.js file', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.access('./my_new_project/index.js', fs.constants.F_OK, (err, stats) => {
        expect(err).toBe(null);
        done();
      });
    });
  });
  test('project has a .gitignore ignoring node_modules', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.readFile('./my_new_project/.gitignore', 'utf8', (err, contents) => {
        expect(err).toBe(null);
        expect(contents).toBe('node_modules');
        done();
      });
    });
  });
  test('project has a .gitignore ignoring node_modules', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.readFile('./my_new_project/.gitignore', 'utf8', (err, contents) => {
        expect(err).toBe(null);
        expect(contents).toBe('node_modules');
        done();
      });
    });
  });
  test('has a spec folder', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.access('./my_new_project/spec', fs.constants.F_OK, (err, contents) => {
        expect(err).toBe(null);
        done();
      });
    });
  });
  test('has a index.spec.js inside the spec folder', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.access('./my_new_project/spec/index.spec.js', fs.constants.F_OK, err => {
        expect(err).toBe(null);
        done();
      });
    });
  });
  test('has a README file with a header containing the name of the project', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.readFile('./my_new_project/README.md', 'utf8', (err, fileContents) => {
        expect(err).toBe(null);
        expect(fileContents).toBe(`# ${TEST_PROJECT_NAME}`);
        done();
      });
    });
  });
  test('project is initialised as a .gitignore repository', done => {
    projectGenerator(TEST_PROJECT_NAME, () => {
      fs.access('./my_new_project/.git', fs.constants.F_OK, (err, fileContents) => {
        expect(err).toBe(null);
        done();
      });
    });
  });
});
