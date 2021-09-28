const { getDb } = require("./mongo");

const collectionName = "sites";

async function addSite(site) {
    const database = await getDb();
    const { insertedId } = await database.collection(collectionName).insertOne(site);

    return {
        name: site.name,
        _id: insertedId,
    };
}

async function getSites(userSub) {
    const database = await getDb();
    return await database.collection(collectionName).find({ userSub }).project({ name: true }).toArray();
}

module.exports = {
    addSite,
    getSites,
};
