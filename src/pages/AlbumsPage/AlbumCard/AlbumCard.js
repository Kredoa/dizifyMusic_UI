import React, {useState} from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";


const useStyles = makeStyles(theme => ({
    cardArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&>img': {
            maxWidth: '10em',
            height: '10em',
        },
    },
    cardContent: {
        padding: '10px',
        '&>span': {
            color: USER_ROLE_COLOR,
        },
    },
    cardActions: {
        justifyContent: 'flex-start',
        padding: 0,
    },
}));

const AlbumCard = ({item}) => {
    const classes = useStyles();

    const [isFav, setFav] = useState(false);

    return(
        <Card>
            <CardActionArea className={classes.cardArea} href={`/albums?id=${item.id}`}>
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={item.image}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    <span>Album de {item.author.name}</span>
                    <br/>
                    <span>{new Date(item.publicationDate).getFullYear()+" · "+item.titles.length+" titre(s)"}</span>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label="add to favorites">
                    { isFav ? <FavoriteIcon color={"error"}/> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label="add-to-playlist">
                    <AddIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

AlbumCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default AlbumCard;