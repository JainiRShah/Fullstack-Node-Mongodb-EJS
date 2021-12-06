const logger = require('../loggers/logger')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

let smsSend = (name, phone) => {
    client.messages
        .create({
            body: '' + name + ' your detail is Successfully added',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+91'+phone+' ' 
        })
        .then(message => logger.info(message.sid))
        .done();
}

module.exports = {
    smsSend
};