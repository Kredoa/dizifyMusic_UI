import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AlbumCard from "./AlbumCard/AlbumCard";
import {BASE_URL_API} from "../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    loading: {
        height: '30rem',
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

const AlbumsPage = () => {
    const classes = useStyles();
    const [albums, setAlbums] = useState();

    useEffect(() => {
        getAlbums().then(res => {
            setAlbums(res);
        });
    }, [setAlbums]);

    return(
        <div className={classes.body}>
            <h1>Albums</h1>
            { albums
                ? (
                    <div className={classes.AlbumTab}>
                        {albums.map((item, index) =>
                            <AlbumCard item={item} key={index}/>
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
    )
};

export default AlbumsPage;