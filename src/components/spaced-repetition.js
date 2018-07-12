import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import requiresLogin from './requires-login';
import { fetchQuestion, fetchAnswer } from '../actions/questions';
// import Input from './input.js';

export class SpacedRepetition extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchQuestion());
	}

	onSubmit(value) {
		this.props.dispatch(fetchAnswer(value));
	}

	nextQuestion() {
		return this.props.dispatch(fetchQuestion());
	}

	constructor(props) {
		super(props);
		this.propmt = props.prompt;

		this.state = {
			answer:''
		};
	}
	render() {
		return (
			<div>
				<div>
					{this.props.question ? <p> Question: {this.props.question.prompt} </p> : <p>Loading</p>}
				</div>
				<div>
					{this.props.answer ? <p>Answer: {this.props.answer}</p> : <p>What is your answer?</p>}
				</div>

				<label>
					<input
						id='text-input'
						type='text'
						title='answer'
						ref={input => (this.input = input)}
					/>
				</label>
				<div>
					<button type='submit' onClick={this.onSubmit}>
						Submit
					</button>
					<button type='next' disable={!this.props.answer} onClick={this.nextQuestion}>
						Next
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		questions: state.questions,
		username: state.auth.currentUser.username, 
		answer: state.answer
	};
};

export default requiresLogin()(connect(mapStateToProps)(SpacedRepetition));