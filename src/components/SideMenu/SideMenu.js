import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    PLAYER_BACKGROUND_COLOR,
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
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CloseIcon from '@material-ui/icons/Close';
import TitleContext from "../../context/Title/TitleContext";
import UserContext from "../../context/User/UserContext";
import {ROLE_ADMIN, ROLE_USER} from "../../assets/config/Roles/roles";

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
    player: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        backgroundColor: PLAYER_BACKGROUND_COLOR,
        maxHeight: '200px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        '&>img': {
            width: '80%',
        },
    },
    title: {
        marginTop: '10px',
        textAlign: 'center',
        '&>span': {
            color: USER_ROLE_COLOR,
            fontSize: '15px',
        }
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: PRIMARY_COLOR,
        padding: 0,
    },
    displayNone: {
        display: 'none',
    }
}));

const SideMenu = ({menu, selected}) => {
    const classes = useStyles();
    const context = useContext(TitleContext);
    const userContext = useContext(UserContext);

    const [playerRunning, setPlayerRunning] = useState(true);
    const title = context.title;
    const currentUser = userContext.user;

    const isDisabled = (item) => {
        if(item.label === 'Favoris' || item.label === 'Playlists') {
            return !userContext.user;
        }
        return false;
    };

    const ListItemLink = (props) => {
        return(
            <ListItem button component={"a"} {...props}/>
        )
    };

    const handlePlayerclick = (e) => {
        e.preventDefault();
        setPlayerRunning(!playerRunning);
    };

    const closePlayer = () => {
        context.setTitle(null);
        setPlayerRunning(true);
    };

    const getLabel = (role) => {
        if(role === 'ROLE_USER') return ROLE_USER
        if(role === 'ROLE_ADMIN') return ROLE_ADMIN
    }

    return(
        <>
            <div className={classes.menuDiv}>
                <div className={classes.profile}>
                    {
                        currentUser
                            ? (
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
                                    {
                                        currentUser.image
                                            ? <Avatar alt="Travis Howard" src={currentUser.image} />
                                            : <Avatar alt="Invité">{currentUser.username.charAt(0)}</Avatar>
                                    }
                                </Badge>
                            )
                            : (
                                <Avatar alt="Invité">I</Avatar>
                            )
                    }
                    <div className={classes.profileInfo}>
                        { currentUser
                            ? <h3>{currentUser.username}</h3>
                            : <h3>Invité</h3>
                        }
                        { currentUser
                            ? <span>{getLabel(currentUser.role) || 'Utilisateur'}</span>
                            : <span>Visiteur</span>
                        }
                    </div>
                </div>
                <Divider />
                <List className={classes.list}>
                    {menu.map((item, index) => (
                        <ListItemLink key={index} href={item.linkTo} selected={selected === item.label} disabled={isDisabled(item)} >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItemLink>
                    ))}
                </List>
                {
                    title && (
                        <div className={classes.player}>
                            <div className={classes.image}>
                                <img src="https://i.pravatar.cc/200" alt=""/>
                                <IconButton aria-label="close" className={classes.close} onClick={closePlayer} >
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                            <div className={classes.title}>
                                <h3>{title.name}</h3>
                                <span>{title.duration}</span>
                            </div>
                            <div>
                                <IconButton aria-label="previous">
                                    <SkipPreviousIcon />
                                </IconButton>
                                <IconButton aria-label="play/pause">
                                    {playerRunning
                                        ? <PauseIcon fontSize={"large"} onClick={handlePlayerclick}/>
                                        : <PlayArrowIcon fontSize={"large"} onClick={handlePlayerclick}/>
                                    }
                                </IconButton>
                                <IconButton aria-label="next">
                                    <SkipNextIcon />
                                </IconButton>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
};

SideMenu.propTypes = {
    menu: PropTypes.array.isRequired,
};

export default SideMenu;