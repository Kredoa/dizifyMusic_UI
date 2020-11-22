import React from "react";
import PropTypes from "prop-types";
import {ALBUM_TYPE, ARTISTE_TYPE} from "../../../assets/config/Types/entities";
import AuthorDetails from "../../Details/Author/AuthorDetails";
import AlbumDetails from "../../Details/Album/AlbumDetails";

const FavoriteDetails = ({id, type}) => {
    return (
        <>
            {/*<h2>{id}</h2>*/}
            {
                type === ARTISTE_TYPE
                    ? <AuthorDetails/>
                    : type === ALBUM_TYPE
                        ? <AlbumDetails />
                        : <div></div>
            }
        </>
    );
};

FavoriteDetails.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default FavoriteDetails;