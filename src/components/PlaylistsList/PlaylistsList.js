import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import PlaylistItem from "./Playlist/PlaylistItem";

const useStyles = makeStyles(theme => ({
    playlistsDiv:{
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

const PlaylistList = ({playlists}) => {

    const classes = useStyles();

    return(
        <div className={classes.playlistsDiv}>
            <div className={classes.title}>
                <a href={"/playlists"}>
                    <h2>
                        Playlists
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            <div className={classes.list}>
                {playlists.map((fav, index) =>
                    <PlaylistItem item={fav} key={index}/>
                )}
            </div>
        </div>
    );
}

PlaylistList.propTypes = {
    playlists: PropTypes.array.isRequired,
};

export default PlaylistList;