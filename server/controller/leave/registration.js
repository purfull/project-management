const Leave = require('../../models/User/LeaveDays')
const jwt = require('jsonwebtoken');

module.exports = {

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

    leavedays: async (req, res) => {

        

        const {
            id,
            staff_id,
            leave_type,
            start_date,
            end_date,
            reason
        } = req.body


        try {
            const leaveResult = await Leave.create({
                id,
                staff_id,
                leave_type,
                start_date,
                end_date,
                reason
            }

            )
            res.status(200).json({ data: leaveResult, message: "leave applied successfully " })
        } catch (error) {
            console.log("leave got rejected " + error);
            res.status(500).json({ message: "leave got rejected some reson ", error: error.message })

        }

    }



}