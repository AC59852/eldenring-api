<template>
  <main>
    <section class="home__hero">
      <div class="hero__text">
        <h1 class="hero__title">Elden Ring Item Search</h1>
        <form @submit.prevent="searchItem($event)" class="hero__search">
          <div class="hero__search_input">
            <div class="hero__bar">
              <input type="text" placeholder="Search" v-model="search" required>
              <button>
                <img src="@/assets/images/chevron-right.svg" alt="">
              </button>
            </div>
            <select v-model="selected" id="">
              <option v-for="category in categories" :key="category.id" :value="category.route">
                {{ category.name }}
              </option>
            </select>
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
  let search = defineModel();
  const selected = ref('weapons');
  const router = useRouter();

  const categories = [
    { id: 1, name: 'Ammos', route: 'ammos' },
    { id: 2, name: 'Armors', route: 'armors' },
    { id: 3, name: 'Ashes of War', route: 'ashes' },
    { id: 4, name: 'Bosses', route: 'bosses' },
    { id: 6, name: 'Creatures', route: 'creatures'},
    { id: 7, name: 'Incantations', route: 'incantations'},
    { id: 8, name: 'Items', route: 'items'},
    { id: 9, name: 'Locations', route: 'locations'},
    { id: 10, name: 'NPCs', route: 'npcs'},
    { id: 11, name: 'Shields', route: 'shields'},
    { id: 12, name: 'Sorceries', route: 'sorceries'},
    { id: 13, name: 'Spirits', route: 'spirits'},
    { id: 14, name: 'Talismans', route: 'talismans'},
    { id: 15, name: 'Weapons', route: 'weapons'},
  ];

  const searchItem = (event) => {
    // send to categories page with search query
    router.push({ path: `/categories/${selected.value}`, query: { search: search.value } });
  }

  onMounted(() => {
    document.querySelector('.hero__search select').addEventListener('focus', function() {
      document.querySelector('.hero__search input').classList.add('focused');
    });

    document.querySelector('.hero__search select').addEventListener('blur', function() {
      document.querySelector('.hero__search input').classList.remove('focused');
    });
  });

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
  padding: 80px 60px;
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
  position: relative;
}

.hero__bar {
  position: relative;
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

.hero__search input:focus, .hero__search input.focused {
  outline: none;
  width: 400px;
}

.hero__search select {
  backdrop-filter: blur( 7.5px );
  background: transparent;
  color: white;
  border: solid 1px rgba(255, 255, 255, 0.233);
  border-radius: 5px;
  padding: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: absolute;
  right: 0;
  transform: translateX(110%);
  height: 100%;
}

.hero__search option {
  background: rgb(41, 41, 41);
  color: white;
}
</style>