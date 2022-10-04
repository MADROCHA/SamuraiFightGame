window.addEventListener('keydown', (e) =>{
    console.log(e.key)
    switch (e.key) {
        case 'º' :
            UI.debug = !UI.debug
            break
    }
    //PLAYER 1
    if(!playerA.playerDefeated){
        switch (e.key) {
            case 'w' :
            keys.w.pressed = true
            playerA.lastKey = 'w'
            if(playerA.velocity.y === 0){
                playerA.velocity.y = -10
            }
        break
        case 'a' :
            keys.a.pressed = true
            playerA.lastKey = 'a'
            //player.velocity.x = -5
            break
            case 's' :
                keys.s.pressed = true
                playerA.lastKey = 's'
                //player.velocity.y = -5
                break
                case 'd' :
                    keys.d.pressed = true
            playerA.lastKey = 'd'
            //player.velocity.x = 5
        break
        //attack 1
        case ' ' :
            playerA.attack()    
            break
        }
    }

    //PLAYER 2
    if(!playerB.playerDefeated){
        switch(e.key) {
            case 'ArrowUp' :
            keys.arrowUp.pressed = true
            playerB.lastKey = 'Up'
            if(playerB.velocity.y === 0){
                playerB.velocity.y = -10
            }
        break
        case 'ArrowLeft' :
            keys.arrowLeft.pressed = true
            playerB.lastKey = 'Left'
            //player.velocity.x = -5
        break
        case 'ArrowDown' :
            keys.arrowDown.pressed = true
            playerB.lastKey = 'Down'
            //player.velocity.y = -5
            break
            case 'ArrowRight' :
                keys.arrowRight.pressed = true
            playerB.lastKey = 'Right'
            //player.velocity.x = 5
            break
            case '0' :
                playerB.attack()
                //player.velocity.x = 5
                break
            }
        }
})
window.addEventListener('keyup', (e) =>{
    //console.log(e.key)
    switch (e.key) {
    //PLAYER 1
        case 'w' :
            keys.w.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            //player.velocity.x = 0
        break
        case 's' :
            keys.s.pressed = false
        break
        case 'd' :
            //player.velocity.x = 0
            keys.d.pressed = false
        break
    //PLAYER 2
        case 'ArrowUp' :
            keys.arrowUp.pressed = false
            break
        case 'ArrowLeft' :
            keys.arrowLeft.pressed = false
            //player.velocity.x = 0
        break
        case 'ArrowDown' :
            keys.arrowDown.pressed = false
        break
        case 'ArrowRight' :
            keys.arrowRight.pressed = false
            //player.velocity.x = 0
        break
    }
})
