import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../Types/entities";

export const playlists = [
    {
        name: "Ma playlist",
        titres: [
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
            //Titre
            {
                type: TITRE_TYPE,
                name: "Bande organisée",
                duree: "5:56",
                auteur: {
                    type: ARTISTE_TYPE,
                    name: "13 Organisé",
                    image: "https://i.pravatar.cc/200"
                },
                album:     {
                    type: ALBUM_TYPE,
                    name: "13 Organisé",
                    date: 2020,
                    image: "https://picsum.photos/200",
                    auteur: {
                        type: ARTISTE_TYPE,
                        name: "13 Organisé",
                        image: "https://i.pravatar.cc/200"
                    },
                },
            },
        ]
    }
]