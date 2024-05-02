const express = require('express');
const morgan = require('morgan')
const moviesRouter = require('./Routes/moviesRoutes')

let app = express();


app.use(express.json())  //to attach the request with requestbody we need to use middldeware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')) // logs the info abt the request
}

app.use(express.static('./public'))

app.use((req , res , next) => {
      req.requestedAt = new Date().toISOString();
      next()
})  // order matters a lot in middleware



// app.get('/',(req,res) => { //Data is being requested from a specific resource (through some API URL)
//     //  res.status(200).send('hello');
//      res.status(200).json({message:'hello json',status:200});
// })

// app.post('/',(req,res) => {
//     //Data is sent to be processed to a specific resource (through some API URL)
// })
//**********to list all the movies */

//*********to return the movie based on given api ID  */
// app.get('/api/v1/movies/:id/:name/:x') // if 4/chan--then it gives error coz x is not defined
// app.get('/api/v1/movies/:id/:name/:x?')  //for the above argument it doesn't give error,coz its optional
//:represents route parameter
    // console.log(req.params)  // params store req parameter of route
    
    // console.log(req.body)    // request of new movie to be added
    
     // here we are goin to create a new movie after creation we need to store back in json file

// put will modify which is sent by client along with entire resourse
// patch will modify which is sent by client but not the entire resource
// app.get('/api/v1/movies',getAllMovies)
// app.get('/api/v1/movies/:id', getMovie )
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id',updateMovie)
// app.delete('/api/v1/movies/:id',deleteMovie)



app.use('/api/v1/movies', moviesRouter)

module.exports = app;