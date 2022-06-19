# Google Pub/Sub implementation in node.js
---
## Prerequisites

### Node >= 12.0

If this is your fist development. I encourage you to use NVM by following the steps on https://github.com/nvm-sh/nvm.


## Frameworks & 3rd party libraries

|No| Name | Version | Description |
|--|--|--|--|
|1.| [**Express.js**](https://github.com/expressjs/express) | `4.18.1` | Primary Back End framework. |
|2.| [**@google-cloud/pubsub**](https://github.com/googleapis/nodejs-pubsub) | `3.0.1` | Google Cloud Pub/Sub Node.js Client. |
|3.| [**dotenv**](https://github.com/motdotla/dotenv) | `16.0.1` | For storing .env environment variables. |


## Development Guideline

1. Clone this repository.

1. Install the dependencies `npm install`

1. Store environment variables in `.env` (see `sample.env` as example)

1. Run the application `npm run start`


## Deployment Guideline on Compute Engine

See Reference : https://medium.com/@mvaldiearsanur/publish-and-receive-google-pub-sub-message-in-node-js-a34504db2844
