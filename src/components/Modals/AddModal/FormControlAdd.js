import React, {useState, useEffect, useContext} from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios'
import {BASE_URL_API} from '../../../assets/config/config'
import UserContext from "../../../context/User/UserContext";

const useStyles = makeStyles(theme => ({
    FormControl: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
    },
    Field : {
        width : 300,
        margin : '10px'
    },
    CancelBtn :{
        marginRight: '10px', 
    },
    footer : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : '15px'
    },
    formSelect :{
        display: 'flex',
        flexDirection: 'column',
    },
    FormField : {
        margin : "10px ",
        width : 300,
    },
    FormFieldTime : {
        display : 'grid',
        gridTemplateColumns : 'repeat(3,minmax(0,1fr))',
        gridGap : '10px',

    },
    Duration :{
        width : '70px',
        margin : '10px'
    },
    Label :{
        marginLeft : '10px '
    }
}));

// Récupérer la listeb des artistes
const getListArtist = () => {
    return axios.get(`${BASE_URL_API}artists`)
};

const createAlbum = async (nom,auteur, date, user) => {
    const headers = {
        'Authorization' : `Bearer ${user.token}`
    }
    const body = {
        name : nom,
        author_id : auteur,
        publicationDate : date
    }
    const res = await axios.post(
        `${BASE_URL_API}albums`, 
        body,
        {headers}    
    )
}

// Créer une playlist
const createPlaylist = async (nom,titles,user) => {
    const headers = {
        'Authorization' : `Bearer ${user.token}`
    }
    const body = {
        name : nom,
        title_ids : titles
    }
    const res = await axios.post(
        `${BASE_URL_API}playlists`, 
        body,
        {headers}  
    ) 
}

// Créer un artist
const createArtist = async (nom,description,user) => {
    const headers = {
        'Authorization' : `Bearer ${user.token}`
    }
    const body = {
        name : nom,
        description : description,
    }
    const res = await axios.post(
        `${BASE_URL_API}artists`, 
        body,
        {headers}  
    ) 
}

// Créer un artist
const createTitle = async (nom,duration,auteur,user) => {
    const headers = {
        'Authorization' : `Bearer ${user.token}`
    }
    const body = {
        name : nom,
        duration : duration,
        author_id : auteur,
    }
    const res = await axios.post(
        `${BASE_URL_API}titles`, 
        body,
        {headers}
    ) 
}

