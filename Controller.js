class Controller {
	constructor(){
		this.left = {}
		this.right = {}
		this.up = {}
		this.q = {}
		this.r = {}

		this.keyEvent = (type, event)=>{
			let down = (type == "keydown") ? true : false
			if(event == 'ArrowLeft' && down){
				this.left.active = true
			}else if(event == "ArrowRight" && down){
				this.right.active = true
			}else if(event == "ArrowUp" && down){
				this.up.active = true
			}else if(event == "q" && down){
				this.q.active = true
			}else if(event == "r" && down){
				this.r.active == true
			}

		}
	}

}
