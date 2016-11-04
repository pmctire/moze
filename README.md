Moze
====

A dead simple expressjs middleware for authorizing users with a list of
activities. It lets you easily define what routes your users are allowed to
access.

Moze defines the concept of an activity. An activity relates to both users and
routes. A user can perform activities and routes are part of one or more
activities. A user can access a route if one of activities a route is part of
is also one of the activities the user can perform.

Usage
-----

### Install it

```sh
npm install --save moze
```

### Require it

```js
const moze = require('moze');
```

### Initialize it

You need to add `moze.init(...)` to your middlewares. Make sure that you add it
before you start using it to protect your resources.

`moze.init(...)` takes a function as an argument. This function takes a
request and returns an array of activities that the user is allowed to
performed.

```js
app.use(moze.init(function(req) {
  // extract the allowed activities for the user from the request
  return req.user.allowedActivities;
}));
```

### Protect your resources

When you want to add authorization to one of your routes, just add
`moze.may(...)` to the middlewares for the route. Pass the allowed activities
for that route as arguments.

```js
app.get('/protected/resource',
  someAuthenticationMiddleware,
  // both users who can view protected things and users who can manage them
  // should have access to this route
  moze.may('view protected things', 'manage protected things'),
  yourHandler);
```

Development
-----------

### Setup

Install dependencies

```sh
npm install
```

### Testing

You can run the tests once with

```sh
npm test
```

You can have the tests run every time you change something with

```sh
npm test -- --watch
```
