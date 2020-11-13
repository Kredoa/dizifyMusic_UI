import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";
import PropTypes from "prop-types";
import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../../../assets/datas/Types/entities";


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

const PlaylistItem = ({item}) => {
    const classes = useStyles();

    return(
        <Card className={classes.card}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={"https://picsum.photos/200"}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    <span>{item.titles.length} titre(s)</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

PlaylistItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default PlaylistItem;