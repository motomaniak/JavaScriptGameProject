class GameEngine {
	constructor(timeStep, update, render) {
		this.totalTime = 0
		this.animateFrameRequest = undefined
		this.time = undefined 
		this.timeStep = timeStep
		this.updated = false
		this.update = update
		this.render = render

		this.run = (timeStamp) => {
			this.totalTime += timeStamp - this.time
			
			if (this.totalTime >= this.timeStep * 3) {
      			this.totalTime = this.timeStep
    		}
			
			while(this.totalTime >= this.timeStep){
				this.totalTime -= this.timeStep
				this.update(timeStamp)
				this.updated = true
			}

			if(this.updated){
				this.updated = false
				this.render(timeStamp)
			}

			this.animateFrameRequest = window.requestAnimationFrame(this.handleRun)
		}

		this.handleRun = (timeStep) => {
			this.run(timeStep)
		}

	}

	

	start(){
		this.totalTime = this.timeStep
		this.time = window.performance.now()
		this.animateFrameRequest = window.requestAnimationFrame(this.handleRun)
	}

	stop(){
		window.cancelAnimationFrame(this.animateFrameRequest)
	}
}