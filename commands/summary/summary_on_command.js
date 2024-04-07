const {sendOurMenu} = require('../../utilities/send_our_menu.js');

module.exports = {
    data: {
        name: 'summary_on_command',
        description: 'Send the menu in the group',
    },
    async execute (ctx) {//channel_post outclass media group event
        try {
            if (ctx.update.message.chat.username === process.env.DEBUG_ADMIN_CHAT_ID) {//.username looks at the public tag of the channel, .id is the unique id between the bot and the channel

                //Telegram API sends different messages for an album (Media Group) of photos, the object has a property called media_group_id to identify it, if there is only one image the property is undefined
                //We have mediaGroupToCheck starting at 0
                //If we receive 2 images the first send and set mediaGroupToCheck to media_group_id (because is not undefined),
                // the second has media_group_id matching with mediaGroupToCheck and doesn't send anything (it will set again mediaGroupToCheck but don't care)
                //If we receive 1 image we send and we set mediaGroupToCheck to 0 basing on media_group_id === undefined
                await sendOurMenu(ctx);
            }
        } catch (e) {
            await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN, e);
        }
    }
}