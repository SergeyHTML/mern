import React, {ChangeEvent, useContext, useRef, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import AuthCard from "../components/AuthCard";
import {Button, CardActions, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import JoditEditor from "jodit-react";
import {useDispatch} from "react-redux";
import {createPost} from "../redux/actions";

const useStyles = makeStyles({
    input: {
        marginBottom: 15
    }
});

const CreatePage = () => {
    const dispatch = useDispatch();
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {loading, error, clearError} = useHttp();
    const classes = useStyles();
    const [form, setForm] = useState({
        title: '',
    });

    const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && clearError()
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createHandler = async (): Promise<void> => {
        try {
            await dispatch(createPost({...form, text: content, name: auth.name}, auth.token));
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthCard error={error}>
            <CardContent>
                <Typography variant="h2">
                    Create new post
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
                    />

                    <JoditEditor
                        ref={editor}
                        value={content}
                        // config={config}
                        // tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {
                        }}
                    />
                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createHandler}
                    disabled={loading}
                >
                    Create new post
                </Button>
            </CardActions>
        </AuthCard>
    );
};

export default CreatePage;
