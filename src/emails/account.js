const sgmail = require('@sendgrid/mail')

const sendgridAPIKey=process.env_SENDGRID_API_KEY
const slmMail = 'slm.inc.it@gmail.com'

sgmail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email , name)=>{
    sgmail.send({
        from : slmMail,
        to:email,
        subject: 'Thanks for joining our app.',
        text:`Welcome to the app , ${name} 
        , let me know how you get along with el matbakh ^^`

    })
}

module.exports = {
    sendWelcomeEmail
}