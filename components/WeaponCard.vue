<template>
  <article class="card">
    <div class="card__img">
      <img :src="weapon.image" :alt="`Image of the weapon ${weapon.name} from the video game: Elden Ring`">
    </div>
    <ul class="card__basic">
      <li class="card__stat">
        <h2>Type:</h2>
        <p>{{ weapon.category }}</p>
      </li>
      <li class="card__stat">
        <h2>Weight:</h2>
        <p>{{ weapon.weight }}</p>
      </li>
    </ul>
    <div class="card__stats">
      <div class="card__advanced">
        <h2>Attack</h2>
        <ul class="card__stats">
          <li class="card__stat" v-for="attackStat in weapon.attack">
            <h3>{{ attackStat.name }}</h3>
            <p>{{ attackStat.amount }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Defence</h2>
        <ul class="card__stats">
          <li class="card__stat" v-for="defenceStat in weapon.defence">
            <h3>{{ defenceStat.name }}</h3>
            <p>{{ defenceStat.amount }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Stat Scaling</h2>
        <ul class="card__stats">
          <li class="card__stat" v-for="statScaling in weapon.scalesWith">
            <h3>{{ statScaling.name }}</h3>
            <p>{{ statScaling.scaling }}</p>
          </li>
        </ul>
      </div>
      <div class="card__advanced">
        <h2>Required Stats</h2>
        <ul class="card__stats">
          <li class="card__stat" v-for="requiredStat in weapon.requiredAttributes">
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