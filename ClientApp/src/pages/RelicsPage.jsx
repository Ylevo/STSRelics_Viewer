import React, { useState, useEffect } from 'react'
import RelicDescriptionBox from '../components/RelicDescriptionBox'
import RelicDescriptionParser from '../components/RelicDescriptionParser'
import RelicsGridView from '../components/RelicsGridView'
import RelicsByCategoryView from '../components/RelicsByCategoryView'
import RelicsListView from '../components/RelicsListView'
import RelicsFilters from '../components/RelicsFilters'
import LoadingSpinner from '../components/LoadingSpinner'
import RelicsAPI from "../services/RelicsAPI"


const RelicsPage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [relics, setRelics] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredRelics, setFilteredRelics] = useState([]);
    const [relicsDescriptionsLanguage, setRelicsDescriptionsLanguage] = useState("eng");
    const [relicsView, setRelicsView] = useState("gridView");
    const { descBoxHtml, updateDescBox, positionDescBox } = RelicDescriptionBox();
    const { parseRelicsDescriptions } = RelicDescriptionParser();
    const relicsAPI = RelicsAPI();

    const getRelics = async () => {
        const relicsData = await relicsAPI.getAllRelics(relicsDescriptionsLanguage);
        parseRelicsDescriptions(relicsData);
        setRelics(relicsData);
        setFilteredRelics(relicsData);
        preloadRelicIcons(relicsData);
    }

    const getLanguages = async () => {
        const languagesData = await relicsAPI.getLanguages();
        setLanguages(languagesData);
    }

    const getTags = async () => {
        const tagsData = await relicsAPI.getTags();
        setTags(tagsData);
    }

    const renderView = () => {
        let toRender;
        switch (relicsView) {
            case "gridView":
                toRender = <RelicsGridView relics={filteredRelics} updateDescBox={updateDescBox} positionDescBox={positionDescBox}/>
                break;
            case "byCategoryView":
                toRender = <RelicsByCategoryView relics={filteredRelics} updateDescBox={updateDescBox} positionDescBox={positionDescBox} />
                break;
            case "listView":
                toRender = <RelicsListView relics={filteredRelics} updateDescBox={updateDescBox} positionDescBox={positionDescBox} />
        }
        return toRender;
    }

    const preloadRelicIcons = (relics) => {
        Promise.all(relics.map((relic) => {
            preloadImage(relic.image);
        })
        ).then(() => setTimeout(() => { setIsLoading(false) }, 1500));
    }

    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = document.createElement("img");
            img.onload = () => {
                resolve(img);
            }
            img.onerror = img.onabort = () => {
                reject(src);
            }
            img.src = `img/relics_icons/${src}`;
        })
    }

    useEffect(() => {
        getRelics();
        if (!languages.length) {
            getLanguages();
            getTags();
        }
    }, [relicsDescriptionsLanguage])
    
    return (
        <>

            {isLoading ? <LoadingSpinner /> : 
                <>
                    <RelicsFilters relics={relics} tags={tags} languages={languages} setRelicsView={setRelicsView} relicsDescriptionsLanguage={relicsDescriptionsLanguage}
                    filteredRelics={filteredRelics} setFilteredRelics={setFilteredRelics} setRelicsDescriptionsLanguage={setRelicsDescriptionsLanguage} /> 
                    { renderView() } 
                    { descBoxHtml() }
                </>
            }
            
            
            
            
        </>
    );
}
export default RelicsPage;