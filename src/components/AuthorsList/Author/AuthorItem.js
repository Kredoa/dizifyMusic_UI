import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {USER_ROLE_COLOR} from "../../../assets/theme/colors";
import PropTypes from "prop-types";


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

const AuthorItem = ({item}) => {
    const classes = useStyles();

    const getNbTitres = (item) => {
        const array =Array.from({length:20},(v,k)=>k*1);
        const nb = array[Math.floor(Math.random()*array.length)];
        return nb;
    }

    return(
        <Card className={classes.card}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    alt={item.name}
                    image={"https://i.pravatar.cc/200"}
                    title={item.name}
                />
                <CardContent className={classes.cardContent}>
                    <h2>{item.name}</h2>
                    <span>{getNbTitres(item)} album(s)</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

AuthorItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default AuthorItem;