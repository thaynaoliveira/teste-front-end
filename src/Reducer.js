import {
	VIDEOS,
	VIDEO,
	VIDEO_TEXT,
	LOADING
} from './Actions';

const initialState = {
	videos: {},
	video: {},
	videoText: '',
	loading: false
};

export default function config(state = initialState, action) {

	switch (action.type) {
		case VIDEOS:
			return Object.assign({}, state, { videos: action.data });
			break;
		case VIDEO:
			return Object.assign({}, state, { video: action.data });
			break;
		case VIDEO_TEXT:
			return Object.assign({}, state, { videoText: action.data });
			break;
		case LOADING:
			return Object.assign({}, state, { loading: action.data });
			break;
	}

	return state;
}