const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const taskregistrationController = require('../../controller/task/registration');
const tokens = require('../../controller/staff/registration')



const fs = require('fs');
const directories = ['taskmanagement', 'taskmanagement/img', 'taskmanagement/files'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});



//multe rfile upload 
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const baseDir = 'taskmanagement';
    let folder = 'files'; 

    if (file.mimetype.startsWith('image/')) {
      folder = 'img';
    }

    const finalDir = path.join(baseDir, folder);

    cb(null, finalDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});


const upload = multer({ storage: storage });


router.post('/uploads', upload.array('file',10), (req, res) => {

  console.log("worked!!!!!!");

  res.json({message: "File uploaded successfully!",fileDetails: req.files});

});//ending file uload

/**
 * @swagger
 * tags:
 *   - name: Task Management
 *
 * /admin/task/task:
 *   post:
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token
 *     tags:
 *       - Task Management
 *     summary: Create a new task
 *     description: Creates a new task and assigns it to a specified user with all necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 101
 *               assinged_by:
 *                 type: integer
 *                 example: 1
 *               assigned_to:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 example: "Pending"
 *               remarks:
 *                 type: string
 *                 example: "Review this task soon"
 *               subject:
 *                 type: string
 *                 example: "Project Update"
 *               task_content:
 *                 type: string
 *                 example: "Content detailing the specific requirements for the project update."
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "https://example.com/attachment1.jpg"
 *     responses:
 *       200:
 *         description: Successfully created or assigned the task
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
 *                       example: 101
 *                     assinged_by:
 *                       type: integer
 *                       example: 1
 *                     assigned_to:
 *                       type: integer
 *                       example: 2
 *                     status:
 *                       type: string
 *                       example: "Pending"
 *                     remarks:
 *                       type: string
 *                       example: "Review this task soon"
 *                     subject:
 *                       type: string
 *                       example: "Project Update"
 *                     task_content:
 *                       type: string
 *                       example: "Content detailing the specific requirements for the project update."
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/attachment1.jpg"
 *                 message:
 *                   type: string
 *                   example: "Task created or assigned successfully"
 *       500:
 *         description: Internal server error while creating or assigning the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create or assign task"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.post('/task',tokens.verifystaffttoken,taskregistrationController.createTask);







/**
 * @swagger
 * tags:
 *   - name: Task Management
 *     description: Endpoints for managing tasks
 *
 * /admin/task/update-task:
 *   put:
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token
 *     tags:
 *       - Task Management
 *     summary: Update an existing task
 *     description: Updates the status and remarks of an existing task using its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 101
 *               status:
 *                 type: string
 *                 example: "Completed"
 *               remarks:
 *                 type: string
 *                 example: "Task has been completed successfully"
 *     responses:
 *       200:
 *         description: Successfully updated the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     affectedRows:
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: "Task update completed"
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error while updating the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update task"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */



router.put('/update-task',tokens.verifystaffttoken,taskregistrationController.updateTask)

module.exports = router;
