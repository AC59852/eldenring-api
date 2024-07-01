<template>
  <div>
    <NuxtLink style="display: block;" v-for="category in categories" :to="`/categories/${category.name}`">{{ category.name }}</NuxtLink>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [
          { id: 1, name: 'Ammos' },
          { id: 2, name: 'Armors' },
          { id: 3, name: 'Ashes of War' },
          { id: 4, name: 'Bosses' },
          { id: 5, name: 'Classes' },
          { id: 6, name: 'Creatures' },
          { id: 7, name: 'Incantations' },
          { id: 8, name: 'Items' },
          { id: 9, name: 'Locations' },
          { id: 10, name: 'NPCs' },
          { id: 11, name: 'Shields' },
          { id: 12, name: 'Sorceries' },
          { id: 13, name: 'Spirits' },
          { id: 14, name: 'Talismans' },
          { id: 15, name: 'Weapons' },
        ]
      }
    }
  }
</script>