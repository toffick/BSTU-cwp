import { List } from "immutable";

export default class NotificationsModel {
	constructor() {
		this.closeTimeout = 5000;
		this.notifications = List([])
	}

	getNotifications() {
		return this.notifications;
	}

	push(task, error, cb) {
		const timerId = setTimeout(() => {
			this.notifications = this.notifications.filter(item => item.task.id !== task.id);
			cb()
		}, this.closeTimeout);

		this.notifications = this.notifications.push({ task, timerId, error });
	}
}
