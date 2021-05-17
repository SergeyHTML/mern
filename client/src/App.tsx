import {Box, CircularProgress, Container} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import Header from "./components/Header";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from './context/AuthContext'

function App() {
    const { login, logout, token, userId, ready, name } = useAuth();

    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <CircularProgress />
    }
    return (
        <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated, name}}>
            <BrowserRouter>
                <Header/>
                <Box height={30} />
                <Container maxWidth="lg">
                    {routes}
                </Container>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
