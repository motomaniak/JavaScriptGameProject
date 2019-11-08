window.addEventListener("load", function(event) {
	"use strict";
	let columns = 16
	let render = function() {
		display.drawBackground()
		display.drawTileMap(game.world.map, columns)
    	display.drawPlayer(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.movement)   	
    	display.drawScore(game.world.score)
    	display.render()
	}



	let update = function() {
		if(controller.left.active){
			game.world.player.moveLeft()
			controller.left.active = false
		}
		if(controller.right.active){
			game.world.player.moveRight()
			controller.right.active = false
		}
		if(controller.up.active){
			game.world.player.jump()
			controller.up.active  = false
		}
		if(controller.q.active)
			engine.stop()
		if(controller.r.active){
			location.reload(true)
		}
		
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
    /* The game holds our game logic. */
    let game = new Game();
    /* The display handles window resizing, as well as the on screen canvas. */
    let display = new Display(document.querySelector("canvas"), game);
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