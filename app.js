const express = require('express');
const fs = require('fs');


let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json())  //to attach the request with requestbody we need to use middldeware

// app.get('/',(req,res) => { //Data is being requested from a specific resource (through some API URL)
//     //  res.status(200).send('hello');
//      res.status(200).json({message:'hello json',status:200});
// })

// app.post('/',(req,res) => {
//     //Data is sent to be processed to a specific resource (through some API URL)
// })
//**********to list all the movies */
app.get('/api/v1/movies',(req,res) => {
    res.status(200).json({
        status:"success",
        data: {
            movies:movies // JSon format,above movies variable is assigned
        }
    })
})
//*********to return the movie based on given api ID  */
// app.get('/api/v1/movies/:id/:name/:x') // if 4/chan--then it gives error coz x is not defined
// app.get('/api/v1/movies/:id/:name/:x?')  //for the above argument it doesn't give error,coz its optional
app.get('/api/v1/movies/:id',(req,res) => {  //:represents route parameter
    // console.log(req.params)  // params store req parameter of route
    
    const id = req.params.id * 1 // to convert string to int
    
    let movie = movies.find(el => el.id === id) //el wil iterate through movies array
    
    if(!movie){
        return res.status(404).json({
           status:"fail",
           message:'movie with id' + id + 'is not found'
        })
    }
    
    res.status(200).json({
        status:"success",
        data: {
            movie:movie
        }
})
})

app.post('/api/v1/movies',(req,res) =>{
    // console.log(req.body)    // request of new movie to be added
    
    const newId = movies[movies.length-1].id + 1;
    const newMovie = Object.assign({id:newId},req.body) // combines these two abjects
    
    movies.push(newMovie); //push the new movie to existing array
    
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err) => {
        res.status(201).json({
            status:"success",
            data:{
                movie:newMovie
            }
        })
    })   
    //res.send('created')  
}) // here we are goin to create a new movie after creation we need to store back in json file

const port = 3000;
app.listen(port,() => {
    console.log('server started');
})