const express = require('express');
const fs = require('fs');


let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json())  //to attach the request with requestbody we need to use middldeware

const getAllMovies =  (req,res) => {
        res.status(200).json({
            status:"success",
            data: {
                movies:movies // JSon format,above movies variable is assigned
            }
        })
}
const getMovie = (req,res) => {
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
}

const createMovie = (req,res) =>{
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
}
const updateMovie = (req,res) =>{
   
    let id = req.params.id * 1 // to convert string to int
    let movietoUpdate = movies.find(el => el.id === id)

    if(!movietoUpdate){
        return res.status(404).json({
           status:"fail",
           message:'movie with id' + id + 'is not found'
        })
    }
    let index = movies.indexOf(movietoUpdate) // id=4 then index is 3 works like array with 0 initially
 
    Object.assign(movietoUpdate,req.body); //req.body will have the request sent by user which is in patch argument
    movies[index] = movietoUpdate;
    
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err) => {
        res.status(200).json({
            status:"success",
            data:{
                movie:movietoUpdate
            }
        })
    })  
}
const deleteMovie = (req,res) =>{
    let id = req.params.id * 1 // to convert string to int
    let movietoDelete = movies.find(el => el.id === id)
   
    if(!movietoDelete){
        return res.status(404).json({
           status:"fail",
           message:'movie with id ' + id + ' is not found'
        })
    }
    
    let index = movies.indexOf(movietoDelete)

    movies.splice(index,1); // 1 inthe sense it'll delete 1 element
    
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err) => {
        res.status(204).json({
            status:"success",
            data:{
                movie:null
            }
        })
    })  
}
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

app.route('/api/v1/movies')
   .get(getAllMovies)
   .post(createMovie)

app.route('/api/v1/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)



const port = 3000;
app.listen(port,() => {
    console.log('server started');
})