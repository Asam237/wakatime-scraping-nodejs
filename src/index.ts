import axios from "axios";
const url = "https://wakatime.com/leaders?country_code=CM";
const AxiosInstance = axios.create();
AxiosInstance.get(url)
  .then((response) => {
    const html = response.data;
    console.log(html);
  })
  .catch(console.error);
