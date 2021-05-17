import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
// import {useAuth} from "../hooks/auth.hook";
import {Card, CardContent, CircularProgress, Typography} from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { PostProps } from '../components/PostCard';
import ReactHtmlParser from 'react-html-parser';

const Post = () => {
    // const auth = useAuth();
    const { request } = useHttp();
    const [post, setPost] = useState<PostProps>();
    const {id} = useParams<{ id?: string }>();

    const getPost = useCallback(async () => {
        const data = await request(`/api/post/${id}`);
        setPost(data);
    }, [request, id])

    useEffect(() => {
        getPost();
    }, [getPost]);

    useEffect(() => {

    }, [])
    if (!post) {
        return <CircularProgress />
    }
    return (
        <Card>
            <CardContent>
                <h1>{post.title}</h1>

                <Typography color="textSecondary" variant="body2">
                    author: {post.author}, date: {new Date(post.data).toLocaleDateString()}
                </Typography>
                <div>
                    {ReactHtmlParser(post.text)}
                </div>
            </CardContent>

        </Card>
    );
};

export default Post;
