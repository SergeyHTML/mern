import {createContext} from 'react';
import {AuthProps} from "../hooks/auth.hook";

interface ContextProps extends AuthProps {
    isAuthenticated: boolean,
}
export const AuthContext = createContext<Partial<ContextProps>>({});