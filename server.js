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

app.locals.palettes = [
  {
    id: 1, 
    projectId: 1, 
    paletteName: 'Home Colorway', 
    colorOne: '#f5eddc',
    colorTwo: '#29aeb5', 
    colorThree: '#b8cbba', 
    colorFour: '#db7e89', 
    colorFive: '#a85d48', 
    timeStamp: Date.now()
  }, 
  {
    id: 2, 
    projectId: 2, 
    paletteName: 'Away Colorway', 
    colorOne: '#ce0a0b',
    colorTwo: '#ee441a', 
    colorThree: '#e6ca8a', 
    colorFour: '#9e9279', 
    colorFive: '#3a3634', 
    timeStamp: Date.now()
  }
]

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// Route Handlers
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

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects

  response.json({ projects })
})

app.post('/api/v1/palettes', (request, response) => {
  const { palette } = request.body
  const id = Date.now()
  const projectId = Date.now()
  const timeStamp = Date.now()

  if(!palette) {
    return response.status(422).send({
      error: 'Palette has not been provided'
    })
  } else {
    app.locals.palettes.push({...palette, id, projectId, timeStamp})
    return response.status(201).json({ id })
  }
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
