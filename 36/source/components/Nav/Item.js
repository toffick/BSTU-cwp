import React from 'react';

export default class NavItem extends React.PureComponent {
	constructor(props) {
		super(props);

		this._navigate = this._navigate.bind(this);
	}

	render() {
		return (
			<div className={'nav__item' + (this.props.isActive ? ' nav__item_active' : '')} onClick={this._navigate}>
				{this.props.link.title}
			</div>
		);
	}

	_navigate() {
		this.props.navigate(this.props.link)
	}
}
