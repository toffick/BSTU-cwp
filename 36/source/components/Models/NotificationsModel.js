export default class NotificationsModel {
	constructor() {
		this.closeTimeout = 5000;
		this.notifications = [];
	}

	getNotifications() {
		return this.notifications;
	}

	push(task, error, cb) {
		const timerId = setTimeout(() => {
			this.notifications = this.notifications.filter(item => item.task.id !== task.id);
			cb()
		}, this.closeTimeout);

		this.notifications.push({ task, timerId, error });
	}
}
