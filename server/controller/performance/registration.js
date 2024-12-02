const performance = require('../../models/User/Performance')

const jwt = require('jsonwebtoken');


module.exports = {
    
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