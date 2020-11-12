import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {favoritesList} from "../../../assets/datas/Favorites/favoritesList";
import FavoriteCard from "./FavoriteCard/FavoriteCard";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    favoritesTab: {
        padding: '5px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 395px))',
        gridGap: '1rem',
    }
}));
const FavoritesPage = () => {
    const classes = useStyles()
    return(
        <div className={classes.body}>
            <h2>Favoris</h2>
            <div className={classes.favoritesTab}>
                {favoritesList.map((item, index) =>
                    <FavoriteCard item={item} key={index} />
                )}
            </div>
        </div>
    )
}

export default FavoritesPage;