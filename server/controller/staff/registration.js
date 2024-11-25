
const Staff = require("../models/User/StaffUser");


module.exports = { 

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
}