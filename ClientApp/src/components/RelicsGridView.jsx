import React from 'react'
import Relic from '../components/Relic'


const RelicsGridView = (props) => {
    return (
        <>
            <div className="relics-container">
                {props.relics.map(relic =>
                    <Relic key={relic.id}
                        relicObj={relic}
                        updateDescBox={props.updateDescBox}
                        positionDescBox={props.positionDescBox}
                    />
                )}
            </div>
        </>
    );
}
export default RelicsGridView;