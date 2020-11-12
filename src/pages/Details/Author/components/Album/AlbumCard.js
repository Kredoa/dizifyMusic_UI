import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {USER_ROLE_COLOR} from "../../../../../assets/theme/colors";
import {artistAlbums} from "../../../../../assets/datas/Albums/ArtistDetails/artistAlbums";


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

const AlbumCard = ({item, id}) => {
    const classes = useStyles();

    return(
        <Card className={classes.card}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={item.image}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    <span>{item.titles.length} titre(s) · {new Date(item.publicationDate).getFullYear()} </span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

AlbumCard.propTypes = {
    id: PropTypes.string.isRequired,
};

export default AlbumCard;