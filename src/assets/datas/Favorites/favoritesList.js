import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../Types/entities";

export const favoritesList = [
    //Artiste
    {
        type: ARTISTE_TYPE,
        name: "Damso",
        image: "https://i.pravatar.cc/200"
    },
    //AlbumItem
    {
        type: ALBUM_TYPE,
        name: "Mafana",
        date: 2020,
        image: "https://picsum.photos/200",
        auteur: {
            type: ARTISTE_TYPE,
            name: "OBOY",
            image: "https://i.pravatar.cc/200"
        },
    },
    //Titre
    {
        type: TITRE_TYPE,
        name: "Cabeza",
        duree: "2:28",
        auteur: {
            type: ARTISTE_TYPE,
            name: "OBOY",
            image: "https://i.pravatar.cc/200"
        },
        album:     {
            type: ALBUM_TYPE,
            name: "Mafana",
            date: 2020,
            image: "https://picsum.photos/200",
            auteur: {
                type: ARTISTE_TYPE,
                name: "OBOY",
                image: "https://i.pravatar.cc/200"
            },
        },
    },
    //AlbumItem
    {
        type: ALBUM_TYPE,
        name: "QALF",
        date: 2020,
        image: "https://picsum.photos/200",
        auteur: {
            type: ARTISTE_TYPE,
            name: "Damso",
            image: "https://i.pravatar.cc/200"
        },
    },
    //Artiste
    {
        type: ARTISTE_TYPE,
        name: "Travis Scott",
        image: "https://i.pravatar.cc/200"
    },
    //Artiste
    {
        type: ARTISTE_TYPE,
        name: "13 organisé",
        image: "https://i.pravatar.cc/200"
    },
    //Artiste
    {
        type: ARTISTE_TYPE,
        name: "SCH",
        image: "https://i.pravatar.cc/200"
    },
];