const FormControlAdd = ({handleClose}) => {
    
    const classes = useStyles();
    const [data, setData] = useState()
    const [selectDate, setSelectedDate] = useState(new Date())
    const [artistChoice, setArtistChoice] = useState([])
    const [artistId,setArtistId] = useState()

    const userContext= useContext(UserContext);
    const currentUser = userContext.user
    
    const onSubmit = (event) => {
        switch (data){
            case 'artist' : 
                onArtistSubmit(event)
                break
            case 'album' : 
                onAlbumSubmit(event)
                break
            case 'playlist' :
                onPlaylistSubmit(event)
                break
            default : 
                onTitleSubmit(event)
        }
    }

    // Récupérer l'id de l'artiste selectionné au moment de la création d'un album
    const onSelectChange = (event) => {
        setArtistId(event.target.value)
    }

    // Appel de la function crééant le nouvel album en lui passant les paramètres requis
    const onAlbumSubmit = ( event ) => {
        const nom = event.target.AlbumName.value
        const date = event.target.AlbumDate.value
        createAlbum(nom,artistId,date,currentUser)
    }

    // Appel de la function crééant la nouvelle playlist en lui passant les paramètres requis
    const onPlaylistSubmit = (event) => {
        const nom = event.target.PlaylistName.value
        const titles = []
        console.log(titles)
        createPlaylist(nom, titles, currentUser)
    }

    // Appel de la function crééant le nouvel artiste en lui passant les paramètres requis
    const onArtistSubmit = (event) => {
        const nom = event.target.ArtistName.value
        const description = event.target.ArtistDescription.value
        createArtist(nom,description,currentUser)
    }

    const onTitleSubmit = (event) => {
        const nom = event.target.TitleName.value
        const hour = event.target.TitleDurationHr.value
        const min = event.target.TitleDurationMin.value
        const sec = event.target.TitleDurationSec.value
        const duration = hour + ':' + min + ':' + sec
        createTitle(nom, duration,artistId, currentUser)
    }

    useEffect(() => {
        getListArtist().then(res => setArtistChoice(res.data))
    }, []);

    const handleSelectChange = (event) => {
        setData(event.target.value)
    }

    // Affichage des formulaire selon le type d'ajout que l'on veut faire
    const Body = ({type}) => {
        // Si on veut ajouter un artiste
        if (type === 'artist'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} id={'ArtistName'} label="Nom" variant="outlined"/>
                    <TextField className={classes.FormField} id={'ArtistDescription'} label="Description" multiline variant="outlined"/>
                </div>    
            )
        // Si on veut ajouter un album
        } else if (type === 'album'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} id={'AlbumName'} label="Nom" variant="outlined"/>
                    <FormControl id={'artist'}>
                        <InputLabel className={classes.Label}>Artiste</InputLabel>
                        <Select  className={classes.Field} onChange={onSelectChange}>
                            {artistChoice.map((item,index) => {
                                return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField 
                        id={'AlbumDate'}
                        className={classes.FormField} 
                        type='date' 
                        defaultValue={selectDate} 
                        label="Date de publication" 
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>   
            )
        // Si on veut ajouter uen playlist
        } else if (type === 'playlist'){
            return(
                <div className={classes.formSelect}>
                    <TextField id={'PlaylistName'} className={classes.FormField} label="Nom" variant="outlined"/>
                </div>
            )

        // Si on veut ajouter un titre
        } else if (type === 'title'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} id={'TitleName'} label="Nom" variant="outlined"/>
                    <div className={classes.FormFieldTime}>
                        <TextField className={classes.Duration} id={'TitleDurationHr'} type='number' InputProps={{ inputProps: { min: 0, max:23} }} label="Heures" variant="outlined" InputLabelProps={{shrink: true,}}/>
                        <TextField className={classes.Duration} id={'TitleDurationMin'} type='number' InputProps={{ inputProps: { min: 0, max:59} }} label="Minutes" variant="outlined" InputLabelProps={{shrink: true,}}/>
                        <TextField className={classes.Duration} id={'TitleDurationSec'} type='number' InputProps={{ inputProps: { min: 0,max:59} }} label="Secondes" variant="outlined" InputLabelProps={{shrink: true,}}/>
                    </div>
                    <FormControl id={'artist'}>
                        <InputLabel className={classes.Label}>Artiste</InputLabel>
                        <Select  className={classes.Field} onChange={onSelectChange}>
                            {artistChoice.map((item,index) => {
                                return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            )
        } else {
            return(
            <></>
            )
        }
    }

    return(
    <form onSubmit={onSubmit}>
        <FormControl className={classes.FormControl}>
            <InputLabel className={classes.Label} htmlFor='selectType'>Que souhaitez-vous ajouter ?</InputLabel>
            <Select value={data} id='selectType' className={classes.Field} onChange={handleSelectChange}>
                <MenuItem value={'title'}>Titre</MenuItem>
                <MenuItem value={'artist'}>Artiste</MenuItem>
                <MenuItem value={'album'}>Album</MenuItem>
                <MenuItem value={'playlist'}>Playlist</MenuItem>
            </Select>
            <Body type={data} /> 
            <div className={classes.footer}>
                <Button variant={"contained"}  className={classes.CancelBtn} onClick={handleClose}>
                    Annuler
                </Button>
                <Button disabled={!data} variant={"contained"} color={"primary"} className={classes.Add} type={'submit'}>
                    Enregistrer
                </Button>
            </div>
        </FormControl>
    </form>        
    )
}

export default FormControlAdd