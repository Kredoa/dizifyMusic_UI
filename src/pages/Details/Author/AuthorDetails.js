import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {author} from "../../../assets/datas/Authors/author";
import Button from "@material-ui/core/Button";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {artistAlbums} from "../../../assets/datas/Authors/ArtistDetails/artistAlbums";
import AuthorAlbumCard from "./components/Album/AuthorAlbumCard";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
            maxWidth: '50rem',
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

const AuthorDetails = () => {

    const theme = createMuiTheme({
        image: {
            url: author.image,
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Artist/>
            </ThemeProvider>
        </>
    );
};

const Artist = () => {
    const classes = useStyles();

    const isFavorite = false;

    function getRandomFollowers(min, max) {
        let valMin = Math.ceil(min);
        let valMax = Math.floor(max);
        let res = Math.floor(Math.random() * (valMax - valMin) + valMin);
        return res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return(
        <>
            <div className={classes.header}>
                <IconButton className={classes.deleteButton} aria-label="delete">
                    <MoreVertIcon />
                </IconButton>
                <Avatar className={classes.avatar} alt={author.name} src={"https://i.pravatar.cc/200"} />
                <h2>{author.name}</h2>
                {isFavorite
                    ? <Button variant={"contained"} color={"primary"} className={classes.favAdd}>
                        Retirer des favoris
                    </Button>
                    : <Button variant={"outlined"} className={classes.favAdd}>
                        Ajouter aux favoris
                    </Button>
                }
                <span>{getRandomFollowers(1000000, 3000000)} Auditeurs par mois</span>
                <Button variant={"contained"} className={classes.playButton} color={"primary"}>Lecture aléatoire</Button>
            </div>
            <div className={classes.body}>
                <div className={classes.content}>
                    <h2>Description</h2>
                    {author.description
                        ? <p>{author.description}</p>
                        : <p>Aucune description disponible.</p>
                    }
                </div>
                <div className={classes.content}>
                    <h2>Albums</h2>
                    <div className={classes.list}>
                        {artistAlbums.map((item, index) => (
                            <AuthorAlbumCard id={item.id} item={item} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Autre(s) titre(s)</h2>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default AuthorDetails;