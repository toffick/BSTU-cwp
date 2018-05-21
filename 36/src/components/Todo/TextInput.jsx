import React from 'react';

export default class ToDoTextInput extends React.PureComponent {
	constructor(props) {
		super(props);

		this._save = this._save.bind(this);
		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);

		this.state = {
			text: this.props.text ? this.props.text : ''
		};
	}

	render() {
		return (
			<input className={this.props.className}
				   placeholder={this.props.placeholder}
				   value={this.state.text}
				   onChange={this._onChange}
				   onKeyDown={this._onKeyDown}/>
		);
	}

	_save() {
		this.props.onSave(this.state.text);
		this.setState({ text: '' });
	}

	_onChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	_onKeyDown(event) {
		if (event.keyCode !== 13) return;

		this._save();
	}
}
