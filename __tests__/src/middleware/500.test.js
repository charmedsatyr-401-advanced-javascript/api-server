'use strict';

const { server } = require('../../../src/server.js');
const supertest = require('supertest');
const request = supertest(server);

const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

// TODO: Below are end-to-end tests;
// we could add unit tests that require the notFound import
// const errorHandler = require('../500.js');

describe('`500` error handler', () => {
  describe(`End-to-end tests`, () => {
    it('should return status `500` on a server error', async () => {
      // This route requires authorization,
      // but we are not providing credentials
      // and so get an error
      const errorRoute = '/signin';
      const results = await request.post(errorRoute);
      expect(results.status).toBe(500);
      expect(error).toHaveBeenCalled();
    });
    it('should not return at status on a good request', async () => {
      const result = await request.get('/');
      expect(result.status).not.toBe(500);
    });
  });
});
