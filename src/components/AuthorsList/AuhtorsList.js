import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../assets/theme/colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import AuthorItem from "./Author/AuthorItem";


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
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridGap: '1rem',
    },
}))

const AuthorsList = ({authors}) => {

    const classes = useStyles();

    const shuffled = authors.sort(function(){return .5 - Math.random()});

    const sortedAuthors = shuffled.slice(0,3);

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
            <div className={classes.list}>
                {sortedAuthors.map((fav, index) =>
                    <AuthorItem item={fav} key={index}/>
                )}
            </div>
        </div>
    );
}

AuthorsList.propTypes = {
    authors: PropTypes.array.isRequired,
};

export default AuthorsList;