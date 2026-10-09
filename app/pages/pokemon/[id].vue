<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Pokemon } from '~/types/pokeapi'

type MoveRow = {
  name: string
  methods: string[]
}

const route = useRoute()

const { data: pokemon, error } = await useFetch(() => `https://pokeapi.co/api/v2/pokemon/${route.params.id}`, {
  transform: (response: Pokemon) => ({
    id: response.id,
    name: response.name,
    sprite: response.sprites.front_default,
    moves: response.moves
      .map(({ move, version_group_details }): MoveRow => ({
        name: move.name,
        methods: [...new Set(version_group_details.map(({ move_learn_method }) => move_learn_method.name))].sort()
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })
})

useSeoMeta({
  title: () => pokemon.value
    ? `${pokemon.value.name.charAt(0).toUpperCase()}${pokemon.value.name.slice(1)} | Pokédex`
    : 'Pokédex'
})

const columns: TableColumn<MoveRow>[] = [{
  accessorKey: 'name',
  header: 'Move',
  meta: {
    class: {
      td: 'capitalize font-medium text-highlighted'
    }
  }
}, {
  accessorKey: 'methods',
  header: 'Learned by'
}]
</script>

<template>
  <UContainer class="space-y-4 py-4">
    <UButton
      to="/pokemon"
      icon="i-lucide-arrow-left"
      label="Back to Pokédex"
      color="neutral"
      variant="link"
      class="px-0"
    />

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      icon="i-lucide-circle-alert"
      title="Error fetching Pokémon"
      :description="error.message"
    />

    <template v-else-if="pokemon">
      <UPageHeader :headline="`#${String(pokemon.id).padStart(3, '0')}`">
        <template #title>
          <span class="flex items-center gap-4">
            <img
              v-if="pokemon.sprite"
              :src="pokemon.sprite"
              alt=""
              class="size-24 [image-rendering:pixelated]"
            >
            <span class="capitalize">
              {{ pokemon.name }}
            </span>
          </span>
        </template>
      </UPageHeader>

      <h2 class="text-xl font-semibold text-highlighted">
        Moves ({{ pokemon.moves.length }})
      </h2>

      <UTable
        :data="pokemon.moves"
        :columns="columns"
      >
        <template #methods-cell="{ row }">
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="method in row.original.methods"
              :key="method"
              :label="method"
              color="neutral"
              variant="subtle"
              class="capitalize"
            />
          </div>
        </template>
      </UTable>
    </template>
  </UContainer>
</template>
