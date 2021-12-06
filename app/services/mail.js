const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,//true
    port: 25,//465
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }, tls: {
        rejectUnauthorized: false
    }
});

const mailSend = (email, name) => {
    let mailOption = {
        to: email,
        subject: "User Details",
        text: ' ' + name + ' your detail is Successfully added', // Plain text body
    }

    let mailSending = transport.sendMail(mailOption, function (error, res) {
        if (error) throw error;

            logger.info("email has been sent");
        
    })
    return mailSending;
};

const OTPsend = (email, otp) => {
    let mailDetail = {
        to: email,
        subject: "OTP for new Password",
        html: "<h3>OTP for new password is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
    }

    let mailSending = transport.sendMail(mailDetail, function (error, res) {
        if (error) throw error;

         logger.info("email has been sent");
        
    })
    return mailSending;
};
module.exports = {
    mailSend, OTPsend
};