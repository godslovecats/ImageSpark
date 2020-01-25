<template>
  <div id="app">
    <div class="container">
      <div class="pagehead">
        <h1 class="">Рейтинг участников</h1>
        <div class="search-holder">
          <input v-model="search" class="search-holder__input" />
          <img
            class="search-holder__icon icon icon--action"
            src="./assets/search.svg"
          />
        </div>
      </div>
      
      <div>
<!--        <p @click="sortUsers">sort {{ sortAsc }}</p>-->
        <user v-for="(user, index) in users" :key="user.index" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import User from "./components/User.vue";
import Service from "./services/userService";

export default {
  name: "app",
  components: {
    User
  },
  data() {
    return {
      search: "",
      sortAsc: "",
      service: new Service(),
      users: []
    };
  },
  computed: {
    // users(){
    //   return this.service.getUsers()
    // }
  },
  watch: {
    search(value) {
      this.users = this.service.findUser(value);
    },
    sortAsc(value) {
      this.users = this.service.sortUsersByRate(value);
    }
  },
  created() {
    this.users = this.service.getUsers();
  },
  methods: {
    sortUsers() {
      this.sortAsc = !this.sortAsc;
    }
  }
};
</script>

<style lang="scss">
.pagehead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userlist {
 // padding: 35px 60px;
}
.search-holder {
  position: relative;
  &__input {
    width: 250px;
    height: 100%;
    padding: 10px 35px 3px 0;
    font-size: 1rem;
    box-sizing: border-box;
    border: none;
    background: transparent;
    border-bottom: solid 1px $l-gray;
    &:focus {
      outline: none;
      border-color: $green;
    }
  }
  &__icon {
    position: absolute;
    width: 24px;
    height: 24px;
    top: calc(50% - 12px);
    right: 5px;
  }
}
</style>
