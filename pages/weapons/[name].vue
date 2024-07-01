<template>
  <section class="weapon__list">
    <NuxtLink :to="`/weapons/${extraWeapon.name}`" class="weapon__thumb" v-for="extraWeapon in weaponsList">
      <img :src="extraWeapon.image" alt="">
      <span>{{ extraWeapon.name }}</span>
    </NuxtLink>
  </section>
  <div>{{ weapon.name }}</div>
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

getWeapons();
async function getWeapons() {
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
}

</script>