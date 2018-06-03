import React from 'react';
import Header from "./Header";
import './Layout.scss';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="app">
				<Header/>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}
