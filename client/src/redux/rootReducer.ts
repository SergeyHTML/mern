import {combineReducers} from "redux";
import {postsReducer, PostsState} from "./postsReducer";

export interface StoreProps {
    posts: PostsState
}

export const rootReducer = combineReducers({
    posts: postsReducer,
})