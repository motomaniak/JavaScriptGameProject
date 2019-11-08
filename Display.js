class Display {
	constructor(canvas, game){
		this.buffer = document.createElement("canvas").getContext("2d")
		this.context = canvas.getContext("2d")
		this.tileImgArray = []
		this.leftWalkArray = []
		this.leftJumpArray = []
		this.game = game
		this.size = 50 
		this.time = 0
		
		for(let i = 1; i <= 25; i++){
		 	this.tileImgArray[i] = new Image()
			this.tileImgArray[i].src = "images/Tiles/"+ i + ".png"
		}
	}

	drawPlayer(x, y, width, height, movement) {
		let spriteImg = new Image()
		spriteImg.src = 'images/dog/Idle (1).png'
		this.buffer.drawImage(spriteImg, Math.floor(x), Math.floor(y), this.size, this.size)
  	}

  	drawScore(score) {
	    this.buffer.font = "30px Arial";
	    this.buffer.fillStyle = "purple";
	    this.buffer.fillText("Score: "+ score, 20, 30);
	    this.buffer.fillText("Time: " + Math.ceil(((this.time+1)/10)*10/1000) + " seconds", 200, 30)
	}

	render(){
		this.context.beginPath()
		this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height)
	}

	drawTileMap(map, columns){
		this.game.world.collisionTileMap = []
		for(let index = 0; index <= map.length-1; index++){
			if(map[index] != 0){
				let dx = (index % columns) * this.size
				let dy = Math.floor(index / columns) * this.size

				//Keeping track of our tiles that the player interacts with or 
				//can collide with 
				if([1,2,3,4,13,14,15,11].includes(map[index]))
					this.game.world.collisionTileMap.push({x: dx, y: dy, height: this.size, width: this.size, action: "none"})
				if(map[index] == 19 || map[index] == 21)
					this.game.world.collisionTileMap.push({x: dx, y: dy, height: this.size, width: this.size, action: "collect", index: index})
				if(map[index] == 17)
					this.game.world.collisionTileMap.push({x: dx, y: dy, height: this.size, width: this.size, action: "die"})
				if(map[index] == 22)
					this.game.world.collisionTileMap.push({x: dx, y: dy, height: this.size, width: this.size, action: "win"})
				if(map[index] == 24)
					this.buffer.drawImage(this.tileImgArray[map[index]], dx, dy, this.size * 2, this.size * 5)
				else
					this.buffer.drawImage(this.tileImgArray[map[index]], dx, dy, this.size, this.size)
			}
		}
	}

	drawBackground(){
		let backgroundImg = new Image()
		backgroundImg.src = 'images/BG/BG.png'
		this.buffer.drawImage(backgroundImg, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height)		
	}

	resize(event) {
		//handle responsive design here
		let height = document.documentElement.clientHeight
		let width = document.documentElement.clientWidth

		this.context.canvas.height = height
		this.context.canvas.width = width
		this.context.imageSmoothingEnabled = false;

		this.render()

	}

}
