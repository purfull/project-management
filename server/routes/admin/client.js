const express = require('express')
const router = express.Router();

const tokens = require('../../controller/staff/registration')


const clientregistercontroll = require('../../controller/client/registration');

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
router.post('/register-client', clientregistercontroll.createclient); //completedn





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
router.put('/update-client',tokens.verifystaffttoken,clientregistercontroll.updateClient) // udpate client




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
router.delete('/delete-client',tokens.verifystaffttoken,clientregistercontroll.deleteClient) // delete client



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
router.get('/getclient-data/:id',tokens.verifystaffttoken, clientregistercontroll.getClientId); //get staff using id


router.get('/get-all-clientdata',clientregistercontroll.getallclientdata)

/**
 * @swagger
 * tags:
 *   - name: Client Management
 *     description: Endpoints for managing client authentication
 *
 * /admin/client/register-Clientlogin:
 *   post:
 *     tags:
 *       - Client Management
 *     summary: Authenticate client login
 *     description: Verifies client credentials (username and password) and returns a JWT token if authentication is successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Client username.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: Client password.
 *                 example: "securePassword123"
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
 *                       example: "john_doe"
 *                     token:
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
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
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

router.post('/clientlogin',clientregistercontroll.clientlogin)//staff login

module.exports = router;
