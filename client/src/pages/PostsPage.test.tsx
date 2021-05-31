import React from "react";
import {post, renderWithRedux} from "../components/PostCard.test";
import PostsPage from "./PostsPage";
import {MemoryRouter} from "react-router-dom";

describe('Posts Page redux', () => {
    it('should render loader', () => {
        const {getByTestId} = renderWithRedux(<PostsPage />);
        expect(getByTestId('loader')).toBeInTheDocument();
    });

    it('should render list of posts', () => {
        const {getByText} = renderWithRedux(<MemoryRouter><PostsPage/></MemoryRouter>, {
            initialState: {posts: {posts: [post]}}
        });
        expect(getByText(/List posts/i)).toBeInTheDocument();
    })
})