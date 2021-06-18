const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world from mosh');
});

app.get('/api/courses', (req, res)=>{
    res.send([1,2,3,4,5]);
});

app.get('/api/courses/:id', (req, res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.params);
});

// that is how you read a query
// http://localhost:3000/api/posts/2015/2?sortBy=name
app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.query);
});

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listing on port ${port}`));

