import React from 'react';
import ShopCollection from '../../components/ShopCollection/ShopCollection';
import Shop_Data from './ShopData.json';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: Shop_Data,
        };
    }

    render() {
        const { collections } = this.state;

        return (
            <div className="shop-page">
                {collections.map(({ id, ...otherCollectionProps }) => {
                    return (
                        <ShopCollection key={id} {...otherCollectionProps} />
                    );
                })}
            </div>
        );
    }
}

export default ShopPage;
