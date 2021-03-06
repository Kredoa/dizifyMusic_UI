import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";
import PropTypes from "prop-types";


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
}));

const AlbumItem = ({item}) => {
    const classes = useStyles();

    return(
        <Card>
            <CardActionArea className={classes.cardArea} href={`/albums?id=${item.id}`}>
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={"https://picsum.photos/200"}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h3>{item.name}</h3>
                    <span>Album de {item.author.name}</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

AlbumItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default AlbumItem;