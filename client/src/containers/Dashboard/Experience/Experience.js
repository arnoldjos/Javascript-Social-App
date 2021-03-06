import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../../store/actions';

class Experience extends Component {
	onDeleteClick = id => {
		this.props.deleteExperience(id);
	};

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Present'
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={() => this.onDeleteClick(exp._id)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		deleteExperience: id => dispatch(deleteExperience(id))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Experience);
