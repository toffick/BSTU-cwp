import React from 'react';

export default class Popup extends React.PureComponent {
	render() {
		return (
			<div className='popup'>
				<div className='popup_inner'>
					<h1>{this.props.text}</h1>
					<button onClick={this.props.complete}>Yes</button>
					<button onClick={this.props.closePopup}>No</button>
				</div>
			</div>
		);
	}
}
