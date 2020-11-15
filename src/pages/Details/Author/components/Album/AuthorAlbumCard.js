import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {USER_ROLE_COLOR} from "../../../../../assets/theme/colors";
import {BASE_URL_API} from "../../../../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '150px',
    },
    cardContent: {
        padding: '5px',
        textAlign: 'center',
        '&>span': {
            color: USER_ROLE_COLOR,
        },
    },
}));

const getAlbum = async (id) => {
    const res = await fetch(`${BASE_URL_API}albums/${id}`);
    return await res.json();
};

const AuthorAlbumCard = ({id}) => {
    const classes = useStyles();
    const [album, setAlbum] = useState();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/albums?id=${id}`);
    };

    useEffect(() => {
        getAlbum(id).then(res => setAlbum(res))
    }, [setAlbum, id]);

    if(!album) return <CircularProgress />;

    return(
        <Card className={classes.card}>
            <CardActionArea onClick={(e) => handleSubmit(e)}>
                <CardMedia
                    component="img"
                    alt={album.name}
                    image={album.image}
                    title={album.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{album.name}</h2>
                    <span>{album.titles.length} titre(s) · {new Date(album.publicationDate).getFullYear()} </span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

AuthorAlbumCard.propTypes = {
    id: PropTypes.string.isRequired,
};

export default AuthorAlbumCard;