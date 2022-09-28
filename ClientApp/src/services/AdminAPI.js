import AuthAPI from './AuthAPI'

const AdminAPI = () => {
    const { getAuthorizationToken } = AuthAPI();

    const getRelicsWithTags = () => {
        return fetch('api/relic/relicswithtags', {
            headers: { 'Authorization': getAuthorizationToken() }
        }).then(response => response.json());
    }

    const getTiers = () => {
        return fetch('api/tier').then(response => response.json());
    }

    const getRelicsIcons = () => {
        return fetch('api/relicicon', {
            headers: { 'Authorization': getAuthorizationToken() }
        }).then(response => response.json());
    }

    const updateTag = (tagData) => {
        return fetch('api/tag/' + encodeURIComponent(tagData.tagName), {
            method: 'PUT',
            body: JSON.stringify(tagData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const createTag = (tagData) => {
        return fetch('api/tag', {
            method: 'POST',
            body: JSON.stringify(tagData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const deleteTag = (tagData) => {
        return fetch('api/tag/' + encodeURIComponent(tagData.tagName), {
            method: 'DELETE',
            headers: {
                'Authorization': getAuthorizationToken()
            }
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const addTagToRelic = (relicTagData) => {
        return fetch('api/relictag', {
            method: 'POST',
            body: JSON.stringify(relicTagData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const removeTagFromRelic = (relicTagData) => {
        return fetch('api/relictag/' + encodeURIComponent(relicTagData.relicId + "&" + relicTagData.relicTagName), {
            method: 'DELETE',
            headers: {
                'Authorization': getAuthorizationToken()
            }
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const updateRelicDescription = (relicDescription) => {
        return fetch('api/relicdescription/' + encodeURIComponent(relicDescription.relicId) + "/" + encodeURIComponent(relicDescription.descriptionLanguage), {
            method: 'PUT',
            body: JSON.stringify(relicDescription),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const uploadRelicIcon = (iconData) => {
        return fetch('api/relicIcon', {
            method: 'POST',
            body: iconData,
            headers: {
                'Authorization': getAuthorizationToken()
            }
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const createRelic = (relicData) => {
        return fetch('api/relic', {
            method: 'POST',
            body: JSON.stringify(relicData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const deleteRelic = (relicData) => {
        return fetch('api/relic/' + encodeURIComponent(relicData.id), {
            method: 'DELETE',
            headers: {
                'Authorization': getAuthorizationToken()
            }
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const updateRelic = (relicData) => {
        return fetch('api/relic/' + encodeURIComponent(relicData.id), {
            method: 'PUT',
            body: JSON.stringify(relicData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationToken()
            },
        })
            .then(response => response)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const checkResponse = (response, callback) => {
        let errorMessage = "";
        switch (response.status) {
            case 200:
            case 201:
            case 204:
                break;
            case 400:
                errorMessage = "Bad Request";
            case 404:
                errorMessage = "Object does not exist in DB.";
                break;
            case 409:
                errorMessage = "Object already exists in DB."
                break;
            default:
                errorMessage = "Error not handled.";
                console.log(response);
                break;
        }
        if (errorMessage != "") alert(`Error. Status code = ${response.status}. ${errorMessage}`);
        if (callback != null) {
            callback(response);
        }
        return errorMessage;
    }
    return {
        getRelicsWithTags, getTiers, getRelicsIcons,
        updateTag, createTag, deleteTag,
        addTagToRelic, removeTagFromRelic,
        createRelic, deleteRelic, updateRelic,
        updateRelicDescription, uploadRelicIcon,
        checkResponse
    }
}

export default AdminAPI;