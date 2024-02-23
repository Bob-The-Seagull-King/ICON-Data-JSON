// Use for special tags -------------------------------
const bannedSummonTags = ["ability"];
// ----------------------------------------------------

// Attatches a Summon element -------------------------
async function getSummon(elementID, summonName) {
    let data = await getJsonData("../data/summon.json");
    let summonData = await getRelevantSummon(summonName, data);
    
    const elem = document.getElementById(elementID);
    const elemAppend = createSummon(summonName, summonData);
    elem.appendChild(elemAppend);
}
// ----------------------------------------------------

// Finds a specific summon ------------------------
function getRelevantSummon(summonName, data) {
    for (let i = 0; i < data.length; i++){
        if (data[i]["name"] == summonName) {
            return data[i];
        }
    }
}
// ------------------------------------------------

// Builds a Summon element ----------------------------
function createSummon(summonName, summonData) {
    const summonDiv = document.createElement("div");
    summonDiv.id = summonName + "ParentDiv";

    const summonCount = getSummonCount(summonData);
    const summonTitle = getSummonTitle(summonData);
    const summonTags = getSummonTags(summonData);
    const summonDescription = getSummonDescription(summonData);

    summonDiv.appendChild(summonCount);
    summonDiv.appendChild(summonTitle);
    summonDiv.appendChild(summonTags);
    summonDiv.appendChild(summonDescription);

    return summonDiv;
}
// ------------------------------------------------

// Builds specific elements of the summon ---------

/*
    Returns a text element describing how many of a
    summon you can have at once. Wording changes if
    you can have one, multiple, or an unlimited
    amount of that specific summon.
*/
function getSummonCount(summonData) {
    const elemCount = document.createElement("div");
    const elemText = document.createElement("p");

    elemCount.id = summonData["name"] + "Count";
    elemText.id = summonData["name"] + "CountText"
    
    if (summonData["limit"] == 0) {
        elemText.innerText =    "You can have any number of " 
                                + summonData["name"] + "s at once." 
    } else if (summonData["limit"] == 1){
        elemText.innerText =    "You can have a maximum of " + summonData["limit"].toString() + " " 
                                + summonData["name"] + " at a time." 
    } else {
        elemText.innerText =    "You can have a maximum of " + summonData["limit"].toString() + " " 
                                + summonData["name"] + "s at once." 
    }

    elemCount.appendChild(elemText);
    return elemCount;
}

/*
    Returns the title element of the summon, using
    the name.
*/
function getSummonTitle(summonData) {
    const elemName = document.createElement("div");
    const elemText = document.createElement("h3");

    elemName.id = summonData["name"] + "Title";
    elemText.id = summonData["name"] + "TitleText"
    
    elemText.innerText = summonData["name"];

    elemName.appendChild(elemText);
    return elemName;
}

/*
    Returns a list of the summon's tags, if
    the tag is part of a banned list it will
    not be shown. Tags are capitalized.
*/
function getSummonTags(summonData) {
    const elemTags = document.createElement("div");
    const elemText = document.createElement("p");

    elemTags.id = summonData["name"] + "Tags";
    elemText.id = summonData["name"] + "TagsText"
    
    let tagArray = [];
    for (let i = 0; i < summonData["tags"].length; i++){
        if (( bannedSummonTags.includes(summonData["tags"][i]["tag_name"])) == false) {
            let tagText = "";
            tagText = capitalizeFirstLetter(summonData["tags"][i]["tag_name"]);
            if (summonData["tags"][i]["val"] != undefined) {
            tagText += " " + summonData["tags"][i]["val"];
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
function getSummonDescription(summonData) {
    const elemDesc = document.createElement("div");

    elemDesc.id = summonData["name"] + "Description";
    elemDesc.innerHTML = summonData["description"];

    return elemDesc;
}


// ------------------------------------------------