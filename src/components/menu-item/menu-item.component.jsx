import React from "react";
import { useNavigate } from 'react-router-dom';

import "./menu-item.styles.scss"

const MenuItem = (props) => {
    // let params = useParams();
    let navigate = useNavigate();
    // props.history.push(`${props.match.url}${props.linkUrl}`) }>
    return (
        <div className={ `${props.size} menu-item` } onClick={ () => navigate(`/${props.linkUrl}`)}>
            
            <div
                className="background-image" 
                style={{
                    backgroundImage: `url(${props.imageUrl})`
                }}
            />
            <div className="content">
                <h1 className="title">{props.title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default MenuItem;