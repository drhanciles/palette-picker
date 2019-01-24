const express = require('express'); 
const app = express(); 

app.set('port', process.env.PORT || 3000); 
app.locals.title = 'Palette Picker'; 
app.use(express.static('public'))

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// Endpoints
// POST - project
// POST - palette to project
// GET - project, after a palette has been saved to the project
// GET - palette that was saved to project
// DELETE - palette from project
