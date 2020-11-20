let arm

function setup() {
  createCanvas(500, 500)
  noFill()
  // Længderne af segments'ne må helst ikke være lig hinanden
  // For så får armen lidt en tendens til massiv stivkrampe fordi gradienten i visse tilfælde vil være lig hinanden for alle vinklerne
  // Dette sker også selvom vinklernes startværdier er forskellige, hvis man f.eks. strækker armen helt ud i nogle sekunder
  arm = new KinematicArm(250, 250, [50.1, 50.2, 50.3, 50.4])
}

function draw() {
  background(200)
  arm.draw()
  arm.seek(mouseX, mouseY)
}

class KinematicArm {
  constructor(x, y, segments) {
    this.root = {
      x: x,
      y: y
    }
    this.segments = segments
    this.angles = new Array(this.segments.length).fill(0)
    this.updateJointPositions()
  }
  draw() {
    strokeWeight(10)
    stroke('rgba(0, 0, 0, 0.5)')
    for (let i = 1; i < this.joints.length; i++) {
      line(this.joints[i - 1].x, this.joints[i - 1].y, this.joints[i].x, this.joints[i].y)
    }
  }
  updateJointPositions() {
    let currentJoints = [{
      x: this.root.x,
      y: this.root.y
    }]
    for (let i in this.segments) {
      currentJoints.push({
        x: currentJoints[i].x + this.segments[i] * cos(this.angles[i]),
        y: currentJoints[i].y + this.segments[i] * sin(this.angles[i])
      })
    }
    this.joints = currentJoints
  }
  getGradient(x, y) {
    let handX = this.joints[this.joints.length - 1].x
    let handY = this.joints[this.joints.length - 1].y
    let deltaX = x - handX
    let deltaY = y - handY
    let divisor = sqrt(deltaX * deltaX + deltaY * deltaY)
    let gradient = []
    for (let i in this.segments) {
      gradient.push((deltaX * sin(this.angles[i]) * this.segments[i] - deltaY * cos(this.angles[i]) * this.segments[i]) / divisor)
    }
    return gradient
  }
  seek(x, y) {
    let gradient = this.getGradient(x, y)
    let targetDistance = dist(x, y, this.joints[this.joints.length - 1].x, this.joints[this.joints.length - 1].y)
    let changeRate = min(targetDistance / 25000, 0.005)
    for (let i in this.angles) {
      this.angles[i] -= gradient[i] * changeRate
    }
    this.updateJointPositions()
  }
}
