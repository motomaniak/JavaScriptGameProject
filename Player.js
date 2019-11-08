class Player {
	constructor(){
		this.height = 50
  		this.jumping = true
  		this.velocity_x = 0
		this.velocity_y = 0
		this.width = 50
		this.x = 0
		this.y = 300
		this.movement = "idle-right"
	}

	jump(){
		if(!this.jumping){
			this.jumping = true
			this.velocity_y -= 55
		}

		//This is for future moving and animating the sprite 
		if(this.movement == "moving-left")
			this.movement = "jumping-left"
		else if(this.movement == "moving-right")
			this.movement = "jumping-right"
	}

	moveLeft(){
		this.velocity_x -= 7
		this.movement = "moving-left"
	}

	moveRight(){
		this.velocity_x += 7
		this.movement = "moving-right"
	}

	update(){
		this.x += this.velocity_x
		this.y += this.velocity_y
	}

}