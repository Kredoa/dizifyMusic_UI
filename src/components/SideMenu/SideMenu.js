import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    PRIMARY_COLOR,
    PROFILE_PIC_ADD_COLOR,
    PROFILE_PIC_ADD_COLOR_HOVER,
    USER_ROLE_COLOR
} from "../../assets/theme/colors";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>({
    menuDiv: {
        width: '250px',
        height: '100vh',
        backgroundColor: PRIMARY_COLOR,
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        position: 'sticky',
        top: 0,
    },
    profile: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '25px',
    },
    profileInfo: {
        textAlign: 'left',
        marginLeft: '10px',
        '&>h3': {
            margin: 0,
        },
        '&>span': {
            color: USER_ROLE_COLOR,
        },
    },
    badge: {
        '&>span>button': {
            backgroundColor: PROFILE_PIC_ADD_COLOR,
            '&:hover': {
                backgroundColor: PROFILE_PIC_ADD_COLOR_HOVER,
            },
        },
    },
    badgeIcon: {
        height: '10px',
        width: '10px',
    },
    list: {
        padding: '8px 0',
        '&>a': {
            paddingLeft: '25px',
            paddingRight: '25px',
        },
    },
}));

const SideMenu = ({menu, selected}) => {
    const classes = useStyles();

    const ListItemLink = (props) => {
        return(
            <ListItem button component={"a"} {...props}/>
        )
    }

    return(
        <>
            <div className={classes.menuDiv}>
                <div className={classes.profile}>
                    <Badge
                        className={classes.badge}
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <IconButton aria-label="changer la photo" size={'small'}>
                                <AddIcon className={classes.badgeIcon}/>
                            </IconButton>
                        }
                    >
                        <Avatar alt="Travis Howard" src={"https://i.pravatar.cc/200"} />
                    </Badge>
                    <div className={classes.profileInfo}>
                        <h3>Guest Name</h3>
                        <span>Utilisateur</span>
                    </div>
                </div>
                <Divider />
                <List className={classes.list}>
                    {menu.map((item, index) => (
                        <ListItemLink key={index} href={item.linkTo} selected={selected === item.label}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItemLink>
                    ))}
                </List>
            </div>
        </>
    )
};

SideMenu.propTypes = {
    menu: PropTypes.array.isRequired,
};

export default SideMenu;