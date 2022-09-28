import React, { useState, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser';

const RelicDescriptionBox = (props) => {
    const [descObj, setDescObj] = useState({});
    const descBox = useRef();

    const updateDescBox = (relicDesc, relicImage, relicTier) => {
        setDescObj({
            image: relicImage,
            tier: relicTier,
            tierTags: relicDesc.tierTags,
            name: relicDesc.name,
            description: relicDesc.description,
            flavor: relicDesc.flavor

        })
    }

    const positionDescBox = (relicPositions) => {
        let descBoxWidth = descBox.current.clientWidth;
        let descBoxHeight = descBox.current.clientHeight;
        let descBoxLeft = window.innerWidth > 500 ? ((relicPositions.left + descBoxWidth + 80) > window.innerWidth ? (relicPositions.left - descBoxWidth / 2 - 80) : (relicPositions.left + 80)) : (window.innerWidth - descBoxWidth)/2;
        let descBoxTop = (relicPositions.top + descBoxHeight + 90 >= window.innerHeight) ? (relicPositions.top - descBoxHeight) : (relicPositions.top + 90);
        descBox.current.style.cssText += `;top:${descBoxTop}px;left:${descBoxLeft}px;`;
        descBox.current.style.display = "grid";
    }


    const descBoxHtml = () => {
        return (
            <>
                <div id="relic-description-box" ref={descBox} style={{ display: "none" }}>
                    <div className="relic">
                        <img src={`img/relics_icons/${descObj.image}`} />
                    </div>
                    <div id="relicdescbox_name_and_tier">
                        <div id="relicdescbox_name">{descObj.name}</div>
                        <div id="relicdescbox_tier" className={descObj.tier}>{ReactHtmlParser(descObj.tier + descObj.tierTags)}</div>
                    </div>
                    <div id="relicdescbox_text_and_flavor">
                        <div id="relicdescbox_text">{ReactHtmlParser(descObj.description)}</div>
                        <div id="relicdescbox_flavor">{descObj.flavor}</div>
                    </div>
                </div>
            </>
        );
    }

    return { descBoxHtml, updateDescBox, positionDescBox };
}
export default RelicDescriptionBox;