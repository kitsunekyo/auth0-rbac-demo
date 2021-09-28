const { getDb } = require("./mongo");

const collectionName = "users";

async function addUser(user) {
    const database = await getDb();
    const { insertedId } = await database.collection(collectionName).insertOne(user);
    
    return {
        ...user,
        _id: insertedId,
    };
}

async function getUsers() {
    const database = await getDb();
    return await database.collection(collectionName).find({}).toArray();
}

async function getUser(sub) {
    const database = await getDb();
    return await database.collection(collectionName).findOne({ sub });
}

module.exports = {
    addUser,
    getUsers,
    getUser,
};
