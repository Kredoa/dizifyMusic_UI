import React, {useContext, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import {BASE_URL_API} from "../../../assets/config/config";
import UserContext from "../../../context/User/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import TitleContext from "../../../context/Title/TitleContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    header: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        height: '70vh',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: '.2',
            filter: 'blur(5px)',
            zIndex: -1,
            background: 'url('+theme.image.url+')',
            backgroundRepeat: 'round',
        },
        '&>span': {
            margin: '10px',
        }
    },
    avatar: {
        width: '10rem',
        height: '10rem',
        margin: '10px',
    },
    favAdd: {
        borderRadius: '25px',
        fontSize: '10px',
        margin: '10px',
    },
    playButton: {
        borderRadius: '25px',
        margin: '10px',
    },
    body: {
        padding: '20px',
        '&>div>h2': {
            textAlign: 'center',
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        '&>p': {
            textAlign: 'justify',
            maxWidth: '50rem',
        }
    },
    list: {
        width: '100%',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
}));

const useStyleParent = makeStyles(theme => ({
    loading: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const getPlaylist = (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL_API}playlists/${id}`, { headers })
};

const PlaylistDetails = ({id}) => {
    const userContext = useContext(UserContext);
    const currentUser = userContext.user;
    const [playlist, setPlaylist] = useState();
    const classesParent = useStyleParent();

    useEffect(() => {
        getPlaylist(currentUser.token, id)
          .then(res => setPlaylist(res.data))
    }, [currentUser, setPlaylist]);

    const theme = createMuiTheme({
        image: {
            url: playlist
              ? playlist.image || "https://picsum.photos/700/500"
              : "https://picsum.photos/700/500",
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                { playlist
                  ? <Playlist playlist={playlist}/>
                  : (
                    <div className={classesParent.loading}>
                        <CircularProgress />
                    </div>
                  )
                }
            </ThemeProvider>
        </>
    );
};

const Playlist = ({playlist}) => {
    const classes = useStyles();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const titleContext = useContext(TitleContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTitleMenu = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const closeTitleMenu = () => {
        setAnchorEl2(null);
    };

    const setRunningTitle = (e, object) => {
        e.preventDefault();
        titleContext.setTitle(object);
    };

    const randomPlay = (e) => {
        e.preventDefault();
        const random = Math.floor(Math.random() * playlist.titles.length);
        setRunningTitle(e, playlist.titles[random]);
    };

    return(
        <>
            <div className={classes.header}>
                <IconButton className={classes.deleteButton} aria-label="delete" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Supprimer la playlist</MenuItem>
                </Menu>
                <Avatar variant={'square'} className={classes.avatar} alt={playlist.name} src={playlist.image ? playlist.image : "https://picsum.photos/700/500"} />
                <h2>{playlist.name}</h2>
                <span>Crée le {new Date(playlist.createdAt).toLocaleDateString('fr-FR', options)}</span>
                <Button variant={"contained"} className={classes.playButton} color={"primary"} onClick={(e) => randomPlay(e)} disabled={!(playlist.titles.length > 0)}>Lecture aléatoire</Button>
            </div>
            <div className={classes.body}>
                <div className={classes.content}>
                    <h2>Titres</h2>
                    {
                        playlist.titles.length > 0
                            ? (
                            <List className={classes.list}>
                                {
                                    playlist.titles.map((title, index) => (
                                        <ListItem button key={index}>
                                            <ListItemAvatar>
                                                {
                                                    title.image
                                                        ? <Avatar variant={'square'} src={title.image} />
                                                        : <Avatar variant={'square'}>
                                                            <MusicNoteIcon />
                                                        </Avatar>
                                                }
                                            </ListItemAvatar>
                                            <ListItemText primary={title.name} secondary={title.author.name+" · "+title.duration} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={handleTitleMenu}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                  id="simple-menu"
                                                  anchorEl={anchorEl2}
                                                  keepMounted
                                                  open={Boolean(anchorEl2)}
                                                  onClose={closeTitleMenu}
                                                >
                                                    <MenuItem onClick={closeTitleMenu}>Retirer de la playlist</MenuItem>
                                                </Menu>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            )
                            : <p>Pas de titres</p>
                    }
                </div>
            </div>
        </>
    )
}

export default PlaylistDetails;