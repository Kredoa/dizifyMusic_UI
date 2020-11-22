import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BACKGROUND_COLOR, ERROR_COLOR} from "../../../assets/theme/colors";
import {Modal} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {BASE_URL_API} from "../../../assets/config/config";
import axios from "axios";
import UserContext from "../../../context/User/UserContext";

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

const  AddToPlaylistModal = ({item, open, handleClose}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext)
  const currentUser = userContext.user
  const [playlistId, setPlaylistId] = useState()
  const [playlistChoices, setPlaylistChoices] = useState([])
  const [playlistTitles, setPlaylistTitles] = useState([])
  const [error, setError] = useState();

  const getPlaylist = (id) => {
    const headers = {
      'Authorization': `Bearer ${currentUser.token}`
    }
    return axios.get(`${BASE_URL_API}playlists/${id}`, {headers})
  }

  const getPlaylistsChoices = () => {
    const headers = {
      'Authorization': `Bearer ${currentUser.token}`
    }
    return axios.get(`${BASE_URL_API}playlists`, {headers})
  }

  const addToPlaylist = (id, titles) => {
    const body = {
      title_ids: titles
    }
    const headers = {
      'Authorization': `Bearer ${currentUser.token}`
    }
    return axios.put(`${BASE_URL_API}playlists/${id}`, body, {headers})
  }

  const handleSubmit = (event) => {
    const pl = playlistId
    playlistTitles.push(item.id)
    addToPlaylist(pl, playlistTitles)
      .then(() => handleClose())
      .catch(error => setError("Impossible d'ajouter à la playlist"))
  }

  const handleChange = (event) => {
    setPlaylistId(event.target.value)
  }

  useEffect(() => {
    getPlaylistsChoices().then(res => setPlaylistChoices(res.data))
  }, [])

  useEffect(() => {
    getPlaylist(playlistId).then(res => {
      const titles = [];
      res.data.titles.map((t) => titles.push(t.id));
      setPlaylistTitles(titles);
    })
  }, [playlistId])

  return(
    <Modal
      open={open}
      className={classes.modalBackground}
      onClose={handleClose}
      aria-labelledby={"Add to playlist modal"}
      aria-describedby={"Add to playlist modal"}
    >
      {
        item && (
          <div className={classes.modal}>
            <h2>Ajouter {item.name} à une playlist</h2>
            <form className={classes.form} autoComplete={"off"} onSubmit={handleSubmit}>
              <FormControl className={classes.fields}>
                <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="playlist"
                  value={playlistId}
                  onChange={handleChange}
                >
                  {
                    playlistChoices.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              { error && <span className={classes.error}>{error}</span> }
              <Button className={classes.submit} disabled={!playlistId} variant={"contained"} type={"submit"} color={"primary"} >Confirmer</Button>
            </form>
          </div>
        )
      }
    </Modal>
  )
}

export default AddToPlaylistModal