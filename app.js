const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT = 3000;

//const PORT = parseInt(process.env.PORT);

app.use(express.urlencoded({extended:false}));

app.use(express.static(path.resolve(__dirname, './public')));


//Template Engine
app.set("view engine", "ejs");

// Routers
const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/', mainRoutes);
app.use('/administrar', adminRoutes);

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

// Error 404 
//app.use((req,res,next)=>{
//    res.status(404).render('not-found')
//})
