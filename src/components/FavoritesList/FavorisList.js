import React, {useContext, useEffect, useState} from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, HOVER_UNLOGGED_COLOR} from "../../assets/theme/colors";
import FavorisItem from "./Favorite/FavorisItem";
import UserContext from "../../context/User/UserContext";
import axios from "axios";
import {BASE_URL_API} from "../../assets/config/config";
import {favoritesList} from "../../assets/datas/Favorites/favoritesList";
import PlaylistItem from "../PlaylistsList/Playlist/PlaylistItem";

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
    emptyList: {
        width: '100%',
        height: '260px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const getAllFavorites = (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL_API}all-favorites`, { headers })
};

const FavorisList = () => {

    const classes = useStyles();
    const userContext = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(userContext.user) {
            getAllFavorites(userContext.user.token)
              .then(res => setFavorites(res.data))
        }
    }, [setFavorites]);

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
                : favorites.length === 0
                    ? (
                      <div className={classes.emptyList}>
                          <p>Vous n'avez pas de favoris pour le moment</p>
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

export default FavorisList;