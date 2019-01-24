const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(express.static('public'))
app.set('port', process.env.PORT || 3000); 

app.locals.title = 'Palette Picker'; 
app.locals.projects = [
  {
    id: 1, 
    title: 'Cactus Jack', 
    timeStamp: Date.now()
  }, 
  {
    id: 2, 
    title: 'Off-White Prestos', 
    timeStamp: Date.now()
  }, 
  {
    id: 3, 
    title: 'Cactus Jack', 
    timeStamp: Date.now()
  }
]

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// Route Handlers
// POST - project
app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body
  const timeStamp = Date.now()
  const id = Date.now()

  if (!project) {
    return response.status(422).send({
      error: 'Project has not been provided'
    })
  } else {
    app.locals.projects.push({...project, id,  timeStamp })
    return response.status(201).json({ id })
  }
})

app.get('api/v1/projects', (request, response) => {
  const projects = app.locals.projects

  if(response.ok) {
    return response.status(200).json(projects)
  } else {
    return response.sendStatus(500)
  }
})

// POST - palette to project
app.post('/api/v1/palettes', (request, response) => {
  const palette = response.body
  // if we dont have that palette stored to the project then add palette
  // if they already have the palette send the user an error - 500 or 400
})

// GET - palette that was saved to project
app.get('/api/v1/palletes', (request, response) => {
  const palette = response.body
  // if we have the palette get it - 200
  // if we dont have it send error - 500
})

// DELETE - palette from project
app.delete('/api/v1/delete', (request, response) => {
  // find palette id and remove palette from table - 400
  //send error if issues - 500 
})
