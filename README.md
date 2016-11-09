Moze
====

A dead simple expressjs middleware for doing activity based authorization.
It lets you easily define what routes your users are allowed to access.

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
