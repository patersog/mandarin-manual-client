import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, fetchAnswer, updateQuestions } from '../actions/questions';
import './styles/header-bar.css';

export class SpacedRepetition extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			username: props.username
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getNextQuestion = this.getNextQuestion.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchQuestion(this.state.username));
	}

	handleSubmit(e) {
		e.preventDefault();
		const { userInput, username } = this.state;
		this.props.dispatch(fetchAnswer(userInput, username));
		this.setState({ userInput: '' });
	}

	handleChange(e) {
		const userInput = e.target.value;
		this.setState({ userInput });
	}

	getNextQuestion() {
		const { username } = this.state;
		const { correct } = this.props;
		this.props.dispatch(updateQuestions(username, correct))
			.then(() => {
				console.log('fetching next question...');
				this.props.dispatch(fetchQuestion(username));
			});
	}

	render() {
		const nextButton = this.props.hasAnswered
			? <div><button className='next-button' type="button" onClick={this.getNextQuestion}>next</button>{this.props.correct ? 'Nice One!' : 'Incorrect'}</div> : undefined;
		return (
			<div>
				<div>
					{this.props.isLoading ? <p>Loading</p> : <p> Question: {this.props.prompt} </p>}
				</div>
				<form className='form-input' onSubmit={this.handleSubmit}>
					<div>
						<label><input id='text-input' type='text' title='answer' onChange={this.handleChange} /></label>
						<button className='login-button' type='submit' onClick={this.onSubmit}>
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
		hasAnswered: state.question.hasAnswered,
		isLoading: state.question.loading,
		error: state.question.error,
	};
};

export default requiresLogin()(connect(mapStateToProps)(SpacedRepetition));