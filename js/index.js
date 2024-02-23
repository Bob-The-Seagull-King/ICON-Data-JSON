// Temp Test Run ----------------------------------------
testSummon();

async function testSummon() {
    let data = await getJsonData("../data/summon.json");
    for (i = 0; i < data.length; i++) {
        getSummon("contentBody", data[i]["name"]);
    }
}
// ------------------------------------------------------

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 
async function getJsonData(filename) {
    const response = await fetch(filename);
    return await response.json();
}