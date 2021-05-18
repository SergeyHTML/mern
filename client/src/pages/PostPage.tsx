import React, { useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Typography} from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { PostProps } from '../components/PostCard';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch, useSelector} from "react-redux";
import {StoreProps} from "../redux/rootReducer";
import {fetchPosts} from "../redux/actions";

const Post = () => {
    const dispatch = useDispatch();
    const posts: PostProps[] = useSelector((state: StoreProps) => {
        return state.posts?.posts;
    })
    const [post, setPost] = useState<PostProps>();
    const {id} = useParams<{ id?: string }>();

    useEffect(() => {
        if (!posts?.length) {
            dispatch(fetchPosts());
        } else {
            setPost(posts.find(item => id === item._id))
        }
    }, [posts, dispatch, id]);

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
