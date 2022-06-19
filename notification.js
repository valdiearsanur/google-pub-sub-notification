const dotenv = require('dotenv')
const {PubSub} = require('@google-cloud/pubsub')

dotenv.config()

const pubSubClient = new PubSub()
const subscriptionId = process.env.SUBSCRIPTION_ID
const subscription = pubSubClient.subscription(subscriptionId)
const timeout = 120

function listenForMessages() {
    let messageCount = 0
    const messageHandler = message => {
        console.log(`New message ${message.id}:`)
        console.log(`\tData: ${message.data}`)
        console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`)
        messageCount += 1

        message.ack()
    }

    subscription.on('message', messageHandler)

    setTimeout(() => {
        subscription.removeListener('message', messageHandler)
        console.log(`${messageCount} message(s) received.`)
    }, timeout * 1000)
}

listenForMessages()