express = require ('express');
require('dotenv').config()
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/blogaccess', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port');
        })
    })
    .catch((error) => {
        console.log('error', error);
    })

