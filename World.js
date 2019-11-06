class World {
	constructor() {
		this.friction = 0.9,
		this.gravity = 3,
		this.columns = 16,
		this.rows = 12,
		this.height = 128 * this.rows,
		this.width = 128 * this.columns,
		this.map = [
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			2,2,2,3,0,0,0,0,13,15,0,0,0,1,2,2,
			9,9,9,16,0,0,0,0,0,0,0,0,0,4,5,5,
			0,0,0,0,0,0,13,15,0,0,0,0,0,12,9,9,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,13,14,15,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,1,2,2,3,0,0,0,0,0,
			0,0,0,0,0,0,0,4,5,5,6,0,0,0,0,0,
			2,3,0,0,0,0,1,2,2,2,2,3,0,0,0,0,
			2,2,2,3,17,17,4,5,5,5,5,10,11,3,17,17,
			5,5,5,6,18,18,4,5,5,5,5,5,5,6,18,18]
		this.player = new Player()


		this.collideObject = (object) => {
			if (object.x < 0) 
				{ object.x = 0; object.velocity_x = 0; }
			else if (object.x + object.width > this.width) 
				{ object.x = this.width - object.width; object.velocity_x = 0; }
			if (object.y < 0) 
				{ object.y = 0; object.velocity_y = 0; }
			else if (object.y + object.height > this.height) 
				{ object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

		}

		this.update = () => {
			this.player.velocity_y += this.gravity
			this.player.update()
			this.player.velocity_x *= this.friction
			this.player.velocity_y *= this.friction
			this.collideObject(this.player)
		}
	}
}