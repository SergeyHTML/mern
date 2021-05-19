import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import AuthCard from "../components/AuthCard";
import {Button, CardActions, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory, useParams} from 'react-router-dom';
import JoditEditor from "jodit-react";
import {useDispatch, useSelector} from "react-redux";
import {editPost, fetchPosts} from "../redux/actions";
import {PostProps} from "../components/PostCard";
import {StoreProps} from "../redux/rootReducer";

const useStyles = makeStyles({
    input: {
        marginBottom: 15
    }
});

const PostEdit = () => {
    const dispatch = useDispatch();
    const posts: PostProps[] | null = useSelector((state: StoreProps) => {
        return state.posts?.posts;
    })
    const [post, setPost] = useState<PostProps | null>(null);
    const {id} = useParams<{ id?: string }>();
    const editor = useRef(null)
    const [content, setContent] = useState<string>('')
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {loading, error, clearError} = useHttp();
    const classes = useStyles();
    const [form, setForm] = useState({
        title: '',
    });

    useEffect(() => {
        if (!posts?.length) {
            dispatch(fetchPosts());
        } else {
            setPost(posts?.find(item => id === item?._id) ?? null)
            setForm(prevState => ({...prevState, title: post?.title ?? ''}))
            setContent(post?.text ?? '')
        }
    }, [posts, dispatch, id, post]);

    const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && clearError()
        setForm({...form, [event.target.name]: event.target.value})
    }

    const editHandler = async (): Promise<void> => {
        try {
            await dispatch(editPost({...form, text: content, name: auth.name, id: post?._id}, auth.token));
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthCard error={error}>
            <CardContent>
                <Typography variant="h2">
                    Edit post
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField
                        className={classes.input}
                        label="Title post"
                        name="title"
                        type="text"
                        required
                        fullWidth
                        onChange={inputHandler}
                        value={form.title}
                        focused={true}
                    />

                    <JoditEditor
                        ref={editor}
                        value={content}
                        // config={config}
                        // tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={editHandler}
                    disabled={loading}
                >
                    Edit post
                </Button>
            </CardActions>
        </AuthCard>
    );
};

export default PostEdit;
