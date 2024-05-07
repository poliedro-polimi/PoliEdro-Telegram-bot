const {getEvents} = require('./events.js');
const {menuKeyboard} = require('../utilities/menu_keyboard.js');
const {sendError} = require('../utilities/send_error.js');

sendOurMenu = async (ctx) => {
    events = getEvents();
    try{
        switch (events.length) {
            case 0:{
                caption = `Dai un'occhiata alle nostre risorse!`
                message = await ctx.telegram.sendMessage(process.env.GROUP_ID, caption, {
                    reply_markup: menuKeyboard()
                })
                break;
            }
            case 1:{
                caption = `Dai un'occhiata al nostro [prossimo evento](https://t.me/${process.env.CHANNEL_ID}/${events[0].messageIdOnChannel}) il ${(new Intl.DateTimeFormat('it-IT', { dateStyle: 'short' })).format(events[0].date)}`
                message = await ctx.telegram.sendPhoto(process.env.GROUP_ID, events[0].mediaId, {
                    caption: caption,
                    parse_mode: "MarkdownV2",
                    reply_markup: menuKeyboard()
                })
                break;
            }
            default:{//Telegram APIs doesn't support mediaGroup sent with keyboard rip
                caption = `Dai un'occhiata ai nostri prossimi eventi:`
                for (let i = 0; i < events.length; i++) {
                    caption += `\n[${(new Intl.DateTimeFormat('it-IT', { dateStyle: 'short' })).format(events[i].date)}](https://t.me/${process.env.CHANNEL_ID}/${events[i].messageIdOnChannel})`
                }
                dateNextEvent = events[0].date;
                mediaIdNextEvent = events[0].mediaId;
                events.forEach((event) => {
                    if(event.date < dateNextEvent){
                        mediaIdNextEvent = event.mediaId;
                    }
                })
                message = await ctx.telegram.sendPhoto(process.env.GROUP_ID, mediaIdNextEvent, {
                    caption: caption,
                    parse_mode: "MarkdownV2",
                    reply_markup: menuKeyboard()
                })

                //eventsMedia = []

                //events.forEach((event) => {
                //    eventsMedia.push(event.mediaId)
                //})

                //message = await ctx.telegram.sendMediaGroup(process.env.DEBUG_GROUP_ID, events.map((event) => {
                //        return {
                //            type: "photo",
                //            media: `${event.mediaId}`,
                //            caption: `Dai un'occhiata al nostro [prossimo evento](https://t.me/${process.env.CHANNEL_ID}/${events[0].messageIdOnChannel}) il ${(new Intl.DateTimeFormat('en-US', { dateStyle: 'short' })).format(events[0].date)}`,
                //            parse_mode: "MarkdownV2",
                //        }
                //    }))
                break;
            }
        }
        await ctx.telegram.pinChatMessage(process.env.GROUP_ID, message.message_id, {disable_notification: true})
    } catch (e) {
        sendError(ctx, e);
        console.log(e);
    }
}

module.exports = {
    sendOurMenu
}