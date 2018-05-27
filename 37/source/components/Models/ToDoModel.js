import { List } from "immutable";

export default class ToDoModel {
	constructor() {
		this.list = List([]);
	}

	getItems() {
		return this.list;
	}

	getActiveItems() {
		return this.list.filter(x => !x.completed);
	}

	getCompletedItems() {
		return this.list.filter(x => x.completed);
	}

	getActiveCount() {
		return this.list.filter(x => !x.completed).size;
	}

	getCompletedCount() {
		return this.list.filter(x => x.completed).size;
	}

	addItem(text) {
		let item = {
			id: Date.now() + this.list.size,
			text: text,
			completed: false
		};

		this.list = this.list.push(item);

		return item;
	}

	removeItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list = this.list.splice(index, 1);
	}

	removeCompleted() {
		this.list = this.getActiveItems();
	}

	updateItem(id, text) {
		let index = this.list.findIndex(x => x.id === id);
		this.list = this.list.update(index, val=> ({...val, text}));
	}

	toggleItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list = this.list.update(index, val=> ({...val, completed: !val.completed}));
		// this.list = this.list.setIn([index, 'completed'], true); doesn't work
	}

	switchAllTo(completed) {
		this.list = this.list.map(value => ({...value, completed}));
	}
}
