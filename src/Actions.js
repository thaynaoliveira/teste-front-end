import request from 'axios';

export const VIDEOS = 'VIDEOS';
export const VIDEO = 'VIDEO';
export const VIDEO_TEXT = 'VIDEO_TEXT';
export const LOADING = 'LOADING';
export const ALERT = 'ALERT';

const url = 'https://www.googleapis.com/youtube/v3/';
const token = 'AIzaSyBTo8mOJjxoqYSXEkdIZQdz07ldQndgKaA';

export function getVideos(text, pageToken) {
    let pageParams = pageToken ? '&pageToken=' + pageToken : '';

    return dispatch => {
        dispatch(setReducer(LOADING, true));
        request.get(url + 'search?part=id%2Csnippet&maxResults=12&order=viewCount&q=' + encodeURI(text) + pageParams + '&key=' + token)
            .then(response => {
                dispatch(setReducer(LOADING, false));
                dispatch(setReducer(VIDEOS, response.data));
                if (response.data.pageInfo.totalResults == 0) {
                    dispatch(setReducer(ALERT, true));
                }
            })
            .catch(error => {
                dispatch(setReducer(LOADING, false));
                dispatch(setReducer(VIDEOS, []));
                dispatch(setReducer(ALERT, true));
            });
    }
}

export function getVideoById(id) {
    return dispatch => {
        dispatch(setReducer(LOADING, true));
        request.get(url + 'videos?id=' + id + '&part=snippet,statistics&key=' + token)
            .then(response => {
                dispatch(setReducer(LOADING, false));
                dispatch(setReducer(VIDEO, response.data));
                if(response.data.pageInfo.totalResults == 0){
                    dispatch(setReducer(ALERT, true));
                }
            })
            .catch(error => {
                dispatch(setReducer(LOADING, false));
                dispatch(setReducer(VIDEO, {}));
                dispatch(setReducer(ALERT, true));
            });
    }
}

export function setReducer(type, data) {
    return {
        type: type,
        data: data
    }
}