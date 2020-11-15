import React, {useState} from "react";
import UserContext from "./UserContext";
import {user_test} from "../../assets/datas/User/user";

const UserProvider = props => {
    const [user, setUser] = useState(user_test);

    return(
        <UserContext.Provider
            value={
                {
                    user: user,
                    setUser: setUser,
                }
            }
        >
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;