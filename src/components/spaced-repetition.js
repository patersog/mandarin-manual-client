import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import requiresLogin from './requires-login';
import { fetchQuestion, fetchAnswer } from '../actions/questions';
// import Input from './input.js';

export class SpacedRepetition extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userInput: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
	}

	componentDidMount() {
		/** Should add a 'prompt' to the questions reducer state */
		this.props.dispatch(fetchQuestion(this.props.username));
	}

	componentWillReceiveProps() {

	}

	handleSubmit(e) {
		e.preventDefault();
		const {userInput} = this.state;
		this.props.dispatch(fetchAnswer(userInput));
	}

	handleChange(e) {
		const userInput = e.target.value;
		this.setState({userInput});
	}

	nextQuestion() {
		return this.props.dispatch(fetchQuestion(this.props.username));
	}

	render() {
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
				</form>
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