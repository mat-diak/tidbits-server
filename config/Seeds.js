const premadeTask = require("../models/premadeTaskModel");
const connectDB = require("./db");
const dotenv = require("dotenv").config();
const colors = require("colors");

const seedPremadeTasks = [
  {
    text: "Dr Says: Yoga for people who sit all day",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "Full Body Flow with Adriene",
        url: "https://www.youtube.com/watch?v=b1H3xO3x_Js",
      },
      {
        name: "Yoga for Low Back and Hamstrings",
        url: "https://www.youtube.com/watch?v=fEaUDEcbqw8",
      },
      {
        name: "Beginners Routine",
        url: "https://www.youtube.com/watch?v=8QE8gQ2qEwA",
      },
    ],
  },
  {
    text: "Dr Says: HIIT workout once per day",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "20 min Home HIIT Workout",
        url: "https://www.youtube.com/watch?v=Mvo2snJGhtM",
      },
      {
        name: "30 min HIIT Cardio Workout",
        url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      },
      {
        name: "30 min Calorie Killer HIIT Workout",
        url: "https://www.youtube.com/watch?v=jpizoUy4K9s",
      },
    ],
  },
  {
    text: "Listen: 2 daily news options",
    targetReps: 2,
    completedReps: 0,
    options: [
      {
        name: "The Daily",
        url: "https://open.spotify.com/episode/1oojFMAYDHWp0uWpxr6QUy?si=2b0bd5de3dc24b26",
      },
      {
        name: "Global News Podcast BBC",
        url: "https://open.spotify.com/episode/7k1wgncSxsfzAkpuDiPeGi?si=5ab15faa8f654e8d",
      },
    ],
  },
  {
    text: "Read: 2 news articles on politics",
    targetReps: 2,
    completedReps: 0,
    options: [
      {
        name: "British politics is degraded by bullies and liars",
        url: "https://www.theguardian.com/politics/2022/mar/09/its-not-just-john-bercow-british-politics-is-degraded-by-bullies-and-liars",
      },
      {
        name: "Pacifists are being elbowed out of British politics just when we need them most",
        url: "https://www.theguardian.com/commentisfree/2022/mar/03/pacifists-british-politics-anti-war-putin-ukraine-crisis",
      },
    ],
  },
  {
    text: "Watch: news highlights for the day",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "Sky News Live",
        url: "https://www.youtube.com/watch?v=9Auq9mYxFEE",
      },
      {
        name: "ABC News Live",
        url: "https://www.youtube.com/watch?v=w_Ma8oQLmSM",
      },
    ],
  },
  {
    text: "Recipe: get one vegetarian recipe ",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "Vegetarian Lasagna",
        url: "https://www.recipetineats.com/vegetarian-lasagna/",
      },
    ],
  },
  {
    text: "Read: 3 news articles on sports",
    targetReps: 3,
    completedReps: 0,
    options: [
      {
        name: "Rangnick turns to sports psychologist to end Manchester United’s drawing habit",
        url: "https://www.theguardian.com/football/2022/feb/14/rangnick-turns-to-sports-psychologist-to-end-manchester-uniteds-drawing-habit",
      },
      {
        name: "Pressure on Super Netball to thrive as Fox Sports plays participation card",
        url: "https://www.theguardian.com/sport/2022/feb/28/pressure-on-super-netball-to-thrive-as-fox-sports-plays-participation-card",
      },
      {
        name: "What lay behind Mexico’s brutal football riot?",
        url: "https://www.theguardian.com/football/2022/mar/07/mexico-football-riot-liga-mx-queretaro-v-atlas-soccer",
      },
    ],
  },
  {
    text: "Read: 5 news articles on shares",
    targetReps: 5,
    completedReps: 0,
    options: [
      {
        name: "Greggs warns of price rises as commodity costs soar",
        url: "https://www.theguardian.com/business/2022/mar/08/greggs-warns-of-price-rises-as-commodity-costs-soar",
      },
      {
        name: "AGL rejects higher bid",
        url: "https://www.theguardian.com/business/2022/mar/06/agl-rejects-higher-bid-from-mike-cannon-brookes-and-brookfield-potentially-ending-takeover-push",
      },
      {
        name: "Republicans and Democrats find rare bipartisanship",
        url: "https://www.theguardian.com/us-news/2022/feb/22/us-politicians-trading-stocks-bipartisan-idea",
      },
      {
        name: "TechScape: Is Elon Musk really being bullied?",
        url: "https://www.theguardian.com/technology/2022/mar/09/lawsuits-and-investigations-plague-tesla-but-profits-keep-rising",
      },
      {
        name: "Global shares tumble",
        url: "https://www.theguardian.com/business/live/2022/mar/04/shares-tumble-attack-ukraine-nuclear-plant-business-live",
      },
    ],
  },
  {
    text: "Recipe: get one healthy burger  recipe ",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "Veggie Burger",
        url: "https://www.recipetineats.com/veggie-burgers/",
      },
    ],
  },
  {
    text: "Read: 2 opinion pieces",
    targetReps: 2,
    completedReps: 0,
    options: [
      {
        name: "British politics is degraded by bullies and liars",
        url: "https://www.theguardian.com/lifeandstyle/2022/mar/09/a-moment-that-changed-me-walked-into-bookies-won-72-in-12-seconds-life-never-the-same",
      },
      {
        name: "Lockdown puppy boom",
        url: "https://www.theguardian.com/lifeandstyle/2022/mar/09/new-dogs-new-tricks-lockdown-puppy-boom-changes-face-of-crufts-2022",
      },
    ],
  },
  {
    text: "Dr Says: 1 full body workout",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "Daily Workout Routine",
        url: "https://www.youtube.com/watch?v=KrY2Kv_BYKo",
      },
    ],
  },
  {
    text: "Listen: to a motivational podcast",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "How I Built This: Goodreads with Guy Raz",
        url: "https://open.spotify.com/episode/1OPzCiwYiGYkeSgoNhEK95?si=d7b28c596dc34ab5",
      },
      {
        name: "How I Built This: KAYAK with Guy Raz",
        url: "https://open.spotify.com/episode/5YpxSR41IerA6FLhRAoTgt?si=36684adaf99341b2",
      },
    ],
  },
  {
    text: "Listen: to a business podcast",
    targetReps: 1,
    completedReps: 0,
    options: [
      {
        name: "The Diary of a CEO with Steven Bartlett",
        url: "https://open.spotify.com/episode/4xggoFLbo92H0RDn4NtkWA?si=549bb8bef00047f7",
      },
      {
        name: "Uber's 1st Super App on Snacks Daily",
        url: "https://open.spotify.com/episode/1MGOFk4wYG2ThnfJrRrBHm?si=7c6c1275d1de4101",
      },
    ],
  },
];

const addSeedDB = async () => {
  await premadeTask.deleteMany({});
  await premadeTask.insertMany(seedPremadeTasks);
};

module.exports = addSeedDB;
