import React from 'react';
import { Card, makeStyles, } from "@material-ui/core";
import {useAlert} from "../hooks/alert.hook";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 700,
        margin: '30px auto'
    },
});

type AuthCardProps = {
    children: React.ReactNode;
    error?: string;
}

const AuthCard: React.FC<AuthCardProps> = (props) => {
    const alert = useAlert();
    const classes = useStyles();
    const { error } = props;

    return (
        <>
            <Card className={classes.root}>
                {props.children}
            </Card>

            { error && alert(error) }
        </>
    );
}

export default AuthCard;
