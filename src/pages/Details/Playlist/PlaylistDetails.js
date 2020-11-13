import React from "react";
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
import {playlist} from "../../../assets/datas/Playlists/playlist";

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

const PlaylistDetails = () => {

    const theme = createMuiTheme({
        image: {
            url: playlist.image ? playlist.image : "https://picsum.photos/700/500",
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Playlist/>
            </ThemeProvider>
        </>
    );
};

const Playlist = () => {
    const classes = useStyles();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return(
        <>
            <div className={classes.header}>
                <IconButton className={classes.deleteButton} aria-label="delete">
                    <MoreVertIcon />
                </IconButton>
                <Avatar variant={'square'} className={classes.avatar} alt={playlist.name} src={playlist.image ? playlist.image : "https://picsum.photos/700/500"} />
                <h2>{playlist.name}</h2>
                <span>Crée le {new Date(playlist.createdAt).toLocaleDateString('fr-FR', options)}</span>
                <Button variant={"contained"} className={classes.playButton} color={"primary"}>Lecture aléatoire</Button>
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
                                                <IconButton edge="end" aria-label="delete">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            )
                            : <h3>Pas de titres</h3>
                    }
                </div>
            </div>
        </>
    )
}

export default PlaylistDetails;