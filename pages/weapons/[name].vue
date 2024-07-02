<template>
  <section class="weapon__list">
    <NuxtLink :to="`/weapons/${extraWeapon.name}`" class="weapon__thumb" v-for="extraWeapon in weaponsList">
      <img :src="extraWeapon.image" alt="">
      <span>{{ extraWeapon.name }}</span>
    </NuxtLink>
  </section>
  <section>
    <h1>{{ weapon.name }}</h1>
    <p>{{ weapon.description }}</p>
    <div>
      <h2>More Info:</h2>
      <NuxtLink target="_blank" :to="`https://eldenring.wiki.fextralife.com/${weapon.name}`">https://eldenring.wiki.fextralife.com/{{ weapon.name }}</NuxtLink>
    </div>
  </section>
  <WeaponCard :weapon="weapon" />
</template>
<script setup>

const route = useRoute();

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
const weapon = data.value.weapon[0];

  const weaponCategory = data.value.weapon[0].category;

  const query2 = gql`
    query {
      weapon(category: "${weaponCategory}") {
        name,
        image
      }
    }
  `;

const { data: weapons } = await useAsyncQuery(query2);
weaponsList = weapons.value.weapon;

</script>