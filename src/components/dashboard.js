import React from 'react';
import {connect} from 'react-redux';

import SpacedRepetition from './spaced-repetition';
import requiresLogin from './requires-login';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
	componentDidMount() {
		console.log(this.props.current);
		this.props.dispatch(fetchQuestion(this.props.current));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
                    Username: {this.props.username}
				</div>
				<div className="dashboard-name">Name: {this.props.name}</div>
				<SpacedRepetition/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.firstname} ${currentUser.lastname}`,
		questions: state.auth.currentUser.questions,
		current: state.auth.currentUser.questions.current
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
