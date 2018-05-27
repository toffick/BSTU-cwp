import { List } from 'immutable';

export default class NavModel {
	constructor() {
		this.links = List([
			{ title: 'All' },
			{ title: 'Active' },
			{ title: 'Completed' }
		]);

		this.active = this.links.get(0);
	}

	getLinks() {
		return this.links;
	}

	getActive() {
		return this.active;
	}

	setActive(link) {
		this.active = link;
	}
}
