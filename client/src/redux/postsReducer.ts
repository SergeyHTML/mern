import {FETCH_POSTS, FILTER_POST} from "./types";

export interface PostsState {
    posts: any[]
}

export const postsReducer = (state: PostsState, action: any) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {...state, posts: action.payload}

        case FILTER_POST:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)}

        default:
            return state ?? null
    }
}