import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {playlists} from "../../assets/datas/Playlists/playlists";
import PlaylistCard from "./PlaylistCard/PlaylistCard";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    AlbumTab: {
        padding: '5px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 395px))',
        gridGap: '1rem',
    }
}));
const PlaylistsPage = () => {
    const classes = useStyles()
    return(
        <div className={classes.body}>
            <h1>Playlists</h1>
            <div className={classes.AlbumTab}>
                {playlists.map((item, index) =>
                    <PlaylistCard item={item} key={index}/>
                )}
            </div>
        </div>
    )
}

export default PlaylistsPage;