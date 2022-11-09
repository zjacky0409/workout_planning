import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from '../Button/CustomButton';

interface DialogProps {
    hanlder: () => void; // the action after the user click the confirm button
    header: string; // content for the header
    content: string; // content for the main body
    open: boolean; // control the dialog open or not
    handleClose: () => void
    disabled: boolean; // disable the confirm button or not
}

// A Dialog Component
const ConfirmDialog = ({ hanlder, header, content, open, handleClose, disabled }: DialogProps) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
    >
        <DialogTitle>
            {header}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <CustomButton handler={handleClose} shownText="Cancel" variant="cancel" />
            <CustomButton disabled={disabled} handler={hanlder} shownText="Comfirm" variant="primary" />
        </DialogActions>
    </Dialog>
}

export default ConfirmDialog