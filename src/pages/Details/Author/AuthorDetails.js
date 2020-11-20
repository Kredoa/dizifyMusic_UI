import React, {useContext, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import AuthorAlbumCard from "./components/Album/AuthorAlbumCard";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {BASE_URL_API} from "../../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthorTitleCard from "./components/Title/AuthorTitleCard";
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
        height: '60vh',
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
        padding: '5px 0',
        display: 'grid',
        // gridTemplateAreas: '"card card card card card card card"',
        // gridGap: '20px',
        gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))',
        gridGap: '1rem',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
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

const getArtist = async (id) => {
    const res = await fetch(`${BASE_URL_API}artists/${id}`);
    return await res.json();
};

const AuthorDetails = ({id}) => {

    const [artist, setArtist] = useState();
    const classesParent = useStyleParent();

    useEffect(() => {
        getArtist(id).then(res => setArtist(res))
    }, [setArtist, id]);

    const theme = createMuiTheme({
        image: {
            url: artist ? artist.image : "https://i.pravatar.cc/200",
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                {artist
                    ? <Artist artist={artist}/>
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

const Artist = ({artist}) => {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const titleContext = useContext(TitleContext);
    const currentUser = userContext.user;
    const [nbFollowers, setFollowers] = useState(getRandomFollowers(1000000, 3000000));
    const [anchorEl, setAnchorEl] = useState(null);
    const isFavorite = false;
    const titlesNotInAlbum = artist.titles.filter(t => !t.album);

    function getRandomFollowers(min, max) {
        let valMin = Math.ceil(min);
        let valMax = Math.floor(max);
        let res = Math.floor(Math.random() * (valMax - valMin) + valMin);
        return res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setRunningTitle = (e, object) => {
        e.preventDefault();
        titleContext.setTitle(object);
    };

    const randomPlay = (e) => {
        e.preventDefault();
        const random = Math.floor(Math.random() * artist.titles.length);
        setRunningTitle(e, artist.titles[random]);
    };

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
                            <MenuItem onClick={handleClose}>Ajouter à ma playlist</MenuItem>
                            <MenuItem onClick={handleClose}>Supprimer cet album</MenuItem>
                        </Menu>
                    </>
                )}
                <Avatar className={classes.avatar} alt={artist.name} src={"https://i.pravatar.cc/200"} />
                <h2>{artist.name}</h2>
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
                <span>{nbFollowers} Auditeurs par mois</span>
                <Button variant={"contained"} className={classes.playButton} color={"primary"} onClick={(e) => randomPlay(e)} disabled={!(artist.titles.length > 0)}>Lecture aléatoire</Button>
            </div>
            <div className={classes.body}>
                <div className={classes.content}>
                    <h2>Description</h2>
                    {artist.description
                        ? <p>{artist.description}</p>
                        : <p>Aucune description disponible.</p>
                    }
                </div>
                <div className={classes.content}>
                    <h2>Albums</h2>
                    {
                        artist.albums.length > 0
                            ? (
                                <div className={classes.list}>
                                    {artist.albums.map((item, index) => (
                                        <AuthorAlbumCard id={item.id} key={index}/>
                                    ))}
                                </div>
                            )
                            : (
                                <p>Aucune données.</p>
                            )
                    }

                </div>
                <div className={classes.content}>
                    <h2>Autre(s) titre(s)</h2>
                    {
                        titlesNotInAlbum.length > 0
                            ? (
                                <div className={classes.list}>
                                    {titlesNotInAlbum.map((item, index) => (
                                        <AuthorTitleCard title={item} key={index}/>
                                    ))}
                                </div>
                            )
                            : (
                                <p>Aucune données.</p>
                            )
                    }
                </div>
            </div>
        </>
    )
};

export default AuthorDetails;