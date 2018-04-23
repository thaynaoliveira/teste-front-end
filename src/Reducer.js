import {
	VIDEOS,
	VIDEO,
	VIDEO_TEXT
} from './Actions';

const initialState = {
	videos: {},
	video: {}
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
	}

	return state;
}