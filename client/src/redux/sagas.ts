import {call, put, takeEvery} from 'redux-saga/effects'
import {
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    FETCH_POSTS,
    FILTER_POST,
    REQUEST_POSTS,
    START_LOADING,
    STOP_LOADING
} from "./types";

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
    yield takeEvery(EDIT_POST, sagaEditor);
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
    try {
        const {payload} = action;
        yield put({ type: START_LOADING })
        yield call(deletePostRequest, payload);
        yield put({type: FILTER_POST, payload: payload.id})
    } catch (e) {
        console.log(e);
    } finally {
        yield put({ type: STOP_LOADING })
    }
}

function* sagaEditor(action: ActionType) {
    try {
        yield call(editPost, action.payload);
    } catch (e) {
        console.log(e);
    }
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

const editPost = async (data: any): Promise<void> => {
    await request(
        '/api/post/edit',
        'POST',
        data.data,
        {
            Authorization: `Bearer ${data.token}`
        }
    );
}

const deletePostRequest = async (data: any): Promise<void> => {
    await request(
        `/api/post/delete/${data.id}`,
        'DELETE',
        null,
        {
            Authorization: `Bearer ${data.token}`
        }
    );
}