import React from 'react';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';

import './HomePage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <CategoryMenu testing="Hello" />
            </div>
        );
    }
}

export default HomePage;
