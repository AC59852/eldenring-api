<template>
  <article class="card">
    <div class="card__img">
      <img :src="weapon.image" :alt="`Image of the weapon ${weapon.name} from the video game: Elden Ring`">
    </div>
    <ul class="card__basic">
      <li class="card__stat card__stat--basic">
        <h2>Type:</h2>
        <p>{{ weapon.category }}</p>
      </li>
      <li class="card__stat card__stat--basic">
        <h2>Weight:</h2>
        <p>{{ weapon.weight }}</p>
      </li>
    </ul>
    <div class="card__stats">
      <div class="card__advanced">
        <h2>Attack</h2>
        <ul class="card__stats--advanced">
          <li class="card__stat card__stat--advanced" v-for="attackStat in weapon.attack">
            <h3>{{ attackStat.name }}</h3>
            <p>{{ attackStat.amount }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Defence</h2>
        <ul class="card__stats--advanced">
          <li class="card__stat card__stat--advanced" v-for="defenceStat in weapon.defence">
            <h3>{{ defenceStat.name }}</h3>
            <p>{{ defenceStat.amount }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Stat Scaling</h2>
        <ul class="card__stats--advanced">
          <li class="card__stat card__stat--advanced" v-for="statScaling in weapon.scalesWith">
            <h3>{{ statScaling.name }}</h3>
            <p>{{ statScaling.scaling }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Required Stats</h2>
        <ul class="card__stats--advanced">
          <li class="card__stat card__stat--advanced" v-for="requiredStat in weapon.requiredAttributes">
            <h3>{{ requiredStat.name }}</h3>
            <p>{{ requiredStat.amount }}</p>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['weapon']
}
</script>
<style>
.card {
  background: rgba(31, 27, 27, 0.2);
  backdrop-filter: blur( 5.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 20px;
  box-sizing: border-box;
}

.card__img {
  width: 248px;
  height: 248px;
  background: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
}

.card__img img {
  width: 70%;
  object-fit: contain;
}

.card__stat {
  display: flex;
  justify-content: space-between;
}

.card__stats {
  display: flex;
  flex-wrap: wrap;
}

.card__basic {
  width: 90%
}

.card__advanced {
  width: 50%;
}
</style>