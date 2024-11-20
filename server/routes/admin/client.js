const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');


/**
 * @swagger
 * /admin/client/register-client:
 *   post:
 *     summary: Create a new client account
 *     description: This endpoint allows you to create a new client account with company and contact details.
 *     tags:
 *       - Client Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: "Tech Solutions Inc."
 *               cp_name:
 *                 type: string
 *                 example: "Jane Doe"
 *               user_name:
 *                 type: string
 *                 example: "janedoe_tech"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               cp_phone:
 *                 type: string
 *                 example: "+1234567890"
 *               cp_email:
 *                 type: string
 *                 example: "janedoe@techsolutions.com"
 *               company_phone:
 *                 type: string
 *                 example: "+0987654321"
 *               company_email:
 *                 type: string
 *                 example: "contact@techsolutions.com"
 *               company_logo:
 *                 type: string
 *                 example: "https://example.com/logo.png"
 *               address:
 *                 type: string
 *                 example: "456 Tech Park"
 *               city:
 *                 type: string
 *                 example: "San Francisco"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               postal_code:
 *                 type: string
 *                 example: "94105"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: Client user account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "clientuser account created successfully"
 *       400:
 *         description: Bad Request (if required fields are missing)
 *       500:
 *         description: Internal Server Error
 */
router.post('/register-client', registrationController.createclient); //completedn





/**
 * @swagger
 * /admin/client/register-updateclient:
 *   put:
 *     summary: Update an existing client account
 *     description: This endpoint allows you to update the details of an existing client using their ID.
 *     tags:
 *       - Client Management
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
 *               company_name:
 *                 type: string
 *                 example: "Tech Solutions Inc."
 *               cp_name:
 *                 type: string
 *                 example: "Jane Doe"
 *               user_name:
 *                 type: string
 *                 example: "janedoe_tech"
 *               password:
 *                 type: string
 *                 example: "newSecurePassword123"
 *               cp_phone:
 *                 type: string
 *                 example: "+1234567890"
 *               cp_email:
 *                 type: string
 *                 example: "janedoe@techsolutions.com"
 *               company_phone:
 *                 type: string
 *                 example: "+0987654321"
 *               company_email:
 *                 type: string
 *                 example: "contact@techsolutions.com"
 *               company_logo:
 *                 type: string
 *                 example: "https://example.com/logo.png"
 *               address:
 *                 type: string
 *                 example: "456 Tech Park"
 *               city:
 *                 type: string
 *                 example: "San Francisco"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               postal_code:
 *                 type: string
 *                 example: "94105"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: Client details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "client updated successfully"
 *       400:
 *         description: Bad Request (if required fields are missing or incorrect)
 *       404:
 *         description: Client not found (if the ID does not exist in the database)
 *       500:
 *         description: Internal Server Error (for unexpected issues during update)
 */
router.put('/register-updateclient',registrationController.updateClient) // udpate client




/**
 * @swagger
 * /admin/client/register-deleteclient:
 *   delete:
 *     summary: Mark a client as inactive (soft delete)
 *     description: This endpoint allows you to mark a client as inactive by updating the `isActive` field to `false` instead of permanently deleting the record.
 *     tags:
 *       - Client Management
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
 *         description: Client record marked as inactive successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record marked as inactive"
 *                 deleteresult:
 *                   type: object
 *                   example: { "status": "success", "updatedRows": 1 }
 *       404:
 *         description: Client record not found (if the client with the given ID does not exist)
 *       500:
 *         description: Internal Server Error (if there is an error during the deletion process)
 */
router.delete('/register-deleteclient',registrationController.deleteClient) // delete client



/**
 * @swagger
 * /admin/client/register-getClientdata/{id}:
 *   get:
 *     summary: Retrieve client details by ID
 *     description: This endpoint retrieves the details of a client based on the provided client ID.
 *     tags:
 *       - Client Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the client to fetch details for.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Client details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     company_name:
 *                       type: string
 *                       example: "ABC Corporation"
 *                     cp_name:
 *                       type: string
 *                       example: "John Doe"
 *                     user_name:
 *                       type: string
 *                       example: "john_doe"
 *                     password:
 *                       type: string
 *                       example: "decrypted_password_here"
 *                     cp_phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     cp_email:
 *                       type: string
 *                       example: "contact@abc.com"
 *                     company_phone:
 *                       type: string
 *                       example: "+0987654321"
 *                     company_email:
 *                       type: string
 *                       example: "support@abc.com"
 *                     company_logo:
 *                       type: string
 *                       example: "logo_url_here"
 *                     address:
 *                       type: string
 *                       example: "123 Business Rd"
 *                     city:
 *                       type: string
 *                       example: "New York"
 *                     state:
 *                       type: string
 *                       example: "NY"
 *                     postal_code:
 *                       type: string
 *                       example: "10001"
 *                     country:
 *                       type: string
 *                       example: "USA"
 *       404:
 *         description: Client not found (if the client with the given ID does not exist)
 *       500:
 *         description: Internal Server Error (if there is an error retrieving client details)
 */
router.get('/register-getClientdata/:id', registrationController.getClientId); //get staff using id











// router.post('/register-Clientlogin',registrationController.clientLogin)//staff login

module.exports = router;
