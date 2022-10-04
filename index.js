const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.2

//
    const backGround = new Sprite({
        position:{
            x:0,
            y:0
        },
        imageSrc: './img/background.png',
        maxFrames: 1,

    })
//
    const shop = new Sprite({
        position:{
            x:600,
            y:186
        },
        imageSrc: './img/shop.png',
        resize: 2.3,
        maxFrames: 6,
        holdFrames: 9,
    })
//
    const playerA = new Fighter ({
        position: {
            x:200,
            y: 10
        },
        velocity: {
            x: 0,
            y: 0
        },
        size: {
            width: 50,
            height: 150
        },
        //color: 'rgb(79, 184, 174)', 
        color: '#0F766E', 
        sprites: {
            idle:{
                imageSrc: './img/samuraiMack/Idle.png',
                maxFrames: 8,
            },
            run: {
                imageSrc: './img/samuraiMack/Run.png',
                maxFrames:8,
            },
            jump: {
                imageSrc: './img/samuraiMack/Jump.png',
                maxFrames:2,
            },
            fall: {
                imageSrc: './img/samuraiMack/Fall.png',
                maxFrames:2,
            },
            attack1: {
                imageSrc: './img/samuraiMack/Attack1.png',
                maxFrames:6,
            },
            takeHit: {
                imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
                maxFrames:4,
            },
            defeated: {
                imageSrc: './img/samuraiMack/Death.png',
                maxFrames:6,
            },
        },
        imageSrc: './img/samuraiMack/Idle.png',
        maxFrames: 8,
        resize:2.5,
        holdFrames:7,
        offset: {
            x: 225,
            y: 155
        },
        attackHitBox: {
            offset: {
                x:50,
                y:20,
                //x:50,
                //y:20,
            },
            width:198,
            height:90,
            //width:198,
            //height:70,
        },
        //color: 'green', 
    })
    console.log(playerA)
    const playerB = new Fighter ({
        position: {
            x: 800,
            y: 10
        },
        velocity: {
            x: 0,
            y: 0      
        },
        size: {
            width: 50,
            height: 150
        },
        //color: 'rgb(184, 79, 160', 
        color: '#A21CAF', 
        sprites: {
            idle:{
                imageSrc: './img/kenji/Idle.png',
                maxFrames: 4,
            },
            run: {
                imageSrc: './img/kenji/Run.png',
                maxFrames:8,
            },
            jump: {
                imageSrc: './img/kenji/Jump.png',
                maxFrames:2,
            },
            fall: {
                imageSrc: './img/kenji/Fall.png',
                maxFrames:2,
            },
            attack1: {
                imageSrc: './img/kenji/Attack1.png',
                maxFrames:4,
            },
            takeHit: {
                imageSrc: './img/kenji/Take hit.png',
                maxFrames:3,
            },
            defeated: {
                imageSrc: './img/kenji/Death.png',
                maxFrames:7,
            },
        },
        imageSrc: './img/kenji/Idle.png',
        maxFrames: 4,
        resize:2.5,
        holdFrames:10,
        offset: {
            /* x: 215,
            y: 170 */
            
            x: 225,
            y: 170 
        },
        attackHitBox: {
            offset: {
                x:-182,
                y:20,
                /* x:-182,
                y:45, */
            },
            width:182,
            height:90,
            /* width:182,
            height:60, */
        },
        //color: 'purple', 
    })
//
    const keys = {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        s: {
            pressed: false
        },
        d: {
            pressed: false
        },
        //
        arrowUp: {
            pressed: false
        },
        arrowLeft: {
            pressed: false
        },
        arrowDown: {
            pressed: false
        },
        arrowRight: {
            pressed: false
        }
    }
    let lastKey
//
//
let UI = {
    debug: false
}
//
decreaseTimer()
    
//
    function animate() {
        c.fillStyle = 'black';
        //c.clearRect(0,0,canvas.width,canvas.height)
        c.fillRect(0,0,canvas.width,canvas.height)
//background
        backGround.update()
//background
        shop.update()
//filter
c.fillStyle = 'rgba(255,255,255,0.15'
        c.fillRect(0,0, canvas.width,canvas.height)
//filter
//playerA
        //playerA.draw()
        playerA.update()
//playerA
//playerB
        //playerB.draw()
        playerB.update()
//playerB
    // CONTROLS
        // A
        playerA.velocity.x = 0
        
        if (keys.a.pressed && playerA.lastKey === 'a'){
            playerA.velocity.x = -5
            playerA.switchSprite('run')
        }   else if (keys.d.pressed && playerA.lastKey === 'd'){
            playerA.velocity.x = 5
            playerA.switchSprite('run')
        }else{
            playerA.switchSprite('idle')
        }
        // jump Y
        if(playerA.velocity.y < 0) {
            playerA.switchSprite('jump')
        } else if (playerA.velocity.y > 0){
            playerA.switchSprite('fall')
            
        }
            
        // A
        // B
        playerB.velocity.x = 0
        if (keys.arrowLeft.pressed && playerB.lastKey === 'Left'){
            playerB.velocity.x = -5
            playerB.switchSprite('run')
            
        }   else if (keys.arrowRight.pressed && playerB.lastKey === 'Right'){
            playerB.velocity.x = 5
            playerB.switchSprite('run')
        }else{
            playerB.switchSprite('idle')
        }
        // jump Y
        if(playerB.velocity.y < 0) {
            playerB.switchSprite('jump')
        } else if (playerB.velocity.y > 0){
            playerB.switchSprite('fall')
            
        }
        // B
    // CONTROLS
    // handle COLLISIONS & players hit
    // COLLISION A
    if (
        rectCollision({
            rectangle1:playerA,
            rectangle2:playerB
            })
                && playerA.isAttacking
                && playerA.currentFrames === 4
            ){
                // wip_ gettin damaged disables incoming attack
                //playerB.isAttacking = false
                //
                playerB.takeHit()
                playerA.isAttacking = false
                console.log('Hit attack A')
                
                //document.querySelector('#HealthPlayerB').style.width = playerB.health + '%'
                gsap.to('#HealthPlayerB', {
                    width: playerB.health + '%'
                })
            }
        // attack A miss 
            if (playerA.isAttacking && playerA.currentFrames === 4){
                playerA.isAttacking = false
            }
            console.log(UI.debug)
        // COLLISION B
            if (
                rectCollision({
                rectangle1:playerB,
                rectangle2:playerA
            })
                && playerB.isAttacking
                && playerB.currentFrames === 2 
            ){
                // wip_ gettin damaged disables incoming attack
                //playerA.isAttacking = false
                //
                playerA.takeHit()
                playerB.isAttacking = false
                console.log('Hit attack B')
                //document.querySelector('#HealthPlayerA').style.width = playerA.health + '%'
                gsap.to('#HealthPlayerA', {
                    width: playerA.health + '%'
                })
            }
    // attack B miss 
            if (playerB.isAttacking && playerB.currentFrames === 2){
                playerB.isAttacking = false
            }
    // game result players health 
            if (playerA.health <= 0 || playerB.health <= 0){
                determineWinnerPlayer({playerA,playerB, timerId})
            }
            window.requestAnimationFrame(animate)
        }
        animate()