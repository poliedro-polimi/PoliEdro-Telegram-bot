const {newEvent/*, events*/} = require('../utilities/events_pending.js');
const {menuKeyboard} = require('../utilities/menu_keyboard.js');

sendOurMenu = async (ctx) => {
    try{
        let date = new Date();//TODO get the date from the message
        //events_pending.newEvent(ctx.update.channel_post.photo[0].file_id, ctx.update.channel_post.message_id, date);
        //let events = events_pending.events();
        //let url = `${}`
        let caption = "";
        let message = "";
        console.log('euywhfbwc')
        //Debug
        events = [
            {
                mediaId:  ctx.update.channel_post.photo[0].file_id,
                messageIdOnChannel: ctx.update.channel_post.message_id,
                date: ""
            }
            // ,
            // {
            //     mediaId:  ctx.update.channel_post.photo[0].file_id,
            //     messageIdOnChannel: ctx.update.channel_post.message_id,
            //     date: "20210401"
            // }
        ]
        switch (events.length) {//TODO sendMessage
            case 0:{
                caption = `Dai un'occhiata alle nostre risorse!`
                await ctx.telegram.sendMessage(process.env.DEBUG_GROUP_ID, caption, {
                    reply_markup: menuKeyboard()
                })
                break;
            }
            case 1:{
                caption = `Dai un'occhiata al nostro [prossimo evento](https://t.me/${process.env.CHANNEL_ID}/${events[0].messageIdOnChannel}) il ${events[0].date}`
                console.log(caption)
                message = await ctx.telegram.sendPhoto(process.env.DEBUG_GROUP_ID, events[0].mediaId, {
                    caption: caption,
                    parse_mode: "MarkdownV2",
                    reply_markup: menuKeyboard()
                })
                break;
            }
            default:{//TODO make a sendMediaGroup
                caption = `Dai un'occhiata ai nostri prossimi eventi:`
                for (let i = 0; i < events.length; i++) {
                    caption += `\n${events[i].date} \- [Evento](https://t.me/PoliEdroLive/${events[i].messageIdOnChannel})`
                }

                eventsMedia = []

                events.forEach((event) => {
                    eventsMedia.push(event.mediaId)
                })

                let message = await ctx.telegram.sendMediaGroup(process.env.DEBUG_GROUP_ID, events.map((event) => {
                    return {
                        type: "photo",
                        media: `${event.mediaId}`,
                        caption: caption,
                        parse_mode: "MarkdownV2",
                        reply_markup: menuKeyboard()
                    }
                }))
                break;
            }
        }
        await ctx.telegram.pinChatMessage(process.env.DEBUG_GROUP_ID, message.message_id, {disable_notification: true})
    } catch (e) {
        await ctx.telegram.sendPhoto(process.env.DEBUG_ADMIN, process.env.PHOTO_ERROR_ID, {caption: `Amo qualcuno ha provato a mandare del testo probabilmente cia\n${e}`});
    }
}

module.exports = {
    sendOurMenu
}