frontend part
======

built on angular-seed project

## notes

the upload and list components could/should be extracted as real components

## Install

`npm install`
not required, starting or testing will inherently call it as well

## Getting started, running

`npm start`
will serve on localhost:8080
remember to start the server (backend) part first

open `http://localhost:8080` in your browser

### Endpoint

default target endpoint is `localhost:8000`
to change endpoint go to `app/repository/archiveRepository.js` and edit there directly. No better configuration implemented atm

## Testing

I only implemented unit tests.

`npm run test-single-run`
to run the tests once

`npm test`
will start continuous testing for TDD

note: testing will require and open a browser as per default, though it's not needed for just running the tests
