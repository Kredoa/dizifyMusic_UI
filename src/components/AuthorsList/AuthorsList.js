import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AuthorItem from "./Author/AuthorItem";
import {BASE_URL_API} from "../../assets/config/config";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
    authorsDiv:{
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

const getArtists = async () => {
    const res = await fetch(`${BASE_URL_API}artists`);
    return await res.json();
};

const AuthorsList = () => {

    const classes = useStyles();
    const [authors, setAuthors] = useState();

    useEffect(() => {
        getArtists().then(res => {
            const shuffled = res.sort(function(){return .5 - Math.random()});
            const sortedArtists = shuffled.slice(0,3);
            setAuthors(sortedArtists);
        });
    }, [setAuthors]);

    return(
        <div className={classes.albumsDiv}>
            <div className={classes.title}>
                <a href={'/artists'}>
                    <h2>
                        Artistes
                    </h2>
                    <ChevronRightIcon />
                </a>
            </div>
            { authors
                ? (
                    <div className={classes.list}>
                        {authors.map((art, index) =>
                            <AuthorItem item={art} key={index}/>
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

export default AuthorsList;