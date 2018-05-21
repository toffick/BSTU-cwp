export default class NavModel {
	constructor() {
		this.links = [
			{ title: 'All' },
			{ title: 'Active' },
			{ title: 'Completed' }
		];

		this.active = this.links[0];
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
