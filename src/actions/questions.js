import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import {
	FETCH_QUESTION_REQUEST,
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	FETCH_ANSWER_SUCCESS,
	FETCH_ANSWER_ERROR,
	UPDATE_QUESTIONS_SUCCESS,
	UPDATE_QUESTIONS_ERROR,
	UPDATE_QUESTIONS_REQUEST,
} from './action-types';

export const fetchQuestionRequest = () => ({
	type: FETCH_QUESTION_REQUEST,
	loading: true
});

export const fetchQuestionSuccess = prompt => ({
	type: FETCH_QUESTION_SUCCESS,
	prompt,
	loading: false
});

export const fetchQuestionError = error => ({
	type: FETCH_QUESTION_ERROR,
	error,
	loading: false
});

export const fetchAnswerSuccess = correct => ({
	type: FETCH_ANSWER_SUCCESS,
	hasAnswered: true,
	correct,
	loading: false
});

export const fetchAnswerError = error => ({
	type: FETCH_ANSWER_ERROR,
	error,
	loading: false
});

export const updateQuestionsRequest = () => ({
	type: UPDATE_QUESTIONS_REQUEST,
	loading: true,
	hasAnswered: false,
});

export const updateQuestionsError = error => ({
	type: UPDATE_QUESTIONS_ERROR,
	error,
	loading: false
});

export const updateQuestionsSuccess = () => ({
	type: UPDATE_QUESTIONS_SUCCESS,
	hasAnswered: false,
});

export const fetchQuestion = username => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(fetchQuestionRequest());
	return fetch(`${API_BASE_URL}/questions/${username}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({prompt}) => {
			//console.log('INSIDE FETCH QUESTION', prompt);
			return dispatch(fetchQuestionSuccess(prompt));
		})
		.catch(err => dispatch(fetchQuestionError(err)));
};

export const fetchAnswer = (answer, username) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(fetchQuestionRequest());
	return fetch(`${API_BASE_URL}/questions/correct/${username}?answer=${answer}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => dispatch(fetchAnswerSuccess(data)))
		.catch(err => dispatch(fetchAnswerError(err)));
};

export const updateQuestions = (username, correct) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(updateQuestionsRequest());
	return fetch(`${API_BASE_URL}/questions/next/${username}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${authToken}`,
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({correct: correct})
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => dispatch(updateQuestionsSuccess()))
		.catch(err => dispatch(updateQuestionsError(err)));
};
