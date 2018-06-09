let cube = [
  'R',
  'R',
  'R',
  'R',
  'G',
  'G',
  'Y',
  'Y',
  'B',
  'B',
  'W',
  'W',
  'G',
  'G',
  'Y',
  'Y',
  'B',
  'B',
  'W',
  'W',
  'O',
  'O',
  'O',
  'O'
]

// let colorCode = {   'O': '#f48116',   'G': '#54ed21',   'W': '#f9f3ec', 'B':
// '#1696ff',   'Y': '#ffdc30',   'R': '#f2201d' }

cube = cube.map(char => {
  switch (char) {
    case 'O':
      return '#f48116'
    case 'G':
      return '#54ed21'
    case 'W':
      return '#f9f3ec'
    case 'B':
      return '#1696ff'
    case 'Y':
      return '#ffdc30'
    case 'R':
      return '#f2201d'
  }
})

const interpolateString = string => {
  let str = string.split('')
  str = str.filter(char => "'RLFBUD".indexOf(char) > -1)
  while (str.indexOf("'") > -1) {
    char = str[str.indexOf("'") - 1]
    str.splice(str.indexOf("'"), 1, "" + char + char)
  }
  return str.join('')
}

const cubeMove = (inCube, string) => {
  let temp
  let newString = interpolateString(string)
  // for (char of string) {   if ('RLFBUD'.indexOf(char.toUpperCase()) > -1) { if
  // (char == char.toUpperCase()) {       newString.push(char)     } else if (char
  // == char.toLowerCase()) {       for (let i = 0; i < 3; i++) {
  // newString.push(char.toUpperCase())       }     }   } }
  console.log(newString)

  for (char of newString) {
    switch (char) {
      case 'F':
        temp = inCube[7-1]
        inCube[7-1] = inCube[15-1]
        inCube[15-1] = inCube[16-1]
        inCube[16-1] = inCube[8-1]
        inCube[8-1] = temp

        temp = inCube[22-1]
        inCube[22-1] = inCube[9-1]
        inCube[9-1] = inCube[3-1]
        inCube[3-1] = inCube[14-1]
        inCube[14-1] = temp

        temp = inCube[21-1]
        inCube[21-1] = inCube[17-1]
        inCube[17-1] = inCube[4-1]
        inCube[4-1] = inCube[6-1]
        inCube[6-1] = temp
        break

      case 'B':
        temp = inCube[11-1]
        inCube[11-1] = inCube[19-1]
        inCube[19-1] = inCube[20-1]
        inCube[20-1] = inCube[12-1]
        inCube[12-1] = temp

        temp = inCube[24-1]
        inCube[24-1] = inCube[13-1]
        inCube[13-1] = inCube[1-1]
        inCube[1-1] = inCube[10-1]
        inCube[10-1] = temp

        temp = inCube[23-1]
        inCube[23-1] = inCube[5-1]
        inCube[5-1] = inCube[2-1]
        inCube[2-1] = inCube[18-1]
        inCube[18-1] = temp
        break

      case 'L':
        temp = inCube[5-1]
        inCube[5-1] = inCube[13-1]
        inCube[13-1] = inCube[14-1]
        inCube[14-1] = inCube[6-1]
        inCube[6-1] = temp

        temp = inCube[1-1]
        inCube[1-1] = inCube[20-1]
        inCube[20-1] = inCube[21-1]
        inCube[21-1] = inCube[7-1]
        inCube[7-1] = temp

        temp = inCube[3-1]
        inCube[3-1] = inCube[12-1]
        inCube[12-1] = inCube[23-1]
        inCube[23-1] = inCube[15-1]
        inCube[15-1] = temp
        break

      case 'R':
        temp = inCube[9-1]
        inCube[9-1] = inCube[17-1]
        inCube[17-1] = inCube[18-1]
        inCube[18-1] = inCube[10-1]
        inCube[10-1] = temp

        temp = inCube[11-1]
        inCube[11-1] = inCube[4-1]
        inCube[4-1] = inCube[16-1]
        inCube[16-1] = inCube[24-1]
        inCube[24-1] = temp

        temp = inCube[19-1]
        inCube[19-1] = inCube[2-1]
        inCube[2-1] = inCube[8-1]
        inCube[8-1] = inCube[22-1]
        inCube[22-1] = temp
        break

      case 'U':
        temp = inCube[1-1]
        inCube[1-1] = inCube[3-1]
        inCube[3-1] = inCube[4-1]
        inCube[4-1] = inCube[2-1]
        inCube[2-1] = temp

        temp = inCube[12-1]
        inCube[12-1] = inCube[6-1]
        inCube[6-1] = inCube[8-1]
        inCube[8-1] = inCube[10-1]
        inCube[10-1] = temp

        temp = inCube[11-1]
        inCube[11-1] = inCube[5-1]
        inCube[5-1] = inCube[7-1]
        inCube[7-1] = inCube[9-1]
        inCube[9-1] = temp
        break

      case 'D':
        temp = inCube[21-1]
        inCube[21-1] = inCube[23-1]
        inCube[23-1] = inCube[24-1]
        inCube[24-1] = inCube[22-1]
        inCube[22-1] = temp

        temp = inCube[13-1]
        inCube[13-1] = inCube[19-1]
        inCube[19-1] = inCube[17-1]
        inCube[17-1] = inCube[15-1]
        inCube[15-1] = temp

        temp = inCube[14-1]
        inCube[14-1] = inCube[20-1]
        inCube[20-1] = inCube[18-1]
        inCube[18-1] = inCube[16-1]
        inCube[16-1] = temp
        break
    }
  }
  return inCube
}

function setup() {
  createCanvas(1000, 800, SVG)
  background(255)

  displayCube = cubeMove(cube, "TURN'")

  strokeWeight(5)
  let index = 0;
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 2; i++) {
      fill(displayCube[index])
      rect(300 + i * 100, 100 + j * 100, 100, 100)
      index++
    }
  }
  for (j = 0; j < 2; j++) {
    for (i = 0; i < 8; i++) {
      fill(displayCube[index])
      rect(100 + i * 100, 300 + j * 100, 100, 100)
      index++
    }
  }
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 2; i++) {
      fill(displayCube[index])
      rect(300 + i * 100, 500 + j * 100, 100, 100)
      index++
    }
  }
}

function draw() {}