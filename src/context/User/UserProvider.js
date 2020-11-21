import React, {useState} from "react";
import UserContext from "./UserContext";

const UserProvider = props => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);

    const setSessionUser = (user) => {
      console.log("setUser")
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user))
    }

    return(
        <UserContext.Provider
            value={
                {
                    user: user,
                    setUser: setSessionUser,
                }
            }
        >
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;