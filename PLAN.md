We are building a pokedex app using the pokeAPI.

The app should have two main pages:
- List Page – Display a list/grid of Pokémon fetched from the API.
- Details Page – Show details for an individual Pokémon when the user clicks on it.

You are provided with a pokéapi endpoint to fetch Pokémon data:
- List of Pokémon: https://pokeapi.co/api/v2/pokemon?limit=151 (This returns the first 151 Pokémon)
- Individual Pokémon details: https://pokeapi.co/api/v2/pokemon/{id or name} (Replace {id or name} with the Pokémon's ID or name)

Use context7 MCP to get up to date documentation for the pokeapi.

Plan:

1. make a new page for the list pokemon. Display it in a Table from nuxt-ui. Use Nuxt-ui mcp and nuxt mcp.
2. build a link in the table for each pokemon to go to the details page for the selected pokemon. I want to see the sprite of the pokemon, name, id. And the moves available to it in a table. Use nuxt mcp and nuxt-ui mcp.
3. I want more details in the pokemon list table. I want to see the sprite in the table. The url is in the format https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
