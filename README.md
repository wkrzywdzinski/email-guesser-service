# email-guesser-service

Microservice built with [Node](http://nodejs.org/), [Express](http://expressjs.com/), using [Typescript](https://www.typescriptlang.org/)

Purpose of this service is to resolve email address basing on users full name and domain name.
First attend is done by searching for similar entry in a database (database.json).
Service will look for an entry with the same domain name and try to recreate pattern with which email for this domain are created. After email was generated email-guesser-service will additionally try to check if email exists by using
functionality proviced with [Email Verifier package](https://www.npmjs.com/package/email-verifier)
If no similar entry found service will try a few of popular email formats
(such as janedoe@domain.com, jdoe@domain.com). Each of these attempts again will be verfied by email-verifier.

## Running Locally

Install [Node](http://nodejs.org/) and [Yarn](https://yarnpkg.com/)
Run "yarn install"
Run "yarn start-dev" to start service with Nodemon or "yarn start" to start with Node

Service should run on [localhost:5000](http://localhost:5000/).

## Additional documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Verify Email Using Node](https://medium.com/whois-apihow-to-verify-an-email-address-using-node-js-449330a47a7e)
