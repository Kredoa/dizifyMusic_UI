import HomePage from "./pages/NotLogged/HomePage/HomePage";
import React, {useState} from "react";
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
    const [selected, setSelected] = useState('Accueil')
    const classes = useStyles();
    const query = useQuery();

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
                        setSelected('Albums');
                        return <AlbumsPage {...props} />
                    }}/>
                    <Route path="/artists" exact={true} render={(props) => {
                        setSelected('Artistes');
                        return <ArtistsPage {...props} />
                    }}/>
                    <Route path="/playlists" exact={true} render={(props) => {
                        setSelected('Playlists');
                        return <PlaylistsPage {...props} />
                    }}/>
                </Switch>
                
                <ModalAdd />
            </div>
        </div>
    </div>
    );
}

export default App;
