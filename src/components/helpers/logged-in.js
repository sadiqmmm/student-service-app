import "babel-polyfill";
import axios from "axios";

export default async function checkLoginStatus() {
  return await axios
    .get(`https://api.devcamp.space/logged_in`, { withCredentials: true })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
