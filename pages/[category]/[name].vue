<template>
  <section class="weapon">
    <section class="weapon__list">
      <NuxtLink :to="`/weapon/${extraWeapon.name}`" class="weapon__thumb" v-for="extraWeapon in weaponsList">
        <img :src="extraWeapon.image" alt="">
        <h3>{{ extraWeapon.name }}</h3>
      </NuxtLink>
    </section>
    <section class="weapon__bio">
      <h1 class="weapon__name">{{ weapon.name }}</h1>
      <p class="weapon__desc">{{ weapon.description }}</p>
      <div>
        <h2 class="weapon__desc">More Info:</h2>
        <NuxtLink target="_blank" class="weapon__link" :to="`https://eldenring.wiki.fextralife.com/${weapon.name}`">https://eldenring.wiki.fextralife.com/{{ weapon.name }}</NuxtLink>
      </div>
    </section>
    <WeaponCard :weapon="weapon" class="weapon__card" />
  </section>
</template>
<script setup>
import mockData from '@/assets/data.json';
console.log("test")

const route = useRoute();
let weapon = ref({});
const category = route.params.category;

const weaponName = route.params.name;
let { data: weaponsList } = ref([]);

// if the category is "class", run a fetch on an api instead of a gql query
//https://eldenring.fanapis.com/api/
try {
  const response = await fetch(`https://eldenring.fanapis.com/api/${category}/${weaponName}`);
  const result = await response.json();

  weapon = result.data;
} catch (error) {
  console.error(error);
}
// weapon = mockData.mockCard[0];

// weaponsList = mockData.mockExtraWeapons;
try {
  const category = route.params.category.slice(0, -1);
  if(route.params.category === 'weapons' || route.params.category === 'armors' || route.params.category === 'shields') {
    const weaponCategory = weapon.category;
  // remove the s from the category name
  console.log(category)

  const query2 = gql`
    query {
        ${category}(category: "${weaponCategory}") {
        name,
        image
      }
    }
  `;

  const { data } = await useAsyncQuery(query2);
  weaponsList = data.value[category]; 
  } else {
    const query2 = gql`
    query {
        ${category}(limit: 10) {
        name,
        image
      }
    }`;

    const { data } = await useAsyncQuery(query2);
    console.log(data)
    weaponsList = data.value[category];
  }
} catch (error) {
  console.error(error);
}

useSeoMeta({
  title: () => `${weapon.name} - Elden Ring Item Search`,
  ogTitle: () => `${weapon.name} - Elden Ring Item Search`,
  description: () => weapon.description,
  ogDescription: () => weapon.description,
  image: () => weapon.image,
  ogImage: () => weapon.image,
  ogImageHeight: 200,
  ogImageWidth: 200,
  ogSiteName: 'Elden Ring Item Search',
  ogUrl: () => `https://elden-ring-items.vercel.app/weapon/${weapon.name}`,
  author: 'Austin Caron',
  creator: 'https://austincaron.com',
  ogType: 'website',
  ogImageAlt: () => `${weapon.name} - Elden Ring Item Search`,
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${weapon.name} - Elden Ring Item Search`,
  twitterDescription: () => weapon.description,
  twitterImage: () => weapon,
  twitterImageAlt: () => `${weapon.name} - Elden Ring Item Search`,
  themeColor: '#103230',
})

</script>
<style>
.weapon {
  display: flex;
  gap: 127px;
  height: 100vh;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)), radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url('@/assets/images/leyndell.jpeg');
  background-size: cover;
  overflow: hidden;
}

.weapon__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  gap: 1rem;
  max-width: 220px;
  height: 88%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 20px;
  box-sizing: border-box;
}

.weapon__thumb {
  background: rgba(31, 27, 27, 0.2);
  backdrop-filter: blur( 5.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  box-sizing: border-box;
  text-decoration: none;
  color: white;
  text-align: center;
  width: 170px;
  height: 170px;
}

.weapon__thumb img {
  width: 80%;
  object-fit: contain;
}

.weapon__bio {
  margin-top: 6%;
  max-width: 800px;
}

.weapon__name {
  font-size: 92px;
  font-weight: bold;
  color: white;
  max-width: 90%;
  margin: 0 auto
}

.weapon__desc {
  font-size: 1.4rem;
  color: white;
  margin: 40px auto 20px;
  line-height: 130%;
  font-weight: 500;
  max-width: 90%;
}

.weapon__link {
  color: white;
  font-size: 1.4rem;
  max-width: 90%;
  margin: 0 auto;
  display: block;
}

.weapon__card {
  width: 28%;
  max-width: 380px;
  margin-top: 5%;
}
</style>