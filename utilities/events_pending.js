function Event(mediaId, messageIdOnChannel, date) {
    this.mediaId = mediaId;
    this.messageIdOnChannel = messageIdOnChannel;
    this.date = date;
}

events = [];

checkEvents = () => {
    let date = new Date();
    events.forEach((event)=>{
        //d è passata
        if(true){
            events.slice(eventsPending.indexOf(event), 1)
            events.pop(event);
        }
    })
    //have we to reorder them?
}

eventsPending = () => {
    checkEvents();
    return events;
}

resetEvents = () => {
    events = [];
}

newEvent = (mediaId, messageIdOnChannel, date) => {//TODO
    eventsPending.push(new Event(mediaId, messageIdOnChannel, date));
}

module.exports={
    newEvent: newEvent,
    events: eventsPending
}