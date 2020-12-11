import {ROLE_USER} from "../../config/Roles/roles";

export const user_test =
    {
        id: 4,
        role: ROLE_USER,
        username: "test",
        email: "jean@gmail.com",
        image: "https://i.pravatar.cc/200",
        updatedAt: "2020-11-11T13:14:25.000+01:00",
        createdAt: "2020-11-11T13:14:25.000+01:00",
        favorites:[],
        playlists: [
            {
                id: 8,
                name: "ma second play",
                updatedAt: "2020-11-11T13:41:09.000+01:00",
                createdAt: "2020-11-11T13:41:09.000+01:00"
            },
            {
                id: 7,
                name: "ma play",
                updatedAt: "2020-11-11T13:40:59.000+01:00",
                createdAt: "2020-11-11T13:40:59.000+01:00"
            }
        ]
    };