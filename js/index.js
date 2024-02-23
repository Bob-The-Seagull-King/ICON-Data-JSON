// Temp Test Run ----------------------------------------
testAddon();

async function testSummon() {
    let data = await getJsonData("../data/summon.json");
    for (i = 0; i < data.length; i++) {
        getSummon("contentBody", data[i]["name"]);
    }
}

async function testAddon() {
    let data = await getJsonData("../data/abilityaddon.json");
    for (i = 0; i < data.length; i++) {
        getAddon("contentBody", data[i]["name"]);
    }
}
// ------------------------------------------------------

// Get Data ---------------------------------------------

/*
    Returns the json of a specific file.
*/
async function getJsonData(filename) {
    const response = await fetch(filename);
    return await response.json();
}

// ------------------------------------------------------

// Utilities --------------------------------------------

/*
    Takes a string and capitalizes the first letter.
    eg. "hello" -> "Hello"
*/
function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
    Checks if the list of tags contains a tag with the
    tag_name equal to the tag_value.
*/
function tagContains(tagData, tag_value) {
    for (i = 0; i < tagData.length; i++){
        if (tagData[i]["tag_name"] == tag_value) {
            return true;
        }
    }
    return false;
}

/*
    Returns the value of the tag with the name
    equal to tag_value
*/
function tagValue(tagData, tag_value) {
    for (i = 0; i < tagData.length; i++){
        if (tagData[i]["tag_name"] == tag_value) {
            return tagData[i]["val"];
        }
    }
    return undefined;
}

// ------------------------------------------------------