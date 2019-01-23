// Functions
getRandomDigits = (num) => (Math.floor(Math.random() * Math.floor(num)))

generateHexValues = () =>  {  
  const hexDigits = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let hexValue = ''
  while(hexValue.length < 6 ) {
    let newValue = getRandomDigits(16)
    hexValue = hexValue + hexDigits[newValue]
  }
  return hexCode = `#${hexValue}`
}

// Event Listeners 
$('.generate-button').on('click', () => {
  console.log('gerenrate hex values button has been clicked')
  generateHexValues()
  console.log(hexCode)
})