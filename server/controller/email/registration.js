
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const router = require('../../routes/admin/staff');

router.use(bodyParser.json());


module.exports = {

    sendmail: async (req, res) => {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: 'gmail',
            auth: {
                user: "suthanmsd07@gmail.com",
                pass: process.env.APP_PASSWORD
            }
        });


        const mailOptions = {
            from: 'suthanmsd07@gmail.com',
            to: ["suthanrsury610@gmail.com", "rchilli348@gmail.com","sanjaysaravanakumar31@gmail.com"],
            subject: "hello our workers this updated dec 11 works   ",
            html: "<h1>This is important msg from Our Postman I Updated App_password i put env file to this </h1> ",
            text: "intersted people DM for me "
        }
        try {
            const data = await transporter.sendMail(mailOptions)
            console.log("Mail sent successfully");
            res.status(200).json({ data, message: "Mail sended successfully" });
        } catch (err) {
            console.error("Error sending mail:", err);
            res.status(500).json({ message: "Error sending mail", err });

        }
    }

}
