module.exports = {
    data: {
        name: 'join',
        description: 'Ask to join in the group'
    },
    async execute(ctx) {
        //TODO timer
        try {
            //if (ctx.update.message.chat.username) {
            //    await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, "Someone wants to join the group");
            //    await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, "Do you want to accept him?");
            //}
        } catch (e) {
            //await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN_CHAT_ID, e);
        }
    }
}