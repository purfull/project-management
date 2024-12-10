const chat = require('../../models/User/Chatapplication')



module.exports = {

    chatapplication: async (req, res) => {

        const { id, From_staff_id, status, To_admin_id, message } = req.body
        try {

            const chatresult = await chat.create({
                id, From_staff_id, status, To_admin_id, message
            })
            res.status(200).json({ data: chatresult, message: "chat message sended successfullly" })
        } catch (error) {

            console.log("error to send message " + error);
            res.status(500).json({ message: "error to something ", error: error.message });
        }
    }

}





 