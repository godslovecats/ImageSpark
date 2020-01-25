const mockUsers = require("../assets/users.json");


function User(item) {
  this.id = item.id;
  this.name = item.name;
  this.secondName = item.secondName;
  this.age = item.age;
  this.rating = item.rating;
}

export default class userService {
  constructor() {
    this.users = mockUsers.users || [];
  }
  getUsers() {
    return this.users 
  }
  sortUsersByRate(sortAsc) {
      if(!sortAsc){
        return this.users.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
      } else {
          return this.users.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      }
  }
  findUser(str) {
      if(str){
          return [...this.findUserByName(str), ...this.findUserBySecondName(str)]   
      } else {
          return this.users
      }
  }
  findUserByName(str) {
    return this.users.filter(el =>
      el.name
        .toString()
        .toLowerCase()
        .startsWith(str.toLowerCase())
    );
  }
  findUserBySecondName(str) {
    return this.users.filter(el =>
      el.secondName
        .toString()
        .toLowerCase()
        .startsWith(str.toLowerCase())
    );
  }
}