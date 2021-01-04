import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="Header">
            <div className="Header__Start"> 
                <h2> Start </h2>
            </div>
            <div className="Header__Finish"> 
                <h2> Finish </h2>
            </div>
            <div className="Header__Wall"> 
                <h2> Wall </h2>
            </div>
            <div className="Header__Weight"> 
                <h2> Weight </h2>
            </div>
            <div className="Header__Algorithm"> 
                <h2> Algorithm </h2>
            </div>
            <div className="Header__RunProgram"> 
                <h2> Run Program </h2>
            </div>
            <div className="Header__ClearBoard"> 
                <h2> Clear Board </h2>
            </div>            
        </div>
    )
}

export default Header
