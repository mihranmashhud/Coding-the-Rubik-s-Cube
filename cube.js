// <><><><><>< Code for making the Rubik's Cube Object ><><><><><>

// function to make square arrays of any length with each element getting the value of fill
const makeSquareMatrix = (length, fill = '') => {
  let arr = new Array(length)
  for (i = 0; i < length; i++) {
    arr[i] = new Array(length)
    for (j = 0; j < length; j++) {
      arr[i][j] = fill
    }
  }
  return arr
}

//function to access the first or last column or row of a square array
const accessSide = (matrix, side) => {
  switch (side) {
    case 'up':
      return matrix[0]
    case 'down':
      return matrix[matrix.length - 1]
    case 'left':
      return matrix.map(arr => arr[0])
    case 'right':
      return matrix.map(arr => arr[arr.length - 1])
  }
}

//function to replace a side of one square array with the side of another
const replaceSide = (matrix1, side1, matrix2, side2, reverse = false) => {
  let newSide = reverse ?
    accessSide(matrix2, side2).reverse() :
    accessSide(matrix2, side2)
  switch (side1) {
    case 'up':
      return matrix1.map((arr, index) => index === 0 ?
        newSide :
        arr)
    case 'down':
      return matrix1.map((arr, index) => index === matrix1.length - 1 ?
        newSide :
        arr)
    case 'left':
      return matrix1.map((arr, index) => arr.map((value, pos) => pos === 0 ?
        newSide[index] :
        value))
    case 'right':
      return matrix1.map((arr, index) => arr.map((value, pos) => pos === arr.length - 1 ?
        newSide[index] :
        value))
  }
}

const rotate90 = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]).reverse())

const interpretCubeMove = cubeMove => {
  newString = cubeMove.split('')
  newString = newString.filter(char => "'RLFBUD2".indexOf(char) > -1)
  while (newString.indexOf('2') > -1) {
    char = newString[newString.indexOf('2') - 1]
    newString.splice(newString.indexOf('2'), 1, '' + char)
  }
  while (newString.indexOf("'") > -1) {
    char = newString[newString.indexOf("'") - 1]
    newString.splice(newString.indexOf("'"), 1, '' + char + char)
  }
  return newString.join('')
}

const Cube = {
  init: function (length = 3, fill = {
    up: 'R',
    down: 'O',
    left: 'G',
    right: 'B',
    front: 'Y',
    back: 'W'
  }) {
    this.length = length
    this.faces = {
      up: makeSquareMatrix(length, fill.up),
      down: makeSquareMatrix(length, fill.down),
      left: makeSquareMatrix(length, fill.left),
      right: makeSquareMatrix(length, fill.right),
      front: makeSquareMatrix(length, fill.front),
      back: makeSquareMatrix(length, fill.back)
    }
    return this
  },
  shuffle: function (cubeMove) {
    cubeMove = interpretCubeMove(cubeMove)
    for (char of cubeMove) {
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
  },
  reorientate: function (move) {
    move = interpretCubeMove(move)
    move = move.split('')
    for (let i = 0; i < move.length; i++) {
      switch (move[i]) {
        case 'B':
          move[i] = 'FFF'
          break
        case 'L':
          move[i] = 'RRR'
          break
        case 'D':
          move[i] = 'UUU'
          break
      }
    }
    move = move.join('')
    while (move.indexOf('UUUU') > -1 || move.indexOf('RRRR') > -1 || move.indexOf('FFFF') > -1)
      move = move.replace('UUUU', '').replace('RRRR', '').replace('FFFF', '')
    console.log(move)
    for (char of move) {
      const {
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
          this.faces.up = rotate90(left)
          this.faces.right = rotate90(up)
          this.faces.down = rotate90(right)
          this.faces.left = rotate90(down)
          this.faces.back = rotate90(rotate90(rotate90(back)))
          break
        case 'R':
          this.faces.right = rotate90(right)
          this.faces.front = down
          this.faces.down = rotate90(rotate90(back))
          this.faces.back = rotate90(rotate90(up))
          this.faces.up = front
          this.faces.left = rotate90(rotate90(rotate90(left)))
          break
        case 'U':
          this.faces.up = rotate90(up)
          this.faces.left = front
          this.faces.front = right
          this.faces.right = back
          this.faces.back = left
          this.faces.down = rotate90(rotate90(rotate90(down)))
          break
      }
    }
  }
}

const inverseCubeMove = cubeMove => {
  cubeMove = cubeMove.split('')
  while (cubeMove.indexOf('2') > -1) {
    char = cubeMove[cubeMove.indexOf('2') - 1]
    cubeMove.splice(cubeMove.indexOf('2') - 1, 2, char + '2')
  }
  while (cubeMove.indexOf("'") > -1) {
    char = cubeMove[cubeMove.indexOf("'") - 1]
    cubeMove.splice(cubeMove.indexOf("'") - 1, 2, char + "'")
  }
  cubeMove = cubeMove.map(move => move.length == 1 ?
    move + "'" :
    move[1] == '2' ?
    move :
    move[0])
  return cubeMove
    .reverse()
    .join('')
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
    cubeMove += char + (num < 0.4 ?
      "'" :
      num < 0.6 ?
      '2' :
      '')
    prevChar = char
  }
  console.log(cubeMove)
  return cubeMove
}

const cubeMoveOrder = cubeMove => {
  let identity = Object.create(Cube).init().faces
  let cubeCopy = Object.create(Cube).init()
  cubeCopy.shuffle(cubeMove)
  let num = 1
  while (!(_.isEqual(cubeCopy.faces, identity))) {
    cubeCopy.shuffle(cubeMove)
    num++
  }
  return num
}

const cubeMoveConjugate = (toConjugate, conjugateWith) => toConjugate + conjugateWith + inverseCubeMove(toConjugate)

const cubeMoveCommutator = (toCommutate, commutateWith) => cubeMoveConjugate(toCommutate, commutateWith) + inverseCubeMove(commutateWith)