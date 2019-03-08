# Testing Async Code with Mocha & Chai

1. The callback function that `it` blocks take as their second argument have a param available called `done`

```js
it('does something', function(done) {});

it('does something', done => {});
```

2. `done` is a function - if done is specified, it **MUST** be called before Mocha considers the test to have passed

```js
it('this test would fail, saying "Please ensure done is called"', done => {});

it('this test would pass', done => {
  done();
});
```

This behaviour prevents false positives in your tests. This is common in async code, as your expectations are often read asynchronously. As expectations must fail for the test to not pass, it is possible that they are skipped.

3. To test the output of a asynchronous function, you must run your tests in the callback function - this is the only way to evaluate how it has behaved, as asynchronous functions that use callbacks do not have return values.

```js
it('invokes the callback with no error', done => {
  const testCB = err => {
    expect(err).to.be.null;
    done();
  };
  checkServerStatus(testCB);
});
```

4. `done` cannot be invoked multiple times without throwing an error - this prevents you from writing bad asynchronous code in which your callback is called multiple times, and is a useful feature.

```js
it('this test will break', done => {
  [1, 2, 3].forEach(item => done());
});
```
