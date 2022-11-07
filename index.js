require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});
// Invite Link:

// Dependencies
const fs = require('fs');

// Files
const users_txt = './users.txt';
const roles_txt = './roles.txt';







// #####################################################################
// ################ FUNCTIONS and GLOBAL VARIABLES #####################
// #####################################################################

const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;
const server_id = process.env.SERVER_ID;
const admin_rn = process.env.ADMIN_RN;




roles = []
fs.readFile(roles_txt, 'utf8', function(err, data) {
	if (err) throw err;

	data = data.split(/\r?\n/);

	data.forEach(role => {
		console.log(role)
		roles.push(role)
	});
});

people_to_yeet_role_from = []
fs.readFile(users_txt, 'utf8', function(err, data) {
	if (err) throw err;

	data = data.split(/\r?\n/);

	data.forEach(user => {
		console.log(user)
		people_to_yeet_role_from.push(user)
	});
});



// #####################################################################
// ########################## MAIN CODE ################################
// #####################################################################

client.login(TOKEN);

// When the bot connects
client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
});

// When the bot detects that the message has been sent
client.on('messageCreate', msg => {
	
	// Is the user who sent this message an Admin?
	const isAdmin = msg.member.roles.cache.some(role => role.name === admin_rn);

	// Initialize the guild variable so that we can get helpful information later
	const guild = client.guilds.cache.get(server_id);

	// If this message isn't a command, or the user is a bot, or this is a DM: leave
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type == 'dm') return;

	// Only Admins can do this
	if (msg.content.startsWith(prefix + 'role-remover') && isAdmin) {
		// Loop through all of the people we want to remove roles from
		people_to_yeet_role_from.forEach(person => {
			// Grab all members in the guild
			guild.members.fetch()
			.then((users) => {
				users.forEach(user => {
					if (`${user.user.username}#${user.user.discriminator}` === person) {
						roles.forEach(rolex => {
							const role_object = guild.roles.cache.find(roles => roles.name === rolex);
							
							if (user._roles.includes(role_object.id)) {
								// Remove the person's role
								user.roles.remove(role_object).catch(() => {
									console.log('Role could not be removed');
								})
							}
						})
						console.log(`Finished removing roles for ${person}`)
					}
				})
			});
		});
	}
});





// #####################################################################
// ############################# NOTES #################################
// #####################################################################

// TODOs

// Dependencies
// discord.js dotenv