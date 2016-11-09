Moze
====

A dead simple expressjs middleware for doing activity based authorization.
It lets you easily define what routes your users are allowed to access.

Moze is an __authorization__ middleware. This is not the same thing as
authentication. If you're looking for an authentication middleware, we recommend
[passport](http://passportjs.org/).

Installation
------------

```sh
npm install --save moze
```

Usage
-----

```js
var express = require('express');
var moze = require('moze');

var app = express();

// ...

// Here we tell moze about the activities the current user is allowed to perform
app.use(moze.init(function(req) {
  // For this example, we assume that our authentication middleware defines the
  // req.user object which holds an array of the activities that the user is
  // allowed perform.
  return req.user.allowedActivities;
}))

// ...

// routes
app.get('/posts',
  authenticate, // some authentication middleware
  moze.may('browse blog'),
  getBlogAllPosts // handler
);

app.post('/posts',
  authenticate, // some authentication middleware
  moze.may('write blog posts'),
  createBlogPost // handler
);

app.get('/posts/:id',
  authenticate, // some authentication middleware
  moze.may('browse blog', 'write blog posts'),
  getBlogPost // handler
);

app.put('/posts/:id',
  authenticate, // some authentication middleware
  moze.may('write blog posts'),
  editBlogPost // handler
);

app.get('/posts/:id/comments',
  authenticate, // some authentication middleware
  moze.may('browse blog'),
  getBlogPostComments // handler
);

app.post('/posts/:id/comments',
  authenticate, // some authentication middleware
  moze.may('write comments'),
  createComment // handler
);
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
