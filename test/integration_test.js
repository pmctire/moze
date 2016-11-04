'use strict';

const chai = require('chai');
const expect = chai.expect;

const express = require('express');
const moze = require('../index');

// users
const manager = {
  name: 'alice',
  activities: ['manage things']
};

const viewer = {
  name: 'bob',
  activities: ['look at things']
};

const anonymous = {
  name: null,
  activities: []
};

// app
var currentUser;
function authenticate(req, res, done) {
  // stub authentication fn (this would be something like passport)
  req.user = currentUser;
  done();
}

function getUserActivities(req) {
  return req.user.activities;
}

function dummyHandler(req, res, done) {
  res.status(200).end('All OK');
}

const app = express();
app.use(moze.init(getUserActivities));

app.get('/things',
  authenticate,
  moze.may('look at things', 'manage things'),
  dummyHandler);

app.post('/things',
  authenticate,
  moze.may('manage things'),
  dummyHandler);

// test helpers
function testGetThings(expectedStatus) {
  return function(done) {
    chai.request(app)
      .get('/things')
      .end((err, res) => {
        expect(res).to.have.status(expectedStatus);

        done();
      });
  };
}

function testPostThings(expectedStatus) {
  return function(done) {
    chai.request(app)
      .post('/things')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(expectedStatus);

        done();
      });
  };
}

// tests
describe('app using moze', () => {
  describe('manager user', () => {
    beforeEach(() => currentUser = manager);

    it('should be able to GET /things', testGetThings(200));
    it('should be able to POST /things', testPostThings(200));
  });

  describe('viewer user', () => {
    beforeEach(() => currentUser = viewer);

    it('should be able to GET /things', testGetThings(200));
    it('should not be able to POST /things', testPostThings(403));
  });

  describe('anonymous user', () => {
    beforeEach(() => currentUser = anonymous);

    it('should not be able to GET /things', testGetThings(403));
    it('should not be able to POST /things', testPostThings(403));
  });

  describe('broken user', () => {
    beforeEach(() => currentUser = {});

    it('should 500 on GET /things', testGetThings(500));
    it('should 500 on POST /things', testPostThings(500));
  });
});
