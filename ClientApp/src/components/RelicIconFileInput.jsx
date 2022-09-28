import React, { useRef } from 'react'

const RelicIconFileInput = ({
    relicIconFile,
    ...otherProps
    }) => {
    const maxFileSizeInBytes = 500000;
    const relicIconPreview = useRef("");

    const handleFileInputChange = () => {
        relicIconPreview.current.src = "";
        let img, url, file;
        file = relicIconFile.current.files[0];
        if (file.size > maxFileSizeInBytes) {
            alert("Image too big.");
            relicIconFile.current.value = "";
        }
        else {
            url = URL.createObjectURL(file);
            img = new Image();
            img.onload = (e) => {
                if (e.target.width == 80 && e.target.height == 80) {
                    relicIconPreview.current.src = url;
                }
                else {
                    alert("Must be 80x80.");
                    relicIconFile.current.value = "";
                    URL.revokeObjectURL(url);
                }
            };
            img.src = url;
        }
    }
    return (
        <>
            <input type="file" id="relicIconInput" onChange={handleFileInputChange} accept=".png,.jpg,.jpeg" ref={relicIconFile} />
            <img id="relicIconPreview" src="" ref={relicIconPreview} alt="" />
        </>
    )    
}

export default RelicIconFileInput;