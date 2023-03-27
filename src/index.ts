import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";

const url = "https://wakatime.com/leaders?country_code=CM";
const AxiosInstance = axios.create();
const cvWriter = createObjectCsvWriter({
  path: "./users.csv",
  header: [
    { id: "index", title: "Rank" },
    { id: "programmer", title: "Programmer" },
    { id: "coded", title: "Hours Coded" },
    { id: "average", title: "Daily Average" },
    { id: "languages", title: "Languages Used" },
  ],
});

interface IUser {
  index: number;
  programmer: string;
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
      const programmer: string = $(elem).find("td > .leader-coder").text();
      const coded: string = $(elem).find("td.tcol").text();
      const average: string = $(elem).find("td.avgcol").text();
      const languages: string = $(elem).find("td.langcol").text();
      users.push({ index: i, programmer, coded, average, languages });
    });
    console.log(users);
    const jsonContent = JSON.stringify(users);
    cvWriter.writeRecords(users);
    fs.writeFile("./users.json", jsonContent, "utf8", (error) => {
      if (error) console.log(error);
    });
  })
  .catch(console.error);
