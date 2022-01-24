import React from 'react';
import CollectionItem from '../CollectionItem/CollectionItem';
import './ShopCollection.css';

const ShopCollection = ({ title, items }) => {
    return (
        <div className="shop-collection">
            <h1 className="item">{title.toUpperCase()}</h1>
            <div className="collection-items">
                {items.map(({ id, ...otherItemProps }, index) => {
                    if (index >= 4) return null;
                    return <CollectionItem key={id} {...otherItemProps} />;
                })}
            </div>
        </div>
    );
};

export default ShopCollection;
