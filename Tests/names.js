buffer = "[#00FFF]Na[#007DF]ut[#1000F]il[#0200B]us / ID: 'o6Nw0o/BGFQAAAAABP6Aow==' / IP: '62.202.183.106' / Admin: 'true'"



playerName = buffer.split(" ")[0]
// playerName = "[#00FFF]Na[#007DF]ut[#1000F]il[#0200B]us";
finalName = ""
erase = false;
for (i in playerName) {
        if (playerName[i] == "[") {
        erase = true;
    }
    if (!erase) {
        finalName+=playerName[i]
    }
    if (playerName[i] == "]") {
        erase = false;
    }
}
console.log(finalName)