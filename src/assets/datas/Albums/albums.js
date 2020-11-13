import {ALBUM_TYPE, ARTISTE_TYPE, TITRE_TYPE} from "../Types/entities";

export const albumlist = [
    //AlbumItem
    {
        id: 9,
        name: "mon album",
        image: "https://picsum.photos/200",
        publicationDate: "2017-11-15 01:00:00.0",
        updatedAt: "2020-11-11T13:52:00.000+01:00",
        createdAt: "2020-11-11T13:45:03.000+01:00",
        titles: [],
        author: {
            id: 1,
            name: "jean",
            updatedAt: "2020-11-11T13:11:58.000+01:00",
            createdAt: "2020-11-11T13:11:58.000+01:00"
        }
    },
    {
        id: 9,
        name: "QALF",
        image: "https://picsum.photos/200",
        publicationDate: "2020-11-15 01:00:00.0",
        updatedAt: "2020-11-11T13:52:00.000+01:00",
        createdAt: "2020-11-11T13:45:03.000+01:00",
        titles: [
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"}
        ],
        author: {
            id: 1,
            name: "DAMS0",
            updatedAt: "2020-11-11T13:11:58.000+01:00",
            createdAt: "2020-11-11T13:11:58.000+01:00"
        }
    },
    {
        id: 9,
        name: "LMF",
        image: "https://picsum.photos/700/500",
        publicationDate: "2017-11-15 01:00:00.0",
        updatedAt: "2020-11-11T13:52:00.000+01:00",
        createdAt: "2020-11-11T13:45:03.000+01:00",
        titles: [
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"},
        ],
        author: {
            id: 1,
            name: "Freeze Corleone",
            updatedAt: "2020-11-11T13:11:58.000+01:00",
            createdAt: "2020-11-11T13:11:58.000+01:00"
        }
    },
    {
        id: 9,
        name: "Bröl",
        image: "https://picsum.photos/700/500",
        publicationDate: "2017-11-15 01:00:00.0",
        updatedAt: "2020-11-11T13:52:00.000+01:00",
        createdAt: "2020-11-11T13:45:03.000+01:00",
        titles: [
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"},
            { object: "object"}
            ],
        author: {
            id: 1,
            name: "Angèle",
            updatedAt: "2020-11-11T13:11:58.000+01:00",
            createdAt: "2020-11-11T13:11:58.000+01:00"
        }
    },
];