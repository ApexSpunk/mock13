const express = require('express');
const connect = require('./config/connect');
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const userRoute = require('./routes/user.route');
const jobRoute = require('./routes/job.route');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRoute);
app.use('/job', jobRoute);


app.get('/', (req, res) => {
    res.send({ 'mock13': 'Hello World!' });
});


app.listen(PORT, async () => {
    await connect()
    console.log(`Server is running on port ${PORT}`);
});


