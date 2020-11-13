import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FavorisList from "../../../components/FavoritesList/FavorisList";
import { favoritesList } from "../../../assets/datas/Favorites/favoritesList";
import PlaylistList from "../../../components/PlaylistsList/PlaylistsList";
import {playlists} from "../../../assets/datas/Playlists/playlists";
import AlbumsList from "../../../components/AlbumsList/AlbumsList";
import AuthorsList from "../../../components/AuthorsList/AuthorsList";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    }
}));

const HomePage = () => {
    const classes = useStyles();

    return(
        <div className={classes.body}>
            <FavorisList favorites={favoritesList} />
            <PlaylistList playlists={playlists}/>
            <AlbumsList />
            <AuthorsList />
        </div>
    )
}

export default HomePage;