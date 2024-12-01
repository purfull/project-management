const performance = require('../../models/User/Performance')

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

    performancetracker: async (req, res) => {
        const {

            id,
            staff_id,
            task_assigned_time,
            task_starting_time,
            task_end_time,
            deadline

        } = req.body

        try {
            const performanceresult = await performance.create({
                id,
                staff_id,
                task_assigned_time,
                task_starting_time,
                task_end_time,
                deadline
            });
            res.status(200).json({ data: performanceresult, message: "performance analyzed successfully " })
        } catch (error) {
            console.log("failed to create andanalayzed perfomace" + error);
            res.status(500).json({ message: "failed to create performance", error: error.message });
        }
    }
    
}