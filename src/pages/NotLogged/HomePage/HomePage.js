import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FavorisList from "../../../components/FavoritesList/FavorisList";
import { favoritesList } from "../../../assets/datas/Favorites/favoritesList";
import PlaylistList from "../../../components/PlaylistsList/PlaylistsList";
import {playlists} from "../../../assets/datas/Playlists/playlists";
import AlbumsList from "../../../components/AlbumsList/AlbumsList";
import AuthorsList from "../../../components/AuthorsList/AuthorsList";
import UserContext from "../../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const userContext = useContext(UserContext)
    const currentUser = userContext.user

    return(
        <div className={classes.body}>
          {(!currentUser || currentUser.role === 'ROLE_USER') && (
            <>
              <FavorisList />
              <PlaylistList />
            </>
          )}
            <AlbumsList />
            <AuthorsList />
        </div>
    )
}

export default HomePage;