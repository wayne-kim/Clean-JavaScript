const nodemailer = require('nodemailer');

class ErrorEmail {
  constructor(err){
    this.init();
    this.sendMail(err);
  }

  init(email){
    if(ErrorEmail === null) throw Error("이메일 정보가 없습니다.");
  }

  sendMail(err){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'test@gmail.com',
        pass: 'test'
      }
    });
  
    var mailOptions = {
      from: 'test <test@gmail.com>',
      to: "sumel014@naver.com",
      subject: '에러 발생',
      text: err.toString()
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({result : "인증코드 못 보냄"});
      } else {
        console.log('Email sent: ' + info.response);
        res.json({result : "인증코드 보냄"});
      }
    });
  }
}
ErrorEmail.email = null;
ErrorEmail.password = null;

//Test
try {
  throw Error("에러 발생")
}catch(e){
  new ErrorEmail(e)
}
