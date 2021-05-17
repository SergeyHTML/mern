import React, {ChangeEvent, useContext, useState} from 'react';
import AuthCard from "../components/AuthCard";
import {Button, CardActions, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

const useStyles = makeStyles({
    input: {
        marginBottom: 15
    }
});

const LoginPage = () => {
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '', password: '',
    });

    const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && clearError()
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});

            auth.login?.(data?.token, data?.userId, data?.name);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthCard error={error}>
            <CardContent>
                <Typography variant="h2">
                    Login
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField
                        className={classes.input}
                        label="Email"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        onChange={inputHandler}
                        value={form.email}
                    />
                    <TextField
                        className={classes.input}
                        label="Password"
                        name="password"
                        type="password"
                        required
                        fullWidth
                        onChange={inputHandler}
                        value={form.password}
                    />
                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Login
                </Button>
            </CardActions>
        </AuthCard>
    );
};

export default LoginPage;
