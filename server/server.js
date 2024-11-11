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


app.use('/admin/staff', adminStaffRoutes);


db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port: ' + process.env.PORT);
    });
  })
  .catch(error => console.log("Error syncing the database:", error));
