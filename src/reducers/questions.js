import {
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR
} from '../actions/action-types';

const initialState = {
	prompt: '',
	correct: false,
	loading: false,
	error: null
};

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_QUESTION_SUCCESS) {
		console.log(action);
		return Object.assign({}, state, {
			prompt: action.prompt,
			error: null
		});
	} else if (action.type === FETCH_QUESTION_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	}
	return state;
}

