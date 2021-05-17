import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import PostCard, {PostProps} from "../components/PostCard";

const PostsPage = () => {
    const { loading, request } = useHttp();
    const [posts, setPosts] = useState<PostProps[]>([]);
    const getPosts = useCallback(async () => {
        try {
            const fetchData = await request('/api/post')
            setPosts(fetchData)
        } catch (err) {
            throw err
        }
    }, [request]);

    useEffect(() => {
        getPosts();
    }, [getPosts])

    if (loading || posts.length === 0) {
        return <CircularProgress />
    }
    return (
        <React.Fragment>
            <Typography variant="h1">
                List posts
            </Typography>
            <Grid container spacing={3}>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <PostCard post={post} />
                    </Grid>
                ))}

            </Grid>
        </React.Fragment>

    );
}

export default PostsPage;
