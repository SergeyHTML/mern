import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import PostsPage from "./pages/PostsPage";
import CreatePage from "./pages/CreatePage";
import AuthPage from "./pages/AuthPage";
import Post from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import PostEdit from "./pages/PostEditPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/post/:id">
                    <Post/>
                </Route>
                <Route path="/edit/:id">
                    <PostEdit />
                </Route>
                <Route path="/new">
                    <CreatePage/>
                </Route>
                <Route path="/" exact>
                    <PostsPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/register" exact>
                <AuthPage/>
            </Route>
            <Route path="/post/:id">
                <Post/>
            </Route>
            <Route path="/" exact>
                <PostsPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}