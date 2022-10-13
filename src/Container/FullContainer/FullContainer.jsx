import React from 'react';
import './FullContainer.scss';
import Box from '../../Components/Box/Box';
const getrandomcolor = () => { 
    let letters = '0123456789ABCDEF'; 
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }   
    return color;
}
const fullContainer = () => { 
    let boxes = [];
    for (let i = 0; i < 500; i++) {
        boxes.push(<Box key={i} color = {getrandomcolor()}/>);
    }
    return (
        <div className='full-container'>
            {boxes}
        </div>
    )
}
export default fullContainer;