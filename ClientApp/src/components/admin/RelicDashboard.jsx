import React, { useState, useEffect, useRef } from 'react'
import RelicIconFileInput from "../RelicIconFileInput"
import '../../admin.css'

const RelicDashboard = ({
    relics,
    sounds,
    tiers,
    renderOptions,
    relicIconFile,
    relicsIcons,
    newRelicRequest,
    ...otherProps
}) => {
    const [currentRelicIcon, setCurrentRelicIcon] = useState("");
    const relicIdInput = useRef();
    const relicsList = useRef();
    const soundsList = useRef();
    const tiersList = useRef();
    const relicIcon = useRef();
    const relicsIconsList = useRef();

    const handleRelicsListChange = () => {
        let selectedRelic = relics[relicsList.current.selectedIndex];
        soundsList.current.value = selectedRelic.sound;
        tiersList.current.value = selectedRelic.tier;
        relicsIconsList.current.value = selectedRelic.image;
        handleRelicsIconsListChange();
    };

    const handleRelicsIconsListChange = () => {
        setCurrentRelicIcon(relicsIconsList.current.value);
    }

    const newRequest = (e) => {
        let relicId, request;
        request = e.target.value;
        switch (request) {
            case "createRelic":
                relicId = relicIdInput.current.value
                relicIdInput.current.value = "";
                break;
            case "updateRelic":
            case "deleteRelic":
                relicId = relicsList.current.value;
                break;
        }
        newRelicRequest(request, relicId, relicsIconsList.current.value, soundsList.current.value, tiersList.current.value)
    }

    useEffect(() => {
        if (relics.length > 0) {
            handleRelicsListChange();
            handleRelicsIconsListChange();
        }
    }, [relics]);

    return (
        <>
            <div id="dashboard_relic_container">
                <select ref={relicsList} onChange={handleRelicsListChange}>{renderOptions(relics, "relic")}</select>
                <input type="text" ref={relicIdInput} id="relicIdInput" placeholder="New relic ..." />
                <select ref={soundsList}>{renderOptions(sounds, "sound")}</select>
                <select ref={tiersList}>{renderOptions(tiers, "tier")}</select>
                <button id="relic_update" value="updateRelic" onClick={newRequest}>Update</button>
                <button id="relic_create" value="createRelic" onClick={newRequest}>Create</button>
                <button id="relic_delete" value="deleteRelic" onClick={newRequest}>Delete</button>
            </div>
            <div id="dashboard_relicIcon_container">
                <select ref={relicsIconsList} onChange={handleRelicsIconsListChange}>{renderOptions(relicsIcons, "relicIcon")}</select>
                <img ref={relicIcon} src={`img/relics_icons/${currentRelicIcon}`} />
                <RelicIconFileInput relicIconFile={relicIconFile} />
            </div>

        </>
    )
}

export default RelicDashboard;