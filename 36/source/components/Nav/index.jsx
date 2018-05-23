import React from 'react';
import NavItem from "./Item";

export default class Nav extends React.PureComponent {
	render() {
		const items = this.props.links.map((link) => {
			return (
				<NavItem key={link.title} link={link}
						 navigate={this.props.navigate}
						 isActive={link.title === this.props.activeLink.title}/>
			)
		});

		return (
			<div className="nav">
				{items}
			</div>
		);
	}
}
