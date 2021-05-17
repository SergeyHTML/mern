import {createContext} from 'react';
import {PostProps} from "../components/PostCard";

export const PostContext = createContext<PostProps[]>([]);