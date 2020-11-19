import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, HOVER_UNLOGGED_COLOR} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PlaylistItem from "./Playlist/PlaylistItem";
import UserContext from "../../context/User/UserContext";
import axios from "axios";
import {BASE_URL_API} from "../../assets/config/config";

const useStyles = makeStyles(theme => ({
    playlistsDiv:{
        marginBottom: '20px',
        position: 'relative',
    },
    playlistsDivLoggedOut:{
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
}));

const getPlaylists = (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL_API}playlists`, { headers })
};

const PlaylistList = () => {

    const classes = useStyles();
    const userContext = useContext(UserContext);
    const currentUser = userContext.user
    const [playlists, setPlaylists] = useState([]);
    console.log(currentUser)

    useEffect(() => {
        console.log("useEffect")
        if(currentUser) {
            console.log('getPlaylist')
            getPlaylists(currentUser.token)
              .then(res => console.log(res))
        }
    }, [currentUser, setPlaylists]);

    return(
        <div className={userContext.user ? classes.playlistsDiv : classes.playlistsDivLoggedOut}>
            <div className={classes.title}>
                <a href={"/playlists"}>
                    <h2>
                        Playlists
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            { !userContext.user
                ? (
                    <div className={classes.hover}>
                        <p>Vous devez être connectés pour accéder aux playlists.</p>
                    </div>
                )
                : (
                    <div className={classes.list}>
                        {playlists.map((fav, index) =>
                            <PlaylistItem item={fav} key={index}/>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default PlaylistList;