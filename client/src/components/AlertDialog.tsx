import React, {useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AlertDialogProps {
    open: boolean;
    title: string;
    titlePost: string;
    confirmDelete: (flag: boolean) => void;
}
const AlertDialog:React.FC<AlertDialogProps> = (props) => {
    const {confirmDelete} = props;

    const handleClose = useCallback(() => {
        confirmDelete(false)
    }, [confirmDelete]);

    const handleDelete = useCallback(() => {
        confirmDelete(true)
    }, [confirmDelete])

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you really want to delete post with title "{props.titlePost}"
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;