import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    PRIMARY_COLOR,
    PROFILE_PIC_ADD_COLOR,
    PROFILE_PIC_ADD_COLOR_HOVER,
    USER_ROLE_COLOR
} from "../../assets/theme/colors";
import profile from './profile.png';
import Divider from "@material-ui/core/Divider";
import {menuItems} from './../../assets/datas/menuItems';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) =>({
    menuDiv: {
        width: '250px',
        height: '100vh',
        backgroundColor: PRIMARY_COLOR,
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
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

const SideMenu = () => {
    const classes = useStyles();

    const ListItemLink = (props) => {
        return(
            <ListItem button component={"a"} {...props} />
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
                        <Avatar alt="Travis Howard" src={profile} />
                    </Badge>
                    <div className={classes.profileInfo}>
                        <h3>Guest Name</h3>
                        <span>Utilisateur</span>
                    </div>
                </div>
                <Divider />
                <List className={classes.list}>
                    {menuItems.map((item, index) => (
                        <ListItemLink key={index} href={item.linkTo}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItemLink>
                    ))}
                </List>
            </div>
        </>
    )
};

export default SideMenu;