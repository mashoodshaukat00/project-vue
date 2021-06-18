const express = require('express');
const app = express();

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('hello world from mosh');
});

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res)=>{
   const course = courses.find((c => c.id === parseInt(req.params.id)));
    if(!course) {
        res.status(404).send('Course with this id is not found');
}
    else {
        res.send(course);
    }
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

