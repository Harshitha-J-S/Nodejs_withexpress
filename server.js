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

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,'Name is required!'],
        unique:true
    },
    description:String,
    duration: {
        type : Number,
        required:[true,'Duration is required!'],
    },
    ratings: {
        type : Number,
        default : 1.0
    },
})
const Movie = mongoose.model('Movie', movieSchema)

// creating a documnet using model - Movie
const testMovie = new Movie ({
    name : "chandan",
    description:"i don't care",
    duration:143,
    ratings: 100
})

testMovie.save()
.then(doc => {
    console.log(doc);
})
.catch(err => {
    console.log("error occured : " + err)
})

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log('server started');
})


//SET X=100 on terminal will create a environment variable