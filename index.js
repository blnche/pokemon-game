const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(battleZonesData)

canvas.width = 1024
canvas.height = 576

const collisionsMap =[]
for (let i = 0; i < collisions.length; i+= 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}
const battleZonesMap =[]
for (let i = 0; i < battleZonesData.length; i+= 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}
console.log(battleZonesMap)

const boundaries = []

const offset = {
    x: -1035,
    y: -580
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const image = new Image()
image.src = './Assets/Img/PelletIsle.png'

const foregroundImage = new Image()
foregroundImage.src = './Assets/Img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './Assets/Img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './Assets/Img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './Assets/Img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './Assets/Img/playerRight.png'

const player = new Sprite({
    position: {
        x: canvas.width/2 - 2 - 192 / 4 / 2,
        y: canvas.height/2 - 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: foregroundImage
})

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }

}

const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate () {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    battleZones.forEach((battleZone) => {
        battleZone.draw()
        
    })
    player.draw()
    foreground.draw()
    
    let moving = true
    player.moving = false
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        player.moving = true
        player.image = player.sprites.up

        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y +3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }    
        for (let i=0; i < battleZones.length; i++) {
            const battleZone = battleZones [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                })
            ) {
                console.log('battle zone collision');
                break
            }
        }    

        if (moving)
            movables.forEach((movable) => 
                movable.position.y +=3
            )}

    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        player.moving = true
        player.image = player.sprites.left
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x +3,
                            y: boundary.position.y 
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        } 
        for (let i=0; i < battleZones.length; i++) {
            const battleZone = battleZones [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                })
            ) {
                console.log('battle zone collision');
                break
            }
        }       

        if (moving)
            movables.forEach((movable) => 
                movable.position.x +=3
            )}
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        player.moving = true
        player.image = player.sprites.down
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y -3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }   
        for (let i=0; i < battleZones.length; i++) {
            const battleZone = battleZones [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                })
            ) {
                console.log('battle zone collision');
                break
            }
        }     

        if (moving)
            movables.forEach((movable) => 
                movable.position.y -=3
            )}
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        player.moving = true
        player.image = player.sprites.right
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x -3,
                            y: boundary.position.y 
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }    
        for (let i=0; i < battleZones.length; i++) {
            const battleZone = battleZones [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                })
            ) {
                console.log('battle zone collision');
                break
            }
        }    

        if (moving)
            movables.forEach((movable) => 
                movable.position.x -=3
            )}
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp' :
            keys.ArrowUp.pressed = true
            lastKey='ArrowUp'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            lastKey='ArrowLeft'
            break
        case 'ArrowDown' :
            keys.ArrowDown.pressed = true
            lastKey='ArrowDown'
            break
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            lastKey='ArrowRight'
            break
    }
    console.log(keys)
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp' :
            keys.ArrowUp.pressed = false            
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false            
            break
        case 'ArrowDown' :
            keys.ArrowDown.pressed = false            
            break
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false            
            break
    }
})