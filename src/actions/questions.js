import {
	API_BASE_URL
} from '../config';
import {
	normalizeResponseErrors
} from './utils';
import {
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR
} from './action-types';

export const fetchQuestionsSuccess = question => ({
	type: FETCH_QUESTION_SUCCESS,
	question
});

export const fetchQuestionsError = error => ({
	type: FETCH_QUESTION_ERROR,
	error
});

export const fetchQuestion = id => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/questions/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => dispatch(fetchQuestionsSuccess(data)))
		.catch(err => dispatch(fetchQuestionsError(err)));
};