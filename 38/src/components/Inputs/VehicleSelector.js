import images from '../../helpers/images';
import React from 'react';
import PropTypes from 'prop-types';

export default class VehicleSelector extends React.Component {
	constructor(props) {
		super(props);

		this.options = ['bike', 'walk', 'car', 'bus'];
		this.state = {
			value: this.props.vehicle,
			isEditing: false,
			readyToUpdate: false
		};
	}

	_getOptions = () => {
		return this.options.map((item, index) => (<option key={index} value={item}>{item}</option>))
	};

	_save = () => {
		if (this.state.readyToUpdate) {
			this.props.onChange({ vehicle: this.state.value });
		}

		this._toggleEditing();
	};

	_onChange = (event) => {
		let readyToUpdate = false;
		if (event.target.value !== this.state.value) {
			readyToUpdate = true;
		}

		this.setState({
			value: event.target.value,
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
					<select
						value={this.state.value}
						onChange={this._onChange}
						onBlur={this._save}
						autoFocus={1}
					>
						{this._getOptions()}

					</select>
				</div>
			);

		return (<img src={images[this.props.vehicle]} onDoubleClick={this._toggleEditing} height={64}/>)
	}
}

VehicleSelector.propTypes = {
	vehicle: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

VehicleSelector.defaultProps = {
	vehicle: 'walk',
};
