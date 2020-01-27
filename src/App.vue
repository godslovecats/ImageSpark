<template>
  <div id="app">
    <div class="container">
      <div class="page-header">
        <h1 class="title">Рейтинг участников</h1>
        <div class="search">
          <input v-model="search" />
          <img class="icon" src="./assets/search.svg" />
        </div>
      </div>

      <div class="sort">
        <span>Сортировать: </span>
        <div
          v-for="(type, index) in sortTypes"
          :key="type.index"
          class="sort__item"
          :class="{ 'sort__item--active': type.prop === sortBy }"
          @click="sort(type.prop)"
        >
          <span>{{ type.name }}</span>
          <img
            v-if="type.prop === sortBy"
            class="icon"
            :class="{ 'icon--up': !sortIsAsc }"
            src="./assets/arrow.svg"
          />
        </div>
      </div>

      <div class="content">
        <user
          v-for="(user, index) in users"
          :key="user.index"
          :user="user"
          :index="index + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import User from "./components/User.vue";

export default {
  name: "app",
  components: {
    User
  },
  data() {
    return {
      search: "",
      sortTypes: [
        {
          name: "По рейтингу",
          prop: "rating"
        },
        {
          name: "По возрасту",
          prop: "age"
        }
      ]
    };
  },
  computed: {
    users() {
      return this.$store.getters.getFilteredUsers(this.search);
    },
    sortBy: {
      set(orderBy) {
        this.$store.dispatch("updateOrderBy", orderBy);
      },
      get() {
        return this.$store.getters.getOrderBy;
      }
    },
    sortIsAsc: {
      set(value) {
        this.$store.dispatch("updateOrderDirection", value);
      },
      get() {
        return this.$store.getters.getOrderDirection;
      }
    }
  },
  created() {
    this.$store.dispatch("init");
  },
  methods: {
    sort(prop) {
      if (prop === this.sortBy) {
        this.sortIsAsc = !this.sortIsAsc;
      } else {
        this.sortBy = prop;
        this.sortIsAsc = true;
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  max-width: 990px;
  padding: 0 5px;
  margin: auto;
}
.content {
  padding: 0 15px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 15px 0;
  .title {
    flex: 1 1 60%;
  }
}

.icon {
  opacity: 0.5;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: absolute;
  top: calc(50% - 12px);
  right: 5px;
  &:hover {
    opacity: 1;
  }
}

.search {
  position: relative;
  flex: 1 1 auto;
  input {
    width: 100%;
    min-width: 250px;
    padding: 10px 35px 3px 0;
    font-size: 1rem;
    box-sizing: border-box;
    border: none;
    background: transparent;
    border-bottom: solid 1px $l-gray;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      border-bottom: solid 1px $h-gray;
    }
  }
}
.sort {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__item {
    padding: 0 30px;
    display: flex;
    align-items: center;
    color: $l-gray;
    cursor: pointer;
    position: relative;
    .icon {
      transition: transform 0.2s ease-in-out;
      vertical-align: middle;
      &--up {
        transform: rotate(180deg);
      }
    }
    &--active {
      color: $green;
      font-weight: 700;
    }
  }
}
</style>
