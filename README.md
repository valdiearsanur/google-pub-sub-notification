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

1. In cloud shell, clone this repository

1. Then, create instance using script below. The instance creation will require startup script located in this repository.

```
cd google-pub-sub-notification
gcloud compute instances create node-instance \
    --machine-type=e2-micro \
    --preemptible \
    --boot-disk-size=10GB \
    --boot-disk-type=pd-standard \
    --zone us-central1-f \
    --scopes userinfo-email,cloud-platform \
    --metadata-from-file startup-script=compute-engine-script.sh
```

1. App will be running on port 3000. We need to setup a firewall rule in order to allow traffic from the port 3000

```
gcloud compute firewall-rules create default-allow-http-3000 \
    --allow tcp:3000 \
    --source-ranges 0.0.0.0/0 \
    --target-tags http-server \
    --description "Allow port 3000 access to http-server"
```

1. Make a request by using curl.

```
curl -i POST http://<VM-EXTERNAL-IP>:3000/registration/ \
    -H 'Content-Type: application/json' \
    -d '{"name":"john1","email":"john1@example.com", "password":"1234"}'
```


See Reference : https://cloud.google.com/nodejs/getting-started/getting-started-on-compute-engine
