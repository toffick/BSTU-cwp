import React from 'react';
import ToDoTextInput from "./TextInput";

export default class ToDoForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this._save = this._save.bind(this);
	}

	render() {
		return (
			<div className="todo__form">
				<ToDoTextInput
					className="todo__text-input"
					placeholder="I need to do..."
					onSave={this._save}/>
			</div>
		);
	}

	_save(text) {
		this.props.addItem(text);
	}
}
