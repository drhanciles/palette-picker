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

// Event Listeners 
$('.generate-button').on('click', () => {
  console.log('gerenrate hex values button has been clicked')
  generateHexValues()
  console.log(hexCode)
})

$('.lock-icon').on('click', () => {
  console.log('clicked icon')
  toggleLock()
})