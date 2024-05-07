require("dotenv").config();
const { Telegraf, Format } = require('telegraf');
const fs = require('fs');
const path = require('path');
const {loadEvents} = require('./utilities/events.js');
const {sendError} = require("./utilities/send_error.js");
//let events_pending = require(`./events.js`);
//const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

let commands = new Map();
const foldersPathCommands = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPathCommands);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPathCommands, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));//This next step is how you'll dynamically retrieve all your newly created command files. Add this below your client.commands line:
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

let automations = new Map();
const foldersPathAutomations = path.join(__dirname, 'automations');
const automationsFolder = fs.readdirSync(foldersPathAutomations);
for (const folder of automationsFolder) {
    const automationsPath = path.join(foldersPathAutomations, folder);
    const automationFiles = fs.readdirSync(automationsPath).filter(file => file.endsWith('.js'));//This next step is how you'll dynamically retrieve all your newly created command files. Add this below your client.commands line:
    for (const file of automationFiles) {
        const filePath = path.join(automationsPath, file);
        const automation = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in automation && 'execute' in automation) {
            automations.set(automation.data.name, automation);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

loadEvents();

//check if it's a command or not
bot.use(async (ctx, next) => {
    console.log('use')
    await next();
    // const command = commands.get('todo');
    // if(command) {
    //     try{
    //         await command.execute(ctx);
    //     }catch(e){
    //         console.error(e);
    //         await ctx.telegram.sendMessage(process.env.DEBUG_ADMIN, e);
    //     }
    // }else{
    //     await next();
    // }

    // try {
    //     await command.execute(interaction);
    // } catch (error) {
    //     console.error(error);
    //     if (interaction.replied || interaction.deferred) {
    //         await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    //     } else {
    //         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //     }
    // }
});

bot.on("channel_post", async (ctx) => {
    console.log('channel post')
    await automations.get('summary_on_update').execute(ctx);
})


commands.forEach((command, trigger) => {
    bot.command(trigger, async (ctx) => {
        console.log("command");
        try{
            await command.execute(ctx);
        }catch(e){
            sendError(ctx, e);
        }
    });
})


bot.launch().then(() => {
    console.log('Il bot è online!');//idk perché non va
});

console.log('cia')