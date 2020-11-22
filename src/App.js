import HomePage from "./pages/NotLogged/HomePage/HomePage";
import React, {useState, useContext} from "react";
import FavoritesPage from "./pages/FavoritesPages/FavoritesPage/FavoritesPage";
import {makeStyles} from "@material-ui/core/styles";
import {BACKGROUND_COLOR} from "./assets/theme/colors";
import SideMenu from "./components/SideMenu/SideMenu";
import {menuItems} from "./assets/datas/Menu/menuItems";
import NavBar from "./components/NavBar/NavBar";
import { Switch, Route, useLocation } from "react-router-dom";
import FavoriteDetails from "./pages/FavoritesPages/FavoritesDetails/FavoriteDetails";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import ArtistsPage from "./pages/ArtistsPage/ArtistsPage";
import PlaylistsPage from "./pages/PlaylistsPage/PlaylistsPage";
import ModalAdd from './components/Modals/AddModal/ModalsAdd'

import AlbumDetails from "./pages/Details/Album/AlbumDetails";
import AuthorDetails from "./pages/Details/Author/AuthorDetails";
import PlaylistDetails from "./pages/Details/Playlist/PlaylistDetails";

import UserContext from "./context/User/UserContext";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: BACKGROUND_COLOR,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        flexGrow: 1,
    },
    

}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function App() {
    const [selected, setSelected] = useState('Accueil');
    const classes = useStyles();
    const query = useQuery();
    const userContext= useContext(UserContext);
    const currentUser = userContext.user

    return (
        <div className="App">
            <div className={classes.root}>
                <SideMenu menu={menuItems} selected={selected}/>
                <div className={classes.content}>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact={true} render={(props) => {
                            setSelected('Accueil');
                            return <HomePage {...props} />
                        }}/>
                        <Route path="/favorites" exact={true} render={(props)=> {
                            let id = query.get("id");
                            let type = query.get("type");
                            setSelected('Favoris');
                            return id ? <FavoriteDetails id={id} type={type} {...props} /> : <FavoritesPage {...props} />
                        }}/>
                        <Route path="/albums" exact={true} render={(props) => {
                            let id = query.get("id");
                            setSelected('Albums');
                            return id ? <AlbumDetails id={id} {...props} /> : <AlbumsPage {...props} />
                        }}/>
                        <Route path="/artists" exact={true} render={(props) => {
                            let id = query.get("id");
                            setSelected('Artistes');
                            return id ? <AuthorDetails id={id} {...props} /> : <ArtistsPage {...props} />
                        }}/>
                        <Route path="/playlists" exact={true} render={(props) => {
                            let id = query.get("id");
                            setSelected('Playlists');
                            return id ? <PlaylistDetails id={id} {...props} /> : <PlaylistsPage {...props} />
                        }}/>
                    </Switch>
                    {currentUser &&  (
                        <ModalAdd />
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default App;
