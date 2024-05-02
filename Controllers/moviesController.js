const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

exports.checkId = (req,res,next,value)=>{    //param middleware
    console.log('movie id is'+value);

    let movie = movies.find(el => el.id === value*1) //el wil iterate through movies array

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: 'movie with id' + value + 'is not found'
        })
    }
    next();
}

exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear){
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid movie data'
        });
    }
    next();
}

exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestedAt,
        status: "success",
        data: {
            movies: movies // JSon format,above movies variable is assigned
        }
    })
}
exports.getMovie = (req, res) => {
    const id = req.params.id * 1 // to convert string to int
    let movie = movies.find(el => el.id === id) //el wil iterate through movies array

    // if (!movie) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: 'movie with id' + id + 'is not found'
    //     })
    // }
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })
}

exports.createMovie = (req, res) => {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body) // combines these two abjects

    movies.push(newMovie); //push the new movie to existing array

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
    //res.send('created')  
}
exports.updateMovie = (req, res) => {

    let id = req.params.id * 1 // to convert string to int
    let movietoUpdate = movies.find(el => el.id === id)

    // if (!movietoUpdate) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: 'movie with id' + id + 'is not found'
    //     })
    // }
    let index = movies.indexOf(movietoUpdate) // id=4 then index is 3 works like array with 0 initially

    Object.assign(movietoUpdate, req.body); //req.body will have the request sent by user which is in patch argument
    movies[index] = movietoUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movietoUpdate
            }
        })
    })
}
exports.deleteMovie = (req, res) => {
    let id = req.params.id * 1 // to convert string to int
    let movietoDelete = movies.find(el => el.id === id)

    // if (!movietoDelete) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: 'movie with id ' + id + ' is not found'
    //     })
    // }

    let index = movies.indexOf(movietoDelete)

    movies.splice(index, 1); // 1 inthe sense it'll delete 1 element

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}