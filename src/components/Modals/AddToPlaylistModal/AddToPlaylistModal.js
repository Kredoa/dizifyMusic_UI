import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BACKGROUND_COLOR, ERROR_COLOR} from "../../../assets/theme/colors";
import {Modal} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

const  AddToPlaylistModal = ({itemId, open, handleClose}) => {
  const classes = useStyles();
  const [playlistId, setPlaylistId] = useState()
  const [playlistChoices, setPlaylistChoices] = useState([])

  const handleSubmit = (event) => {
    const pl = event.target.playlist.value
    console.log(pl)
  }

  const handleChange = (event) => {
    setPlaylistId(event.target.playlist.value)
  }

  return(
    <Modal
      open={open}
      className={classes.modalBackground}
      onClose={handleClose}
      aria-labelledby={"Add to playlist modal"}
      aria-describedby={"Add to playlist modal"}
    >
      <div className={classes.modal}>
        <h2>Ajouter à une playlist</h2>
        <form className={classes.form} autoComplete={"off"} onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="playlist"
              value={playlistId}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    </Modal>
  )
}

export default AddToPlaylistModal