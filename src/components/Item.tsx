import React from 'react';

// Interface used for Type-checking
export interface IItemProps {
    title: string,
    description: string,
    imagePath: string,
};

function Item(props: IItemProps) {
    return(
        <div className="col-sm-6">
            <div className="card item">
                <img className="card-img-top" src={props.imagePath} alt={props.title} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Item;