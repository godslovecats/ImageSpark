<template>
  <div class="card row middle-xs">
    <div class="col-md-10 row middle-xs">
    
        <span class="col-md-1">
          1
        </span>
      
        <div class="col-md-1">
          <span class="card__img"
            >{{ getFirstLetter(user.name) }}
            {{ getFirstLetter(user.secondName) }}</span
          >
        </div>
      
        <div class="col-md-10">
          <h5>{{ user.name }} {{ user.secondName }}</h5>
          <!--				<p>{{user.secondName}}</p>-->
        </div>
   
    </div>

    <div class="col-md-2">
      <div>
        <p>
          <strong>{{ user.rating }}</strong>
        </p>
        <p>{{ getDeclOfNum(user.rating) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      data1: null
    };
  },
  computed: {
    computed1() {}
  },
  methods: {
    getDeclOfNum(num) {
      let titles = ["балл", "балла", "баллов"];
      return titles[
        num % 10 === 1 && num % 100 !== 11
          ? 0
          : num % 10 >= 2 &&
            num % 10 <= 4 &&
            (num % 100 < 10 || num % 100 >= 20)
          ? 1
          : 2
      ];
    },
    getFirstLetter(str) {
      return str.charAt(0);
    }
  }
};
</script>

<style lang="scss">
.card {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  &__img {
    
  }
}
</style>