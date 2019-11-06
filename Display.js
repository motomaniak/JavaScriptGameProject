class Display {
	constructor(canvas, mapCanvas){
		this.buffer = document.createElement("canvas").getContext("2d")
		this.context = canvas.getContext("2d")
		this.mapBuffer = document.createElement("canvas").getContext("2d")
		this.mapContext = mapCanvas.getContext("2d")
		this.tileImgArray = []
		this.leftWalkArray = []
		this.leftJumpArray = []
		
		for(let i = 1; i <= 8; i++){
			this.leftJumpArray[i] = new Image()
			this.leftJumpArray[i].src = "dog/Jump ("+i+").png"
		}
		for(let i = 1; i <= 10; i++){
			this.leftWalkArray[i] = new Image()
			this.leftWalkArray[i].src = "dog/Walk ("+i+").png"
		}
		for(let i = 1; i <= 19; i++){
		 	this.tileImgArray[i] = new Image()
			this.tileImgArray[i].src = "images/Tiles/"+ i + ".png"
		}
	}

	drawPlayer(x, y, width, height, color, movement) {
		let spriteImg = new Image()
		spriteImg.src = 'images/dog/Idle (1).png'
		this.buffer.drawImage(spriteImg, Math.floor(x), Math.floor(y), 50, 50)
  	}

	render(){
		this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height)
		// this.mapContext.drawImage(this.mapBuffer.canvas, 0, 0, this.mapBuffer.canvas.width, this.mapBuffer.canvas.height, 0, 0, this.mapContext.canvas.width, this.mapContext.canvas.height)
	}

	drawMap(map, columns){
		for(let index = map.length-1; index >- 1; --index){
			if(map[index] != 0){
				let dx = (index % columns) * 50
				let dy = Math.floor(index / columns) * 50
				this.buffer.drawImage(this.tileImgArray[map[index]], dx, dy, 50, 50)
			}
		}
	}

	drawBackground(){
		let backgroundImg = new Image()
		backgroundImg.src = 'images/BG/BG.png'
		this.buffer.drawImage(backgroundImg, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height)		
	}

	resize(event) {
		let height = document.documentElement.clientHeight
		let width = document.documentElement.clientWidth

		this.context.canvas.height = height
		this.context.canvas.width = width
		this.context.imageSmoothingEnabled = false;

		this.render()

	}

}
