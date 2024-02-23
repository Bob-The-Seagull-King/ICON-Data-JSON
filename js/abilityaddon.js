// Use for special tags -------------------------------
const bannedAddonTags = ["mastery", "infuse", "slay"];
// ----------------------------------------------------

// Attatches a Addon element --------------------------
async function getAddon(elementID, addonName) {
    let data = await getJsonData("../data/abilityaddon.json");
    let addonData = await getRelevantAddon(addonName, data);
    
    const elem = document.getElementById(elementID);
    const elemAppend = createAddon(addonName, addonData);
    elem.appendChild(elemAppend);
}
// ----------------------------------------------------

// Finds a specific addon -------------------------
function getRelevantAddon(addonName, data) {
    for (let i = 0; i < data.length; i++){
        if (data[i]["name"] == addonName) {
            return data[i];
        }
    }
}
// ------------------------------------------------

// Builds a Addon element ----------------------------
function createAddon(addonName, addonData) {
    const addonDiv = document.createElement("div");
    addonDiv.id = addonName + "ParentDiv";

    const addonTitle = getAddonTitle(addonData);
    const addonTags = getAddonTags(addonData);
    const addonDescription = getAddonDescription(addonData);

    addonDiv.appendChild(addonTitle);
    addonDiv.appendChild(addonTags);
    addonDiv.appendChild(addonDescription);

    return addonDiv;
}
// ------------------------------------------------

// Builds specific elements of the addon ----------

/*
    Returns the title element of the addon, using
    the name.
*/
function getAddonTitle(addonData) {
    const elemName = document.createElement("div");
    const elemText = document.createElement("h3");

    elemName.id = addonData["name"] + "Title";
    elemText.id = addonData["name"] + "TitleText"
    
    if (tagContains(addonData["tags"], "slay")) {
        elemText.innerText = "Slay or ";
    }

    if (tagContains(addonData["tags"], "infuse")) {
        elemText.innerText += "Infuse " + tagValue(addonData["tags"], "infuse").toString() + ": ";
    }
    
    elemText.innerText += addonData["name"];

    elemName.appendChild(elemText);
    return elemName;
}

/*
    Returns a list of the summon's tags, if
    the tag is part of a banned list it will
    not be shown. Tags are capitalized.
*/
function getAddonTags(addonData) {
    const elemTags = document.createElement("div");
    const elemText = document.createElement("p");

    elemTags.id = addonData["name"] + "Tags";
    elemText.id = addonData["name"] + "TagsText"
    
    let tagArray = [];
    for (let i = 0; i < addonData["tags"].length; i++){
        if (( bannedAddonTags.includes(addonData["tags"][i]["tag_name"])) == false) {
            let tagText = "";
            tagText = capitalizeFirstLetter(addonData["tags"][i]["tag_name"]);
            if (addonData["tags"][i]["val"] != undefined) {
            tagText += " " + addonData["tags"][i]["val"];
            }
            tagArray.push(tagText);
        }
    }

    for (let i = 0; i < tagArray.length; i++) {
        elemText.innerText += tagArray[i];
        if (i < tagArray.length - 1) {
            elemText.innerText += ", "
        }
    }

    elemTags.appendChild(elemText);
    return elemTags;
}

/* 
    Returns an element containing the description
    data of the summon, which is html.
*/
function getAddonDescription(addonData) {
    const elemDesc = document.createElement("div");

    elemDesc.id = addonData["name"] + "Description";
    elemDesc.innerHTML = addonData["description"];

    return elemDesc;
}


// ------------------------------------------------