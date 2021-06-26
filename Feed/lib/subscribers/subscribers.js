config = require ("config");
const data = config.get("subscribersData");

module.exports.findById = function (id){
    return data.map(v => v.id === id)
}