import React from 'react';
import './Box.scss';
const box = (props) => {
    return (
        <div className='box' style={{backgroundColor : `${props.color}`}}></div>
    )
}
export default box;