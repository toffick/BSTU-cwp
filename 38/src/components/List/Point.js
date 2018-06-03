import React from 'react';
import './Point.scss';
import PropTypes from 'prop-types';
import VehicleSelector from '../Inputs/VehicleSelector'
import images from '../../helpers/images';
import TextInput from '../Inputs/TextInput';

export default class Point extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
		};
	}

	onDeleteHandler = (e) => {
		this.props.onDelete(this.props.id);
	};

	onChange = (data) => {
		this.props.onChange(this.props.id, data);
	};


	render() {
		return (
			<div>
				<span className="delete" onClick={this.onDeleteHandler}><img src={images.delete} height={32}/></span>

				<div className="point">
					<VehicleSelector vehicle={this.props.vehicle} onChange={this.onChange}/>
					<TextInput text={this.props.name} name="Name" onChange={this.onChange}/>
					<TextInput text={this.props.time.toString()} name="Time" onChange={this.onChange}/>
				</div>
				<span style={{position: 'relative', paddingLeft: '50%'}}><img src={images.down} height={32}/></span>
			</div>
		)
	}
}

Point.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	vehicle: PropTypes.string.isRequired,
	time: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onDelete: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};
