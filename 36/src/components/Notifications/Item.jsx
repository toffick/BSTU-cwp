import React from 'react';

export default class Notification extends React.PureComponent {
	render() {
		const { task, error } = this.props.notification;
		return error ?
			(<div className='notification_item reject_add'>
				The task {task.id}({task.text.slice(0,10)}...) was not added to the task list
			</div>)
			:
			(<div className='notification_item success_add'>
					The task {task.id}({task.text.slice(0,10)}...) was successfully added to the list
				</div>
			);
	}
}
