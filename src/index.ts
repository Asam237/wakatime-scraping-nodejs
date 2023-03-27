import axios from "axios";
import cheerio from "cheerio";
const url = "https://wakatime.com/leaders?country_code=CM";
const AxiosInstance = axios.create();

interface IUser {
  index: number;
  name: string;
  coded: string;
  average: string;
  languages: string;
}

AxiosInstance.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const usersRow = $(".leaders > tbody > tr");
    const users: IUser[] = [];
    usersRow.each((i, elem) => {
      const name: string = $(elem).find("td > .leader-coder").text();
      const coded: string = $(elem).find("td.tcol").text();
      const average: string = $(elem).find("td.avgcol").text();
      const languages: string = $(elem).find("td.langcol").text();
      users.push({ index: i, name, coded, average, languages });
    });
    console.log(users);
  })
  .catch(console.error);
