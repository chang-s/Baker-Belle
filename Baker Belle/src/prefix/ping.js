module.exports = {
    name: 'ping',
    description: 'This is the ping command!',

    run: async (client, message, args) => {
        try {
            const channel = await client.channels.fetch('1244768958247342121');
            channel.send('Pong!');
		} catch (error) {
			console.error(`There was an error: ${error}`);
		}
    }
}