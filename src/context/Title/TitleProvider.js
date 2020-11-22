import React, {useState} from "react";
import TitleContext from "./TitleContext";

const TitleProvider = props => {
    const [title, setTitle] = useState(JSON.parse(localStorage.getItem("title")) || null);

    const setSessionTitle = (title) => {
        setTitle(title);
        localStorage.setItem("title", JSON.stringify(title));
    };

    return(
        <TitleContext.Provider
            value={
                {
                    title: title,
                    setTitle: setSessionTitle,
                }
            }>
            {props.children}
        </TitleContext.Provider>
    )
};

export default TitleProvider;




