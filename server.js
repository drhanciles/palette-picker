const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const environment = process.env.NODE_ENV || 'development'; 
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration); 

app.use(bodyParser.json()); 
app.use(express.static('public'))
app.set('port', process.env.PORT || 3000); 

app.locals.title = 'Palette Picker'; 

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/palettes', (request, response) => {
  const newPalette  = request.body
  const paletteKeys = [
    'title', 
    'color_one', 
    'color_two', 
    'color_three', 
    'color_four', 
    'color_five', 
    'project_id'
  ]

  paletteKeys.forEach(key => {
    if (!newPalette[key]) {
      return response.status(422).send('error')
    }
  })

  database('palettes')
    .insert(newPalette, 'id')
    .then(palette => {
      response.status(201).json({id: palette[0], ...newPalette})
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/palettes/:id/projects', (request, response) => {
  database('palettes')
    .where('project_id', request.params.id)
    .then(palette => {
      palette.length
      ? response.status(200).json(palette)
      : response.status(400).send({ error: 'project has not been created'})
    })
    .catch(error => console.log(error))
})

app.delete('/api/v1/palettes/:id', (request, response) => {
 const { id }  = request.params

 database('palettes')
  .where('id', id)
  .del()
  .then(result => {
   return result 
   ? response.status(200).json({
     result: `${result} was deleted`
   })
   :response.status(404).json({error: `${result} could not be deleted`})
  })
  .catch(error => {
   response.status(500).json({error})
  })
})
