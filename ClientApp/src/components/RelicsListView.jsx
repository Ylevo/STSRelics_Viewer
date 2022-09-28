import React from 'react'
import Relic from '../components/Relic'
import ReactHtmlParser from 'react-html-parser';


const RelicsListView = (props) => {

    const renderView = () => {
        var content = [];
        props.relics.map(relic => {
            content.push(
                <>
                    <Relic key={relic.id}
                        relicObj={relic}
                        updateDescBox={props.updateDescBox}
                        positionDescBox={props.positionDescBox}
                    />
                    <div>
                        {relic.descriptions[0].name}
                    </div>
                    <div className={relic.tier}>
                        {relic.tier}
                    </div>
                    <div>
                        {ReactHtmlParser(relic.descriptions[0].description)}
                    </div>
                </>
                )});
        return content;
    }
    return (
            <div id="relicsListViewContainer">
                {renderView()} 
             </div>
    );
}
export default RelicsListView;