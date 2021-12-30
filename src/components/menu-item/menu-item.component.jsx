import React from "react";
import { useNavigate } from 'react-router-dom';
import { BackgroundImageContainer, ContentContainer, ContentSubtitle, ContentTitle, MenuItemContainer } from "./menu-item.styles";

// import "./menu-item.styles.scss"

const MenuItem = (props) => {
    // let params = useParams();
    let navigate = useNavigate();
    // props.history.push(`${props.match.url}${props.linkUrl}`) }>
    return (
        <MenuItemContainer
            size={props.size}
            onClick={ () => navigate(`/${props.linkUrl}`)}
        >
            <BackgroundImageContainer 
                className="background-image"
                imgUrl={props.imageUrl}
            />
            <ContentContainer className="content">
                <ContentTitle>{props.title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    )
}

export default MenuItem;