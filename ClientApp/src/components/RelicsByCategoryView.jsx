import React from 'react'
import Relic from '../components/Relic'

const RelicsByCategoryView = (props) => {
    const tiers = ['Starter', 'Common', 'Uncommon', 'Rare', 'Boss', 'Event', 'Shop', 'Special'];
    const renderView = () => {
        var content = [];
        for (let i = 0; i < tiers.length; i++) {
            if (props.relics.filter((re) => { return re.tier == tiers[i] }).length > 0) {
                content.push(
                    <>
                        <h2>{tiers[i]}</h2>
                        <div className="relics-container">
                            {props.relics.filter((rel) => { return rel.tier == tiers[i] }).map(relic =>
                                <Relic key={relic.id}
                                    relicObj={relic}
                                    updateDescBox={props.updateDescBox}
                                    positionDescBox={props.positionDescBox}
                                />
                            )}
                        </div>
                </>
                )
            }
        }
        return content;
    }
    return (
        <>
            {renderView()}
        </>
    );
}
export default RelicsByCategoryView;