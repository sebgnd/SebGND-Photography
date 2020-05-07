import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
    name: string;
    url: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url }) => {
    return (
        <div className="item">
            <Link to={url}>{name}</Link>
        </div>
    )
}   

export default NavigationItem;
