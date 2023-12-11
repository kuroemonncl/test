// ConnectDB.js
const mongoose = require('mongoose');
async function connect() {
    let uri = 'mongodb+srv://kuroemonncl:U9KCPZ9oEnmx0NCW@onlinemarketstore.11j7egu.mongodb.net/OnlineMarketStore'
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected Successfully")
    } catch(error) {
        console.log("Failed to Connect", error)
    }
}

module.exports = {connect};