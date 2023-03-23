const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/UserRoutes');


const app = express();

app.use(cors());
app.use(express.json());

const dbUrl = "mongodb+srv://Ashish65:ya5HR3KKWJT30OQV@cluster0.lssutvh.mongodb.net/netflixDb?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('DB Connection Established...'));

app.use('/api/user', userRoutes);

app.listen(5000, console.log('server started at port : 5000'));
