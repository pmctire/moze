'use strict';

function init(activitiesFn) {
  if (!activitiesFn)
    throw new TypeError("Can't initialize moze without the activities function.");

  return function(req, res, done) {
    req._moze = {
      activitiesFn: activitiesFn
    };

    done();
  };
}

function may() {
  const allowed = Array.prototype.slice.call(arguments);

  if (allowed.length == 0)
    throw new TypeError('You must specify at least one activity.');

  return function(req, res, done) {
    if (!(req._moze && req._moze.activitiesFn))
      return done(new TypeError('moze is not initialized. Be sure to add `moze.init(...)` to your middlewares'));

    const activities = req._moze.activitiesFn(req);
    for (var i = 0; i < activities.length; i++) {
      if (allowed.indexOf(activities[i]) != -1)
        return done();
    }

    res.statusCode = 403;
    res.end('Forbidden');
  };
}

module.exports = {
  init: init,
  may: may
};
