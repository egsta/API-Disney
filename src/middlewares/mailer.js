const nodemailer = require('nodemailer');
  
require('dotenv').config( );

const sendMail=(mailTo, token)=>{
let mailTransporter = nodemailer.createTransport({
    
    host: process.env.HOST,
    port: process.env.PORT_SMTP,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
  
let mailDetails = {
    from: process.env.USER,
    to: mailTo,
    subject: 'Test mail',
    text: 'haga click para validar usuario ' + token
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs', err);
    } else {
        console.log('Email sent successfully', data);
    }
});
}

module.exports = sendMail;