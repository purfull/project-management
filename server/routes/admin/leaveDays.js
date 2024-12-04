const express = require('express')

const router = express.Router()


const leaveregistrationController = require('../../controller/leave/registration');
const tokens = require('../../controller/staff/registration')



/**
 * @swagger
 * tags:
 *   - name: Leave Management
 *     description: Endpoints for managing staff leave applications
 *
 * /admin/leave/leave:
 *   post:
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token
 *     tags:
 *       - Leave Management
 *     summary: Apply for staff leave
 *     description: Records a leave application for a staff member, including leave type, start and end dates, and reason.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               staff_id:
 *                 type: integer
 *                 example: 101
 *               leave_type:
 *                 type: string
 *                 example: "Sick Leave"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-04"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-07"
 *               reason:
 *                 type: string
 *                 example: "Recovering from illness"
 *     responses:
 *       200:
 *         description: Successfully applied for leave
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     staff_id:
 *                       type: integer
 *                       example: 101
 *                     leave_type:
 *                       type: string
 *                       example: "Sick Leave"
 *                     start_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-04"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-07"
 *                     reason:
 *                       type: string
 *                       example: "Recovering from illness"
 *                 message:
 *                   type: string
 *                   example: "Leave applied successfully"
 *       500:
 *         description: Internal server error while applying for leave
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Leave got rejected due to some reason"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

router.post('/leave',tokens.verifystaffttoken,leaveregistrationController.leavedays);



module.exports= router;