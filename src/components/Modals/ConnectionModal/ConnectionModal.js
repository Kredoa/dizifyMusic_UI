import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {BACKGROUND_COLOR, ERROR_COLOR} from "../../../assets/theme/colors";
import {BASE_URL_API} from "../../../assets/config/config";
import axios from "axios";
import UserContext from "../../../context/User/UserContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
        width: '100%',
    },
    submit: {
        marginTop: '15px',
    },
    error: {
        color: ERROR_COLOR,
    }
}));

const LogInBody = ({handleClose}) => {
    const classes = useStyles();
    const [error, setError] = useState();
    const userContext = useContext(UserContext);
    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    const connectUser = (username, pwd) => {
        const body = {
            username: username,
            password: pwd
        }
        axios
          .post(`${BASE_URL_API}auth/signin`, body)
          .then(res => {
              console.log(res)
              userContext.setUser(res.data)
          })
          .then(() => handleClose())
          .catch(error => setError('Identifiants Invalides'))
    }

    const connectAdmin = (username, pwd) => {
        const body = {
            username: username,
            password: pwd
        }
        axios
          .post(`${BASE_URL_API}auth/admin/signin`, body)
          .then(res => {
              console.log(res)
              userContext.setUser(res.data)
          })
          .then(() => handleClose())
          .catch(error => setError('Identifiants Invalides'))
    }

    const handleLogIn = (event) => {
        console.log("submit");
        const un = event.target.username.value;
        const pd = event.target.password.value;
        if(checked) {
            connectAdmin(un, pd);
        } else {
            connectUser(un, pd);
        }
    };

    return(
        <div className={classes.modal}>
            <h2>Connectez-vous</h2>
            <form className={classes.form} autoComplete="off" onSubmit={handleLogIn}>
                <TextField
                    className={classes.fields}
                    id="username"
                    label="Nom d'utilisateur" />
                <TextField
                    className={classes.fields}
                    id="password"
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        color={'default'}
                      />
                  }
                  label="S'identifier en tant qu'Admin"
                />
                { error && <span className={classes.error}>{error}</span>}
                <Button className={classes.submit} type={'submit'} variant={"contained"} color={"primary"} >Confirmer</Button>
            </form>
        </div>
    )
};

const SignUpBody = ({handleClose}) => {
    const classes = useStyles();
    const [error, setError] = useState();
    const userContext = useContext(UserContext);

    const signUser = (email, username, pwd) => {
        const body = {
            email: email,
            password: pwd,
            username: username,
        }
        axios
          .post(`${BASE_URL_API}auth/signup`, body)
          .then(res => {
              userContext.setUser(res.data)
          })
          .then(() => handleClose())
          .catch(error => setError('Inscription impossible, merci de réessayer ultérieurement'))
    }

    const handleSignUp = (event) => {
        const un = event.target.username.value;
        const pd = event.target.password.value;
        const email = event.target.email.value;
        signUser(email, un, pd);
    };

    return(
        <div className={classes.modal}>
            <h2>Inscrivez-vous</h2>
            <form className={classes.form} autoComplete="off" onSubmit={handleSignUp}>
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
                    id="password"
                    label="Mot de passe"
                    type="password"
                    autoComplete="current-password"
                />
                { error && <span className={classes.error}>{error}</span>}
                {/*<Button className={classes.submit} variant={"contained"} color={"primary"} >Confirmer</Button>*/}
                <Button className={classes.submit} variant={"contained"} type={"submit"} color={"primary"} >Confirmer</Button>
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
            {signIn ? <SignUpBody handleClose={handleClose}/> : <LogInBody handleClose={handleClose}/>}
        </Modal>
    );
};

export default ConnectionModal;