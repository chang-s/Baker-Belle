import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext, ComponentContext
from discord_slash.utils import manage_components
from discord_slash.model import ButtonStyle

intents = discord.Intents.all()
intents.messages = True  # Ensure your bot can receive message events
intents.presences = True
intents.reactions = True
intents.guilds = True
intents.members = True

bot = commands.Bot(command_prefix='!', intents=intents)
slash = SlashCommand(bot)


# Replace these with your own values
TOKEN = 'MTI0NDczMTQ5MzQ0NDYxNjI1Mg.GdW_8t.MxHEui6r7EuKmoDnus26PsWVs3bOEG0a9zW2i8'
GUILD_ID = 1232552716539006986  # Replace with your guild/server ID
ROLE_BUTTONS = {
    '🔴': ('Red Role', ButtonStyle.red),
    '🔵': ('Blue Role', ButtonStyle.blue),
    '🟢': ('Green Role', ButtonStyle.green)
}


@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')
    guild = discord.utils.get(bot.guilds, id=GUILD_ID)
    channel = discord.utils.get(guild.text_channels, name='general')  # Replace 'general' with your channel name
    
    # Construct the message content
    message_content = "Click the buttons below to get roles:"
    
    # Add buttons to the message
    components = []
    for emoji, (role_name, button_style) in ROLE_BUTTONS.items():
        components.append(manage_components.create_button(style=button_style, label=role_name, custom_id=role_name))
    
    await channel.send(content=message_content, components=[components])

@bot.event
async def on_component(ctx: ComponentContext):
    role_name = ctx.custom_id
    guild = ctx.guild
    role = discord.utils.get(guild.roles, name=role_name)
    member = guild.get_member(ctx.author.id)
    
    if role and member:
        if role in member.roles:
            await member.remove_roles(role)
            await ctx.send(content=f'Removed {role.name} role.', ephemeral=True)
        else:
            await member.add_roles(role)
            await ctx.send(content=f'Added {role.name} role.', ephemeral=True)

@bot.command()
async def hello(ctx):
    await ctx.send('Hello!')

@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')

@bot.command()
async def add(ctx, a: int, b: int):
    await ctx.send(a + b)

@bot.command()
async def say(ctx, *, text: str):
    await ctx.send(text)

bot.run(TOKEN)