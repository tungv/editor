# react-editor
> Simple production-ready text editor using [React](http://facebook.github.io/react/) and tests with Jest.

## Install

Clone repository and run:

```sh
$ npm install
```

## Development

node 4+

```sh
$ npm start
```

Go to [http://localhost:3001](http://localhost:3001) and see the magic happen.

## Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```sh
$ NODE_ENV=production npm start
```

Also build the production bundle:

```sh
$ npm run dist
```

## Tests

```sh
$ npm test
```

Only run specific tests

```sh
$ npm test -- NotFoundComponent
```

Coverage

```sh
$ npm test -- --coverage
```
