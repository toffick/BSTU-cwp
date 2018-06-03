import React from 'react';
import PropTypes from "prop-types";

export default class TextInput extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text ? this.props.text : '',
			isEditing: false,
			readyToUpdate: false
		};

	}


	_save = () => {
		if (this.state.readyToUpdate) {
			this.props.onChange({ [this.props.name.toLowerCase()]: this.state.text });
		}

		this._toggleEditing();
	};

	_onChange = (event) => {
		let readyToUpdate = false;
		if (event.target.value !== this.state.text) {
			readyToUpdate = true;
		}

		this.setState({
			text: event.target.value,
			readyToUpdate
		});
	};

	_toggleEditing = (e) => {
		this.setState({ isEditing: !this.state.isEditing, readyToUpdate: false });
	};

	render() {
		if (this.state.isEditing)
			return (
				<div>
					<label htmlFor={this.props.name}>{this.props.name}  </label>
					<input name={this.props.name}
						   placeholder={this.props.placeholder}
						   value={this.state.text}
						   onChange={this._onChange}
						   onBlur={this._save}
						   autoFocus={1}
					/>
				</div>
			);

		return (<span onDoubleClick={this._toggleEditing}>{this.state.text}</span>)
	}

}

TextInput.propTypes = {
	text: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
	text: '',
	isChangedStart: false
};
