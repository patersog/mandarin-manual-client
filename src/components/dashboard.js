import React from 'react';
import {connect} from 'react-redux';

import SpacedRepetition from './spaced-repetition';
import requiresLogin from './requires-login';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
	componentDidMount() {
		/** Should add a 'prompt' to the questions reducer state */
		this.props.dispatch(fetchQuestion(this.props.username));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
                    Username: {this.props.username}
				</div>
				<div className="dashboard-name">
                    Name: {this.props.name}
				</div>
				<SpacedRepetition />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.firstname} ${currentUser.lastname}`,
		prompt: state.question.prompt
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
