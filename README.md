# GraphQL Demo
Rick and Morty GraphQL API implementation in Serverless Framework using Node.

## Requirements
* Node 12.18.2
* [yarn](https://yarnpkg.com/) 2.x+
* [Serverless CLI](https://www.serverless.com/framework/docs/getting-started/)

## Setup

1. Clone the repo
2. Install dependencies
3. Create your dotenv files
4. `yarn test` to ensure things work

### Clone dotenv files
```
cp .env.development.example .env.development
cp .env.test.example .env.test
```

### Database
We have checked in a SQLite database for your convenience. If you don't have SQLite installed locally, please follow the guidelines for your system to install it.

## Useful Commands
`yarn console`
Launches an interactive repl for testing your code.

`yarn db:seed`
Rebuilds the SQLite database using the source API.

`yarn lint`
Project configured `eslint` command. Accepts all CLI options from eslint. Must specify file to act upon.

`yarn lint:ci`
Runs linting against entire project in error-only mode.

`yarn lint:errors`
Runs linting in error-only mode. Must specify file to act upon.

`yarn test`
Runs jest test suite. All jest CLI options are available.

`yarn test:ci`
Runs full jest test suite in CI mode. All tests are run sequentially.

`yarn test:debug`
Run tests in debuggable mode for your editor.
