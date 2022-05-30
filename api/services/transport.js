const nodemailer=require('nodemailer');
module.exports= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "eman.iron2022@gmail.com", 
        pass: "Emaniron2022@", 
    },
  });