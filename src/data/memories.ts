export interface Memory {
  id: string;
  title: string;
  lat: number;
  lng: number;
  images: string[];
  text: string;
  audio?: string;
  spotifyTrackId?: string;
  date?: string;
}

// Your memories - add more below!
// Place your images in /public/images/ and audio in /public/audio/
export const memories: Memory[] = [
  {
    id: "1",
    title: "Old Scona SU — Where It All Began",
    lat: 53.5351,
    lng: -113.4938,
    images: [
      "/images/image.png",
    ],
    text: "Old Scona SU — where it all began and where I knew I had a best friend. We were so young (not that we still aren't) and I am so glad that I met you when I did because it forever changed the trajectory of my life. I don't know where I would be without you. You taught me what it meant to be loved and cared for.",
    spotifyTrackId: "13HVjjWUZFaWilh2QUJKsP",
    date: "September 2020",
  },
];
