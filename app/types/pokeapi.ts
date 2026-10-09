export type NamedAPIResource = {
  name: string
  url: string
}

export type NamedAPIResourceList = {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

export type PokemonSprites = {
  front_default: string | null
}

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource
}

export type PokemonMove = {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

export type Pokemon = {
  id: number
  name: string
  sprites: PokemonSprites
  moves: PokemonMove[]
}
