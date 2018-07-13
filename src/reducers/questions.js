import {
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	FETCH_ANSWER_SUCCESS,
	FETCH_ANSWER_ERROR
} from '../actions/action-types';

const initialState = {
	prompt: '',
	correct: false,
	loading: false,
	error: null,

};

export default function reducer(state=initialState, action) {
	if (action.type === FETCH_QUESTION_SUCCESS) {
		console.log(action);
		return Object.assign({}, state, {
			prompt: action.prompt,
			loading: action.loading,
			error: null
		});

	} else if (action.type === FETCH_QUESTION_ERROR) {
		return Object.assign({}, state, {
			error: action.error,
			loading: action.loading
		});

	} else if (action.type === FETCH_ANSWER_SUCCESS) {
		return Object.assign({}, state, {
			correct: action.correct,
			loading: action.loading,
			error: null
		});

	} else if (action.type === FETCH_ANSWER_ERROR) {
		return Object.assign({}, state, {
			error: action.error,
			loading: action.loading
		});
	}
	return state;
}
