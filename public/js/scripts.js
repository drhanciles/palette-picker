// Global Variables
let savedProjects = {}
let savedPalettes = {}

// Functions
getRandomDigits = () => (Math.floor(Math.random() * 16 ))

generateHexValues = () =>  {  
  const hexDigits = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let hexValue = ''
  while(hexValue.length < 6 ) {
    let newValue = getRandomDigits()
    hexValue = hexValue + hexDigits[newValue]
  }
  return hexCode = `#${hexValue}`
}

$('document').ready(() => {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(result => result.forEach(project => {
      updateProjectSelect(project.title)
      savedProjects[project.title] = project.id
    }))
})

toggleLock = () => {
  if($(event.target).hasClass('fa-lock-open')) {
    $(event.target).removeClass('fa-lock-open').addClass('fa-lock')
  } else {
    $(event.target).removeClass('fa-lock').addClass('fa-lock-open')
  }
}

updateColorWindows = () => {
  const windows = ['.color-window-one', '.color-window-two', '.color-window-three', '.color-window-four', '.color-window-five']

  windows.forEach(window => { 
   let obj = $(`${window}`).siblings('.color-information')
   let updateCheck = $(obj).children().find('.lock-icon').hasClass('fa-lock-open')
    if(updateCheck) {
      let hexCode = generateHexValues()
      $(window).css({"background-color": `${hexCode}`})   
      $(obj).children().find('.hex-value').text(hexCode)
    }
  }) 
}

updateProjectSelect = (title) => {
  let newOption = `<option value=${title}>${title}</option>`
  $('select').append(newOption)
}

saveProjects = (project) => {
  event.preventDefault()
  let projectTitle = $('.project-name').val()
  let obj = { title: projectTitle }
  const options = {
    method: 'POST', 
    body: JSON.stringify(obj), 
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('/api/v1/projects', options )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
  
  updateProjectSelect(projectTitle)
  clearInputs()
  let newProject = `<div class="saved-project">
                      <header class="project-header">
                        <p class="saved-project-title">${projectTitle}</p>
                      </header>
                      <article class="saved-palette-container"></article>
                    </div>
                    `
  $('.project-container').append(newProject)
} 

clearInputs = () => {
  $('input').val(' ')
}

savePalettes = () => {
  event.preventDefault()
  const savedPaletteData = []
  const hexCodes = ['.value-one', '.value-two', '.value-three', '.value-four', '.value-five']
  const title = $('.palette-name').val()
  
  hexCodes.forEach(value => {
    let text = $(`${value}`).html()
    savedPaletteData.push(text)
  })

  const project = $('select').find(':selected').text()
  let data = Object.keys(savedProjects)
  let matchingId = data.find(value => value === project)
  let projectId = savedProjects[matchingId]
  
  postPalettes(savedPaletteData, projectId, title)
  clearInputs()
  let newPalette = `
                  <article class="saved-palette">
                    <span class="name-delete-container">
                      <p class="saved-palette-name">${title}</p>
                      <i class="fas fa-times delete-palette"></i>
                    </span>
                    <div class="block-container">
                      <div class="block color-block-one"></div>
                      <div class="block color-block-two"></div>
                      <div class="block color-block-three"></div>
                      <div class="block color-block-four"></div>
                      <div class="block color-block-five"></div>
                    </div>
                  </article>
                `
  $('.saved-palette-container').append(newPalette)
}

postPalettes = (paletteData, projectId, paletteTitle) => {
  const paletteParams = paletteData.reduce((obj, color, index,) => {
    const words = ['one', 'two', 'three', 'four', 'five']
      obj['title'] = paletteTitle
      obj[`color_${words[index]}`] = color
      obj['project_id'] = projectId
      return obj
  }, {})
 
    const options = {
      method: 'POST', 
      body: JSON.stringify(paletteParams), 
      headers: {
        'Content-Type': 'application/json'
      }
    }

  fetch('/api/v1/palettes', options)
    .then(response => response.json())
    .then(result => {
      if(!savedPalettes[result.project_id]) {
        savedPalettes[result.project_id] = [
          {
            [result.title]: result.project_id, 
            id: result.id, 
            title: result.title, 
            color_one: result.color_one, 
            color_two: result.color_two, 
            color_three: result.color_three, 
            color_four: result.color_four, 
            color_five: result.color_five
          }
        ]
      } else {
        savedPalettes[result.project_id].push({
            [result.title]: result.project_id, 
            id: result.id, 
            title: result.title, 
            color_one: result.color_one, 
            color_two: result.color_two, 
            color_three: result.color_three, 
            color_four: result.color_four, 
            color_five: result.color_five
        })
      }
    })
    .catch(error => {
      throw new Error(error)
    })
}

getPalettes = (id) => {
  fetch(`/api/v1/palettes/{id}/projects`)
    .then(response => response.json())
    .then(result => {
      result.foEach(palette => {
        if(!savedPalettes[palette.project_id]) {
          savedPalettes[palette.project_id] = [
            {
              [palette.title]: id, 
              id: palette.id, 
              color_one: palette.color_one,
              color_two: palette.color_two, 
              color_three: palette.color_three, 
              color_four: palette.color_four, 
              color_five: palette.color_five
            }
          ]
        } else {
          savedPalettes[palette.project_id].push({
            [palette.title]: id, 
            id: palette.id, 
            color_one: palette.color_one,
            color_two: palette.color_two, 
            color_three: palette.color_three, 
            color_four: palette.color_four, 
            color_five: palette.color_five
          })
        }
      })
    })
    .catch(error => console.log(error))
}

deletePalette = () => {
  const palette = $('.delete-palette').closest('.saved-palette-name').text()
  fetch(`api/palettes/${palette.id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(result => {})
  .catch(error => {
    throw new Error('Currently Unable to Delete')
  })
}

// Event Listeners 
$('.generate-button').on('click', updateColorWindows)

$('.lock-icon').on('click', toggleLock)

$('.create-project-button').on('click', saveProjects)

$('.save-palette-button').on('click', savePalettes)

$('.delete-palette').on('click', deletePalette)