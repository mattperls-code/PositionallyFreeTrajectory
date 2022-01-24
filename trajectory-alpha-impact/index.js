const canvas = document.getElementById("canvas")
const inset = 100
const ctx = canvas.getContext("2d")

const given = {
  g: -9.8,
  dx: 5,
  dy: 3.5,
  alpha: 45 * Math.PI / 180
}

const maxDx = 10
const maxDy = 5
const scale = Math.min((canvas.width - 2 * inset) / maxDx, (canvas.height - 2 * inset) / maxDy)

const determineTrajectory = (g, dx, dy, alpha) => {
  const finalVelocity = dx / Math.cos(alpha) / Math.sqrt(2 * (-dy - dx * Math.tan(alpha)) / g)
  const u = finalVelocity ** 2 * Math.sin(alpha) ** 2 - 2 * g * dy
  const qA = g * dx ** 2
  const qB = 2 * u * dx
  const qC = -2 * u * dy

  const theta = Math.atan2(-qB - Math.sqrt(qB ** 2 - 4 * qA * qC), 2 * qA)
  const speed = dx / Math.cos(theta) / Math.sqrt(2 * (dy - dx * Math.tan(theta)) / g)
  const time = dx / speed / Math.cos(theta)

  const realAlpha = Math.atan((speed * Math.cos(theta)) / (speed * Math.sin(theta) + g * time)) * 180 / Math.PI

  return { theta, speed, time, realAlpha }
}

const run = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "red"
  ctx.beginPath()
  ctx.arc(inset, canvas.height - inset, 0.2 * scale, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = "green"
  ctx.beginPath()
  ctx.arc(inset + given.dx * scale, canvas.height - inset - given.dy * scale, 0.2 * scale, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()

  const trajectory = determineTrajectory(given.g, given.dx, given.dy, given.alpha)
  console.log("observed: " + trajectory.realAlpha)

  const pointAtTime = (t) => ({
    x: trajectory.speed * Math.cos(trajectory.theta) * t,
    y: trajectory.speed * Math.sin(trajectory.theta) * t + 0.5 * given.g * t * t
  })

  let last = pointAtTime(0)

  ctx.strokeStyle = "orange"
  ctx.lineWidth = 0.15 * scale
  for(let i = 0;i<trajectory.time;i+=0.01){
    ctx.beginPath()
    ctx.moveTo(inset + last.x * scale, canvas.height - inset - last.y * scale)
    last = pointAtTime(i)
    ctx.lineTo(inset + last.x * scale, canvas.height - inset - last.y * scale)
    ctx.closePath()
    ctx.stroke()
  }
}

run()

document.getElementById("dx").addEventListener("input", (e) => {
  given.dx = parseFloat(e.target.value)
  run()
})

document.getElementById("dy").addEventListener("input", (e) => {
  given.dy = parseFloat(e.target.value)
  run()
})

document.getElementById("alpha").addEventListener("input", (e) => {
  given.alpha = parseFloat(e.target.value) * Math.PI / 180
  run()
})