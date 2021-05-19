import {START_LOADING, STOP_LOADING} from "./types";

export interface LoadingProps {
    loading: boolean;
}

export const loadingReducer = (state: LoadingProps, action: any) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, loading: true}

        case STOP_LOADING:
            return {...state, loading: false}

        default:
            return state ?? null
    }
}