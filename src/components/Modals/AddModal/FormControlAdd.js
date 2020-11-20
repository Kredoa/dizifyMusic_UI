import React, {Fragment, useState} from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    FormControl: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
    },
    Field : {
        width : 300,
        margin : '10px 0'
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
    }
}));



const FormControlAdd = ({handleClose}) => {
    
    const classes = useStyles();
    const [data, setData] = useState()
    const [selectDate, setSelectedDate] = useState(new Date())

    const handleSelectChange = (event) => {
        setData(event.target.value)
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const Body = ({type}) => {
        if (type === 'artist'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} label="Nom" variant="outlined"/>
                    <TextField className={classes.FormField} label="Description" multiline variant="outlined"/>
                </div>
            )
        } else if (type === 'album'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} label="Nom" variant="outlined"/>
                    <TextField className={classes.FormField} label="Artiste" variant="outlined" />
                    <TextField 
                        className={classes.FormField} 
                        type='date' 
                        defaultValue={selectDate} 
                        onChange={handleDateChange}
                        label="Date de création" 
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>   
            )
        } else if (type === 'playlist'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} label="Nom" variant="outlined"/>
                </div>
            )
        } else if (type === 'title'){
            return(
                <div className={classes.formSelect}>
                    <TextField className={classes.FormField} label="Nom" variant="outlined"/>
                    <div className={classes.FormFieldTime}>
                        <TextField className={classes.Duration} type='number' label="Heures" variant="outlined" InputLabelProps={{shrink: true,}}/>
                        <TextField className={classes.Duration} type='number' label="Minutes" variant="outlined" InputLabelProps={{shrink: true,}}/>
                        <TextField className={classes.Duration} type='number' label="Secondes" variant="outlined" InputLabelProps={{shrink: true,}}/>
                    </div>
                </div>
            )
        } else {
            return(
            <></>
            )
        }
    }

    return(
        <FormControl className={classes.FormControl}>
            <InputLabel htmlFor='age-native-helper'>Que souhaitez-vous ajouter ?</InputLabel>
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
                <Button disabled={!data} variant={"contained"} color={"primary"} className={classes.Add}>
                    Enregistrer
                </Button>
            </div>
        </FormControl>
    )
}

export default FormControlAdd