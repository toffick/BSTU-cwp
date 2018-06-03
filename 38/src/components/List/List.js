import React from 'react';
import './List.scss';
import PropTypes from 'prop-types';
import Point from './Point';
import images from "../../helpers/images";

export default class List extends React.Component {

	componentDidMount() {
		this.props.getAllPoints();
	}

	_getPointsList = () => {
		return this.props.points.map(point => (
				<Point
					key={point.id}
					id={point.id}
					vehicle={point.vehicle}
					name={point.name}
					time={point.time}
					onDelete={this.props.deletePoint}
					onChange={this.props.changePoint}
				/>
			)
		)
	};

	render() {
		return (
			<div className="list center-item">
				{this._getPointsList()}
			</div>
		)
	}
}

List.propTypes = {
	points: PropTypes.arrayOf(PropTypes.object),
	getAllPoints: PropTypes.func.isRequired,
	deletePoint: PropTypes.func.isRequired,
	changePoint: PropTypes.func.isRequired,
};

List.defaultProps = {
	points: [],
};
