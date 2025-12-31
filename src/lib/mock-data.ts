// Mock data for Speed and Love - used when TMDB API is not available
// This data is based on real information from TMDB and MyDramaList

import type { Show, Credits, Season, Episode, ShowImages, Video } from "@/types";

export const MOCK_SHOW: Show = {
  id: 279041,
  tmdbId: 279041,
  mdlSlug: "760405-shuang-gui",
  name: "Speed and Love",
  originalName: "双轨",
  tagline: "Racing hearts, fighting spirits",
  overview:
    "After her parents' divorce separates her from her beloved adopted brother, a young woman moves to Thailand to find him, discovering he's now a street racer and underground fighter. As she tries to reconnect with him, they must navigate the dangerous world of illegal racing while confronting their complicated feelings for each other.",
  posterPath: "/placeholder-poster.jpg",
  backdropPath: "/placeholder-backdrop.jpg",
  firstAirDate: "2025-12-12",
  lastAirDate: "2025-12-22",
  status: "Ended",
  numberOfEpisodes: 29,
  numberOfSeasons: 1,
  episodeRunTime: [45],
  genres: [
    { id: 18, name: "Drama" },
    { id: 10759, name: "Action & Adventure" },
    { id: 10749, name: "Romance" },
  ],
  networks: [
    {
      id: 1024,
      name: "iQIYI",
      logoPath: "/iqiyi-logo.png",
      originCountry: "CN",
    },
  ],
  productionCountries: [
    { iso31661: "CN", name: "China" },
    { iso31661: "TH", name: "Thailand" },
  ],
  spokenLanguages: [
    { iso6391: "zh", name: "普通话", englishName: "Mandarin" },
    { iso6391: "th", name: "ภาษาไทย", englishName: "Thai" },
  ],
  ratings: {
    tmdb: {
      score: 7.7,
      maxScore: 10,
      voteCount: 156,
      source: "tmdb",
    },
    mdl: {
      score: 8.5,
      maxScore: 10,
      voteCount: 7146,
      source: "mydramalist",
    },
    imdb: {
      score: 8.2,
      maxScore: 10,
      voteCount: 892,
      source: "imdb",
    },
  },
};

export const MOCK_CREDITS: Credits = {
  cast: [
    {
      id: 1,
      name: "Yu Shuxin",
      originalName: "虞书欣",
      character: "Jiang Mu",
      profilePath: "/esther-yu.jpg",
      order: 0,
      knownForDepartment: "Acting",
    },
    {
      id: 2,
      name: "He Yu",
      originalName: "何与",
      character: "Jin Zhao",
      profilePath: "/he-yu.jpg",
      order: 1,
      knownForDepartment: "Acting",
    },
    {
      id: 3,
      name: "Fei Qiming",
      originalName: "费启鸣",
      character: "San Lai",
      profilePath: "/fei-qiming.jpg",
      order: 2,
      knownForDepartment: "Acting",
    },
    {
      id: 4,
      name: "Mike Angelo",
      originalName: "Mike Angelo",
      character: "Lin Sui",
      profilePath: "/mike-angelo.jpg",
      order: 3,
      knownForDepartment: "Acting",
    },
    {
      id: 5,
      name: "Sun Meilin",
      originalName: "孙美林",
      character: "Wan Qing",
      profilePath: "/sun-meilin.jpg",
      order: 4,
      knownForDepartment: "Acting",
    },
    {
      id: 6,
      name: "Luan Yuanhui",
      originalName: "栾元晖",
      character: "Jin Qiang",
      profilePath: "/luan-yuanhui.jpg",
      order: 5,
      knownForDepartment: "Acting",
    },
  ],
  crew: [
    {
      id: 100,
      name: "Yu Chung-chung",
      originalName: "余中中",
      job: "Director",
      department: "Directing",
      profilePath: null,
    },
    {
      id: 101,
      name: "Zhao Xiaolei",
      originalName: "赵小雷",
      job: "Director",
      department: "Directing",
      profilePath: null,
    },
  ],
};

export const MOCK_EPISODES: Episode[] = Array.from({ length: 29 }, (_, i) => ({
  id: 1000 + i,
  name: `Episode ${i + 1}`,
  overview:
    i === 0
      ? "Jiang Mu travels to Thailand to find her adopted brother Jin Zhao, only to discover he has become a street racer and underground fighter."
      : `Jiang Mu and Jin Zhao continue their journey as they navigate the dangerous world of street racing and their complicated feelings.`,
  episodeNumber: i + 1,
  seasonNumber: 1,
  airDate: new Date(2025, 11, 12 + Math.floor(i / 3))
    .toISOString()
    .split("T")[0],
  runtime: 45,
  stillPath: null,
  voteAverage: 7.5 + Math.random() * 2,
  voteCount: Math.floor(50 + Math.random() * 100),
}));

export const MOCK_SEASONS: Season[] = [
  {
    id: 1,
    name: "Season 1",
    overview:
      "The complete story of Jiang Mu and Jin Zhao's reunion in Thailand.",
    seasonNumber: 1,
    episodeCount: 29,
    airDate: "2025-12-12",
    posterPath: null,
    episodes: MOCK_EPISODES,
  },
];

export const MOCK_IMAGES: ShowImages = {
  backdrops: Array.from({ length: 6 }, (_, i) => ({
    filePath: `/backdrop-${i + 1}.jpg`,
    aspectRatio: 1.778,
    width: 1920,
    height: 1080,
    voteAverage: 5 + Math.random() * 3,
    voteCount: Math.floor(10 + Math.random() * 50),
  })),
  posters: Array.from({ length: 4 }, (_, i) => ({
    filePath: `/poster-${i + 1}.jpg`,
    aspectRatio: 0.667,
    width: 500,
    height: 750,
    voteAverage: 5 + Math.random() * 3,
    voteCount: Math.floor(10 + Math.random() * 50),
  })),
  logos: [],
};

export const MOCK_VIDEOS: Video[] = [
  {
    id: "trailer-1",
    key: "dQw4w9WgXcQ", // Placeholder YouTube key
    name: "Speed and Love - Official Trailer",
    site: "YouTube",
    type: "Trailer",
    official: true,
    publishedAt: "2025-11-20T00:00:00.000Z",
  },
  {
    id: "teaser-1",
    key: "dQw4w9WgXcQ",
    name: "Speed and Love - Teaser",
    site: "YouTube",
    type: "Teaser",
    official: true,
    publishedAt: "2025-11-15T00:00:00.000Z",
  },
];
