import React, { useState, useEffect, useRef } from 'react'
import RelicDashboard from '../components/admin/RelicDashboard'
import TagDashboard from '../components/admin/TagDashboard'
import RelicTagDashboard from '../components/admin/RelicTagDashboard'
import AdminAPI from "../services/AdminAPI"
import RelicsAPI from "../services/RelicsAPI"
import '../admin.css'
import RelicDescriptionDashboard from '../components/admin/RelicDescriptionDashboard'

const AdminPage = (props) => {
    const [relics, setRelics] = useState([]);
    const [tags, setTags] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [sounds, setSounds] = useState([]);
    const [relicsIcons, setRelicsIcons] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [lastHttpResponse, setLastHttpResponse] = useState({});
    const relicIconFile = useRef();
    const adminAPI = AdminAPI();
    const relicsAPI = RelicsAPI();

    const getTags = async () => {
        const tagsData = await relicsAPI.getTags();
        setTags(tagsData);
    }

    const getRelics = async () => {
        const relicsData = await adminAPI.getRelicsWithTags();
        setRelics(relicsData);
    }

    const getTiers = async () => {
        const tiersData = await adminAPI.getTiers();
        setTiers(tiersData);
    }

    const getSounds = async () => {
        const soundsData = await relicsAPI.getSounds();
        setSounds(soundsData);
    }

    const getLanguages = async () => {
        const languagesData = await relicsAPI.getLanguages();
        setLanguages(languagesData);
    }

    const getRelicsIcons = async () => {
        const iconsData = await adminAPI.getRelicsIcons();
        setRelicsIcons(iconsData);
    }

    const renderHtmlOptions = (list, type) => {
        let toRender = [];
        list.map((obj, index) => {
            switch (type) {
                case "tag":
                    toRender.push(<option key={obj.tagName} value={obj.tagName}>{obj.tagName}</option>);
                    break;
                case "relic":
                    toRender.push(<option key={obj.id} value={obj.id}>{obj.id}</option>);
                    break;
                case "sound":
                    toRender.push(<option key={obj.soundName} value={obj.soundName}>{obj.soundName}</option>);
                    break;
                case "tier":
                    toRender.push(<option key={obj.tierName} value={obj.tierName}>{obj.tierName}</option>);
                    break;
                case "relicIcon":
                    toRender.push(<option key={obj} value={obj}>{obj}</option>);
                    break;
                case "language":
                    toRender.push(<option key={obj.language_id} value={obj.languageId}>{obj.languageName}</option>)
                    break;
            }
        });
        return toRender;
    }

    const newTagRequest = async (request, tagName, tagType) => {
        const tag = { tagName: tagName, type: tagType };
        let response;
        switch (request) {
            case "createTag":
                response = await adminAPI.createTag(tag)
                break;
            case "deleteTag":
                response = await adminAPI.deleteTag(tag);
                break;
            case "updateTag":
                response = await adminAPI.updateTag(tag);
                break;
        }
        adminAPI.checkResponse(response, setLastHttpResponse);
    }

    const newRelicTagRequest = async (request, relicId, tagName) => {
        const relicTag = { relicId: relicId, relicTagName: tagName }
        let response;
        switch (request) {
            case "addTagToRelic":
                response = await adminAPI.addTagToRelic(relicTag);
                break;
            case "removeTagFromRelic":
                response = await adminAPI.removeTagFromRelic(relicTag);
                break;
        }
        adminAPI.checkResponse(response, setLastHttpResponse);
    }

    const newRelicRequest = async (request, relicId, relicIcon, sound, tier) => {
        let response, formData, errorMessage;
        let relic = { id: relicId, image: relicIcon, sound: sound, tier: tier }
        if (relicIconFile.current.files.length && request != "deleteRelic") {
            relic.image = relicIconFile.current.files[0].name;
            formData = new FormData();
            formData.append("formFile", relicIconFile.current.files[0], relicIconFile.current.files[0].name);
            response = await adminAPI.uploadRelicIcon(formData);
            errorMessage = await adminAPI.checkResponse(response);
            relicIconFile.current.value = null;
            let iconPreviewImg = document.getElementById("relicIconPreview");
            iconPreviewImg.src = "";
            if (errorMessage != "") {
                return;
            }
        }
        switch (request) {
            case "createRelic":
                response = await adminAPI.createRelic(relic);
                break;
            case "updateRelic":
                response = await adminAPI.updateRelic(relic);
                break;
            case "deleteRelic":
                response = await adminAPI.deleteRelic(relic);
                break;
        }
        adminAPI.checkResponse(response, setLastHttpResponse);
    }

    const newDescriptionRequest = async (request, relicId, language, name, flavor, description) => {
        let response;
        let relicDescription = { relicId: relicId, descriptionLanguage: language, description: description, name: name, flavor: flavor };
        switch (request) {
            case "updateDescription":
                response = await adminAPI.updateRelicDescription(relicDescription);
                break;
        }
        adminAPI.checkResponse(response, setLastHttpResponse);
    }

    useEffect(() => {
        getTags();
        getRelics();
        getSounds();
        getTiers();
        getRelicsIcons();
        getLanguages();
    }, [lastHttpResponse])

    return (
        <>
            <h2>Relics</h2>
            <RelicDashboard relics={relics} sounds={sounds} tiers={tiers} relicsIcons={relicsIcons} newRelicRequest={newRelicRequest} renderOptions={renderHtmlOptions} relicIconFile={relicIconFile}/>
            <h2>Tags</h2>
            <TagDashboard tags={tags} newTagRequest={newTagRequest} renderOptions={renderHtmlOptions}/>
            <h2>Relics Tags</h2>
            <RelicTagDashboard relics={relics} tags={tags} newRelicTagRequest={newRelicTagRequest} renderOptions={renderHtmlOptions}/>
            <h2>Relics Descriptions</h2>
            <RelicDescriptionDashboard relics={relics} languages={languages} newDescriptionRequest={newDescriptionRequest} renderOptions={renderHtmlOptions}/>
        </>
    );
}
export default AdminPage;