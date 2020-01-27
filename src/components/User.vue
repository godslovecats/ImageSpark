<template>
  <div class="card">
    <div
      class="card__item card__item--img"
    >
      <span class="num">
        {{ index }}
      </span>
      <div class="img" :class="getRatePlace ? `img--color-${getRatePlace}` : ''">
        <span> {{ firstLettersOfName }}</span>
      </div>
    </div>

    <div class="card__item card__item--info">
      <div>
        <h5 class="subtitle m-0">{{ user.name }} {{ user.secondName }}</h5>
        <span class="f-muted">{{ user.age }} {{ declOfAge }}</span>
      </div>
      <div class="right">
        <p class="subtitle m-0">
          {{ user.rating }}
        </p>
        <span class="f-muted">{{ declOfNum }}</span>
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
    },
    index: Number
  },
  computed: {
    declOfNum() {
      let titles = ["балл", "балла", "баллов"];
      return titles[
        this.user.rating % 10 === 1 && this.user.rating % 100 !== 11
          ? 0
          : this.user.rating % 10 >= 2 &&
            this.user.rating % 10 <= 4 &&
            (this.user.rating % 100 < 10 || this.user.rating % 100 >= 20)
          ? 1
          : 2
      ];
    },
    declOfAge() {
      let titles = ["год", "года", "лет"];
      return titles[
        this.user.age % 100 > 4 && this.user.age % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][this.user.age % 10 < 5 ? this.user.age % 10 : 5]
      ];
    },
    firstLettersOfName() {
      return `${this.user.name.charAt(0)} ${this.user.secondName.charAt(0)}`;
    },
    getRatePlace(){
      return this.$store.state.firstPlacesIds[this.user.id]
    }
  }
};
</script>

<style lang="scss">
.card {
  display: flex;
  align-items: center;
  padding: 10px 0;
  flex-wrap: wrap;
  &__item {
    margin: 0 15px;
    &--img {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      .img {
        margin: 0 30px;
        width: 60px;
        height: 60px;
        background: $l-green;
        color: white;
        font-weight: 700;
        font-size: 1.5rem;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        display: flex;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 70px;
          height: 70px;
          background: transparent;
          border: solid 2px transparent;
          border-radius: 50%;
          top: -7px;
          left: -7px;
        }
        &--color-gold {
          &:before {
            border-color: #ffd700;
          }
        }
        &--color-silver {
          &:before {
            border-color: #c0c0c0;
          }
        }
        &--color-bronze {
          &:before {
            border-color: #cd853f;
          }
        }
      }
    }
    &--info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1 1 350px;
      padding: 15px 0;
    }
  }
}
</style>