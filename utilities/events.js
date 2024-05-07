const fs = require('fs');
const {getDateFromText} = require("./get_data_from_text");

function Event(mediaId, messageIdOnChannel, date) {
    this.mediaId = mediaId;
    this.messageIdOnChannel = messageIdOnChannel;
    this.date = date;
}

events = [];

getEvents = () => {
    checkEvents();
    return events;
}

checkEvents = () => {
    let date = new Date();
    events.forEach((event)=>{
        if(event.date < date){
            events.slice(events.indexOf(event), 1)
            events.pop(event);
        }
    })
    console.log("New list of events:" + events);
    saveEvents();
    //have we to reorder them?
}

saveEvents = () => {
    const jsonData = JSON.stringify(events);
    const filePath = './media/data/events/events_pending.json';
    try {
        fs.writeFileSync(filePath, jsonData);
        console.log('JSON data saved to file successfully.');
    } catch (error) {
        console.error('Error writing JSON data to file:', error);
    }
}

loadEvents = () => {
    const filePath = './media/data/events/events_pending.json';
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        events = JSON.parse(data);
        events.forEach((event)=>{
            event.date = new Date(event.date);
        });
        console.log(events);
        console.log('JSON data read from file successfully.');
    }catch (error) {
        console.error('Error reading JSON data from file:', error);
    }
    checkEvents();
}

newEventFromMessage = (ctx) => {
    console.log("Creating new event")
    newEvent(ctx.update.channel_post.photo[0].file_id, ctx.update.channel_post.message_id, getDateFromText(ctx.update.channel_post.caption));
}

newEvent = (mediaId, messageIdOnChannel, date) => {
    events.push(new Event(mediaId, messageIdOnChannel, date));
    saveEvents();
}

resetEvents = () => {
    events = [];
    saveEvents();
}

module.exports={
    getEvents: getEvents,
    loadEvents: loadEvents,
    newEventFromMessage: newEventFromMessage,
    resetEvents: resetEvents
}