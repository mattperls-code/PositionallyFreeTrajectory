const canvas = document.getElementById("canvas")
const inset = 100
const ctx = canvas.getContext("2d")

const given = {
    g: -9.8,
    dx: 4,
    dy: 1.5,
    w: 1,
    h: 1
}

const maxDx = 10
const maxDy = 5
const scale = Math.min((canvas.width - 2 * inset) / maxDx, (canvas.height - 2 * inset) / maxDy)

const determineTrajectory = (g, dx, dy, w, h) => {
    const dx0 = dx
    const dy0 = dy + h
    const dx1 = dx + w
    const dy1 = dy

    const u = (dx0 ** 2) / (dx1 ** 2)

    const theta = Math.atan((u * dy1 - dy0) / (u * dx1 - dx0))
    const speed = dx1 / Math.cos(theta) / Math.sqrt(2 * (dy1 - dx1 * Math.tan(theta)) / g)
    const time = dx1 / speed / Math.cos(theta)

    return { theta, speed, time }
}

const run = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(inset, canvas.height - inset, 0.2 * scale, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  
    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.arc(inset + (given.dx) * scale, canvas.height - inset - (given.dy + given.h) * scale, 0.2 * scale, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "green"
    ctx.beginPath()
    ctx.arc(inset + (given.dx + given.w) * scale, canvas.height - inset - given.dy * scale, 0.2 * scale, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  
    const trajectory = determineTrajectory(given.g, given.dx, given.dy, given.w, given.h)
  
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

document.getElementById("w").addEventListener("input", (e) => {
    given.w = parseFloat(e.target.value)
    run()
})

document.getElementById("h").addEventListener("input", (e) => {
    given.h = parseFloat(e.target.value)
    run()
})