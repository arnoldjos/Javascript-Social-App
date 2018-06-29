import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			password2: ''
		};
	}

	componentDidMount() {
		if (this.props.auth.path !== '/') {
			this.props.initAuthPath();
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser);
	};

	render() {
		const { errors } = this.props;

		let loginRedirect = null;
		if (this.props.auth.path !== '/') {
			loginRedirect = <Redirect to={this.props.auth.path} />;
		}

		return (
			<div className="register">
				{loginRedirect}
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your DevConnector account
							</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.name
										})}
										placeholder="Name"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
									/>
									{errors.name && (
										<div className="text-danger">{errors.name}</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
									{errors.email && (
										<div className="text-danger">{errors.email}</div>
									)}
									<small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use
										a Gravatar email
									</small>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
									{errors.password && (
										<div className="text-danger">{errors.password}</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password2
										})}
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onChange}
									/>
									{errors.password2 && (
										<div className="text-danger">{errors.password2}</div>
									)}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: userData => dispatch(actions.registerUser(userData)),
		initAuthPath: path => dispatch(actions.initAuthPath(path))
	};
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
