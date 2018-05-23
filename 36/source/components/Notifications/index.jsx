import React from 'react';
import Notification from "./Item";

export default class Notifications extends React.Component {
	render() {
		return (
			<div className='notifications_container'>
				{this.props.notifications.map(item => (
					<Notification notification={item}/>))}
			</div>
		);
	}
}
