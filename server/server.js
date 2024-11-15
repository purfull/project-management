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


// only staff routes
const adminStaffRoutes = require('./routes/admin/staff'); //main staff update
const adminStaffupdates = require('./routes/admin/staff'); //staffupdate
const adminStaffdelete = require('./routes/admin/staff'); // staffdelete

// only client routes
const adminClientRoutes = require('./routes/admin/client');  //main client routes
const adminClientupdate =require('./routes/admin/client');  // udpatre client 
const adminClientdelete = require('./routes/admin/client'); //delete client


// only admin routes
const adminUserRoutes = require('./routes/admin/admin'); //main admin file
const adminUserupdate = require('./routes/admin/admin'); // update admin
const adminUserdelete = require('./routes/admin/admin'); // admin delete



// middle weres for staff uses only 
app.use('/admin/staff', adminStaffRoutes);
app.use('/admin/staff',adminStaffupdates);
app.use('/admin/staff', adminStaffdelete);


// // middle weres for cleint uses only 
app.use('/admin/client', adminClientRoutes);
app.use('/admin/client',adminClientupdate);
app.use('/admin/client',adminClientdelete);



// middle weres for admin uses only 
app.use('/admin/admin',adminUserRoutes);
app.use('/admin/admin',adminUserupdate);
app.use("/admin/admin",adminUserdelete);






db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port: ' + process.env.PORT);
    });
  })
  .catch(error => console.log("Error syncing the database:", error));
