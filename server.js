// npm start will run it
const app = require('./app');

const port = 3000;

app.listen(port,() => {
    console.log('server started');
})