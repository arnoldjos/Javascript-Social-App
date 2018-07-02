import React, { Component } from 'react';

import Aux from './Auxil';
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Navigation/Footer';

class Layout extends Component {
	render() {
		return (
			<Aux>
				<Navbar />
				{this.props.children}
				<Footer />
			</Aux>
		);
	}
}

export default Layout;
