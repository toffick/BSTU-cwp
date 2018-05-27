import React from 'react';

export default class ToDoClear extends React.PureComponent {

	shouldComponentUpdate(){
		return false;
	}

	render() {
		return (
			<div className="todo__clear"
				 onClick={this.props.removeCompleted}>
				Clear
			</div>
		);
	}
}
