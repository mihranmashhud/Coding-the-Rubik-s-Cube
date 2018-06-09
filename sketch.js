const make2dSquare = (length, fill = '') => {
  let arr = new Array(length)
  for (i = 0; i < length; i++) {
    arr[i] = new Array(length)
    for (j = 0; j < length; j++) {
      arr[i][j] = fill
    }
  }
  return arr
}

const accessSide = (matrix, side) => {
  switch (side) {
    case 'up':
      return matrix[0]
      break
    case 'down':
      return matrix[matrix.length - 1]
      break
    case 'left':
      return matrix.map(arr => arr[0])
      break;
    case 'right':
      return matrix.map(arr => arr[arr.length - 1])
      break
  }
}

const replaceSide = (matrix1, side1, matrix2, side2, reverse = false) => {
  let newSide = reverse ? accessSide(matrix2, side2).reverse() : accessSide(matrix2, side2)
  switch (side1) {
    case 'up':
      return matrix1.map((arr, index) => index === 0 ? newSide : arr)
      break
    case 'down':
      return matrix1.map((arr, index) => index === matrix1.length - 1 ? newSide : arr)
      break
    case 'left':
      return matrix1.map((arr, index) => arr.map((value, pos) => pos === 0 ? newSide[index] : value))
      break
    case 'right':
      return matrix1.map((arr, index) => arr.map((value, pos) => pos === arr.length - 1 ? newSide[index] : value))
      break
  }
}

const rotate90 = array => {
  return array[0].map((col, i) => array.map(row => row[i]).reverse());
}

function makeCube(length = 3, fill = {
  up: 'R',
  down: 'O',
  left: 'G',
  right: 'B',
  front: 'Y',
  back: 'W'
}) {
  return {
    length,
    faces: {
      up: make2dSquare(length, fill.up),
      down: make2dSquare(length, fill.down),
      left: make2dSquare(length, fill.left),
      right: make2dSquare(length, fill.right),
      front: make2dSquare(length, fill.front),
      back: make2dSquare(length, fill.back)
    },
    shuffle: function (str) {
      str = str.split('')
      str = str.filter(char => "'RLFBUD2".indexOf(char) > -1)
      while (str.indexOf('2') > -1) {
        char = str[str.indexOf('2') - 1]
        str.splice(str.indexOf('2'), 1, '' + char)
      }
      while (str.indexOf("'") > -1) {
        char = str[str.indexOf("'") - 1]
        str.splice(str.indexOf("'"), 1, '' + char + char)
      }
      str = str.join('')
      console.log(str)
      for (char of str) {
        let {
          up,
          down,
          left,
          right,
          front,
          back
        } = this.faces
        switch (char) {
          case 'F':
            this.faces.front = rotate90(front)
            this.faces.up = replaceSide(up, 'down', left, 'right', true)
            this.faces.right = replaceSide(right, 'left', up, 'down')
            this.faces.down = replaceSide(down, 'up', right, 'left', true)
            this.faces.left = replaceSide(left, 'right', down, 'up')
            break
          case 'B':
            this.faces.back = rotate90(back)
            this.faces.up = replaceSide(up, 'up', right, 'right')
            this.faces.left = replaceSide(left, 'left', up, 'up', true)
            this.faces.down = replaceSide(down, 'down', left, 'left')
            this.faces.right = replaceSide(right, 'right', down, 'down', true)
            break
          case 'L':
            this.faces.left = rotate90(left)
            this.faces.up = replaceSide(up, 'left', back, 'right', true)
            this.faces.front = replaceSide(front, 'left', up, 'left')
            this.faces.down = replaceSide(down, 'left', front, 'left')
            this.faces.back = replaceSide(back, 'right', down, 'left', true)
            break
          case 'R':
            this.faces.right = rotate90(right)
            this.faces.up = replaceSide(up, 'right', front, 'right')
            this.faces.back = replaceSide(back, 'left', up, 'right', true)
            this.faces.down = replaceSide(down, 'right', back, 'left', true)
            this.faces.front = replaceSide(front, 'right', down, 'right')
            break
          case 'U':
            this.faces.up = rotate90(up)
            this.faces.left = replaceSide(left, 'up', front, 'up')
            this.faces.back = replaceSide(back, 'up', left, 'up')
            this.faces.right = replaceSide(right, 'up', back, 'up')
            this.faces.front = replaceSide(front, 'up', right, 'up')
            break
          case 'D':
            this.faces.down = rotate90(down)
            this.faces.left = replaceSide(left, 'down', back, 'down')
            this.faces.front = replaceSide(front, 'down', left, 'down')
            this.faces.right = replaceSide(right, 'down', front, 'down')
            this.faces.back = replaceSide(back, 'down', right, 'down')
            break
        }
      }
    }
  }
}

