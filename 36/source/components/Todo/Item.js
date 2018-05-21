import React from 'react';
import ToDoTextInput from "./TextInput";
import Popup from "../Popup";

export default class ToDoItem extends React.Component {
	constructor(props) {
		super(props);

		this._edit = this._edit.bind(this);
		this._save = this._save.bind(this);
		this._toggleItem = this._toggleItem.bind(this);
		this._removeItem = this._removeItem.bind(this);
		this._togglePopup = this._togglePopup.bind(this);

		this.state = {
			isEditing: false,
			popup: false,
		};

	}

	render() {
		const text = this.state.isEditing
			? (
				<ToDoTextInput className="todo__text todo__text_editing"
							   text={this.props.task.text}
							   onSave={this._save}/>
			)
			: (
				<span className={'todo__text' + (this.props.task.completed ? ' todo__text_completed' : '')}
					  onDoubleClick={this._edit}>{this.props.task.text}</span>
			);

		return (
			<div className="todo__item">
				<input type="checkbox" className="todo__checkbox"
					   checked={this.props.task.completed}
					   onChange={this._toggleItem}/>
				<span className="todo__destroy"
					  onClick={this._togglePopup}>-</span>
				{' '}
				{text}
				{this.state.popup ?
					<Popup
						text="Do you sure?"
						complete={this._removeItem}
						closePopup={this._togglePopup}
					/>
					: null
				}
			</div>
		);
	}

	_edit() {
		this.setState({ isEditing: true });
	}

	_save(text) {
		this.setState({ isEditing: false });
		this.props.updateItem(this.props.task.id, text);
	}

	_toggleItem() {
		this.props.toggleItem(this.props.task.id);
	}

	_removeItem() {
		this.props.removeItem(this.props.task.id);
	}

	_togglePopup() {

		this.setState({ popup: !this.state.popup })
	}
}
