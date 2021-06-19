const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]

// 2.Post
app.post('/api/courses', (req, res) =>{
    // const schema = Joi.object({name: Joi.string().min(3).required()});
    // const result = schema.validate(req.body);
    
    // if(result.error) {
    //     // 404 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const {error} = validateCourse(req.body); 
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
}

    const course = {
        id: parseInt(courses[courses.length - 1].id) + 1,
        name: req.body.name
    };
    // adding course object to the courses array
    courses.push(course);
    //sending response
    res.send(course);
});

// 1.get
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
        return;
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

// 3.Update

// look up the course
 // if not existing, return 404
app.put('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('the course with given id not found')
        return;
    };

 //validate
 // if invalid, return 404 - bad request
// error can hold 2 values (value, error)
//at one time there can be only one value either value or error.
const {error} = validateCourse(req.body); 
if(error){
    res.status(400).send(result.error.details[0].message);
    return;
}
// update course
 // return the updated course
 course.name = req.body.name;
 res.send(course);
});

// General function to validate
function validateCourse(course){
    const schema = Joi.object({name: Joi.string().min(3).required()});
    return schema.validate(course);
};
 
// 4.Delete
app.delete('/api/courses/:id',(req, res) =>{
    //Look up for the course
    //Not existing, return 404
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
       res.status(404).send('the course with given id not found')
       return;
       };
    // Delete
    const index =courses.indexOf(course);
    courses.splice(index, 1);
    // Return the same course
    res.send(course);
    });
// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listing on port ${port}`));

