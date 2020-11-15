import React, {useState} from "react";
import TitleContext from "./TitleContext";

const TitleProvider = props => {
    const [title, setTitle] = useState();

    return(
        <TitleContext.Provider
            value={
                {
                    title: title,
                    setTitle: setTitle,
                }
            }>
            {props.children}
        </TitleContext.Provider>
    )
};

export default TitleProvider;




