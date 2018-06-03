import React from 'react';
import './Info.scss';
import PropTypes from 'prop-types';

export default class Info extends React.Component {

	_getPointsNumber = () => {
		return this.props.points.length;
	};

	_getTotalTime = () => {
		return this.props.points.reduce((a, b) => b.time + a, 0);
	};

	_getAllVehicles() {
		const vehiclesMap = {};
		const allVehiclesArray = [];

		this.props.points.forEach(({ vehicle }) => {
			if (!vehiclesMap[vehicle]) {
				vehiclesMap[vehicle] = vehicle;
				allVehiclesArray.push(vehicle);
			}
		})

		return allVehiclesArray.join(', ');
	}

	render() {
		return (
			<table className="info center-item">
				<thead>
				<tr>
					<td>Points number</td>
					<td>Total time</td>
					<td>Types of vehicles</td>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>{this._getPointsNumber()}</td>
					<td>{this._getTotalTime()} sec</td>
					<td>{this._getAllVehicles()}</td>
				</tr>
				</tbody>
			</table>
		)
	}
}

Info.propTypes = {
	points: PropTypes.arrayOf(PropTypes.object),
};


Info.defaultProps = {
	points: [],
};
