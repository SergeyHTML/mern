import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCard from "./PostCard";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "../redux/rootReducer";
import {Router, MemoryRouter} from 'react-router-dom'
// import {createMemoryHistory} from 'history'
import { AuthContext } from "../context/AuthContext";

export const post = {
    _id: '12121n32e1k3j',
    title: 'Title',
    text: 'text',
    author: 'string',
    owner: 'owner',
    data: new Date,
}

const authValue = {
    userId: 'owner',
}

export const renderWithRedux = (
    component: any,
    {initialState, store = createStore(rootReducer, initialState)} = {}
) => {
    return{
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
};

describe('Post card', () => {
    it('should renders button "Learn more"', () => {
        const { getByText } = renderWithRedux(<MemoryRouter><PostCard post={post} /></MemoryRouter>);
        const button = getByText(/learn more/i);
        expect(button).toBeInTheDocument();
    });

    it('should renders button "Delete"', () => {
        const { getByText } = renderWithRedux(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <PostCard post={post} />
                </AuthContext.Provider>
            </MemoryRouter>);
        const button = getByText(/delete/i);
        expect(button).toBeInTheDocument();
    });

    it('should open dialog after click button "Delete"', () => {
        const { getByText, queryByText, debug } = renderWithRedux(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <PostCard post={post} />
                </AuthContext.Provider>
            </MemoryRouter>, {
                initialState: {posts: {posts: [post]}}
            });
        const button = getByText(/delete/i);
        userEvent.click(button);
        const buttonAgreeDelete = queryByText('Agree');
        expect(buttonAgreeDelete).toBeInTheDocument();
        if (buttonAgreeDelete) {
            userEvent.click(buttonAgreeDelete);
            const buttonAgreeDeleteAfter = queryByText('Agree');
            expect(buttonAgreeDeleteAfter).toBeNull();
        }
    });

    it('should renders button "Edit"', () => {
        const { getByText } = renderWithRedux(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <PostCard post={post} />
                </AuthContext.Provider>
            </MemoryRouter>);
        const button = getByText(/edit/i);
        expect(button).toBeInTheDocument();
    });
})

