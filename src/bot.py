import discord
from discord.ext import commands

intents = discord.Intents.all()
intents.messages = True  # Ensure your bot can receive message events

bot = commands.Bot(command_prefix='!', intents=intents)
TOKEN = 'MTI0NDczMTQ5MzQ0NDYxNjI1Mg.GdW_8t.MxHEui6r7EuKmoDnus26PsWVs3bOEG0a9zW2i8';

@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')

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