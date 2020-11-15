import React, {useContext} from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, HOVER_UNLOGGED_COLOR} from "../../assets/theme/colors";
import FavorisItem from "./Favorite/FavorisItem";
import PropTypes from 'prop-types';
import UserContext from "../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    favoritesDiv:{
        marginBottom: '20px',
        position: 'relative',
    },
    favoritesDivLoggedOut:{
        marginBottom: '20px',
        position: 'relative',
        height: '250px',
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
    hover: {
        backgroundColor: HOVER_UNLOGGED_COLOR,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '260px',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&>p': {
            fontWeight: '500',
            fontSize: '20px'
        }
    },
}));

const FavorisList = ({favorites}) => {

    const classes = useStyles();
    const userContext = useContext(UserContext);

    return(
        <div className={userContext.user ? classes.favoritesDiv : classes.favoritesDivLoggedOut}>
            <div className={classes.title}>
                <a href={"/favorites"}>
                    <h2>
                        Favoris
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            { !userContext.user
                ? (
                    <div className={classes.hover}>
                        <p>Vous devez être connectés pour accéder aux favoris.</p>
                    </div>
                )
                : (
                    <div className={classes.list}>
                        {favorites.map((fav, index) =>
                            <FavorisItem item={fav} key={index}/>
                        )}
                    </div>
                )
            }
        </div>
    );
};

FavorisList.propTypes = {
    favorites: PropTypes.array.isRequired,
};

export default FavorisList;