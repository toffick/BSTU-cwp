import React from 'react';

export default class ToDoClear extends React.PureComponent {
	render() {
		return (
			<div className="todo__clear"
				 onClick={this.props.removeCompleted}>
				Clear
			</div>
		);
	}
}
