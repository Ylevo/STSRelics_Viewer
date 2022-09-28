const RelicsAPI = () => {
    const getAllRelics = (language) => {
        return fetch('api/relic/' + encodeURIComponent(language)).then(response => response.json());
    }

    const getLanguages = () => {
        return fetch('api/language').then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const getTags = () => {
        return fetch('api/tag').then(response => response.json());
    }

    const getSounds = () => {
        return fetch('api/sound').then(response => response.json());
    }

    return { getAllRelics, getLanguages, getTags, getSounds }
}


export default RelicsAPI;