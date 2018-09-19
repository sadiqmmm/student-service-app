const loggedIn = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
  },
  signout(cb) {
    this.isAuthenticated = false;
  }
};

export default loggedIn;
