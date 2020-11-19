import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {favoritesList} from "../../../assets/datas/Favorites/favoritesList";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import axios from "axios";
import {BASE_URL_API} from "../../../assets/config/config";
import UserContext from "../../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    favoritesTab: {
        padding: '5px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 395px))',
        gridGap: '1rem',
    },
    emptyList: {
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const getAllFavorites = (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL_API}all-favorites`, { headers })
};

const FavoritesPage = () => {
    const classes = useStyles()
    const userContext = useContext(UserContext);
    const currentUser = userContext.user;
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getAllFavorites(userContext.user.token)
          .then(res => setFavorites(res.data))
    }, [setFavorites]);

    console.log(favorites)
    return(
        <div className={classes.body}>
            <h1>Favoris</h1>
            { favorites.length > 0
                ? (
                    <div className={classes.favoritesTab}>
                        {favorites.map((item, index) =>
                          <FavoriteCard item={item} key={index} />
                        )}
                    </div>
                  )
                : (
                    <div className={classes.emptyList}>
                        <p>Vous n'avez pas encore de favoris</p>
                    </div>
                  )
            }
        </div>
    )
}

export default FavoritesPage;