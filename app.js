const express = require('express');
const fs = require('fs');


let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

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

const port = 3000;
app.listen(port,() => {
    console.log('server started');
})