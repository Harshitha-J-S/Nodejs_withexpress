const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

// npm start will run it
const app = require('./app');

console.log(process.env)

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log('server started');
})


//SET X=100 on terminal will create a environment variable