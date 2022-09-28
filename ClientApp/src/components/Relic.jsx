import React from 'react';


const Relic = (props) => {

    const updateDescBox = () => {
        props.updateDescBox(props.relicObj.descriptions[0], props.relicObj.image, props.relicObj.tier);
        let relicBox = document.getElementById("relic-description-box");
        relicBox.style.cssText += `;top:-99999px;left:-99999px;`;
        relicBox.style.display = "grid";
    }

    const hideDescription = () => {
        document.getElementById("relic-description-box").style.display = "none";
    }

    const positionDescription = (e) => {
        let relicPositions = e.target.getBoundingClientRect();
        props.positionDescBox(relicPositions);
    }

    return (
        <>
            <div className="relic" onMouseOver={positionDescription} onMouseEnter={updateDescBox} onMouseLeave={hideDescription} onTouchStart={(e) => { updateDescBox(); positionDescription(e); }}  >
                <img tabIndex="0"  src={`img/relics_icons/${props.relicObj.image}`} />
            </div>
        </>
    );
}
export default Relic;
