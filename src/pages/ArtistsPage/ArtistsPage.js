import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ArtistCard from "./ArtistCard/ArtistCard";
import {BASE_URL_API} from "../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    artistsTab: {
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

const getArtists = async () => {
    const res = await fetch(`${BASE_URL_API}artists`);
    return await res.json();
};

const ArtistsPage = () => {
    const classes = useStyles();
    const [artists, setArtists] = useState();

    useEffect(() => {
        getArtists().then(res => setArtists(res))
    }, [setArtists]);

    return(
        <div className={classes.body}>
            <h1>Artistes</h1>
            { artists
                ? (
                    <div className={classes.artistsTab}>
                        {artists.map((item, index) =>
                            <ArtistCard item={item} key={index}/>
                        )}
                    </div>
                )
                : (
                    <div className={classes.loading}>
                        <CircularProgress />
                    </div>
                )}
        </div>
    )
};

export default ArtistsPage;