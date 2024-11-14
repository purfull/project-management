const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors');
const pug = require('pug');
const express = require('express');
const app = express();

const db = require('./db')

// Middleware
app.use(express.json());

// CORS options
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

// Set Pug as the view engine
app.set('view engine', 'pug');

// Routes
app.get('/check', (req, res) => {
    res.render('index', { message: "Hello, welcome!" });
});

const adminStaffRoutes = require('./routes/admin/staff');
const adminClientRoutes = require('./routes/admin/client');
const adminUserRoutes = require('./routes/admin/admin')

// updates

const adminStaffupdates = require('./routes/admin/staff');

// delete 

const adminStaffdelete = require('./routes/admin/staff')


// get dcrpt staff id 

const admingetStaff = require('./routes/admin/staff')

// ending dcrpt staff id 

// nov 14  for body parser


app.use('/admin/staff', adminStaffRoutes);
app.use('/admin/client', adminClientRoutes);
app.use('/admin/admin',adminUserRoutes);


// updates for staff and althing

app.use('/admin/staff',adminStaffupdates);

// delete 
app.use('/admin/staff', adminStaffdelete);

// get dcrpt staff id 
app.use('/admin/staff/',admingetStaff);


db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port: ' + process.env.PORT);
    });
  })
  .catch(error => console.log("Error syncing the database:", error));
