// Use for special tags -------------------------------
const bannedSummonTags = ["ability"];
// ----------------------------------------------------

testSummon();

async function testSummon() {
    let data = await getJsonSummonData();
    for (i = 0; i < data.length; i++) {

        getSummon("contentBody", "", data[i]["name"]);

    }
}

async function getSummon(elementID, job, summonName) {
    // Get specific summon ------------------------
    let data = await getJsonSummonData();
    let summonData = await getRelevantSummon(summonName, data);
    // --------------------------------------------
    
    const elem = document.getElementById(elementID);
    const elemAppend = createSummon(elementID, job, summonName, summonData);
    elem.appendChild(elemAppend);
}

function createSummon(elementID, job, summonName, summonData) {
    // Find and Create elements -------------------
    const summonDiv = document.createElement("div");
    // --------------------------------------------

    // Construct Element --------------------------
    summonDiv.id = summonName + "ParentDiv";

    const summonCount = getSummonCount(summonData);
    const summonTitle = getSummonTitle(summonData);
    const summonTags = getSummonTags(summonData);
    const summonDescription = getSummonDescription(summonData);

    summonDiv.appendChild(summonCount);
    summonDiv.appendChild(summonTitle);
    summonDiv.appendChild(summonTags);
    summonDiv.appendChild(summonDescription);
    // --------------------------------------------

    // Add summon to element ----------------------
    return summonDiv;
    // --------------------------------------------
}

async function getJsonSummonData() {
    const response = await fetch("../data/summon.json");
    return await response.json();
}

function getRelevantSummon(summonName, data) {
    for (let i = 0; i < data.length; i++){
        if (data[i]["name"] == summonName) {
            return data[i];
        }
    }
}

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

function getSummonTitle(summonData) {
    const elemName = document.createElement("div");
    const elemText = document.createElement("h3");

    elemName.id = summonData["name"] + "Title";
    elemText.id = summonData["name"] + "TitleText"
    
    elemText.innerText = summonData["name"];

    elemName.appendChild(elemText);
    return elemName;
}

function getSummonTags(summonData) {
    const elemTags = document.createElement("div");
    const elemText = document.createElement("p");

    elemTags.id = summonData["name"] + "Tags";
    elemText.id = summonData["name"] + "TagsText"
    
    for (let i = 0; i < summonData["tags"].length; i++){
        if ((summonData["tags"][i]["tag_name"] in bannedSummonTags) == false) {
            elemText.innerText += capitalizeFirstLetter(summonData["tags"][i]["tag_name"]);
            if (summonData["tags"][i]["val"] != undefined) {
            elemText.innerText += " " + summonData["tags"][i]["val"];
            }
            if (i < summonData["tags"].length - 1){
                elemText.innerText += ", "
            }
        }
    }

    elemTags.appendChild(elemText);
    return elemTags;
}

function getSummonDescription(summonData) {
    const elemDesc = document.createElement("div");

    elemDesc.id = summonData["name"] + "Description";
    elemDesc.innerHTML = summonData["description"];

    return elemDesc;
}