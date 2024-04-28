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

app.get('/api/v1/movies',(req,res) => {
    res.status(200).json({
        status:"success",
        data: {
            movies:movies // JSon format,above movies variable is assigned
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