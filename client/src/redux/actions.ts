import {CREATE_POST, DELETE_POST, REQUEST_POSTS} from "./types";

export function fetchPosts() {
    return {
        type: REQUEST_POSTS
    }
}

export function createPost(data: any, token: string | undefined) {
    return {
        type: CREATE_POST,
        payload: {data, token},
    }
}

export function deletePost(id: string, token: string | undefined) {
    return {
        type: DELETE_POST,
        payload: {id, token},
    }
}