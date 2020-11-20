import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BACKGROUND_COLOR} from "../../../assets/theme/colors";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControlAdd from './FormControlAdd';

const useStyles = makeStyles(theme => ({
    modal : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    modalAjout: {
        background: BACKGROUND_COLOR,
        borderRadius: '5px',
        padding: '20px',
    

    },
    fab: {
        position : 'fixed', 
        bottom : 0,
        right: 0,
        margin : '20px'
    }, 
    header :{
        marginBottom : '20px'
    }
}));

const ModalAdd = () => {

    // Gestion de la modale d'ajout
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(!openModal)
    const handleShow = () => setOpenModal(!openModal)

    const classes = useStyles();

    return(
        <>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={(e) => handleShow(e)} >
                <AddIcon />
            </Fab>
            <Modal open={openModal} onHide={handleClose} className={classes.modal}>
                <div className={classes.modalAjout}>
                    <div className={classes.header}>
                        <h1>Ajout</h1>
                    </div>
                    <div className={classes.body}>
                        <FormControlAdd handleClose={handleClose} />
                    </div>
                </div>
            </Modal>
        </>
    )
}
 export default ModalAdd