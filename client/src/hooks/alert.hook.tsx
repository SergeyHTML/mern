import React, {useCallback} from "react";
import Alert from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";

export const useAlert = () => {
    return useCallback((text: string) => (
        <Snackbar
            open={text.length > 0}
            anchorOrigin={
                {vertical: 'top', horizontal: 'center'}
            }
        >
            <Alert variant="filled" severity="error">
                {text}
            </Alert>
        </Snackbar>
    ), [])
}