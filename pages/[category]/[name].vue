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
        <h2>More Info:</h2>
        <NuxtLink target="_blank" class="weapon__link" :to="`https://eldenring.wiki.fextralife.com/${weapon.name}`">https://eldenring.wiki.fextralife.com/{{ weapon.name }}</NuxtLink>
      </div>
    </section>
    <WeaponCard :weapon="weapon" class="weapon__card" />
  </section>
</template>
<script setup>
import mockData from '@/assets/data.json';

const route = useRoute();
let weapon = ref({});
const category = route.params.category;

const weaponName = route.params.name;
let { data: weaponsList } = ref([]);

// because gql is case sensitive, each word needs to be capitalized
function capitalizeFirstLetter() {
  var splitStr = route.params.name.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' ');
}

const categoryFields = {
  ammo: ["name", "image", "description", "type", "passive", "attackPower {name, amount}"],
  armor: ["name", "image", "description", "category", "weight", "dmgNegation {name, amount}", "resistance {name, amount}"],
  ashOfWar: ["name", "image", "description", "affinity", "skill"],
  boss: ["name", "image", "description", "location", "drops", "healthPoints"],
  class: ["name", "image", "description", "stats {level, vigor, mind, endurance, strenght, dexterity, inteligence, faith, arcane}"],
  creature: ["name", "image", "description", "location", "drops"],
  incantation: ["name", "image", "description", "type", "cost", "slots", "effects", "requires {name, amount}"],
  item: ["name", "image", "description", "type", "effect"],
  location: ["name", "image", "description"],
  npc: ["name", "image", "description", "location", "quote"],
  shield: ["name", "image", "description", "category", "weight", "attack {name, amount}", "defence {name, amount}", "requiredAttributes {name, amount}", "scalesWith {name, scaling}"],
  sorcery: ["name", "image", "description", "type", "cost", "slots", "effects", "requires {name, amount}"],
  spirit: ["name", "image", "description", "fpCost", "hpCost", "effects"],
  talisman: ["name", "image", "description", "effects"],
  weapon: ["name", "image", "description", "category", "weight", "attack {name, amount}", "defence {name, amount}", "requiredAttributes {name, amount}", "scalesWith {name, scaling}"],
}

// Get the fields for the current category, default to an empty array if not found
const fields = categoryFields[category] || [];

// Construct the fields string for the query
const fieldsString = fields.join("\n");

// if the category is "class", run a fetch on an api instead of a gql query

try {
  if(category === "class") {
    const response = await fetch(`https://eldenring.fanapis.com/api/classes?name=${weaponName}`);
    const res = await response.json();
    weapon = res.data[0];
  } else {
    const query = gql`
      query {
        ${category}(name: "${capitalizeFirstLetter(weaponName)}") {
          ${fieldsString}
        }
      }
    `;

      // weight,
      // attack {name, amount},
      // defence {name, amount},
      // requiredAttributes {name, amount},
      // scalesWith {name, scaling},

  const { data } = await useAsyncQuery(query);
  // if combine data.value and category
  if(data.value[category].length > 0) {
    weapon = data.value[category][0];
  } else {
    weapon = mockData.mockCard[0];
  }
}
} catch (error) {
  console.error(error);
}

// weapon = mockData.mockCard[0];

// weaponsList = mockData.mockExtraWeapons;

try {
  const weaponCategory = weapon.category;

  const query2 = gql`
    query {
      weapon(category: "${weaponCategory}") {
        name,
        image
      }
    }
  `;

  const { data } = await useAsyncQuery(query2);
  if (data.value.weapon.length > 0) {
    weaponsList = data.value.weapon;
  } else {
    weaponsList = mockData.mockExtraWeapons;
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