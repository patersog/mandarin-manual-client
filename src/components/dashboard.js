import React from 'react';
import { connect } from 'react-redux';
import './styles/dashboard.css';


import SpacedRepetition from './spaced-repetition';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
          Username: {this.props.username}
				</div>
				<div className="dashboard-name">
          Name: {this.props.name}
				</div>
				<SpacedRepetition username={this.props.username} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.firstname} ${currentUser.lastname}`,
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
