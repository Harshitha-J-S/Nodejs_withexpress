const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const mongoose = require('mongoose')  // after env only mongoose must be there
// npm start will run it
const app = require('./app');

console.log(process.env)

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser : true
}).then((conn) => {
     console.log(conn)
     console.log('DB connection Successfull')
}).catch((error) => {
    console.log('Some error has occured');
});


const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log('server started');
})


//SET X=100 on terminal will create a environment variable