import request from 'axios';

export const VIDEOS = 'VIDEOS';
export const VIDEO = 'VIDEO';
export const VIDEO_TEXT = 'VIDEO_TEXT';

const url = 'https://www.googleapis.com/youtube/v3/';
const token = 'AIzaSyBTo8mOJjxoqYSXEkdIZQdz07ldQndgKaA';

export function getVideos(text, pageToken) {
    let pageParams = pageToken ? '&pageToken=' + pageToken : '';

    return dispatch => {
        request.get(url + 'search?part=id%2Csnippet&maxResults=12&order=viewCount&q=' + encodeURI(text) + pageParams + '&key=' + token)
            .then(response => {
                dispatch(setReducer(VIDEOS, response.data));
            })
            .catch(error => {
                dispatch(setReducer(VIDEOS, []));
            });
    }
}

export function getVideoById(id) {
    return dispatch => {
        request.get(url + 'videos?id=' + id + '&part=snippet,statistics&key=' + token)
            .then(response => {
                dispatch(setReducer(VIDEO, response.data));
            })
            .catch(error => {
                dispatch(setReducer(VIDEO, {}));
            });
    }
}

export function setReducer(type, data) {
    return {
        type: type,
        data: data
    }
}