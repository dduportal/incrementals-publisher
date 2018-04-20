const assert = require('assert');
const simple = require('simple-mock');
const fun    = require('../index.js');

describe('Handling incremental publisher webhook events', () => {
  let ctx = simple.mock();
  let data = {
    body: {}
  };

  beforeEach(() => {
      simple.mock(ctx, 'log', (...args) => { /* console.log(args); */ });
  });
  afterEach(() => { simple.restore() });

  describe('without parameters', () => {
    it('should run without any parameters', () => {
      fun(ctx, data);
    });

    it('should return a 400', () => {
      fun(ctx, data);
      assert.equal(ctx.res.status, 400);
    });
  });

  describe('without a build_url matching JENKINS_HOST', () => {
    beforeEach(() => {
      data.body.build_url = 'https://example.com/foo/bar';
    });

    it('should return a 400', () => {
      fun(ctx, data);
      assert.equal(ctx.res.status, 400);
    });
  });
});
