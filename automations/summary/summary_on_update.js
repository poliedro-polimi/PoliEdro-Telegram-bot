const {sendOurMenu} = require('../../utilities/send_our_menu.js');

module.exports = {
    data: {
        name: 'summary_on_update',
        description: 'Send the menu on the channel',
    },
    async execute (ctx) {//channel_post outclass media group event
        try{
//READ COMMENTS FOR YOUR HEALTH, WE ARE NEURODIVERSE AND WE MADE OUR BEST FOR YOU
            let mediaGroupToCheck = 0;
            if(ctx.update.channel_post.chat.username === process.env.DEBUG_CHANNEL_ID){//.username looks at the public tag of the channel, .id is the unique id between the bot and the channel

                //Telegram API sends different messages for an album (Media Group) of photos, the object has a property called media_group_id to identify it, if there is only one image the property is undefined
                //We have mediaGroupToCheck starting at 0
                //If we receive 2 images the first send and set mediaGroupToCheck to media_group_id (because is not undefined),
                // the second has media_group_id matching with mediaGroupToCheck and doesn't send anything (it will set again mediaGroupToCheck but don't care)
                //If we receive 1 image we send and we set mediaGroupToCheck to 0 basing on media_group_id === undefined
                //If we receive 1 image again we send (because mediaGroupToCheck === 0 and media_group_id === undefined) and we set again mediaGroupToCheck to 0
                if(mediaGroupToCheck !== ctx.update.channel_post.media_group_id) {
                    await sendOurMenu(ctx)
                }
                mediaGroupToCheck = ctx.update.channel_post.media_group_id === undefined ? 0 : ctx.update.channel_post.media_group_id;
            }
        }catch (e){
            await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN, e);
        }
    }
}