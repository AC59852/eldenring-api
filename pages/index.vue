<template>
  <main>
    <section class="home__hero">
      <div class="hero__text">
        <h1 class="hero__title">Elden Ring Item Search</h1>
        <form @submit.prevent="console.log('test')" class="hero__search">
          <div class="hero__search_input">
            <input type="text" placeholder="Search" v-model="search" required>
            <button>
              <img src="@/assets/images/chevron-right.svg" alt="">
            </button>
          </div>
        </form>
        <div class="hero__categories">
          <NuxtLink style="display: block;" v-for="category in categories" :to="`/categories/${category.route}`">{{ category.name }}</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
  const search = defineModel();

  const categories = [
    { id: 1, name: 'Ammos', route: 'ammo' },
    { id: 2, name: 'Armors', route: 'armor' },
    { id: 3, name: 'Ashes of War', route: 'ashOfWar' },
    { id: 4, name: 'Bosses', route: 'boss' },
    { id: 5, name: 'Classes', route: 'class' },
    { id: 6, name: 'Creatures', route: 'creature'},
    { id: 7, name: 'Incantations', route: 'incantation'},
    { id: 8, name: 'Items', route: 'item'},
    { id: 9, name: 'Locations', route: 'location'},
    { id: 10, name: 'NPCs', route: 'npc'},
    { id: 11, name: 'Shields', route: 'shield'},
    { id: 12, name: 'Sorceries', route: 'sorcery'},
    { id: 13, name: 'Spirits', route: 'spirit'},
    { id: 14, name: 'Talismans', route: 'talisman'},
    { id: 15, name: 'Weapons', route: 'weapon'},
  ];

</script>
<style>
.home__hero {
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/images/elden_ring-hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__text {
  background: rgba(31, 27, 27, 0.2);
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  width: 60%;
  max-width: 1300px;
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 55px;
}

.hero__title {
  color: white;
  font-size: 5rem;
  text-align: center;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.hero__categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 80%;
  margin: 0 auto;
}

.hero__categories a {
  color: white;
  font-size: 1.8rem;
  text-decoration: none;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.hero__search_input {
  display: flex;
  align-items: center;
  position: relative
}

.hero__search_input button {
  position: absolute;
  right: -13px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hero__search_input button img {
  width: 28px;
  height: 28px;
}

.hero__search input{
  width: 250px;
  background: transparent;
  color: white;
  opacity: 1;
  font-size: 1.4rem;
  padding: 4px 0;
  border: none;
  border-bottom: 3px solid white;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  text-align: center;
}

.hero__search input::placeholder {
  color: white;
  opacity: 1;
  font-size: 1.4rem;
}

.hero__search input:focus {
  outline: none;
  width: 400px;
}
</style>