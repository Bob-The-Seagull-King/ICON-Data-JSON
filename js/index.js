// Temp Test Run ----------------------------------------
testSummon();

async function testSummon() {
    let data = await getJsonData("../data/summon.json");
    for (i = 0; i < data.length; i++) {
        getSummon("contentBody", data[i]["name"]);
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

// ------------------------------------------------------