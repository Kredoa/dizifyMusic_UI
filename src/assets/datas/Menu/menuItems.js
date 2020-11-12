import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import QueueMusicOutlinedIcon from '@material-ui/icons/QueueMusicOutlined';
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

export const menuItems = [
    {
        icon: <HomeOutlinedIcon />,
        label: 'Accueil',
        linkTo: '/',
    },
    {
        icon: <FavoriteBorderOutlinedIcon />,
        label: 'Favoris',
        linkTo: '/favorites',
    },
    {
        icon: <QueueMusicOutlinedIcon />,
        label: 'Playlists',
        linkTo: '/playlists',
    },
    {
        icon: <AlbumOutlinedIcon />,
        label: 'Albums',
        linkTo: '/albums',
    },
    {
        icon: <AccountBoxIcon />,
        label: 'Artistes',
        linkTo: '/artists',
    },
];