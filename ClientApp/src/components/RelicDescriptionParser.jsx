const RelicDescriptionParser = (props) => {

    function parseRelicsDescriptions(relics) {
        const colorCodes = [{ code: "#y", className: "gold" },
                            { code: "#r", className: "red" },
                            { code: "#g", className: "green" },
                            { code: "#b", className: "blue" },
                            { code: "#p", className: "purple" }]
        relics.map((relic) => {
            lookForTierTags(relic);
            var tempDescription = relic.descriptions[0].description;
            var indexStart, indexEnd;
            colorCodes.map((codeJson) => {
                indexStart = tempDescription.indexOf(codeJson.code);
                while (indexStart != -1) {
                    indexEnd = indexStart + 3;
                    while (tempDescription[indexEnd] != " " && tempDescription[indexEnd] != "." && indexEnd < tempDescription.length) {
                        indexEnd++;
                    }
                    tempDescription = tempDescription.substring(0, indexStart) + "<span class=\"" + codeJson.className + "\">" + tempDescription.substring(indexStart + 2, indexEnd) + "</span>" + tempDescription.substring(indexEnd, tempDescription.length)
                    indexStart = tempDescription.indexOf(codeJson.code);
                }
            });
            tempDescription = tempDescription.replace("[E]", "<span class=\"gold\">Energy</span>");
            relic.descriptions[0].description = tempDescription.replace(/ NL /g, "\n");
        })
    }

    function lookForTierTags(relic) {
        const types = ["Class", "Event"];
        relic.descriptions[0].tierTags = "";
        relic.tags.map((tagObj) => {
            if (types.includes(tagObj.tagNavigation.type)) {
                relic.descriptions[0].tierTags += "<span class=\"tierTag whiteDash\"> - </span> <span class=\"tierTag " + tagObj.relicTagName + "\">" + tagObj.relicTagName + "</span>";
            }
        })
    }

    return { parseRelicsDescriptions };
}
export default RelicDescriptionParser;