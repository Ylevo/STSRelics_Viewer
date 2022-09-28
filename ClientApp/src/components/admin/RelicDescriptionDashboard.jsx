import React, { useEffect, useRef } from 'react'
import '../../admin.css'

const RelicDescriptionDashboard = ({
    languages,
    newDescriptionRequest,
    renderOptions,
    relics,
    ...otherProps }) => {
    const languagesList = useRef();
    const relicsList = useRef();
    const descriptionName = useRef();
    const descriptionFlavor = useRef();
    const relicDescription = useRef();

    const handleLanguagesAndRelicsListsChange = () => {
        let lookedUpDescription = relics[relicsList.current.selectedIndex].descriptions.filter((desc) => {
            return desc.descriptionLanguage == languagesList.current.value;
        });
        if (lookedUpDescription.length) {
            lookedUpDescription = lookedUpDescription[0];
            descriptionName.current.value = lookedUpDescription.name;
            descriptionFlavor.current.value = lookedUpDescription.flavor;
            relicDescription.current.value = lookedUpDescription.description;
        }
        else {
            descriptionName.current.value = "";
            descriptionFlavor.current.value = "";
            relicDescription.current.value = "";
        }
        
    }
    const newRequest = (e) => {
        let request = e.target.value;
        switch (request) {
            case "updateDescription":
                newDescriptionRequest(request, relicsList.current.value, languagesList.current.value, descriptionName.current.value,
                                      descriptionFlavor.current.value, relicDescription.current.value)
                break;
        }

    }
    useEffect(() => {
        if (relics.length > 0) {
            handleLanguagesAndRelicsListsChange();
        }
    }, [relics]);

    return (
        <>
            <div id="dashboard_relic_description_container">
                <select ref={languagesList} onChange={handleLanguagesAndRelicsListsChange}>{renderOptions(languages, "language")}</select>
                <select ref={relicsList} onChange={handleLanguagesAndRelicsListsChange}>{renderOptions(relics, "relic")}</select>
                <input type="text" ref={descriptionName} id="descriptionName" placeholder="Name"/>
                <input type="text" ref={descriptionFlavor} id="descriptionFlavor" placeholder="Flavor" />
                <textarea ref={relicDescription} id="relicDescription" name="w3review" rows="2" cols="25"></textarea>
                <button id="description_update" value="updateDescription" onClick={newRequest}>Update</button>
                
            </div>

        </>
    )
}


export default RelicDescriptionDashboard;