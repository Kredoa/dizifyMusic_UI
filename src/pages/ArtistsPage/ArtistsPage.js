import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {authorslist} from "../../assets/datas/Authors/authors";
import ArtistCard from "./ArtistCard/ArtistCard";

const useStyles = makeStyles(theme => ({
    body: {
        padding: '20px',
    },
    artistsTab: {
        padding: '5px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 395px))',
        gridGap: '1rem',
    }
}));
const ArtistsPage = () => {
    const classes = useStyles()
    return(
        <div className={classes.body}>
            <h1>Artistes</h1>
            <div className={classes.artistsTab}>
                {authorslist.map((item, index) =>
                    <ArtistCard item={item} key={index}/>
                )}
            </div>
        </div>
    )
}

export default ArtistsPage;