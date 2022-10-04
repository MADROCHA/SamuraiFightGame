class Sprite {
    constructor({
        position,
        //size,
        imageSrc,
        resize = 1,
        maxFrames,
        holdFrames = 1,
        offset = {x:0,y:0}
        
    }){
        this.position = position;
        //this.size = size
        this.image = new Image()
        this.image.src = imageSrc
        this.resize = resize
        this.maxFrames = maxFrames
        this.currentFrames = 0
        this.elapsedFrames = 0
        this.holdFrames = holdFrames
        this.offset = offset
        }
        draw(){
            c.drawImage(
                this.image, 
                //
                this.currentFrames * (this.image.width / this.maxFrames),
                0,
                this.image.width /this.maxFrames,
                this.image.height,
                //
                this.position.x -this.offset.x,
                this.position.y -this.offset.y,
                this.image.width /this.maxFrames * this.resize,
                this.image.height * this.resize,
                )
/*                 if(UI.debug){
                    c.strokeStyle = this.color
                    c.strokeRect(

                        this.position.x ,//-this.offset.x,
                        this.position.y ,//-this.offset.y,
                        this.image.width /this.maxFrames * this.resize,
                        this.image.height  * this.resize 
                        ) 
                    }
                    */
        }
        animateFrames(){
            this.elapsedFrames++;
            if(this.elapsedFrames % this.holdFrames === 0){
                if (this.currentFrames < this.maxFrames -1){
                    this.currentFrames++
                } else {
                    this.currentFrames = 0
                }
            }
        }
        update(){
            this.draw();
            this.animateFrames();
        }
            
    }