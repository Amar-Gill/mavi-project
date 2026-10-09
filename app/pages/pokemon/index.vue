<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { NamedAPIResourceList } from '~/types/pokeapi'

type PokemonRow = {
  id: number
  name: string
}

useSeoMeta({
  title: 'Pokédex'
})

const { data: pokemon, status, error } = useFetch('https://pokeapi.co/api/v2/pokemon', {
  query: { limit: 151 },
  transform: (response: NamedAPIResourceList): PokemonRow[] =>
    response.results.map(({ name, url }) => ({
      id: Number(url.split('/').filter(Boolean).at(-1)), // the list endpoint has no id field, only a url ending in /pokemon/{id}/
      name
    }))
})

const columns: TableColumn<PokemonRow>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${String(row.original.id).padStart(3, '0')}`
}, {
  accessorKey: 'name',
  header: 'Name',
  meta: {
    class: {
      td: 'capitalize'
    }
  }
}]
</script>

<template>
  <UContainer class="space-y-4 py-4">
    <UPageHeader
      title="Pokédex"
      description="The original 151 Pokémon, fetched from PokéAPI."
    />

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      icon="i-lucide-circle-alert"
      title="Error fetching Pokémon"
      :description="error.message"
    />

    <UTable
      v-else
      :data="pokemon"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #name-cell="{ row }">
        <ULink
          :to="`/pokemon/${row.original.id}`"
          class="font-medium text-primary hover:text-primary/75"
        >
          {{ row.original.name }}
        </ULink>
      </template>
    </UTable>
  </UContainer>
</template>
