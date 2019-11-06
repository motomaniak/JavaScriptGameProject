class Game {
	constructor(){
		this.world = {
			map: [
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
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
			5,5,5,6,18,18,4,5,5,5,5,5,5,6,18,18],

			collisonMap: [
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			1,1,1,2,0,0,0,0,4,4,0,0,0,1,2,2,
			11,11,11,9,0,0,0,0,0,0,0,0,0,13,4,4,
			0,0,0,0,0,0,4,4,0,0,0,0,0,12,11,11,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			1,1,0,0,0,0,7,1,1,1,1,2,0,0,0,0,
			1,1,1,2,17,17,0,0,0,0,0,0,1,2,17,17,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

			friction: .9,
			gravity: 3,
			player: new Player(),
			height: 800,
			width: 800,
			collideObject: function(object){
				let x = Math.floor(object.x / 50)
				let y = Math.floor(object.y / 50)
				let height = object.height
				let width = object.width
				let index = y * 16 + x + 1
				// console.log("x: " + object.x + " y: " + object.y + " index: " + index)

				if([1,2,3,4,5,6,7].includes(this.collisonMap[index + 16])){
					object.y = object.prevY
					object.velocity_y = 0
					object.jumping = false
				}

				if([2,8,9,10,4].includes(this.collisonMap[index - 1])){
					object.x = object.prevX
					object.velocity_x = 0
				}

				if([4,6,7,10,12,13].includes(this.collisonMap[index + 1])){
					object.x = object.prevX
					object.velocity_x = 0
				}

				if([3,4,5,6,9,10].includes(this.collisonMap[index - 16])){
					object.y = object.prevY
					object.velocity_y = 0
					object.jumping = false
				}


				if (object.x < 0) 
					{ object.x = 0; object.velocity_x = 0; }
      			else if (object.x + object.width > this.width) 
      				{ object.x = this.width - object.width; object.velocity_x = 0; }
      			if (object.y < 0) 
      				{ object.y = 0; object.velocity_y = 0; }
      			else if (object.y + object.height > this.height) 
      				{ object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

			},

			update: function() {
				this.player.velocity_y += this.gravity
				this.player.update()
				this.player.velocity_x *= this.friction
				this.player.velocity_y *= this.friction
				this.collideObject(this.player)
			}

		}

		this.update = () => {
			this.world.update()
		}
  	}
}
