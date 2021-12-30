import React from "react";
// import './homepage.styles.scss';

import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./homepage.styles";

const HomePage = () => {
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
        // <div className="homepage">
        // </div>
    ) 
}

export default HomePage;