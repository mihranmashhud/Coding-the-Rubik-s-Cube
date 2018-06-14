// <><><><><><><><><><><>< Coding the Rubik's Cube ><><><><><><><><><><><><><><>
//Rendering a Cube

let displayCube = Object.create(Cube).init(3, {
  down: '#f48116',
  left: '#54ed21',
  back: '#f9f3ec',
  right: '#1696ff',
  front: '#ffdc30',
  up: '#f2201d'
})

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

function setup() {
  createCanvas(facetSize * (displayCube.length * 4 + offset * 2), facetSize * (displayCube.length * 3 + offset * 2), SVG)
  strokeWeight(5)
  displayCube.shuffle("R'D'R")
}

function draw() {
  renderCube(displayCube)
}

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