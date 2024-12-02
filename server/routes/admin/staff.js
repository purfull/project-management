const express = require('express')
const router = express.Router();



const staffregistrationController = require('../../controller/staff/registration');


/**
* @swagger
* /admin/staff/register-user:
*   post:
*     summary: Create staff details in the database
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_name:
*                 type: string
*                 example: "john_doe"
*               password:
*                 type: string
*                 example: "password123"
*               email:
*                 type: string
*                 example: "john.doe@example.com"
*               phone_number:
*                 type: string
*                 example: "+1234567890"
*               user_role:
*                 type: string
*                 example: "admin"
*               staff_name:
*                 type: string
*                 example: "John Doe"
*               staff_phone:
*                 type: string
*                 example: "+0987654321"
*               staff_email:
*                 type: string
*                 example: "staff.john.doe@example.com"
*               profile_pic:
*                 type: string
*                 example: "profile_pic_url"
*               address:
*                 type: string
*                 example: "123 Main St"
*               city:
*                 type: string
*                 example: "New York"
*               state:
*                 type: string
*                 example: "NY"
*               postal_code:
*                 type: string
*                 example: "10001"
*               country:
*                 type: string
*                 example: "USA"
*     responses:
*       201:
*         description: Staff created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Staff created successfully"
*       400:
*         description: Bad Request (if required fields are missing)
*       500:
*         description: Internal Server Error
*/
router.post('/register-user',staffregistrationController.verifystaffttoken, staffregistrationController.createStaff);  // Create staff details



/**
 * @swagger
 * /admin/staff/register-updateuser:
 *   put:
 *     summary: Update staff details in the database
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
 *               user_name:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "new_password123"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               user_role:
 *                 type: string
 *                 example: "admin"
 *               staff_name:
 *                 type: string
 *                 example: "John Doe"
 *               staff_phone:
 *                 type: string
 *                 example: "+0987654321"
 *               staff_email:
 *                 type: string
 *                 example: "staff.john.doe@example.com"
 *               profile_pic:
 *                 type: string
 *                 example: "profile_pic_url"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *               postal_code:
 *                 type: string
 *                 example: "10001"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff updated successfully"
 *       400:
 *         description: Bad Request (if required fields are missing)
 *       500:
 *         description: Internal Server Error
 */
router.put('/update-user',staffregistrationController.verifystaffttoken, staffregistrationController.updateStaff);  // update staff


/**
 * @swagger
 * /admin/staff/register-deleteUser:
 *   delete:
 *     summary: Mark staff record as inactive (soft delete) in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Successfully marked record as inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record marked as inactive"
 *                 result:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Record not found (staff ID does not exist)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record not found"
 *       500:
 *         description: Internal server error (e.g., database issues)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error occurred: [error message]"
 */
router.delete('/delete-user',staffregistrationController.verifystaffttoken ,staffregistrationController.deleteStaff);  // Delete staff (soft delete)



/**
 * @swagger
 * /admin/staff/register-getStaffdata/{id}:
 *   get:
 *     summary: Get staff details by ID from the database
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the staff to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved staff details
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
 *                     user_name:
 *                       type: string
 *                       example: "john_doe"
 *                     password:
 *                       type: string
 *                       example: "decrypted_password"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "+1234567890"
 *                     admin_role:
 *                       type: string
 *                       example: "admin"
 *                     staff_name:
 *                       type: string
 *                       example: "John Doe"
 *                     staff_phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     staff_email:
 *                       type: string
 *                       example: "john.doe@company.com"
 *                     profile_pic:
 *                       type: string
 *                       example: "https://example.com/profile_pic.jpg"
 *                     address:
 *                       type: string
 *                       example: "123 Main Street"
 *                     city:
 *                       type: string
 *                       example: "Metropolis"
 *                     state:
 *                       type: string
 *                       example: "Central State"
 *                     postal_code:
 *                       type: string
 *                       example: "12345"
 *                     country:
 *                       type: string
 *                       example: "Countryland"
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve staff details"
 */
router.get('/getstaff-data/:id',staffregistrationController.verifystaffttoken, staffregistrationController.getStaffById); // Get staff using ID





/**
 * @swagger

 *
 * /admin/staff/register-stafflogin:
 *   post:
 *     tags:
 *     
 *     summary: Authenticate staff login
 *     description: Verifies staff credentials (username and password) and returns a JWT token if authentication is successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Staff username.
 *                 example: "staff123"
 *               password:
 *                 type: string
 *                 description: Staff password.
 *                 example: "staffPassword123"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       example: "staff123"
 *                     accestoken:
 *                       type: string
 *                       description: JWT token for authentication.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Access denied due to incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied: Incorrect password"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error while processing login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */


router.post('/stafflogin',staffregistrationController.Stafflogin)//staff logirouter




module.exports = router;
