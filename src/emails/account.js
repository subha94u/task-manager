const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'subha94u@yahoo.co.in',
        subject: 'Thanks for joining the course!',
        text: `Welcome ${name} This email is sending via Node.js for learning purpose`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'subha94u@yahoo.co.in',
        subject: 'Good bye! Your account is cancelled',
        text: `Hi ${name}! why you cancelled the email`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

