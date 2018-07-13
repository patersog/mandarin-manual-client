import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, fetchAnswer, updateQuestions } from '../actions/questions';

export class SpacedRepetition extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			userInput: '',
			hasAnswered: false,
			username: props.username
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
	}

	componentDidMount() {
		/** Should add a 'prompt' to the questions reducer state */
		this.props.dispatch(fetchQuestion(this.state.username));
	}

	handleSubmit(e) {
		e.preventDefault();
		const {userInput, username} = this.state;
		this.props.dispatch(fetchAnswer(userInput, username))
			.then(() => {
				this.setState({hasAnswered: true});
			});
	}

	handleChange(e) {
		const userInput = e.target.value;
		this.setState({userInput});
	}

	nextQuestion() {
		const{username} = this.state;
		return this.props.dispatch(updateQuestions(username))
			.then(() => {
				return this.setState({hasAnswered: false});
			})
			.then(() => {
				this.props.dispatch(fetchQuestion(username));
			});
	}

	render() {
		const nextButton = this.state.hasAnswered
			? <div><button type="button" onClick={this.nextQuestion}>next</button>{this.props.correct ?'Nice One!' : 'Incorrect'}</div> : undefined;
		return (
			<div>
				<div>
					{this.props.isLoading ? <p>Loading</p> : <p> Question: {this.props.prompt} </p>}
				</div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label><input id='text-input' type='text' title='answer' onChange={this.handleChange}/></label>
						<button type='submit' onClick={this.onSubmit}>
						Submit
						</button>
					</div>
					{nextButton}
				</form>
				<div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		prompt: state.question.prompt,
		correct: state.question.correct,
		isLoading: state.question.loading,
		error: state.question.error,
	};
};

export default requiresLogin()(connect(mapStateToProps)(SpacedRepetition));