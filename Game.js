class Game {
	constructor(){
		this.world = {
			map: [
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,22,
			2,2,2,3,0,0,0,0,0,13,14,15,0,1,2,2,
			9,9,9,16,0,0,0,0,0,0,0,0,0,4,5,5,
			0,0,0,0,0,0,13,15,0,0,0,0,0,12,9,9,
			0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,
			0,0,13,14,15,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,1,2,2,3,0,0,0,0,0,
			20,0,0,0,0,0,0,4,5,5,6,0,0,0,0,0,
			2,3,0,21,0,0,1,2,2,2,2,3,0,0,0,0,
			2,2,2,3,17,17,4,5,5,5,5,10,11,3,17,17,
			5,5,5,6,18,18,4,5,5,5,5,5,5,6,18,18],
			collisionTileMap: [],
			friction: .9,
			gravity: 3,
			player: new Player(),
			height: 800,
			width: 800,
			score: 0,
			collidePlayerObject: function(playerObject){
				//Making sure our player stays in the bounds of the game/canvas
				if (playerObject.x < 0){ 
					playerObject.x = 0
					playerObject.velocity_x = 0
				}
      			else if (playerObject.x + playerObject.width > this.width){ 
      				playerObject.x = this.width - playerObject.width; 
      				playerObject.velocity_x = 0; 
      			}
      			if (playerObject.y < 0){ 
      				playerObject.y = 0
      				playerObject.velocity_y = 0; 
  				}
      			else if(playerObject.y + playerObject.height > this.height){ 
      				playerObject.jumping = false 
      				playerObject.y = this.height - playerObject.height 
      				playerObject.velocity_y = 0 
      			}
      			

      			/*Doing collision check for the player agaist all items 
				 *that it can't travel through using vector collision detection
				 *
				 *
				 *
				 *
      			 */
      			for(let tileObject of this.collisionTileMap){
      				let vectorX = (playerObject.x + (playerObject.width/2)) - (tileObject.x + (tileObject.width/2))
      				let vectorY = (playerObject.y + (playerObject.height/2)) - (tileObject.y + (tileObject.height/2))
      				let halfWidth = (playerObject.width/2) + (tileObject.width/2)
      				let halfHeight = (playerObject.height/2) + (tileObject.height/2)

      				let direction = ""
      				if(Math.abs(vectorX) < halfWidth && Math.abs(vectorY) < halfHeight){
      					let offsetX = halfWidth - Math.abs(vectorX)
      					let offsetY = halfHeight - Math.abs(vectorY)
      					if(offsetX >= offsetY){
      						if(vectorY > 0){
      							direction = "top"
      							playerObject.y += offsetY
      						}else{
      							direction = "bottom"
      							playerObject.y -= offsetY
      						}
      					}else{
      						if(vectorX > 0){
      							direction = "left"
      							playerObject.x += offsetX
      						}else{
      							direction = "right"
      							playerObject.x -= offsetX
      						}
      					}
      					
      					if(tileObject.action == "die"){
      						alert("GAME OVER")
      						location.reload()
      					}

      					if(tileObject.action == "collect"){
      						this.score += 1
      						this.map[tileObject.index] = 0
      						direction = ""
      						playerObject.jumping = true
      					}

      					if(tileObject.action == "win"){
      						alert("Yay! YOU WIN!!! :):):)")
      						location.reload()
      					}
      					
      				}

      				if(direction == "right" || direction == "left"){
      					playerObject.velocity_x = 0
      					playerObject.jumping = false
      				}else if(direction == "bottom"){
      					playerObject.velocity_y = 0
      					playerObject.jumping = false
      				}else if(direction == "top"){
      					playerObject.velocity_y *= -1
      				}
      			}
			},

			update: function() {
				this.player.velocity_y += this.gravity
				this.player.update()
				this.player.velocity_x *= this.friction
				this.player.velocity_y *= this.friction
				this.collidePlayerObject(this.player)
			}

		}

		this.update = () => {
			this.world.update()
		}
  	}
}
