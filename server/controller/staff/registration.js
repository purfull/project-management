
const Staff = require("../../models/User/StaffUser");


const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

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


module.exports = { 

    encryptPassword,
    decryptPassword,
    jwt,
    crypto,
    ENCRYPTION_KEY,
    ENCRYPTION_IV ,


    Stafflogin: async (req, res) => {

        const { user_name ,password} = req.body;
    
        try {
            const userRecord = await Staff.findOne({ where: { user_name } });
    
            if (!userRecord) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            
            const pass = decryptPassword(userRecord.password);
            // Verify the password // Use await here
                
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
                     accestoken: token
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
    // verify token

    getStaffById: async (req, res) => {
        const { id } = req.params;
    
        try {
            // Check if the user is authenticated (via middleware)
            if (!req.userRecord) {
                return res.status(403).json({ message: "No token provided, permission denied" });
            }
    
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
    
    //craete staff starting 
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
            if (!req.userRecord) {
                return res.status(403).json({ message: "No token provided, permission denied" });
            }
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

    
    },//create staff ending
    
    //update staff start
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
            if (!req.userRecord) {
                return res.status(403).json({ message: "No token provided, permission denied" });
            }
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
    },///update staff ending 


    
    //deleted staff starting
    deleteStaff: async (req, res) => {

        if(!req.userRecord){
                return res.status(403).json({message:"no token provided ra permission denind"})
        }
    
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
    
    },// delete ending staff
    

}


