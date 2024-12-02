
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
                pass: "jyiw wvqg dvxo epxe"
            }
        });


        const mailOptions = {
            from: 'suthanmsd07@gmail.com',
            to: ["suthanrsury610@gmail.com", "rchilli348@gmail.com","sanjaysaravanakumar31@gmail.com"],
            subject: "hello our buddies and lets celebtare wrorking perfectluy",
            html: "<h1>we are celebration out 25 openuing </h1> ",
            text: "intersted people DM for me "
        }
        try {
            const data = await transporter.sendMail(mailOptions)
            console.log("Mail sent successfully");
            res.status(200).json({ data, message: "Mail sent successfully" });
        } catch (err) {
            console.error("Error sending mail:", err);
            res.status(500).json({ message: "Error sending mail", err });

        }
    }

}
