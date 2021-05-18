import React, { useEffect } from 'react';
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import PostCard, {PostProps} from "../components/PostCard";
import {fetchPosts} from "../redux/actions";
import {StoreProps} from "../redux/rootReducer";

const PostsPage = () => {
    const dispatch = useDispatch();
    const posts: PostProps[] = useSelector((state: StoreProps) => {
        return state.posts?.posts;
    })

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    if (!posts?.length) {
        return <CircularProgress />
    }
    return (
        <React.Fragment>
            <Typography variant="h1">
                List posts
            </Typography>
            <Grid container spacing={3}>
                {posts?.map(post => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <PostCard post={post} />
                    </Grid>
                ))}

            </Grid>
        </React.Fragment>

    );
}

export default PostsPage;
