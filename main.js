// Root position
let x = 250
let y = 250
// Length of segments
let l1 = 140
let l2 = 100
// Angle of segments
let a1 = 0.5
let a2 = 2
// End points of segments
let end1X, end1Y, end2X, end2Y

function setup() {
  createCanvas(500, 500)
  updateEndPoints()
  noFill()
}

function draw() {
  background(200)
  drawArm()
  drawBounds()
  updateArm()
  updateEndPoints()
}

function drawBounds() {
  strokeWeight(1)
  ellipse(x, y, (l1 + l2) * 2)
  ellipse(x, y, abs(l1 - l2) * 2)
}

function updateArm() {
  let gradient = getGradient()
  let changeRate = min(dist(mouseX, mouseY, end2X, end2Y) / 25000, 0.005)
  a1 -= gradient.a1 * changeRate
  a2 -= gradient.a2 * changeRate
}

function updateEndPoints() {
  end1X = x + l1 * cos(a1)
  end1Y = y + l1 * sin(a1)
  end2X = end1X + l2 * cos(a2)
  end2Y = end1Y + l2 * sin(a2)
}

function drawArm() {
  strokeWeight(10)
  stroke('rgba(0, 0, 0, 0.5)')
  line(x, y, end1X, end1Y)
  line(end1X, end1Y, end2X, end2Y)
}

function getGradient() {
  let mX = mouseX - x
  let mY = mouseY - y
  return {
    // Oh Maple our lord and savior 🙏
    a1: (-2 * (cos(a1) * l1 + cos(a2) * l2 - mX) * sin(a1) * l1 + 2 * (sin(a1) * l1 + sin(a2) * l2 - mY) * cos(a1) * l1) / (2 * sqrt(pow((cos(a1) * l1 + cos(a2) * l2 - mX), 2) + pow((sin(a1) * l1 + sin(a2) * l2 - mY), 2))),
    a2: (-2 * (cos(a1) * l1 + cos(a2) * l2 - mX) * sin(a2) * l2 + 2 * (sin(a1) * l1 + sin(a2) * l2 - mY) * cos(a2) * l2) / (2 * sqrt(pow((cos(a1) * l1 + cos(a2) * l2 - mX), 2) + pow((sin(a1) * l1 + sin(a2) * l2 - mY), 2)))
  }
}
