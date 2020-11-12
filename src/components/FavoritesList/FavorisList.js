import React from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import Favoris from "./Favorite/Favoris";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    favoritesDiv:{
        marginBottom: '20px',
    },
    title: {
        '&>a': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: 'fit-content',
            textDecoration: 'none',
            color: BLACK,
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    list: {
        padding: '5px 0',
        display: 'grid',
        // gridTemplateAreas: '"card card card card card card card"',
        // gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridGap: '1rem',
    },
}))

const FavorisList = ({favorites}) => {

    const classes = useStyles();

    return(
        <div className={classes.favoritesDiv}>
            <div className={classes.title}>
                <a href={"/favorites"}>
                    <h2>
                        Favoris
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            <div className={classes.list}>
                {favorites.map((fav, index) =>
                    <Favoris item={fav} key={index}/>
                )}
            </div>
        </div>
    );
};

FavorisList.propTypes = {
    favorites: PropTypes.array.isRequired,
};

export default FavorisList;