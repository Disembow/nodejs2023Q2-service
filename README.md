# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```javascript
  git clone https://github.com/Disembow/nodejs2023Q2-service.git
```

## Installing NPM modules

```javascript
  npm install
```

## Env variables

Rename `.env.example` file to `.env`

## Running application via Docker

Launch Docker desktop app

To run app:

```javascript
  npm run docker:up
```

To stop running app:

```javascript
  npm run docker:down
```

To reload container use:

```javascript
  npm run docker:reload
```

## Docker vulnerabilities scan

```javascript
  npm run docker:scan
```

## Running application

```javascript
  npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```javascript
  npm run test
```

To run only one of all test suites

```javascript
  npm run test -- <path to suite>
```

To run all test with authorization

```javascript
  npm run test:auth
```

To run only specific test suite with authorization

```javascript
  npm run test:auth -- <path to suite>
```

### Auto-fix and format

```javascript
  npm run lint
```

```javascript
  npm run format
```

### Debugging in VSCode

Press `F5` to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>
