import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import Album from "./Album/Album";


const useStyles = makeStyles(theme => ({
    albumsDiv:{
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

const AlbumsList = ({albums}) => {

    const classes = useStyles();

    const shuffled = albums.sort(function(){return .5 - Math.random()});

    const sortedAlbums = shuffled.slice(0,3);

    return(
        <div className={classes.albumsDiv}>
            <div className={classes.title}>
                <a href={'/albums'}>
                    <h2>
                        Albums
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            <div className={classes.list}>
                {sortedAlbums.map((fav, index) =>
                    <Album item={fav} key={index}/>
                )}
            </div>
        </div>
    );
}

AlbumsList.propTypes = {
    albums: PropTypes.array.isRequired,
};

export default AlbumsList;