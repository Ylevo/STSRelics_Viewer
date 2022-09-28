import React, { useEffect, useRef } from 'react'
import '../../admin.css'

const TagDashboard = ({
    tags,
    newTagRequest,
    renderOptions,
    ...otherProps }) => {
    const tagNameInput = useRef();
    const tagTypeInput = useRef();
    const tagsList = useRef();

    const handleTagsListChange = () => {
        tagTypeInput.current.value = tags[tagsList.current.selectedIndex].type;
    };

    const newRequest = (e) => {
        let tagName, request;
        request = e.target.value;
        switch (request)
        {
            case "createTag":
                tagName = tagNameInput.current.value;
                tagNameInput.current.value = "";
                break;
            case "deleteTag":
            case "updateTag":
                tagName = tagsList.current.value;
                break;
        }
        newTagRequest(request, tagName, tagTypeInput.current.value)
    }

    useEffect(() => {
        if (tags.length > 0) {
            handleTagsListChange();
        }
    }, [tags]);

    return (
        <>
            <div id="dashboard_tag_container">
                <select ref={tagsList} onChange={handleTagsListChange}>{renderOptions(tags, "tag")}</select>
                <input type="text" ref={tagNameInput} id="tag_name_input" placeholder="New tag ..." />
                <select ref={tagTypeInput} id="tag_type_input">
                    <option value="None">None</option>
                    <option value="Class">Class</option>
                    <option value="Event">Event</option>
                </select>
                <button id="tag_update" value="updateTag" onClick={newRequest}>Update</button>
                <button id="tag_create" value="createTag" onClick={newRequest}>Create</button>
                <button id="tag_delete" value="deleteTag" onClick={newRequest}>Delete</button>
            </div>

        </>
    )
}

export default TagDashboard;