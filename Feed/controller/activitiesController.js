const db = require("../start/db");
const subscribersLib = require("../lib/subscribers/subscribers");

module.exports.handleRequestCreated = async function handleActivityCreated(message) {
    const subscribers = subscribersLib.findById(message.userId);
    for (subscriber of subscribers){
        db.client.get(subscriber.id, function (err, reply){
            if (err) throw err;
            if (!reply){
                db.client.set(subscriber.id, message);
            } else {
                let i = 0;
                while (reply[i].date > message.date){
                    i++ //insertPosition
                }
                reply.splice(i, 0, message);
                db.client.set(subscriber.id, reply);
            }
        });
        db.client.get(message.userId, function (err, reply){
            if (err) throw err;
            if (!reply){
                db.client.set(message.userId, message);
            } else{
                let j = 0
                while (reply[j].date > message.date){
                    j++ //insertPosition
                }
                reply.splice(i, 0, message);
                db.client.set(message.userId, reply);
            }
        })
    }
}