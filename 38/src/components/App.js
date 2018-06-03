import React from 'react';

import Layout from './Layout';
import List from '../containers/List';
import './App.scss'
import PropTypes from 'prop-types';
import AddPointForm from '../containers/AddPointForm';
import Info from '../containers/Info';
import TimeTravelPanel from '../containers/TimeTravelPanel';

export default class App extends React.Component {

	render() {
		return (
			<Layout>
				<TimeTravelPanel undo={this.props.undo} redo={this.props.redo} canUndo={this.props.canUndo} canRedo={this.props.canRedo} />
				<Info />
				<List/>
				<AddPointForm onAdd={this.props.addPoint}/>
			</Layout>

		);
	}

}

App.propTypes = {
	undo: PropTypes.func,
	redo: PropTypes.func,
	canUndo: PropTypes.bool,
	canRedo: PropTypes.bool,
	addPoint: PropTypes.func
};
