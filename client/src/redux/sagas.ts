import {call, put, takeEvery} from 'redux-saga/effects'
import {CREATE_POST, DELETE_POST, FETCH_POSTS, FILTER_POST, REQUEST_POSTS} from "./types";

interface ActionType {
    type: string;
    payload: any;
}

const request = async (url: string, method: string = 'GET', body: any = null, headers: { [key: string]: string } = {}) => {
    try {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {method, body, headers});
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message ?? "Something went wrong")
        }

        return data
    } catch (err) {
        throw err
    }
};

export function* sagaWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker);
    yield takeEvery(CREATE_POST, sagaCreator);
    yield takeEvery(DELETE_POST, sagaDelete);
}

function* sagaWorker() {
    try {
        const payload: Promise<any> = yield call(fetchPosts);
        yield put({type: FETCH_POSTS, payload})
    } catch (e) {
        console.log('error')
    }

}

function* sagaCreator(action: ActionType) {
    try {
        yield call(saveNewPost, action.payload);
    } catch (e) {
        console.log(e);
    }
}

function* sagaDelete(action: ActionType) {
    const {payload} = action;
    yield call(deletePostRequest, payload);
    yield put({type: FILTER_POST, payload: payload.id})
}

async function fetchPosts() {
    return await request('/api/post');
}

const saveNewPost = async (data: any): Promise<void> => {
    await request(
        '/api/post/create',
        'POST',
        data.data,
        {
            Authorization: `Bearer ${data.token}`
        }
    );
}

const deletePostRequest = async (data: any): Promise<void> => {
    await request(
        '/api/post/delete',
        'DELETE',
        {
            id: data.id
        },
        {
            Authorization: `Bearer ${data.token}`
        }
    );
}