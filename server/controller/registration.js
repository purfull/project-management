
const { where } = require("../db");

// updates staff
const Staff = require("../models/User/StaffUser");
// updatecleint
const Client = require("../models/User/ClientUser");
const ClientUpdate = require('../models/User/ClientUser');
const Clientdelete = require('../models/User/ClientUser');
// const loginclient = require('../models/User/ClientUser')

//update admin
const Admin = require("../models/User/AdminUser");
const adminUpdate = require('../models/User/AdminUser');
const admindelete = require("../models//User/AdminUser");

const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

//libraraies for encrypt and decrypt
const crypto = require('crypto');
const { Buffer } = require('buffer');
const { decode } = require("punycode");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '1fdf1ebbdac54ece8b28360ea84e9d15a82b5fff14197d36ce42ecdaa29d361b';
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || '7d51aeeb7de5bfd0d37507aa1361eff7';



//function for  encyrpt password


function encryptPassword(password) {
    if (!ENCRYPTION_KEY || Buffer.from(ENCRYPTION_KEY, 'hex').length !== 32) {
        throw new Error('Invalid ENCRYPTION_KEY: Must be 32 bytes (64 hex characters)');
    }
    if (!ENCRYPTION_IV || Buffer.from(ENCRYPTION_IV, 'hex').length !== 16) {
        throw new Error('Invalid ENCRYPTION_IV: Must be 16 bytes (32 hex characters)');
    }

    const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex'); // Interpret as hex
    const ivBuffer = Buffer.from(ENCRYPTION_IV, 'hex');   // Interpret as hex

    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

//function for  decyrpt password
function decryptPassword(encryptedPassword) {
    if (!ENCRYPTION_KEY || Buffer.from(ENCRYPTION_KEY, 'hex').length !== 32) {
        throw new Error('Invalid ENCRYPTION_KEY: Must be 32 bytes (64 hex characters)');
    }
    if (!ENCRYPTION_IV || Buffer.from(ENCRYPTION_IV, 'hex').length !== 16) {
        throw new Error('Invalid ENCRYPTION_IV: Must be 16 bytes (32 hex characters)');
    }

    const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
    const ivBuffer = Buffer.from(ENCRYPTION_IV, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}




    encryptPassword, /// encrypt all routes user ,cleint, admin
    decryptPassword, //  decrpt all routes user ,cleint, admin

  //login stafff
    Stafflogin: async (req, res) => {
        const { user_name, password } = req.body;
    
        try {
            const userRecord = await Staff.findOne({ where: { user_name } });
    
            if (!userRecord) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log('Password from request:', password);
            console.log('Password from DB:', userRecord.password);
            
            const pass = decryptPassword(userRecord.password)
            // Verify the password // Use await here
    
            console.log(pass);
            
            if (pass != password) {
                
                return res.status(401).json({ message: "Access denied: Incorrect password" });
            }
    
            // JWT token 
            const token = jwt.sign(
                { id: userRecord.id, user_name: userRecord.user_name }, // Payload for jwt
                process.env.ACCESS_SECRET_KEY, 
                { expiresIn: '8h' }
            );
    
            res.status(200).json({
                message: 'Login successful',
                data: {
                    user_name: userRecord.user_name,
                    token
                },
            });
        } catch (error) {
            console.error("Error finding user:", error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    
    verifystaffttoken: async (req, res, next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            return res.status(500).json({ message: 'No token' });
        }
    
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
    
            req.userRecord = decoded;
            next();
        });
    },
    //verify token



    getStaffById: async (req, res) => {
        const { id } = req.params;

        try {
            // Fetch the staff record using Sequelize's findOne method
            const staff = await Staff.findOne({
                where: { id }
            });

            if (staff) {
                const decryptedPassword = decryptPassword(staff.password);

                res.status(200).json({
                    data: {
                        id: staff.id,
                        user_name: staff.user_name,
                        password: decryptedPassword,
                        email: staff.email,
                        phone_number: staff.phone_number,
                        admin_role: staff.admin_role,
                        staff_name: staff.staff_name,
                        staff_phone: staff.staff_phone,
                        staff_email: staff.staff_email,
                        profile_pic: staff.profile_pic,
                        address: staff.address,
                        city: staff.city,
                        state: staff.state,
                        postal_code: staff.postal_code,
                        country: staff.country,
                    }
                });
            } else {
                res.status(404).json({ message: 'Staff not found' });
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Failed to retrieve staff details" });
        }
    },

    // end get staff

    createStaff: async (req, res) => {
        const {
            user_name,
            password,
            email,
            phone_number,
            user_role,
            staff_name,
            staff_phone,
            staff_email,
            profile_pic,
            address,
            city,
            state,
            postal_code,
            country
        } = req.body;

        try {
            // Encrypt the password
            const encryptedPassword = encryptPassword(password);

            // Create the staff record
            const newstaff = await Staff.create({
                user_name,
                password: encryptedPassword,
                email,
                phone_number,
                user_role,
                staff_name,
                staff_phone,
                staff_email,
                profile_pic,
                address,
                city,
                state,
                postal_code,
                country
            });

            res.status(201).json({ data: newstaff, message: "Staff created successfully" });
        } catch (error) {
            console.error("Error creating staff:", error.message);
            res.status(500).json({ message: "Failed to create staff", error: error.message });
        }

    },
    //ending craete staff


    // this is update for staffuser
    updateStaff: async (req, res) => {
        const {
            id,
            user_name,
            password,
            email,
            phone_number,
            user_role,
            staff_name,
            staff_phone,
            staff_email,
            profile_pic,
            address,
            city,
            state,
            postal_code,
            country
        } = req.body;

        try {
            const encryptedPassword = encryptPassword(password);

            const updateStaff = await Staff.update({
                id,
                user_name,
                password: encryptedPassword,
                email,
                phone_number,
                user_role,
                staff_name,
                staff_phone,
                staff_email,
                profile_pic,
                address,
                city,
                state,
                postal_code,
                country
            },
                {
                    where: { id }
                });


            res.status(201).json({ data: updateStaff.recordSet, message: "staff updated successfully" });
        } catch (error) {
            console.error("Error to staff update:", error);
            res.status(500).json({ message: "Failed to update staff" });
        }
    },
    // update ending for staff user


    // delete staff starting 

    deleteStaff: async (req, res) => {

        const { id } = req.body

        try {

            const result = await Staff.update(

                { isActive: false },
                { where: { id } }
            )

            if (result[0] == 0) {

                return res.status(404).json({ message: 'Record not found' });
            }

            res.status(200).json({ message: 'Record marked as inactive', result: result[true] });
        }



        catch (error) {
            res.status(500).json({ message: 'Error occurred: ' + err.message });

        }

    },

    // delete staff ending 


    // staring cleint user
    //get client 


    // clientLogin : async (req, res) => {
    //     const { user_name, password } = req.body;
    
    //     try {
    //         // Find the client record in the database
    //         const userRecord = await loginclient.findOne({ where: { user_name } });
    
    //         if (!userRecord) {
    //             return res.status(404).json({ message: "Client not found" });
    //         }
    
    //         const isMatch = await bcrypt.compare(password, userRecord.password);
    //         if (!isMatch) {
    //             return res.status(401).json({ message: "Access denied: Incorrect password" });
    //         }
    
    //         // Generate JWT token
    //         const token = jwt.sign(
    //             {
    //                 id: userRecord.id,
    //                 user_name: userRecord.user_name,
    //             },
    //             process.env.ACCESS_SECRET_KEY, 
    //             { expiresIn: "8h" } // Token expiration
    //         );
    
    //         // Respond with success
    //         res.status(200).json({
    //             message: "Login successful",
    //             data: {
    //                 user_name: userRecord.user_name,
    //                 token,
    //             },
    //         });
    //     } catch (error) {
    //         console.error("Error during client login:", error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // },


    



    getClientId: async (req, res) => {
        const { id } = req.params;

        try {
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
    },
    //end client 
    //create client for client route 
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

    },
    //enidng creaete cliet route

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
            const encryptedPassword = encryptPassword(password);
            const clientResult = await ClientUpdate.update({
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
            const deleteresult = await Clientdelete.update(
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


    // strating admin user 
    //get admin 
    getAdminId: async (req, res) => {
        const { id } = req.params;

        try {
            const adminRecord = await Admin.findOne({ where: { id } });

            if (adminRecord) {
                const decryptedPassword = decryptPassword(adminRecord.password);

                res.status(200).json({
                    data: {
                        user_name: adminRecord.user_name,
                        password: decryptedPassword,
                        email: adminRecord.email,
                        phone_number: adminRecord.phone_number,
                        admin_role: adminRecord.admin_role,
                    }
                });
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Failed to retrieve admin details" });
        }
    },//end admin

    // create admin 
    createadmin: async (req, res) => {

        const {
            user_name,
            password,
            email,
            phone_number,
            admin_role,


        } = req.body;

        try {
            const encryptedPassword = encryptPassword(password);
            const newadmin = await Admin.create({

                user_name,
                password: encryptedPassword,
                email,
                phone_number,
                admin_role,

            })
            res.status(201).json({ data: newadmin, message: "admin account created successfully" })
        }
        catch (error) {
            console.error("Error creating newadmin:", error);
            res.status(500).json({ message: "Failed to create AdminUser" });
        }
    },
    //end create admin


    //update admin
    updateAdmin: async (req, res) => {

        const { id } = req.body
        const {
            user_name,
            password,
            email,
            phone_number,
            admin_role,

        } = req.body

        try {
            const encryptedPassword = encryptPassword(password); //enctypted password
            const adminResult = await adminUpdate.update({
                user_name,
                password: encryptedPassword,
                email,
                phone_number,
                admin_role,
            },
                {
                    where: { id }
                });
            res.status(201).json({ data: adminResult.recordSet, message: "admin updated successfully" });
        } catch (error) {
            console.error("Error to admin update:", error);
            res.status(500).json({ message: "Failed to update admin" });
        }
    },
    ////end admin delete 


    //start  delete admin api 
    deleteAdmin: async (req, res) => {
        const { id } = req.body

        try {
            const admindeleteresult = await admindelete.update(
                { isActive: false },
                { where: { id } }
            )
            if (admindeleteresult[0] == 0) {

                return res.status(404).json({ message: 'Record not found' });
            }

            res.status(200).json({ message: 'Record marked as inactive', admindeleteresult: admindeleteresult[true] });
        } catch (error) {
            res.status(500).json({ message: "Error occurred:" + error.message });

        }
    }
    //end delete admin



}





