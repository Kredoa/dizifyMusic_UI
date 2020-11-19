import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
import axios from "axios";
import {BASE_URL_API} from "../../assets/config/config";
import UserContext from "../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    AlbumTab: {
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

const getPlaylists = (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL_API}playlists`, { headers })
};

const PlaylistsPage = () => {
    const classes = useStyles()
    const userContext = useContext(UserContext);
    const currentUser = userContext.user;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
            getPlaylists(currentUser.token)
              .then(res => setPlaylists(res.data))
    }, [currentUser, setPlaylists]);

    return(
        <div className={classes.body}>
            <h1>Playlists</h1>
            { playlists.length > 0
                ? (
                <div className={classes.AlbumTab}>
                    {playlists.map((item, index) =>
                      <PlaylistCard item={item} key={index}/>
                    )}
                </div>
                )
                : (
                <div className={classes.emptyList}>
                    <p>Vous n'avez pas encore créé de playlists</p>
                </div>
              )
            }
        </div>
    )
}

export default PlaylistsPage;