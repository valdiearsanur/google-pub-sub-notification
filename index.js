const dotenv = require('dotenv')
const express = require('express');
const {PubSub} = require('@google-cloud/pubsub');

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

const pubSubClient = new PubSub()
const pubSubTopicId = process.env.TOPIC_ID

const dummy_user_database = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: '1234567890'
    }
]

app.post('/registration/', async (req, res) => {
    const { name, email, password } = req.body
    const user = { name, email, password}
    dummy_user_database.push(user)

    // Publish a message to the topic
    try {
        const message = Buffer.from(JSON.stringify(user))
        const messageId = await pubSubClient
            .topic(pubSubTopicId)
            .publishMessage({
                'data': message,
                'attributes': {
                    'kind': 'registration'
                }
            });
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
    }

    res.status(201).json(user);
});

app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});
