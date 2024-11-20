const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const pug = require('pug');
const express = require('express');
const app = express();
const db = require('./db')


//swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Middleware
app.use(express.json());

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
  apis: ['./routes/**/*.js','./server.js'], // Path to the API docs (ensure this file name matches your actual file)
};

const a = require('./controller/registration')
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
app.get('/get',a.verifystaffttoken, (req, res) => {
  const auth = req.userRecord
  if (auth){ 
    
    res.send("Helloo bhai World"+ auth);

  }
  res.send("permission denied")
});


// app.get('/get',(req, res)=>{
//   res.send("Helloo bhai World")
// })




// only staff routes
const adminStaffRoutes = require('./routes/admin/staff'); //main staff update
const adminStaffupdates = require('./routes/admin/staff'); //staffupdate
const adminStaffdelete = require('./routes/admin/staff'); // staffdelete
const adminStafflogin = require('./routes/admin/staff'); // staff login
// only client routes
const adminClientRoutes = require('./routes/admin/client');  //main client routes
const adminClientupdate = require('./routes/admin/client');  // udpatre client 
const adminClientdelete = require('./routes/admin/client'); //delete client


// only admin routes
const adminUserRoutes = require('./routes/admin/admin'); //main admin file
const adminUserupdate = require('./routes/admin/admin'); // update admin
const adminUserdelete = require('./routes/admin/admin'); // admin delete




const { VERSION } = require('sequelize/lib/query-types');//query 



// middle weres for staff uses only 
app.use('/admin/staff', [adminStaffRoutes, adminStaffupdates, adminStaffdelete,adminStafflogin]);


// app.use('/admin/staff',adminStafflogin);


// // middle weres for cleint uses only 
app.use('/admin/client', [adminClientRoutes, adminClientupdate, adminClientdelete]);



// middle weres for admin uses only 
app.use('/admin/admin', [adminUserRoutes, adminUserupdate, adminUserdelete]);





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
