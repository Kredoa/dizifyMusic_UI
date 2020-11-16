import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {BACKGROUND_COLOR} from "../../../assets/theme/colors";

const useStyles = makeStyles(theme => ({
    modalBackground: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        background: BACKGROUND_COLOR,
        borderRadius: '5px',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fields: {
        margin: '10px 0',
    },
    submit: {
        marginTop: '15px',
    }
}));

const LogInBody = () => {
    const classes = useStyles();
    return(
        <div className={classes.modal}>
            <h1>Connectez-vous</h1>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.fields}
                    type="email"
                    id="email"
                    label="Adresse e-mail" />
                <TextField
                    className={classes.fields}
                    id="pwd"
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                />
                <Button className={classes.submit} variant={"contained"} color={"primary"} >Confirmer</Button>
                {/*<Button className={classes.submit} variant={"contained"} type={"submit"} color={"primary"} >Confirmer</Button>*/}
            </form>
        </div>
    )
};

const SignInBody = () => {
    const classes = useStyles();
    return(
        <div className={classes.modal}>
            <h1>Inscrivez-vous</h1>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.fields}
                    type="email"
                    id="email"
                    label="Adresse e-mail" />
                <TextField
                    className={classes.fields}
                    id="username"
                    label="Pseudo" />
                <TextField
                    className={classes.fields}
                    id="pwd"
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                />
                <Button className={classes.submit} variant={"contained"} color={"primary"} >Confirmer</Button>
                {/*<Button className={classes.submit} variant={"contained"} type={"submit"} color={"primary"} >Confirmer</Button>*/}
            </form>
        </div>
    )
};

const ConnectionModal = ({open, handleClose, signIn}) => {
    const classes = useStyles();
    return(
        <Modal
            className={classes.modalBackground}
            open={open}
            onClose={handleClose}
            aria-labelledby={signIn ? "Modal inscription" : "Modal connexion"}
            aria-describedby={signIn ? "Inscription de l'utilisateur" : "Modal connexion"}
        >
            {signIn ? <SignInBody/> : <LogInBody/>}
        </Modal>
    );
};

export default ConnectionModal;