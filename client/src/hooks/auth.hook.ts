import {useCallback, useEffect, useState} from "react";

const storageName = 'userData';

export interface AuthProps {
    login: (jwtToken: string, id: string, name: string) => void;
    logout: () => void;
    token: string;
    userId: string;
    ready: boolean;
    name: string;
}

export const useAuth = (): AuthProps => {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken: string, id: string, userName: string) => {
        setToken(jwtToken);
        setUserId(id);
        setName(userName)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, name: userName}))
    }, [])

    const logout = useCallback(() => {
        setToken('');
        setUserId('');
        setName('');

        localStorage.removeItem(storageName);
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) as string);

        if (data) {
            login(data.token, data.userId, data.name)
        }

        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready, name }
}