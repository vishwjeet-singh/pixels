import React from 'react';
import './Box.scss';
const box = (props) => {
    return (
        <div className='box' style={{backgroundColor : `${props.color}`}} onClick = {props.clicked}></div>
    )
}
export default box;