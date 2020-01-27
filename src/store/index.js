import Vue from "vue";
import Vuex from "vuex";
const mockUsers = require("@/assets/users.json");

Vue.use(Vuex);

/**
 * Сортировка
 *
 * @param {Array} arr  - массив
 * @param {string} prop - параметр сортировки
 * @param {boolean} sortAsc - является ли тип сортировки 'ASC'
 */
let getSortedByProp = (arr, prop, sortAsc) =>
  !sortAsc
    ? arr.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]))
    : arr.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));

/**
 * Поиск
 *
 * @param {Array} arr  - массив
 * @param {string} val - значение поиска
 */
let getSearched = (arr, val) =>
  arr.filter(
    w =>
      Object.values(w).filter(v =>
        v
          .toString()
          .toLowerCase()
          .startsWith(val.toString().toLowerCase())
      ).length > 0
  );

export default new Vuex.Store({
  state: {
    users: mockUsers.users,
    orderIsAsc: true,
    orderBy: "rating",
    firstPlacesIds: ''
  },
  getters: {
    getOrderBy: state => state.orderBy,
    getOrderDirection: state => state.orderIsAsc,
    getFilteredUsers: state => filter =>
      !!filter ? getSearched(state.users, filter) : state.users
  },
  actions: {
    /**
     * Первая инициализация (отсортированный список юзеров по рейтингу)
     */
    init({ commit, state, dispatch }, data) {
      dispatch("updateUsers", {
        orderBy: state.orderBy,
        orderIsAsc: state.orderIsAsc
      });
      commit('setRatePlaces', {
        [state.users[0].id]: 'gold',
        [state.users[1].id]: 'silver',
        [state.users[2].id]: 'bronze'
      })
    },
    /**
     * Обновить параметр сортировки
     */
    updateOrderBy({ commit, state, dispatch }, data) {
      commit("setOrderBy", data);
      dispatch("updateUsers", {
        orderBy: state.orderBy,
        orderIsAsc: state.orderIsAsc
      });
    },
    /**
     * Обновить направление сортировки
     */
    updateOrderDirection({ commit, state, dispatch }, data) {
      commit("setOrderDirection", data);
      dispatch("updateUsers", {
        orderBy: state.orderBy,
        orderIsAsc: state.orderIsAsc
      });
    },
    /**
     * Обновить список юзеров
     */
    updateUsers({ commit, state, dispatch }, data) {
      let users = getSortedByProp(state.users, data.orderBy, data.orderIsAsc);
      commit("setUpdatedUsers", users);
    }
  },
  mutations: {
    setRatePlaces(state, data) {
      state.firstPlacesIds = data;
    },
    setOrderBy(state, orderBy) {
      state.orderBy = orderBy;
    },
    setOrderDirection(state, value) {
      state.orderIsAsc = value;
    },
    setUpdatedUsers(state, users) {
      state.users = users;
    }
  }
});
