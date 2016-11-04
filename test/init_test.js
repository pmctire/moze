'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const moze = require('../index');

describe('moze.init(...)', () => {
  it('should save the activities fn in the req', done => {
    var req;
    chai.connect
      .use(moze.init(() => ['stuff']))
      .req(r => {req = r;})
      .next(err => {
        expect(err).not.to.be.ok;

        expect(req).to.have.deep.property('_moze.activitiesFn');
        expect(req._moze.activitiesFn()).to.deep.eq(['stuff']);

        done();
      })
      .dispatch();
  });

  it('should complain if function is not passed', () => {
    expect(() => moze.init()).to.throw(TypeError);
  });
});
