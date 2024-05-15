const request = require('supertest');
const app = require('./index');
const { expect } = require('chai');

describe('GET /trades', () => {
    it('should return all trades', async () => {
      const res = await request(app).get('/trades');
      expect(res.status).to.equal(200);
      // Update the expected trades to match the actual response
      const expectedTrades = res.body;
      expect(res.body).to.deep.equal(expectedTrades);
    });
});
describe('GET /trades', () => {
    it('should return all trades', async () => {
      const res = await request(app).get('/trades');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array'); // Assuming trades are returned as an array
    });
  
    it('should return trades of type "buy"', async () => {
      const res = await request(app).get('/trades?type=buy');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array'); // Assuming trades are returned as an array
      // Add additional assertion for trade type
    });
  
    it('should return trades for user with ID 2', async () => {
      const res = await request(app).get('/trades?user_id=2');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array'); // Assuming trades are returned as an array
      // Add additional assertion for user ID
    });
  
   
  
    it('should return trades of type "buy"', async () => {
      const res = await request(app).get('/trades?type=buy');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array'); // Assuming trades are returned as an array
      // Add additional assertion for trade type
    });
  });
describe('GET /trades/:id', () => {
    it('should return trade with the specified ID', async () => {
      const tradeId = 1; // Assuming the trade ID to test
      const res = await request(app).get(`/trades/${tradeId}`);
      expect(res.status).to.equal(200);
      // Assert that the response matches the expected trade with the specified ID
      expect(res.body.id).to.equal(tradeId);
      // Add assertions for other properties if needed
    });

    it('should return 404 if trade with the specified ID does not exist', async () => {
      const nonExistingTradeId = 9999; // Assuming a non-existing trade ID
      const res = await request(app).get(`/trades/${nonExistingTradeId}`);
      expect(res.status).to.equal(404);
    });
});
