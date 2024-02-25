import React, { useState, useEffect, useRef } from 'react'

const RelicsFilters = ({
    relics,
    tags,
    languages,
    setRelicsView,
    filteredRelics,
    setFilteredRelics,
    setRelicsDescriptionsLanguage,
    relicsDescriptionsLanguage,
    ...otherProps
}) => {
    const autoCompleteBox = useRef();
    const tagSearchInput = useRef();
    const nameSearchInput = useRef();
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [filteringTags, setFilteringTags] = useState([]);

    const lookForTags = (e) => {
        let input = e.target.value;
        setSuggestedTags([]);
        if (!input) {
            toggleAutoCompleteBox(false);
        }
        else {
            input = input.toLowerCase();
            let foundTags = tags.filter((tag) => {
                return filterByName(tag.tagName, input) && filteringTags.indexOf(tag.tagName) == -1;
            })
            foundTags = foundTags.slice(0, 4);
            let newSuggTags = [];
            foundTags.forEach((obj, index) => {
                newSuggTags.push(<div className="autoCompleteElement" onMouseDown={() => { addTag(obj.tagName); }} key={obj.tagName}>{obj.tagName}</div>);
            });
            setSuggestedTags(newSuggTags);
            toggleAutoCompleteBox(true);
        }
    }

    const filterByName = (name, input) => {
        return name.toLowerCase().split(' ').filter((word) => { return word.startsWith(input); }).length;
    }

    const toggleAutoCompleteBox = (show) => {
        autoCompleteBox.current.style.display = show ? "block" : "none";
    }

    const handleAutoCompleteBoxOnBlur = () => {
        toggleAutoCompleteBox(false);
    }

    const addTag = (tagName) => {
        tagSearchInput.current.value = "";
        toggleAutoCompleteBox(false);
        setSuggestedTags([]);
        let arr = filteringTags.slice();
        arr.push(tagName);
        setFilteringTags(arr);
    }

    const removeTag = (tagIndex) => {
        let arr = filteringTags.slice();
        arr.splice(tagIndex, 1);
        setFilteringTags(arr);
    }

    const filterRelics = () => {
        let typedName = nameSearchInput.current.value.toLowerCase();
        if (!filteringTags.length && typedName == "") {
            setFilteredRelics(relics);
        }
        else {
            let filteredArray = [];
            filteredArray = filteredArray.concat(relics.filter((rel) => {
                return filteringTags.every((filTag) => {
                    return rel.tags.some((tag) => {
                        return tag.relicTagName == filTag;
                    })
                }) && filterByName(rel.descriptions[0].name, typedName);
            }))
            var tempSet = new Set(filteredArray);
            filteredArray = Array.from(tempSet);
            setFilteredRelics(filteredArray);
        }
    }

    const renderTags = () => {
        let toRender = [];
        filteringTags.forEach((obj, index) => {
            toRender.push(<div key={index}>{obj}<span key={index} onClick={() => { removeTag(index); }}> ✖</span></div>);
        })
        return toRender;
    }

    const renderLanguages = () => {
        let toRender = [];
        languages.map((obj, index) => {
            toRender.push(<option key={obj.languageId} value={obj.languageId}>{obj.languageName}</option>);
        })
        return toRender;
    }

    useEffect(() => {
        filterRelics();
    }, [filteringTags])

    return (
        <>
            <div className="filters">
                <input type="text" placeholder="Search by name" onChange={filterRelics} ref={nameSearchInput} />
                <select id="relicsDescriptionsLanguage" value={relicsDescriptionsLanguage} onChange={(e) => { setRelicsDescriptionsLanguage(e.target.value) }}>
                    {renderLanguages()}
                </select>
            </div>
            <div className="filters">
                <span id="tagSearchBox">
                    <input type="text" ref={tagSearchInput} placeholder="Filter by tags" onChange={lookForTags} onFocus={lookForTags} onBlur={handleAutoCompleteBoxOnBlur} />
                    <div id="autoComplete" ref={autoCompleteBox}>
                        {suggestedTags}
                    </div>
                </span>
                <select onChange={(e) => { setRelicsView(e.target.value) }}>
                    <option value="gridView">Grid</option>
                    <option value="listView">List</option>
                    <option value="byCategoryView">By Category</option>
                </select>
            </div>
            <div id="filteringTags">
                {renderTags()}
            </div>
        </>)
 }

export default RelicsFilters;