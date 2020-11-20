import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
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

const ArtistCard = ({item}) => {
    const classes = useStyles();

    return(
        <Card>
            <CardActionArea className={classes.cardArea} href={`/artists?id=${item.id}`}>
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={item.image}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    <span>Artiste</span>
                    <br/>
                    <span>{item.albums.length} album(s)</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ArtistCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ArtistCard;