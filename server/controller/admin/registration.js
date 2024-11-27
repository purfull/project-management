const Admin = require("../../models/User/AdminUser");


const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

//libraraies for encrypt and decrypt
const crypto = require('crypto');
const { Buffer } = require('buffer');
const { decode } = require("punycode");
const { where } = require("sequelize");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '1fdf1ebbdac54ece8b28360ea84e9d15a82b5fff14197d36ce42ecdaa29d361b';
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || '7d51aeeb7de5bfd0d37507aa1361eff7';

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





module.exports={

    encryptPassword,
    decryptPassword,
    // strating admin user 
    //get admin 

    adminlogin: async (req, res) => {

        const {user_name,password} = req.body

        try {
            const adminRecord = await Admin.findOne({ where: { user_name } });

            if (!adminRecord) {
                return res.status(404).json({ message: "admin not found" });

            }
            
            const pass = decryptPassword(adminRecord.password);

            if (pass != password) {
                return res.status(401).json({ message: "Access denied: Incorrectttt password" });    
            }

            const token = jwt.sign(
                {
                    id: adminRecord.id,
                    user_name: adminRecord.user_name,
                },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "8h" } // Token expreid when this time has finshed 
            );
            res.status(200).json({
                message: "Login successful",
                data: {
                    user_name: adminRecord.user_name,
                    token,
                },
            });

        }
        catch (error) {
            console.error("Error during admin login:", error);
            res.status(500).json({ message: "Server error" });
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
            const adminResult = await Admin.update({
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
            const admindeleteresult = await Admin.update(
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

