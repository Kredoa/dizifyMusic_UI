import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../../../../assets/datas/Types/entities";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../../assets/theme/colors";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

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

const FavoriteCard = ({item}) => {
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
        <Card>
            <CardActionArea className={classes.cardArea} href={`/favorites?id=23&type=${item.type}`}>
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
            <CardActions className={classes.cardActions}>
                <Button
                    variant="text"
                    size="small"
                    startIcon={<DeleteIcon />}
                >
                    Retirer des favoris
                </Button>
            </CardActions>
        </Card>
    );
}

FavoriteCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FavoriteCard;