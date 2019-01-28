// Global Variables
let savedProjects = {}

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
      console.log(hexCode)
      $(window).css({"background-color": `${hexCode}`})   
      $(obj).children().find('.hex-value').text(hexCode)
    }
  }) 
}

updateProjectSelect = (title) => {
  let newOption = `<option>${title}</option>`
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
} 

clearInputs = () => {
  $('input').val(' ')
}

$('document').ready(() => {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(result => result.forEach(project => {
      updateProjectSelect(project.title)
      savedProjects[project.title] = project.id
    }))
})

// savePalettes = () => {
//   // paletteData, paletteName, projectTitle - parameters
//   // let savedPaletteData = []
//   // let currentPalettes = $('.hex-value').html()
//   console.log(currentPalettes)

//   // takes in a palette 
//   // use a fetch method to save palette to our database
// }

// Event Listeners 
$('.generate-button').on('click', updateColorWindows)

$('.lock-icon').on('click', toggleLock)

$('.create-project-button').on('click', saveProjects)

