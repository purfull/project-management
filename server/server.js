const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const pug = require('pug');
const express = require('express');
const app = express();
const db = require('./db');


//swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Middleware
app.use(express.json());
app.use(express.urlencoded());
//body parser

// CORS options
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

//swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project-management API',
      version: '1.0.0',
      description: 'Its all about project magemnet apis',
    },
  },
  apis: ['./routes/**/*.js', './server.js'], // Path to the API docs (ensure this file name matches your actual file)
};




const a = require('./controller/staff/registration')
//swagger docs and middleweres
const swaggerDocs = swaggerJsdoc(swaggerOptions);  //swagger doc
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));






// Set Pug as the view engine
app.set('view engine', 'pug');






// Add Swagger JSDoc comments
/**
 * @swagger
 * /get:
 *   get:
 *     summary: Returns Hello World program
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

app.get('/get', a.verifystaffttoken, (req, res) => {
  const auth = req.userRecord
  if (auth) {

    res.send("Helloo bhai World" + auth);

  }
  res.send("permission denied")
});




// only staff routes
const adminStaffRoutes = require('./routes/admin/staff'); //main staff update
// only client routes

const adminClientRoutes = require('./routes/admin/client')//main file for client 

// only admin routes
const adminUserRoutes = require('./routes/admin/admin'); //main admin file

//only task 
const taskMainRoutes = require('./routes/admin/tasks'); //main task

//only perfomnace 
const perfomaceMainRoutes = require('./routes/admin/performance');//performance

//email routes
const emailRoutes = require('./routes/admin/email'); //email for 

//leave route
const routesLeave = require('./routes/admin/leaveDays');  //leave for 

const chatRoutes = require('./routes/admin/chat')


const { VERSION } = require('sequelize/lib/query-types'); //query for 





// middle weres for staff uses only 
app.use('/admin/staff', adminStaffRoutes);

// // middle weres for cleint uses only =
app.use('/admin/client', adminClientRoutes);

// middle weres for admin uses only 
app.use('/admin/admin', adminUserRoutes);

// middle weres for task uses only 
app.use('/admin/task', taskMainRoutes);

// middle weres for performance uses only 
app.use('/admin/performance', perfomaceMainRoutes);

// middle weres for email uses only 
app.use('/admin/email', emailRoutes);

// middle weres for leave uses only 
app.use('/admin/leave', routesLeave);

// middle weres for leave uses only 
app.use('/admin/chat', chatRoutes)







db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port: ' + process.env.PORT);
      console.log('Project mangaement system API Docs available at http://localhost:3300/api-doc');

    });
  })
  .catch(error => {
    console.error('Error syncing the database:', error);
    process.exit(1); // Exit process if DB sync fails
  });
