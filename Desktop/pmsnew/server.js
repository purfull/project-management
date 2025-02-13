const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./db');
const pug = require('pug');

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


app.set('view engine', 'pug');


app.get('/get', (req, res) => {

  const auth = req.userRecord
  
  if (auth) {

    res.send("Helloo bhai World" + auth);

  }
  res.send("permission denied")
});

//chat route
const chatRoutes = require('./chat-app/route') //chat for 

const leaveRoute = require('./leave/route')
const taskRoute = require('./task/route')
const perofromanceRoute = require('./performance/route');
const staffRoute  = require('./staff/route')
const adminRoute = require('./admin/route')
const clientRoute = require('./client/route');
const emailRoute = require('./Email/route')
// const login = require('./routes');

const { VERSION } = require('sequelize/lib/query-types'); //query for 



// middle weres for leave uses only 
app.use('/admin/chat', chatRoutes);
app.use('/admin/leave/',leaveRoute);
app.use('/admin/task',taskRoute);
app.use('/admin/performance',perofromanceRoute);
app.use('/admin/staff',staffRoute);
app.use('/admin/admin',adminRoute);
app.use('/admin/client',clientRoute);
app.use('/admin/email',emailRoute)




db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port: ' + process.env.PORT);
    //   console.log('Project mangaement system API Docs available at http://localhost:3300/api-doc');

    });
  })
  .catch(error => {
    console.error('Error syncing the database:', error);
    process.exit(1); // Exit process if DB sync fails
  });
