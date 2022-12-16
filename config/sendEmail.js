var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'mailtest1310@gmail.com',
      pass: '0131tsetliam'
  }
});

  module.exports=(mail,password)=>{
    transporter.sendMail({
      from: 'mailtest1310@gmail.com',
      to: mail,
      subject: 'nodejs login registration details',
      html: `<h1>Your registeration detail</h1><p>username:&nbsp;${mail}<br/>password:&nbsp;${password}</p>`
    }, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }