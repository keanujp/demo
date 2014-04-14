# Set up

## Node

Install `node` and configure proxy for `npm`.

## Node modules

Then install required modules globally using npm.

```
$ npm install -g gulp browserify phantomjs mocha mocha-phantomjs 
```
## Project dependencies

From the project root, `./AcmeUI` install project dependencies by:

```
$ npm install
```
## Test server dependencies

From server directory, `./AcmeUI/server` install test server dep by:

```
$ npm install
```
# Build

## Default

To run default, execute `gulp` from `./AcmeUI`.

```
$ gulp
```
## Test

Mocha test on node can be invoked via `gulp test`.

To run tests on browser (or on phantomjs) the test bundles need to be created. These are built via the default gulp task.

To execute Mocha node test as well as phantom test run:

```
$ npm test
```

To run the test on actual browser, open the `./target/mocha.html` in the browser.

## Watch

There's a watch task defined and can be extended as needed.

```
$ gulp watch-build
```
It triggers build when the file changes.

## SourceMap

`Browserify` supports source map and when `debug` is enabled it produces the source map in the bundled file.

When producing production ready bundled file set the environment variable accordingly.

```
$ gulp --Env production
```
For prod build, the task also minifies the bundle.

# Starting the server

There are two options. First using `node connect` and the second using `moco` library.

## Node Connect

To use node connect server, run the following command from `./AcmeUI/server` directory.

```
$ node server.js
```
Which serves `./target` directory.

Then point to `http://localhost:9091` from the browser to see the app.

At current, there's no support for mock API.

## Moco

With `moco` it can serve mock responses (i.e. REST API) with minimal configuration. To run it,

```
$ moco.bat
```
The configuration detail is captured in `moco.json`. The `moco` library can also serve static resources from `./target` as well.

Open the url `http://localhost:9092/index.html`.
