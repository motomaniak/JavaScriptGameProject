class Player {
	constructor(){
		this.color = "#ff0000";
		this.height = 100;
  		this.jumping = true;
  		this.velocity_x = 0;
		this.velocity_y = 0;
		this.width = 100;
		this.x = 100;
		this.y = 50;
		this.prevX = 0
		this.prevY = 0
		this.movement = "idle-right"
	}

	jump(){
		if(!this.jumping){
			this.jumping = true
			this.velocity_y -= 35
		}

		if(this.movement == "moving-left")
			this.movement = "jumping-left"
		else if(this.movement == "moving-right")
			this.movement = "jumping-right"
	}

	moveLeft(){
		this.movingLeft = true
		this.velocity_x -= 8
		this.movement = "moving-left"
	}

	moveRight(){
		this.movingRight = true
		this.velocity_x += 8
		this.movement = "moving-right"
	}

	update(){
		this.prevX = this.x 
		this.prevY = this.y
		this.x += this.velocity_x
		this.y += this.velocity_y
	}

}