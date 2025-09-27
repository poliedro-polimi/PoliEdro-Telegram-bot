const fs = require("fs");
const filePath = './media/data/users/banned_list.json';

addToBanList = (id) => {
    let banList = getBanList();
    banList.add(id);
    saveBanList(banList);
}

getBanList = () => {
    let bannedList = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        bannedList = JSON.parse(data);
        console.log(bannedList);
        console.log('JSON data read from file successfully.');
    } catch (error) {
        console.error('Error reading JSON data from file:', error);
    }
    return bannedList;
}

saveBanList = (list) => {
    let jsonData = JSON.stringify(list);
    try {
        fs.writeFileSync(filePath, jsonData);
        console.log('JSON data saved to file successfully.');
    } catch (error) {
        console.error('Error writing JSON data to file:', error);
    }
}

checkBan = (id) => {
    return getBanList().includes(id);
}

module.exports = {
    checkBan: checkBan()
}