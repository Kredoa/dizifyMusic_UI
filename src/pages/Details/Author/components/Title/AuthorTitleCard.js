import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {USER_ROLE_COLOR} from "../../../../../assets/theme/colors";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Avatar from "@material-ui/core/Avatar";
import TitleContext from "../../../../../context/Title/TitleContext";

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
    image: {
        width: '100%',
        height: '150px',
    }
}));

const AuthorTitleCard = ({title}) => {
    const classes = useStyles();
    const context = useContext(TitleContext);

    const setRunningTitle = (e, object) => {
        e.preventDefault();
        context.setTitle(object);
    };

    return(
        <Card className={classes.card}>
            <CardActionArea onClick={(e) => setRunningTitle(e, title)}>
                <CardMedia>
                    <Avatar variant={'square'} className={classes.image}>
                        <MusicNoteIcon fontSize={"large"} />
                    </Avatar>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <h2>{title.name}</h2>
                    <span>{title.duration}</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

AuthorTitleCard.propTypes = {
    title: PropTypes.object.isRequired,
};

export default AuthorTitleCard;