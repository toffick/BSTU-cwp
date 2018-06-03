import React from 'react';
import './AddPointForm.scss';
import './List/Point.scss';
import TextInput from './Inputs/TextInput';
import VehicleSelector from './Inputs/VehicleSelector';
import PropTypes from 'prop-types';
import images from '../helpers/images';

export default class AddPointForm extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			point: {
				vehicle: 'bus'
			},
			isAllReady: false,
			readyToCreateMap: {
				vehicle: true
			}
		}
	}

	toggleFormHandler = () => {
		this.setState({ isShownForm: !this.state.isShownForm });
	};

	onChangeHandler = (data) => {
		this.setState({
			point: { ...this.state.point, ...data },
			readyToCreateMap: { ...this.state.readyToCreateMap, ...data }
		});
	};

	onCreateHandler = (e) => {
		e.preventDefault();
		if (Object.keys(this.state.readyToCreateMap).length !== 3) {
			return;
		}

		this.props.addPoint(this.state.point);
	};

	render() {
		return (
			<div>
				<img src={images.add} className="add center-item" onClick={this.toggleFormHandler} height={32}/>
				{
					this.state.isShownForm &&
					<form className="center-item add-form point" onSubmit={this.onCreateHandler}>
						<VehicleSelector vehicle={this.state.point.vehicle} onChange={this.onChangeHandler}/>
						<TextInput name="Name" text="Enter name" onChange={this.onChangeHandler}/>
						<TextInput name="Time" text="Enter time" onChange={this.onChangeHandler}/>
						<input type="submit" content="Add"/>
					</form>
				}
			</div>
		);
	}

}

AddPointForm.propTypes = {
	addPoint: PropTypes.func
};
