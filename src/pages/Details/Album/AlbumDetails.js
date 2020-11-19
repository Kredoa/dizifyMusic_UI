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
import PropTypes from "prop-types";
import {BASE_URL_API} from "../../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserContext from "../../../context/User/UserContext";
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
            maxWidth: '655px',
        }
    },
    list: {
        width: '100%',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    artistLink: {
        textDecoration: 'none',
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

const getAlbum = async (id) => {
    const res = await fetch(`${BASE_URL_API}albums/${id}`);
    return await res.json();
};

const AlbumDetails = ({id}) => {

    const [album, setAlbum] = useState();

    useEffect(() => {
        getAlbum(id).then(res => setAlbum(res))
    }, [setAlbum, id]);

    const classesParent = useStyleParent();

    const theme = createMuiTheme({
        image: {
            url: album ? album.image : "https://picsum.photos/200",
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                {album
                    ? <Album album={album}/>
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

const Album = ({album}) => {
    const classes = useStyles();
    const [nbListening, setListening] = useState(getRandomListening(1000000, 3000000));
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const userContext = useContext(UserContext);
    const titleContext = useContext(TitleContext);
    const currentUser = userContext.user;
    const isFavorite = false;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTitleMenu = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
        const random = Math.floor(Math.random() * album.titles.length);
        setRunningTitle(e, album.titles[random]);
    };

    function getRandomListening(min, max) {
        let valMin = Math.ceil(min);
        let valMax = Math.floor(max);
        let res = Math.floor(Math.random() * (valMax - valMin) + valMin);
        return res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return(
        <>
            <div className={classes.header}>
                { currentUser && (
                    <>
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
                            <MenuItem onClick={handleClose}>Supprimer cet album</MenuItem>
                        </Menu>
                    </>
                )}
                <Avatar variant={'square'} className={classes.avatar} alt={album.name} src={album.image} />
                <h2>{album.name}</h2>
                {
                    currentUser
                        ? (
                            isFavorite
                                ? (
                                    <Button variant={"contained"} color={"primary"} className={classes.favAdd}>
                                        Retirer des favoris
                                    </Button>
                                )
                                : (
                                    <Button variant={"outlined"} className={classes.favAdd}>
                                        Ajouter aux favoris
                                    </Button>
                                )
                        )
                        : (
                            <Button variant={"outlined"} className={classes.favAdd} disabled={true}>
                                Ajouter aux favoris
                            </Button>
                        )
                }
                <span>{nbListening} écoutes</span>
                <span>Album de <a className={classes.artistLink} href={`/artists?id=${album.author.id}`}>{album.author.name}</a> · {new Date(album.publicationDate).getFullYear()}</span>
                <Button variant={"contained"} className={classes.playButton} color={"primary"} onClick={(e) => randomPlay(e)} disabled={!(album.titles.length > 0)}>Lecture aléatoire</Button>
            </div>
            <div className={classes.body}>
                <div className={classes.content}>
                    <h2>Titres</h2>
                    <List className={classes.list}>
                        {
                            album.titles.map((title, index) => (
                                <ListItem button key={index} onClick={(e) => setRunningTitle(e, title)}>
                                    <ListItemAvatar>
                                        {
                                            title.image
                                                ? <Avatar variant={'square'} src={title.image} />
                                                : <Avatar variant={'square'}>
                                                    <MusicNoteIcon />
                                                </Avatar>
                                        }
                                    </ListItemAvatar>
                                    <ListItemText primary={title.name} secondary={album.author.name+" · "+title.duration} />
                                    {currentUser && (
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
                                                <MenuItem onClick={closeTitleMenu}>Ajouter à ma playlist</MenuItem>
                                                <MenuItem onClick={closeTitleMenu}>Ajouter au favoris</MenuItem>
                                                <MenuItem onClick={closeTitleMenu}>Retirer ce titre de l'album</MenuItem>
                                                <MenuItem onClick={closeTitleMenu}>Supprimer ce titre</MenuItem>
                                            </Menu>
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </div>
        </>
    )
};

AlbumDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export default AlbumDetails;