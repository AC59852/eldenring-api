<template>
  <section>
    <div v-for="item in items">
      <NuxtLink :to="`/${route.params.name}/${item.name}`">
        <img :src="item.image" alt="Image">
        <h2>{{ item.name }}</h2>
      </NuxtLink>
    </div>
  </section>
</template>
<script setup>
const route = useRoute();
let items = ref([]);


console.log(route.params.name);

try {
  const query = gql`
    query {
      ${route.params.name}(limit: 100) {
        name,
        image
      }
    }
  `;

  const { data } = await useAsyncQuery(query);
  items = data.value[route.params.name];

  console.log(data)
} catch (error) {
  console.error(error);
}
</script>