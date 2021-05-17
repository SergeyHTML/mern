import React, {ChangeEvent, useContext, useState} from 'react';
import { Button, CardActions, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import AuthCard from "../components/AuthCard";

const useStyles = makeStyles({
    input: {
        marginBottom: 15
    }
});

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    });

    const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && clearError()
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});

            console.log(data);
            auth.login?.(data?.token, data?.userId, data?.name);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthCard error={error}>
            <CardContent>
                <Typography variant="h2">
                    Register
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
                    <TextField
                        className={classes.input}
                        label="Name"
                        name="name"
                        type="text"
                        required
                        fullWidth
                        onChange={inputHandler}
                        value={form.name}
                    />

                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Register
                </Button>
            </CardActions>
        </AuthCard>
    );
}

export default AuthPage;
