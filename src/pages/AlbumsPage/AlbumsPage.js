import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AlbumCard from "./AlbumCard/AlbumCard";
import {albumlist} from "../../assets/datas/Albums/albums";

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
const AlbumsPage = () => {
    const classes = useStyles()
    return(
        <div className={classes.body}>
            <h1>Albums</h1>
            <div className={classes.AlbumTab}>
                {albumlist.map((item, index) =>
                    <AlbumCard item={item} key={index}/>
                )}
            </div>
        </div>
    )
}

export default AlbumsPage;