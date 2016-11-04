'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const moze = require('../index');

var activitiesFn;
function initMoze(req) {
  req._moze = {activitiesFn: activitiesFn};
}

describe('moze.may(...)', () => {
  beforeEach(() => {
    activitiesFn = sinon.stub();
  });

  it('should fail if no args are passed', () => {
    expect(() => moze.may()).to.throw(TypeError);
  });

  it('should fail if not initialized', done => {
    chai.connect
      .use(moze.may('do stuff'))
      .next(err => {
        expect(err).to.be.an('error');

        done();
      })
      .dispatch();
  });

  it('should 403 if no activities match', done => {
    activitiesFn.returns(['do a', 'do b']);

    chai.connect
      .use(moze.may('do c'))
      .req(initMoze)
      .end(res => {
        expect(res).to.have.property('statusCode', 403);

        done();
      })
      .dispatch();
  });

  it('should pass the request along if any activity matches', done => {
    activitiesFn.returns(['do a', 'do b', 'do c']);

    chai.connect
      .use(moze.may('do b'))
      .req(initMoze)
      .next(err => {
        expect(err).not.to.be.ok;

        done();
      })
      .dispatch();
  });
});
