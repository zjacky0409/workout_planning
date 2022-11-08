import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from '../Button/CustomButton';

interface DialogProps {
    hanlder: () => void;
    header: string;
    content: string;
    open: boolean;
    handleClose: () => void
    disabled: boolean;
}

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