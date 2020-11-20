import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";
import PropTypes from "prop-types";
import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../../../assets/config/Types/entities";


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

const FavorisItem = ({item}) => {
    const classes = useStyles();

    const getImage = (item) => {
        if(item.type === TITRE_TYPE) {
            if(item.album) {
                return item.album.image;
            } else {
                return item.auteur.image;
            }
        } else {
            return item.image;
        }
    }
    return(
        <Card className={classes.card}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={getImage(item)}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    {(item.type === ARTISTE_TYPE)
                        ? <span>Artiste</span>
                        : (item.type === ALBUM_TYPE)
                            ? <span>Album de {item.auteur.name}</span>
                            : (item.type === TITRE_TYPE)
                                ? <span>Titre de {item.auteur.name}</span>
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