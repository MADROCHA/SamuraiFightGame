class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        size,
        color,
        imageSrc,
        resize = 1,
        maxFrames,
        holdFrames = 1,
        offset = {x:0,y:0},
        sprites,
        attackHitBox = {
            offset: {},
            width: undefined,
            height: undefined,
        }
    }){
        super({
            position,
            imageSrc,
            resize,
            maxFrames,
            offset,
            //elapsedFrames,
            //holdFrames,
            
        })
        this.velocity = velocity
        this.size = size
        this.lastKey
        this.attackHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackHitBox.offset,
            width: attackHitBox.width,
            height: attackHitBox.height
        }
        /*
        this.attackHitBox = {
            position: this.position,
            width: 100,
            height: 50, 
        }
        */
        this.color = color
        this.isAttacking
        this.health = 100
            //this.width = 50;
            //this.height = 150;
        this.currentFrames = 0
        this.elapsedFrames = 0
        this.holdFrames = holdFrames
        this.sprites = sprites 
        this.playerDefeated = false
        this.playerDisabled = false

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        //console.log(this.sprites)
        //console.log(sprites)
        }   
        update(){
            this.draw();
            if (!this.playerDefeated){
                this.animateFrames();
            }
            // boundries horizontal wip
            if (this.position.x <= canvas.width - canvas.width){
                this.position.x = canvas.width - canvas.width
            } else if(this.position.x + this.size.width >= canvas.width){
                this.position.x = canvas.width - this.size.width
            }
            // boundries horizontal wip
            //attack hitbox
            this.attackHitBox.position.x = this.position.x + this.attackHitBox.offset.x
            this.attackHitBox.position.y = this.position.y + this.attackHitBox.offset.y
            //attack hitbox
            if (UI.debug){
                c.strokeStyle = this.color
                c.strokeRect(
                    this.attackHitBox.position.x,
                    this.attackHitBox.position.y,
                    this.attackHitBox.width,
                    this.attackHitBox.height,
                    )
                c.strokeStyle = this.color
                c.strokeRect(
                    this.position.x,
                    this.position.y,
                    this.size.width,
                    this.size.height,
                    )
                }
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.position.y + this.size.height + this.velocity.y >= canvas.height - groundOffset){
                this.velocity.y = 0
                this.position.y = 328
            } else {
                this.velocity.y +=  gravity
            }         
            //console.log(this.position.y)
        }
        attack(){
            this.switchSprite('attack1')
            this.isAttacking = true
            /* setTimeout(() =>{
                this.isAttacking = false
            }, 100) */
        }
        takeHit(){
            this.health -= 100
            
            if(this.health <= 0){
                this.switchSprite('defeated')
                //
                keys.w.pressed = false
                keys.a.pressed = false
                keys.s.pressed = false    
                keys.d.pressed = false
                //
                keys.arrowUp.pressed = false
                keys.arrowLeft.pressed = false
                keys.arrowDown.pressed = false
                keys.arrowRight.pressed = false
            }else {
                this.switchSprite('takeHit')
            }
        }
        switchSprite(sprite){
            if(this.image === this.sprites.defeated.image){
                this.playerDisabled = true
                if(this.currentFrames === this.sprites.defeated.maxFrames -1)
                this.playerDefeated = true
                return
            }
                
            // overrides all animations with attack1
            if(this.image === this.sprites.attack1.image
                && this.currentFrames < this.sprites.attack1.maxFrames -1
                ) return
            // overrides all animations with attack1 
            // overrides all animations with takeHit
            if(this.image === this.sprites.takeHit.image 
                && this.currentFrames < this.sprites.takeHit.maxFrames -1
                ) return 
            // overrides all animations with takeHit
            
                switch (sprite) {
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.maxFrames = this.sprites.idle.maxFrames   
                        this.currentFrames = 0                    
                    }
                    break;
                case 'run':
                    if(this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image
                        this.maxFrames = this.sprites.run.maxFrames
                        this.currentFrames = 0                    
                        
                    }
                    break;
                case 'jump':
                    if(this.image !== this.sprites.jump.image){
                        this.image = this.sprites.jump.image
                        this.maxFrames = this.sprites.jump.maxFrames
                        this.currentFrames = 0                    
                    }
                    break;
                case 'fall':
                    if(this.image !== this.sprites.fall.image){
                        this.image = this.sprites.fall.image
                        this.maxFrames = this.sprites.fall.maxFrames
                        this.currentFrames = 0                    
                    }
                    break;
                case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image = this.sprites.attack1.image
                        this.maxFrames = this.sprites.attack1.maxFrames
                        this.currentFrames = 0                    
                    }
                    break;
                case 'takeHit':
                    if(this.image !== this.sprites.takeHit.image){
                        this.image = this.sprites.takeHit.image
                        this.maxFrames = this.sprites.takeHit.maxFrames
                        this.currentFrames = 0                    
                    }
                    break;
                case 'defeated':
                    if(this.image !== this.sprites.defeated.image){
                        this.image = this.sprites.defeated.image
                        this.maxFrames = this.sprites.defeated.maxFrames
                        this.currentFrames = 0                    
                    }
                    break;
            }
        }
    }
    let groundOffset = 98
/*    
    c.strokeStyle = this.color
    c.strokeRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
        )
    if(this.isAttacking){
        //c.fillStyle = 'orange'
        c.strokeStyle = 'rgb(156, 12, 29)'
        c.strokeRect(
            this.attackHitBox.position.x,
            this.attackHitBox.position.y,
            this.attackHitBox.width,
            this.attackHitBox.height
            )
        }
*/
/* class Fighter {
    constructor({
        position,
        velocity,
        size,
        color,
        offset
    }){
        this.position = position;
        this.velocity = velocity
        this.size = size
        this.lastKey
        this.attackHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset, 
            width: 100,
            height: 50
        }
        /*
        this.attackHitBox = {
            position: this.position,
            width: 100,
            height: 50, 
        }
        
        this.color = color
        this.isAttacking
        this.health = 100
            //this.width = 50;
            //this.height = 150;
        }
        draw(){
            c.fillStyle = this.color
            // players
            c.fillRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height
                )
            //c.fillRect(this.position.x,this.position.y,this.width,this.height)
            
            // attack 1 
            if(this.isAttacking){
                //c.fillStyle = 'orange'
                c.fillStyle = 'rgb(156, 12, 29)'
                c.fillRect(
                    this.attackHitBox.position.x,
                    this.attackHitBox.position.y,
                    this.attackHitBox.width,
                    this.attackHitBox.height
                    )
                }
        }
        update(){
            this.draw();
            this.attackHitBox.position.x = this.position.x + this.attackHitBox.offset.x
            this.attackHitBox.position.y = this.position.y

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.position.y + this.size.height + this.velocity.y >= canvas.height - groundOffset){
                this.velocity.y = 0
            } else {
                this.velocity.y +=  gravity
            }         
            
        }
        attack(){
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false
            }, 100)
        }
    }
    let groundOffset = 98 */