let cube = makeCube(3, {
  down: '#f48116',
  left: '#54ed21',
  back: '#f9f3ec',
  right: '#1696ff',
  front: '#ffdc30',
  up: '#f2201d'
})

//Rendering the Cube

const renderCube = inCube => {
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.up[y][x])
      rect(facetSize * (inCube.length + offset + x), facetSize * (offset + y), facetSize, facetSize)
    }
  }
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.down[y][x])
      rect(facetSize * (inCube.length + offset + x), facetSize * (inCube.length * 2 + offset + y), facetSize, facetSize)
    }
  }
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.left[y][x])
      rect(facetSize * (offset + x), facetSize * (inCube.length + offset + y), facetSize, facetSize)
    }
  }
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.right[y][x])
      rect(facetSize * (inCube.length * 2 + offset + x), facetSize * (inCube.length + offset + y), facetSize, facetSize)
    }
  }
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.front[y][x])
      rect(facetSize * (inCube.length + offset + x), facetSize * (inCube.length + offset + y), facetSize, facetSize)
    }
  }
  for (let x = 0; x < inCube.length; x++) {
    for (let y = 0; y < inCube.length; y++) {
      fill(inCube.faces.back[y][x])
      rect(facetSize * (inCube.length * 3 + offset + x), facetSize * (inCube.length + offset + y), facetSize, facetSize)
    }
  }
}

const randomCubeMove = (length = 20) => {
  let cubeMove = []
  let validMoves = "RLFBUD"
  let char = ''
  let prevChar = ''
  for (let i = 0; i < length; i++) {
    let num = Math.random()
    while (char == prevChar) {
      char = validMoves.charAt(Math.floor(Math.random() * validMoves.length))
    }
    cubeMove += char + (num < 0.4 ? "'" : num < 0.6 ? '2' : '')
    prevChar = char
  }
  console.log(cubeMove)
  return cubeMove
}

const cubeMoves = [
  //0: twist 2 corners
  "R'D'RDR'D'RUR'DRD'R'DRU'",
  //1: six spots
  "UD'RL'FB'UD'",
  //2: checkerboard
  "R2L2F2B2U2D2",
  //3: cycle 3 edges clockwise
  "F2UR'LF2L'RUF2",
  //4: cycle 3 edges anti-clockwise
  "F2U'R'LF2L'RU'F2"
]

const offset = 1
const facetSize = 60

const reverseCubeMove = cubeMove => {
  cubeMove = cubeMove.split('')
  while (cubeMove.indexOf('2') > -1) {
    char = cubeMove[cubeMove.indexOf('2') - 1]
    cubeMove.splice(cubeMove.indexOf('2') - 1, 2, char + '2')
  }
  while (cubeMove.indexOf("'") > -1) {
    char = cubeMove[cubeMove.indexOf("'") - 1]
    cubeMove.splice(cubeMove.indexOf("'") - 1, 2, char + "'")
  }
  cubeMove = cubeMove.map(move => move.length == 1 ? move + "'" : move[1] == '2' ? move : move[0])
  return cubeMove.reverse().join('')
}

function setup() {
  createCanvas(facetSize * (cube.length * 4 + offset * 2), facetSize * (cube.length * 3 + offset * 2), SVG)
  strokeWeight(5)
  cube.shuffle(cubeMoves[3])
}

function draw() {
  renderCube(cube)
}