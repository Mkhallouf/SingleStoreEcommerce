import React from 'react';
import './CollectionItem.css';

const CollectionItem = ({ id, name, imageUrl, price }) => {
    return (
        <div className="collection-item">
            <div
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="item-footer">
                <span className="item-name">{name}</span>
                <span className="item-pricee">{price}</span>
            </div>
        </div>
    );
};

export default CollectionItem;
