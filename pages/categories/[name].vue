<template>
  <section class="categories">
    <div class="categories__wrapper">
      <header class="categories__header">
          <NuxtLink to="/" class="categories__back">Back</NuxtLink>
          <h1 class="categories__title">{{ route.params.name }}</h1>
        <input type="text" placeholder="Search" v-model="search" class="categories__search">
      </header>
      <section class="categories__items">
        <NuxtLink :to="`/${route.params.name}/${item.name}`" class="categories__item" v-for="item in items">
          <div class="categories__content">
            <img :src="item.image" alt="Image">
            <h2>{{ item.name }}</h2>
          </div>
        </NuxtLink>
      </section>
    </div>
  </section>
</template>
<script setup>
const route = useRoute();
let items = ref([]);
let page = ref(1);


console.log(route.params.name);

  let fetchItems = async () => {
    if(route.query.search) {
      const response = await fetch(`https://eldenring.fanapis.com/api/${route.params.name}?name=${route.query.search}`);
      const res = await response.json();
      items.value = [...items.value, ...res.data];
      return;
    } else {
      const response = await fetch(`https://eldenring.fanapis.com/api/${route.params.name}?page=${page.value}`);
      const res = await response.json();
      items.value = [...items.value, ...res.data];
    }
  }

  fetchItems();

  onMounted(() => {
    const container = document.querySelector('.categories__items');
    container.addEventListener('scroll', () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
        // if there are no more items to fetch, remove the event listener
        if (items.value.length % 20 !== 0) {
          container.removeEventListener('scroll', () => {});
          return
        } else {
          page.value++;
          console.log('fetching more items ', page.value);
          fetchItems();
        }
      }
    });
  });
</script>
<style>

  .categories {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-image: linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)), radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url('@/assets/images/leyndell.jpeg');
    background-size: cover;
    gap: 50px;
  }

  .categories__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    max-width: 1500px;
    height: 90%;
    max-height: 1000px;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .categories__header {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .categories__back {
    color: white;
    font-size: 1.3rem;
    text-decoration: none;
    border-bottom: 2px solid white;
    position: relative;
    margin-left: 3cqb;
  }

  .categories__back::before {
    content: '';
    background-image: url('@/assets/images/chevron-right.svg');
    position: absolute;
    width: 20px;
    height: 20px;
    rotate: 180deg;
    left: -25px;
    transform: translateY(-10%);
  }



  .categories__route {
    display: flex;
    gap: 10px;
  }

  .categories__search {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .categories__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 70px 15px;
    width: 100%;
    max-width: 1500px;
    overflow: auto;
  }

  .categories__item {
    text-align: center;
    text-decoration: none;
    width: 225px;
    transition: all 0.1s ease-in-out;
    position: relative;
  }

  .categories__item::after {
    content: "";
    display: block;
    padding-bottom: 105%;
  }

  .categories__content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    gap: 15px;
  }

  .categories__content img:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .categories__item img {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 15px;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .categories__item h2 {
    color: white;
    font-size: 1.1rem;
    /* padding-bottom: 2px; */
    border-bottom: solid 2px transparent;
    transition: all 0.2s ease-in-out;
    position: relative;
    display: none;
  }

  .categories__item h2::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: transparent;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s ease-in-out;
  }

  .categories__item h2:hover::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: white;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>