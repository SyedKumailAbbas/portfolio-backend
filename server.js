const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" })
    console.log("hello server started")
});

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_APP_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
})

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to send");
    }
})

app.post('/contact', bodyParser.urlencoded({extended:false}),(req,res)=>{
    console.log("contact api")
    res.send("hello contact")
const name = req.body.firstName + req.body.lastName;
const email = req.body.email;
const message = req.body.message;
const phone = req.body.phone;
    const mail = {
        from: name,
        to:process.env.GMAIL_APP_EMAIL,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`,
      };
        contactEmail.sendMail(mail, (error)=>{
            if(error){
                res.json({status: 'message failed to send'})
            }
            else{
                res.json({status: 'message sent'})
            }
        }
        )
})


// const sendContactFormEmail = async (req, res) => {
//     const name = req.body.firstName + req.body.lastName;
//     const email = req.body.email;
//     const message = req.body.message;
//     const phone = req.body.phone;



//     const mailOptions = {
//         from: process.env.GMAIL_APP_EMAIL,
//         to: 'syedkumailabbas46@gmail.com',
//         subject: subject,
//         text: `<p>Name: ${name}</p>
//         <p>Email: ${email}</p>
//         <p>Phone: ${phone}</p>
//         <p>Message: ${message}</p>`,
//         // This is the new line
//         replyTo: email
//     };

//     await contactEmail.sendMail(mailOptions);

//     res.send({
//         success: true,
//         message: 'Your email has been sent.'
//     });
// };

// app.post('/contact', ()=>{
//     sendContactFormEmail;
//     console.log("hello email send")

// });

app.listen(PORT, () => {
    console.log(`Server is online on port : ${PORT}`)
})