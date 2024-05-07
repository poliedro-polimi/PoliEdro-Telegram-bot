sendError = async function (ctx, e, opts){//https://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices
    try{
        let user;
        if(arguments.length === 2){ //IT DOESN'T WORK WITH ARROW FUNCTIONS
            user = process.env.DEBUG_ADMIN_CHAT_ID;
        }else if(arguments.length === 3 && opts['to']){
            user = opts['to'];
        }else{
            throw new Error("Invalid number of arguments");
        }
        //(opts['to']?opts['to']:process.env.DEBUG_ADMIN_CHAT_ID)
        await ctx.telegram.sendPhoto(user, process.env.PHOTO_ERROR_ID, {caption: `Amo qualcuno ha fatto qualcosa di infame cia${arguments.length!==2?'':'\n'+e}`});
    }catch(e2){
        console.log("Error sending error: ", e2);
    }
}

module.exports = {
    sendError: sendError
}