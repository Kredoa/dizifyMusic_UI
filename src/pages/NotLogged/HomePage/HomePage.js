import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideMenu from "../../../components/SideMenu/SideMenu";
import {BACKGROUND_COLOR} from "../../../assets/theme/colors";
import NavBar from "../../../components/NavBar/NavBar";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        // position: 'relative',
        justifyContent: 'flex-start',
        backgroundColor: BACKGROUND_COLOR,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        flexGrow: 1,
    }
}));
const HomePage = () => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <SideMenu />
            <div className={classes.content}>
                <NavBar />
                <h2> Content </h2>
            </div>
        </div>
    )
}

export default HomePage;