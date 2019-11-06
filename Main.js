window.addEventListener("load", function(event) {

	let render = function() {
		display.drawBackground()
		display.drawMap(game.world.map, 16)
    	display.drawPlayer(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.movement, game.world.player.leftIndex, game.world.player.rightIndex)
    	
    	display.render()
	}



	let update = function() {
		if(controller.left.active){
			game.world.player.moveLeft(game.world.player.leftIndex)
			game.world.player.movingLeft = false
			controller.left.active = false
		}
		if(controller.right.active){
			game.world.player.moveRight(game.world.player.rightIndex)
			game.world.player.movingRight = false
			controller.right.active = false
		}
		if(controller.up.active){
			game.world.player.jump()
			controller.up.active  = false
		}
		if(controller.q.active)
			engine.stop()
		if(controller.r.active)
			engine.start()
		
		game.update()

	}

	let keyEvent = function(event){
		controller.keyEvent(event.type, event.key)
	}

	let resize = function(event) {
    	display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
    	display.render();
	}

	let world = new World()
    /* The controller handles user input. */
    let controller = new Controller();

    /* The display handles window resizing, as well as the on screen canvas. */
    let display = new Display(document.querySelector("#ui-layer"), document.querySelector("#background-layer"));
    /* The game will eventually hold our game logic. */
    let game = new Game();
    /* The engine is where the above three sections can interact. */
    let engine = new GameEngine(1000/30, render, update);

    display.buffer.canvas.height = game.world.height
    display.buffer.canvas.width = game.world.width

    window.addEventListener("resize",  resize);
    window.addEventListener("keydown", keyEvent);
    window.addEventListener("keyup",   keyEvent);

    resize();
    engine.start();

});