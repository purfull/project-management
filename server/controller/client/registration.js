const Client = require("../../models/User/ClientUser");  //client

const {
    encryptPassword,
    decryptPassword,
    jwt,
    crypto,
    ENCRYPTION_KEY,
    ENCRYPTION_IV,
} = require('../staff/registration');


module.exports = {

    

    clientlogin: async (req, res) => {

        const { user_name, password } = req.body

        try {
            const clientRecord = await Client.findOne({ where: { user_name } });

            if (!clientRecord) {
                return res.status(404).json({ message: "Client not found" });

            }

            const pass = decryptPassword(clientRecord.password);

            if (pass != password) {
                return res.status(401).json({ message: "Access denied: Incorrectttt password" });
            }

            const token = jwt.sign(
                {
                    id: clientRecord.id,
                    user_name: clientRecord.user_name,
                },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "8h" } // Token expreid when this time has finshed 
            );
            res.status(200).json({
                message: "Login successful",
                data: {
                    user_name: clientRecord.user_name,
                    token,
                },
            });

        }
        catch (error) {
            console.error("Error during client login:", error);
            res.status(500).json({ message: "Server error" });
        }

    },

    //getting cleing starting 
    getClientId: async (req, res) => {
        const { id } = req.params;

        try {
            if (!req.userRecord) {
                return res.status(403).json({ message: "no token provided ra permission denind" })
            }
            const clientRecord = await Client.findOne({ where: { id } });

            if (clientRecord) {

                const decryptedPassword = decryptPassword(clientRecord.password);


                res.status(200).json({
                    data: {
                        company_name: clientRecord.company_name,
                        cp_name: clientRecord.cp_name,
                        user_name: clientRecord.user_name,
                        password: decryptedPassword,
                        cp_phone: clientRecord.cp_phone,
                        cp_email: clientRecord.cp_email,
                        company_phone: clientRecord.company_phone,
                        company_email: clientRecord.company_email,
                        company_logo: clientRecord.company_logo,
                        address: clientRecord.address,
                        city: clientRecord.city,
                        state: clientRecord.state,
                        postal_code: clientRecord.postal_code,
                        country: clientRecord.country,
                    }
                });
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Failed to retrieve client details" });
        }
    },//ending get client


    //starting create client 

    createclient: async (req, res) => {
        const {
            company_name,
            cp_name,
            user_name,
            password,
            cp_phone,
            cp_email,
            company_phone,
            company_email,
            company_logo,
            address,
            city,
            state,
            postal_code,
            country,


        } = req.body;

        try {
            if (!req.userRecord) {
                return res.status(403).json({ message: "no token provided ra permission denind" })
            }
            const encryptedPassword = encryptPassword(password);
            const newclient = await Client.create({
                company_name,
                cp_name,
                user_name,
                password: encryptedPassword,
                cp_phone,
                cp_email,
                company_phone,
                company_email,
                company_logo,
                address,
                city,
                state,
                postal_code,
                country,
            })
            res.status(201).json({ data: newclient, message: "clientuser account created successfully" })
        }
        catch (error) {
            console.error("Error creating newclient:", error);
            res.status(500).json({ message: "Failed to create clientuser" });
        }

    },//ending create client


    // update clent start 
    updateClient: async (req, res) => {
        const {
            id,
            company_name,
            cp_name,
            user_name,
            password,
            cp_phone,
            cp_email,
            company_phone,
            company_email,
            company_logo,
            address,
            city,
            state,
            postal_code,
            country,

        } = req.body

        try {
            if (!req.userRecord) {
                return res.status(403).json({ message: "no token provided ra permission denind" })
            }
            const encryptedPassword = encryptPassword(password);
            const clientResult = await Client.update({
                id,
                company_name,
                cp_name,
                user_name,
                password: encryptedPassword,
                cp_phone,
                cp_email,
                company_phone,
                company_email,
                company_logo,
                address,
                city,
                state,
                postal_code,
                country,
            },
                {
                    where: { id }
                });
            res.status(201).json({ data: clientResult.recordSet, message: "client updated successfully" });
        }
        catch (error) {
            console.error("Error to client update:", error);
            res.status(500).json({ message: "Failed to update client" });
        }
    },
    //ending updateclient 

    //deleteclient  
    deleteClient: async (req, res) => {
        const { id } = req.body

        try {
            if (!req.userRecord) {
                return res.status(403).json({ message: "no token provided ra permission denind" })
            }
            const deleteresult = await Client.update(
                { isActive: false },
                { where: { id } }
            )
            if (deleteresult[0] == 0) {

                return res.status(404).json({ message: 'Record not found' });
            }

            res.status(200).json({ message: 'Record marked as inactive', deleteresult: deleteresult[true] });
        } catch (error) {
            res.status(500).json({ message: "Error occurred:" + error.message });

        }
    },
    //ending client delete staff


}

















































































