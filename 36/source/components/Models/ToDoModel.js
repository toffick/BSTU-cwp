export default class ToDoModel {
	constructor() {
		this.list = [];
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
		return this.list.filter(x => !x.completed).length;
	}

	getCompletedCount() {
		return this.list.filter(x => x.completed).length;
	}

	addItem(text) {
		let item = {
			id: Date.now() + this.list.length,
			text: text,
			completed: false
		};

		this.list.push(item);

		return item;
	}

	removeItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list.splice(index, 1);
	}

	removeCompleted() {
		this.list = this.getActiveItems();
	}

	updateItem(id, text) {
		let index = this.list.findIndex(x => x.id === id);
		this.list[index].text = text;
	}

	toggleItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list[index].completed = !this.list[index].completed;
	}

	switchAllTo(completed) {
		this.list.forEach(x => x.completed = completed);
	}
}
