import React from 'react';
import './TimeTravelPanel.scss';
import PropTypes from "prop-types";

export default class TimeTravelPanel extends React.Component {
	render() {
		return (
			<div className="time-panel">
				<div className={'time-panel__button ' + (this.props.canUndo ? '' : 'time-panel__button_disabled')} onClick={this.props.undo}>Undo</div>
				<div className={'time-panel__button ' + (this.props.canRedo ? '' : 'time-panel__button_disabled')} onClick={this.props.redo}>Redo</div>
			</div>
		)
	}
}

TimeTravelPanel.propTypes = {
	undo: PropTypes.func.isRequired,
	redo: PropTypes.func.isRequired,
	canUndo: PropTypes.bool.isRequired,
	canRedo: PropTypes.bool.isRequired,
};
