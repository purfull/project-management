const express = require('express');
const router = express.Router();



const performanceregiscontroller = require("../../controller/performance/registration");

const tokens = require('../../controller/staff/registration')

/**
 * @swagger
 * tags:
 *   - name: Performance Tracker
 *     description: Endpoints for tracking and analyzing staff performance
 *
 * /admin/performance/performance:
 *   post:
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token
 *     tags:
 *       - Performance Tracker
 *     summary: Create and analyze staff performance
 *     description: Records performance data including task assigned time, task starting time, task end time, and deadline for a given staff.
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
 *               task_assigned_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-04T10:30:00Z"
 *               task_starting_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-04T11:00:00Z"
 *               task_end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-04T15:00:00Z"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-05T10:30:00Z"
 *     responses:
 *       200:
 *         description: Successfully created and analyzed performance data
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
 *                     task_assigned_time:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T10:30:00Z"
 *                     task_starting_time:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T11:00:00Z"
 *                     task_end_time:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T15:00:00Z"
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-05T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Performance analyzed successfully"
 *       500:
 *         description: Internal server error while creating performance data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create performance"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */



router.post('/performance',tokens.verifystaffttoken, performanceregiscontroller.performancetracker)


module.exports= router