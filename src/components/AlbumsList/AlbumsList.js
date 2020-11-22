import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AlbumItem from "./Album/AlbumItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {BASE_URL_API} from "../../assets/config/config";


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
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gridGap: '1rem',
    },
    loading: {
        height: '220px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const getAlbums = async () => {
    const res = await fetch(`${BASE_URL_API}albums`);
    return await res.json();
};

const AlbumsList = () => {

    const classes = useStyles();
    const [albums, setAlbums] = useState();

    useEffect(() => {
        getAlbums().then(res => {
            const shuffled = res.sort(function(){return .5 - Math.random()});
            const sortedAlbums = shuffled.slice(0,3);
            setAlbums(sortedAlbums);
        });
    }, [setAlbums]);

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
            { albums
                ? (
                    <div className={classes.list}>
                        {albums.map((alb, index) =>
                            <AlbumItem item={alb} key={index}/>
                        )}
                    </div>
                )
                : (
                    <div className={classes.loading}>
                        <CircularProgress />
                    </div>
                )
            }
        </div>
    );
}

export default AlbumsList;