const {sendOurMenu} = require('../../utilities/send_our_menu.js');
const {getEvents} = require("../../utilities/events");
const {sendError} = require("../../utilities/send_error");

module.exports = {
    data: {
        name: 'send',
        description: 'Send the menu in the group',
    },
    async execute (ctx) {//channel_post outclass media group event
        try {
            if (ctx.update.message.chat.username === process.env.DEBUG_ADMIN) {//.username looks at the public tag of the channel, .id is the unique id between the bot and the channel
                getEvents();
                await sendOurMenu(ctx);
            } else {
                sendError(ctx, "You cannot use this command", {to:ctx.update.message.chat.username});
                sendError(ctx,`Someone tried to send the menu in the group ${ctx.update.message.from.username}`);
            }
        } catch (e) {
            sendError(ctx, e);
        }
    }
}