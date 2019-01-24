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
  // debugger; 
  // const windows = ['.color-window-one', '.color-window-two', '.color-window-three', '.color-window-four', '.color-window-five']

  // windows.forEach(window => {
  //   if($(`${window}`).closest('i').hasClass('fa-lock-open')) {
  //     const hexCode = generateHexValues()
  //     console.log(hexCode)
  //     $(window).css({"background-color": `${hexCode}`})
  //   }
  // })
  let color
  $('.fa-lock-open').each(element => {
    color = generateHexValues()
    $('.color-window').css({"background-color": `${color}`})
    console.log(color)
  }) 
}

// Event Listeners 
$('.generate-button').on('click', updateColorWindows)

$('.lock-icon').on('click', toggleLock)

