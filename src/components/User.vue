<template>
  <div class="card row">
    <div class="col-10">
      <div class="row">
        <span class="col-1">
          1
        </span>
        <div class="col-2">
          <span>{{ getFirstLetter(user.name) }} {{ getFirstLetter(user.secondName) }}</span>
        </div>
        <div class="col-9">
          <h5>{{ user.name }} {{ user.secondName }}</h5>
          <!--				<p>{{user.secondName}}</p>-->
        </div>
      </div>
    </div>

    <div class="col-2">
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
}
</style>