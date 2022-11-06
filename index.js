require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Invite Link:

// Dependencies
const fs = require('fs');
const cron = require('cron');

// Files
const users_txt = './users.txt';







// #####################################################################
// ################ FUNCTIONS and GLOBAL VARIABLES #####################
// #####################################################################

const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;
const server_id = process.env.SERVER_ID;
const admin_rn = process.env.ADMIN_RN;




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

	// example-command
	// Only Admins can do this
	if (msg.content.startsWith(prefix + 'role-remover') && isAdmin) {
		roles = []
		// Read in roles
		fs.readFile(roles_txt, 'utf8', function(err, data) {
			if (err) throw err;

			data = data.split(/\r?\n/);

			data.forEach(role => {
				roles.push(role)
			});
		});


		people_to_yeet_role_from = []
		fs.readFile(users_txt, 'utf8', function(err, data) {
			if (err) throw err;

			data = data.split(/\r?\n/);

			data.forEach(user => {
				people_to_yeet_role_from.push(user)
			});
		});

		people_to_yeet_role_from.forEach(person => {
			// Get the Guild and store it under the variable "guild"
			const guild = client.guilds.cache.get(server_id);

			roles.forEach(rolex => {
				if (user.roles.cache.some(role => role.name === rolex)) {
					// Get the role object
					const role_object = guild.roles.cache.find(roles => roles.name === rolex);
					

					// Grab the member we are looking for and remove their role
					guild.members.fetch(person)
					.then((user) => {
						// Remove the person's role
						user.roles.remove(role_object).catch(() => {
							console.log('Role could not be removed');
						})
					});
				}
			})
			
		
			
		});
	}
});





// #####################################################################
// ############################# NOTES #################################
// #####################################################################

// TODOs

// Dependencies
// discordjs cron dotenv discord-anti-spam