const canvas = document.getElementById("canvas")
const inset = 100
const ctx = canvas.getContext("2d")
ctx.lineWidth = 0.01 * canvas.width

const given = {
    theta: 50,
    fov: 50,
    dy: 50,
    min: 0,
    max: 0
}

const thetaInput = document.getElementById("theta")
const fovInput = document.getElementById("fov")
const dyInput = document.getElementById("dy")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")

const setTheta = (theta) => {
    given.theta = theta
    given.min = given.dy / Math.tan(given.theta * Math.PI / 180 + given.fov * Math.PI / 180 / 2)
    minInput.value = given.min
    given.max = given.dy / Math.tan(given.theta * Math.PI / 180 - given.fov * Math.PI / 180 / 2)
    maxInput.value = given.max
}

const setFov = (fov) => {
    given.fov = fov
    given.min = given.dy / Math.tan(given.theta * Math.PI / 180 + given.fov * Math.PI / 180 / 2)
    minInput.value = given.min
    given.max = given.dy / Math.tan(given.theta * Math.PI / 180 - given.fov * Math.PI / 180 / 2)
    maxInput.value = given.max
}

const setDy = (dy) => {
    given.dy = dy
    given.min = given.dy / Math.tan(given.theta * Math.PI / 180 + given.fov * Math.PI / 180 / 2)
    minInput.value = given.min
    given.max = given.dy / Math.tan(given.theta * Math.PI / 180 - given.fov * Math.PI / 180 / 2)
    maxInput.value = given.max
}

const setMin = (min) => {
    given.min = min
    given.theta = Math.atan(given.dy / given.min) * 180 / Math.PI - given.fov / 2
    thetaInput.value = given.theta
    given.max = given.dy / Math.tan(given.theta * Math.PI / 180 - given.fov * Math.PI / 180 / 2)
    maxInput.value = given.max
}

const setMax = (max) => {
    given.max = max
    given.theta = Math.atan(given.dy / given.max) * 180 / Math.PI + given.fov / 2
    thetaInput.value = given.theta
    given.min = given.dy / Math.tan(given.theta * Math.PI / 180 + given.fov * Math.PI / 180 / 2)
    minInput.value = given.min
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "blue"
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height - inset)
    ctx.lineTo(canvas.width / 2, canvas.height - given.dy - inset)
    ctx.closePath()
    ctx.stroke()

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(canvas.width / 2 - given.min, canvas.height - inset, 10, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "orange"
    ctx.beginPath()
    ctx.arc(canvas.width / 2 - given.max, canvas.height - inset, 10, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
}


setTheta(50)
draw()

thetaInput.addEventListener("input", () => {
    setTheta(thetaInput.value)
    draw()
})

fovInput.addEventListener("input", () => {
    setFov(fovInput.value)
    draw()
})

dyInput.addEventListener("input", () => {
    setDy(dyInput.value)
    draw()
})

minInput.addEventListener("input", () => {
    setMin(minInput.value)
    draw()
})

maxInput.addEventListener("input", () => {
    setMax(maxInput.value)
    draw()
})