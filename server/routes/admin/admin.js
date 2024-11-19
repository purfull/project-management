const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');

/**
 * @swagger
 * tags:
 *   - name: Admin Management
 *     description: Endpoints for managing admin accounts
 *
 * /admin/admin/register-admin:
 *   post:
 *     tags:
 *       - Admin Management
 *     summary: Create a new admin account
 *     description: This endpoint allows for creating a new admin account by providing the necessary admin details like user name, email, phone number, and admin role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "admin_user"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               admin_role:
 *                 type: string
 *                 example: "super_admin"
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin account created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       example: "admin_user"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "+1234567890"
 *                     admin_role:
 *                       type: string
 *                       example: "super_admin"
 *       400:
 *         description: Bad Request (if required fields are missing or incorrect)
 *       500:
 *         description: Internal Server Error (if creation fails)
 */
router.post('/register-admin', registrationController.createadmin)//create admin 

/**
 * @swagger
 * /admin/admin/register-updateadmin:
 *   put:
 *     tags:
 *       - Admin Management
 *     summary: Update an existing admin account
 *     description: This endpoint allows you to update the details of an existing admin account, such as the user name, email, phone number, and admin role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the admin to be updated
 *                 example: 1
 *               user_name:
 *                 type: string
 *                 description: Updated admin username
 *                 example: "admin_updated_user"
 *               password:
 *                 type: string
 *                 description: New encrypted password
 *                 example: "newpassword123"
 *               email:
 *                 type: string
 *                 description: Updated admin email
 *                 example: "admin_updated@example.com"
 *               phone_number:
 *                 type: string
 *                 description: Updated phone number
 *                 example: "+1234567891"
 *               admin_role:
 *                 type: string
 *                 description: Updated role of the admin
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Admin account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       example: "admin_updated_user"
 *                     email:
 *                       type: string
 *                       example: "admin_updated@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "+1234567891"
 *                     admin_role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Bad Request (if required fields are missing or incorrect)
 *       404:
 *         description: Admin not found (if no admin exists with the given ID)
 *       500:
 *         description: Internal Server Error (if the update fails)
 */

router.put('/register-updateadmin', registrationController.updateAdmin);


/**
 * @swagger
 * /admin/admin/register-deleteAdmin:
 *   delete:
 *     tags:
 *       - Admin Management
 *     summary: Deactivate an admin account
 *     description: This endpoint allows you to mark an admin account as inactive by setting the isActive field to false.
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
 *     responses:
 *       200:
 *         description: Admin account marked as inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record marked as inactive"
 *                 admindeleteresult:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request (if ID is missing or invalid)
 *       404:
 *         description: Not Found (if no admin with the specified ID exists)
 *       500:
 *         description: Internal Server Error (if an error occurs while deactivating the admin)
 */

router.delete('/register-deleteAdmin', registrationController.deleteAdmin);

/**
 * @swagger
 * tags:
 *   - name: Admin Management
 *     description: Endpoints for managing admin accounts and data
 *
 * /admin/admin/register-getadmindata/{id}:
 *   get:
 *     tags:
 *       - Admin Management
 *     summary: Retrieve admin details by ID
 *     description: Fetches the admin details, including user name, email, phone number, and admin role by admin ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admin whose details are to be retrieved.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved admin details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       example: "admin_user"
 *                     password:
 *                       type: string
 *                       example: "decrypted_password"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "+1234567890"
 *                     admin_role:
 *                       type: string
 *                       example: "super_admin"
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error while fetching admin details
 */
router.get('/register-getadmindata/:id', registrationController.getAdminId); 



module.exports = router;