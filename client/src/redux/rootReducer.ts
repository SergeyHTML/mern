import {combineReducers} from "redux";
import {postsReducer, PostsState} from "./postsReducer";
import {LoadingProps, loadingReducer} from "./loadingReducer";

export interface StoreProps {
    posts: PostsState,
    loading: LoadingProps,
}

export const rootReducer = combineReducers({
    posts: postsReducer,
    loading: loadingReducer,
})