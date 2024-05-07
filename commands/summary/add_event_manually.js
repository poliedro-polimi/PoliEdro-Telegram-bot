const {getEvents, newEventFromMessage} = require("../../utilities/events");
const {sendError} = require("../../utilities/send_error");

module.exports = {//TODO actually it would need scenes, I will add listening from 2 channels
    data: {
        name: 'add',
        description: 'Add an event to the list'
    },
    async execute (ctx) {//channel_post outclass media group event
        try {
            if (ctx.update.message.chat.username === process.env.DEBUG_ADMIN) {//.username looks at the public tag of the channel, .id is the unique id between the bot and the channel
                await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, "Insert an event");
                ctx.Tele.on('message', async (ctx) => {
                    newEventFromMessage(ctx);//TODO the id of the link will change because it has been sent on debug channel
                });
                console.log("Event added");
                await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, "Events now"+getEvents());
            } else {
                sendError(ctx, "You cannot use this command", {to:ctx.update.message.chat.id});
                sendError(ctx,`Someone tried to send the menu in the group ${ctx.update.message.from.username}`);
            }
        } catch (e) {
            await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, e);
        }
    }
}