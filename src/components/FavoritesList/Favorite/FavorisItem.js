import React, {useContext, useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";
import PropTypes from "prop-types";
import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../../../assets/config/Types/entities";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {BASE_URL_API} from "../../../assets/config/config";
import TitleContext from "../../../context/Title/TitleContext";


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

const getTitle = (id) => {
    return axios.get(`${BASE_URL_API}titles/${id}`)
};

const FavorisItem = ({item}) => {
    const classes = useStyles();
    const history = useHistory();
    const titleContext = useContext(TitleContext);
    const [title, setTitle] = useState();

    const getImage = (item) => {
        if(item.type === TITRE_TYPE || item.type === ALBUM_TYPE) {
            return 'https://picsum.photos/200'
        } else {
            return 'https://i.pravatar.cc/200';
        }
    }

    useEffect(() => {
        if(item.type === TITRE_TYPE) {
            getTitle(item.title_id).then(res => setTitle(res.data));
        }
    }, [item])

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
        <Card className={classes.card}>
            <CardActionArea onClick={item.type===TITRE_TYPE ? (e) => setRunningTitle(e, title) : redirectTo} >
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
        </Card>
    );
};

FavorisItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FavorisItem;