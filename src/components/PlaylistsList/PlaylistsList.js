import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, HOVER_UNLOGGED_COLOR} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import PlaylistItem from "./Playlist/PlaylistItem";
import UserContext from "../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    playlistsDiv:{
        marginBottom: '20px',
        position: 'relative',
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

const PlaylistList = ({playlists}) => {

    const classes = useStyles();
    const userContext = useContext(UserContext);

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
            { !userContext.user && (
                <div className={classes.hover}>
                    <p>Vous devez être connectés pour accéder aux playlists.</p>
                </div>
            )}
        </div>
    );
};

PlaylistList.propTypes = {
    playlists: PropTypes.array.isRequired,
};

export default PlaylistList;