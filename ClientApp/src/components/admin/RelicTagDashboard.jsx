import React, { useState, useEffect, useRef } from 'react'
import '../../admin.css'

const RelicTagDashboard = ({
    relics,
    tags,
    newRelicTagRequest,
    renderOptions,
    ...otherProps}) => {
    const tagsList = useRef();
    const relicsTagsList = useRef();
    const selectedRelicTagsList = useRef();
    const [selectedRelicTags, setSelectedRelicTags] = useState([]);

    const handleRelicsListChange = () => {
        setSelectedRelicTags(relics[relicsTagsList.current.selectedIndex].tags);
    }
    const newRequest = (e) => {
        let request = e.target.value;
        switch (request)
        {
            case "addTagToRelic":
                newRelicTagRequest(request, relicsTagsList.current.value, tagsList.current.value);
                break;
            case "removeTagFromRelic":
                newRelicTagRequest(request, relicsTagsList.current.value, selectedRelicTagsList.current.value);
                break;
        }
        
    }
    useEffect(() => {
        if (relics.length > 0) {
            handleRelicsListChange();
        }
    }, [relics]);

    return (
        <>
            <div id="dashboard_relic_tag_container">
                <select ref={relicsTagsList} onChange={handleRelicsListChange}>{renderOptions(relics, "relic")}</select>
                <button id="relic_remove_tag" value="removeTagFromRelic" onClick={newRequest}>Remove</button>
                <select id="relic_tags_list" ref={selectedRelicTagsList}>{renderOptions(selectedRelicTags, "tag")}</select>
                <button id="relic_add_tag" value="addTagToRelic" onClick={newRequest}>Add</button>
                <select ref={tagsList}>{renderOptions(tags, "tag")}</select>
        </div>

        </>
    )
}

export default RelicTagDashboard;