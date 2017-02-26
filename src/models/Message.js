import {EventEmitter} from 'fbemitter';

const emitter = new EventEmitter();

var Message = {
	data: [],

	init(data){
		this.data = data;
	
	},

	getData(){
		return this.data;
	},

	addListener(eventType: string, fn: Function) {
	    emitter.addListener(eventType, fn);
	},

	emit(eventType: string, data){
		emitter.emit(eventType, data);
	}

}

export default Message;