const {resetEvents} = require("../../utilities/events");
const {sendError} = require("../../utilities/send_error");

module.exports = {
    data: {
        name: 'reset',
        description: 'Reset the event list'
    },
    async execute (ctx) {//channel_post outclass media group event
        try {
            if (ctx.update.message.chat.username === process.env.DEBUG_ADMIN) {//.username looks at the public tag of the channel, .id is the unique id between the bot and the channel
                resetEvents();
                console.log("Events resetted");
                await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, "Events resetted");
            } else {
                sendError(ctx, "You cannot use this command", {to:ctx.update.message.chat.id});
                sendError(ctx,`Someone tried to send the menu in the group ${ctx.update.message.from.username}`);
            }
        } catch (e) {
            await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, e);
        }
    }
}