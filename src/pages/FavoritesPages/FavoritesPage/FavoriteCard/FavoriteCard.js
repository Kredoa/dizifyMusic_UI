import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../../../../assets/config/Types/entities";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../../assets/theme/colors";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import TitleContext from "../../../../context/Title/TitleContext";
import axios from "axios";
import {BASE_URL_API} from "../../../../assets/config/config";
import {Redirect, useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    cardArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&>img': {
            maxWidth: '10em',
        },
    },
    cardContent: {
        padding: '10px',
        '&>span': {
            color: USER_ROLE_COLOR,
        },
    },
    cardActions: {
        justifyContent: 'center',
    },
}));

const getTitle = (id) => {
    return axios.get(`${BASE_URL_API}titles/${id}`)
};

const FavoriteCard = ({item, deleteFav}) => {
    const history = useHistory();
    const classes = useStyles();
    const titleContext = useContext(TitleContext);
    const [title, setTitle] = useState()

    useEffect(() => {
        if(item.type === TITRE_TYPE) {
            getTitle(item.title_id).then(res => setTitle(res.data));
        }
    }, [item])

    const getImage = (item) => {
        if(item.type === TITRE_TYPE || item.type === ALBUM_TYPE) {
            return 'https://picsum.photos/200'
        } else {
            return 'https://i.pravatar.cc/200';
        }
    }

    const redirectTo = () => {
        if(item.type === ALBUM_TYPE) {
            history.push(`/albums?id=${item.album_id}`);
        } else {
            history.push(`/artists?id=${item.artist_id}`);
        }
    }

    const setRunningTitle = (e, object) => {
        e.preventDefault();
        titleContext.setTitle(object);
    };

    return(
        <Card>
            <CardActionArea className={classes.cardArea} onClick={item.type===TITRE_TYPE ? (e) => setRunningTitle(e, title) : redirectTo} >
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={getImage(item)}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h3>{item.name}</h3>
                    {(item.type === ARTISTE_TYPE)
                        ? <span>Artiste</span>
                        : (item.type === ALBUM_TYPE)
                            ? <span>Album de {item.artist.name}</span>
                            : (item.type === TITRE_TYPE)
                                ? <span>Titre de {item.artist.name}</span>
                                : <span></span>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button
                    variant="text"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteFav(item.id)}
                >
                    Retirer des favoris
                </Button>
            </CardActions>
        </Card>
    );
}

FavoriteCard.propTypes = {
    item: PropTypes.object.isRequired,
    deleteFromFavorites: PropTypes.func.isRequired,
};

export default FavoriteCard;