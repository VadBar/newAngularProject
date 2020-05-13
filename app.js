const express = require('express');
const bodyParser = require('body-parser');
const keyConfig = require('./config/key.js');
const authModul = require('./routes/auth.js');
const mongoose = require('mongoose');
const passport = require('passport');
const orderModul = require('./routes/order.js');
const categoryModul = require('./routes/category');
const positionModul = require('./routes/position');
const analyticsModul = require('./routes/analytics');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
mongoose.connect(keyConfig.urlDataBase)
    .then(() => console.log('Connected!...')).catch((e) => console.log(e));
app.use(passport.initialize());
require('./midleware/passport')(passport);
app.use(morgan('dev'));
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authModul);
app.use('/api/order', orderModul);
app.use('/api/category', categoryModul);
app.use('/api/position', positionModul);
app.use('/api/analytics', analyticsModul);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
        )
    })
}
module.exports = app;