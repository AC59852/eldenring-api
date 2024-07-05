<template>
  <section class="weapon">
    <section class="weapon__list">
      <NuxtLink :to="`/weapons/${extraWeapon.name}`" class="weapon__thumb" v-for="extraWeapon in weaponsList">
        <img :src="extraWeapon.image" alt="">
        <h3>{{ extraWeapon.name }}</h3>
      </NuxtLink>
    </section>
    <section class="weapon__bio">
      <h1 class="weapon__name">{{ weapon.name }}</h1>
      <p class="weapon__desc">{{ weapon.description }}</p>
      <div>
        <h2>More Info:</h2>
        <NuxtLink target="_blank" :to="`https://eldenring.wiki.fextralife.com/${weapon.name}`">https://eldenring.wiki.fextralife.com/{{ weapon.name }}</NuxtLink>
      </div>
    </section>
    <WeaponCard :weapon="weapon" class="weapon__card" />
  </section>
</template>
<script setup>
import mockData from '@/assets/data.json';

const route = useRoute();
let weapon = ref({});

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

try {
  const query = gql`
  query {
    weapon(name: "${capitalizeFirstLetter(weaponName)}") {
      name,
      description,
      image,
      category, 
      weight,
      attack {name, amount},
      defence {name, amount},
      requiredAttributes {name, amount},
      scalesWith {name, scaling},
    }
  }
`;

  const { data } = await useAsyncQuery(query);
  if(data.value.weapon.length > 0) {
    weapon = data.value.weapon[0];
  } else {
    weapon = mockData.mockCard[0];
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
  max-width: 200px;
  height: 88%;
  overflow-y: auto;
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
}

.weapon__desc {
  font-size: 1.4rem;
  color: white;
  margin: 40px 0 20px;
  line-height: 130%;
  font-weight: 500;
  max-width: 90%;
}

.weapon__card {
  width: 28%;
  max-width: 380px;
  margin-top: 5%;
}
</style>