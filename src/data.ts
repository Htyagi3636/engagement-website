/**
 * =============================================================================
 * RETRO CINEMA ENGAGEMENT CONFIGURATION: "Shivani & Harshvardhan"
 * =============================================================================
 * 
 * HOW TO ADD A NEW PHOTO:
 * 1. Place your image file in `public/photos/` (e.g. `public/photos/my-photo.jpg`)
 * 2. Add an entry to the `galleryPhotos` array below:
 *      {
 *        id: "plate-15",
 *        plateNumber: "Plate No. 15",
 *        title: "Under The Moonlight",
 *        caption: "A quiet moment shared away from the crowd.",
 *        src: "./photos/my-photo.jpg",
 *        badge: "Candid", // optional badge tag
 *        tilt: -1.2,       // optional slight tilt degrees (-2 to 2)
 *      }
 * 3. Save this file — the photo will automatically appear with vintage frames,
 *    hover animations, full-screen lightbox support, and responsive masonry!
 * 
 * HOW TO ADD OR EDIT A SONG:
 * Add an object to `musicPlaylist`:
 *      {
 *        title: "Song Name",
 *        film: "Movie Title",
 *        year: "1975",
 *        youtubeId: "YOUTUBE_VIDEO_ID" // e.g. the ID from youtube.com/watch?v=ID
 *      }
 * =============================================================================
 */

export interface GalleryPhoto {
  id: string;
  plateNumber: string;
  title: string;
  caption: string;
  src: string;
  badge?: string;
  tilt?: number;
}

export interface StoryMilestone {
  act: string;
  title: string;
  quote: string;
  note?: string;
  badge?: string;
  isMemoryCard?: boolean;
  cardTitle?: string;
  cardSubtitle?: string;
  cardQuote?: string;
  photoUrl?: string;
  tilt?: number;
}

export interface FilmReelItem {
  id: string;
  tag: string;
  title: string;
  src: string;
}

export interface SongTrack {
  title: string;
  film: string;
  year: string;
  youtubeId: string;
}

export const siteConfig = {
  couple: {
    bride: "Shivani",
    groom: "Harshvardhan",
    monogram: "S ♥ H",
    stampCode: "REG. MONOGRAM NO. SH-1974-VAL",
    heroBanner: "The Royal Engagement",
    heroTagline: "A Grand 70mm Love Story — Now Showing",
    productionHouse: "HARI SANGEET & VENUS FILMS PRESENT",
    heroImage: "./photos/hero.jpg",
    credits: {
      music: "R.D. Burman",
      directedBy: "Destiny",
      producedBy: "Two Families",
      year: "1970",
      premiereLabel: "CINEMA PREMIERE"
    }
  },
  
  wedding: {
    displayDate: "15TH FEBRUARY 2027",
    targetIsoDate: "2027-02-15T18:30:00",
    venueCity: "Juhu, Mumbai",
    shubhMuhuratLabel: "SHUBH MUHURAT",
    countdownSubtitle: "Mechanical split-cards advancing toward the wedding day."
  },

  romanticQuote: {
    verses: [
      "Tere bina zindagi se koi, shikwa, to nahi...",
      "Tere bina zindagi bhi lekin, zindagi to nahi."
    ],
    reflection: "Like a melody composed by legendary masters, our two souls synchronized into an everlasting evergreen song.",
    signoff: "FROM HARSHVARDHAN TO SHIVANI"
  },

  loveLetter: {
    envelopeTo: "SHIVANI & HARSHVARDHAN",
    envelopeAddress: "Suite 1974, Love Lane, Juhu",
    postmark: "G.P.O. 1974 BOMBAY",
    sealText: "S & H",
    sealSubtext: "BREAK SEAL",
    heading: "A Handwritten Letter",
    subheading: "Tap the wax monogram seal to break and unroll.",
    paragraphs: [
      "My Dearest Shivani,",
      "From the very first bite of spicy chole kulche on that unforgettable afternoon to the dazzling night under golden chandeliers where our eyes locked, every second with you feels like a classic 70mm cinema masterpiece scripted by fate itself.",
      "You are the quiet melody that hums through the chaos of everyday life, the golden warmth in every frame, and the soulful rhythm to my favourite R.D. Burman tunes. In a world that races at ninety miles an hour, you make time pause into pure technicolor magic.",
      "Here is to every laugh we have yet to share, every quiet glance across crowded rooms, and the lifetime of love that officially begins today.",
      "Forever yours in this lifetime and the next,",
      "Harshvardhan ♥"
    ]
  }
};

/**
 * ARCHIVED MILESTONES
 * Rendered as tilted polaroids and vintage parchment memo cards with washi tape.
 */
export const storyMilestones: StoryMilestone[] = [
  {
    act: "ACT I: THE GRAND FOG & BUBBLE SYMPHONY",
    title: "The Grand Entrance",
    quote: '"Stepping into forever amidst floating clouds, glistening bubbles, and starry spotlights."',
    note: "✨ TAP PHOTO TO POP SHIMMERING BUBBLES",
    badge: "Bubble Shower",
    photoUrl: "./photos/milestone-1.jpg",
    tilt: -1.5
  },
  {
    act: "ACT II: THE SACRED GOLDEN RING EXCHANGE",
    title: "Vows of Devotion",
    quote: '"With eyes locked and hearts united, exchanging golden vows of eternal devotion."',
    photoUrl: "./photos/milestone-2.jpg",
    tilt: 1.2
  },
  {
    act: "ACT III: HATHPHOOL, MEHNDI & CLASPED HANDS",
    title: "Warm Embrace",
    quote: '"Intricate henna swirls and sparkling bangles sealed in a warm, unbreakable embrace."',
    photoUrl: "./photos/milestone-3.jpg",
    tilt: -0.8
  },
  {
    act: "ACT IV: THE LEGENDARY CHOLE KULCHE DATE",
    title: "Where It All Began",
    quote: '"Spicy bites, laughter, and romance that sparked our journey."',
    isMemoryCard: true,
    cardTitle: "CHOLE KULCHE CHRONICLES",
    cardSubtitle: "FIRST DATE MEMORY",
    cardQuote: '"Where love blossomed over street-style spicy kulchas and endless sweet laughter."',
    tilt: 1.0
  },
  {
    act: "ACT V: FAMILY BLESSINGS ON THE ROYAL THRONE",
    title: "Royal Throne",
    quote: '"Surrounded by warmth, elders\' blessings, and joyous family smiles."',
    photoUrl: "./photos/milestone-5.jpg",
    tilt: -1.2
  }
];

/**
 * 35MM CELLULOID REEL
 * Horizontal unspooled celluloid film strip with authentic sprocket perforations.
 */
export const filmReelItems: FilmReelItem[] = [
  {
    id: "reel-101",
    tag: "KODAK 400 • #101",
    title: "Bubble Dance",
    src: "./photos/plate-01.jpg"
  },
  {
    id: "reel-102",
    tag: "KODAK 400 • #102",
    title: "Cloud Walk",
    src: "./photos/plate-02.jpg"
  },
  {
    id: "reel-103",
    tag: "KODAK 400 • #103",
    title: "Golden Vows",
    src: "./photos/plate-03.jpg"
  },
  {
    id: "reel-104",
    tag: "KODAK 400 • #104",
    title: "Regal Aisle",
    src: "./photos/plate-04.jpg"
  },
  {
    id: "reel-105",
    tag: "KODAK 400 • #105",
    title: "Gajra & Grace",
    src: "./photos/plate-07.jpg"
  },
  {
    id: "reel-106",
    tag: "KODAK 400 • #106",
    title: "Royal Throne",
    src: "./photos/plate-12.jpg"
  }
];

/**
 * ARCHIVAL GALLERY (All 14 Plates from the design)
 * Automatic masonry layout, sepia-to-color transition, and full-screen lightbox.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "plate-01",
    plateNumber: "Plate No. 01",
    title: "The Bubble Symphony Walk",
    caption: "Stepping hand-in-hand through a magical cascade of glistening soap bubbles and stage fog.",
    src: "./photos/plate-01.jpg",
    badge: "Bubbles",
    tilt: -1.4
  },
  {
    id: "plate-02",
    plateNumber: "Plate No. 02",
    title: "Boundless Laughter",
    caption: "Joyous moments shared together under the marigold and lily floral canopy.",
    src: "./photos/plate-02.jpg",
    tilt: 1.1
  },
  {
    id: "plate-03",
    plateNumber: "Plate No. 03",
    title: "The Sacred Golden Ring Exchange",
    caption: "Clasped hands, intricate mehendi, and the golden band that marks forever.",
    src: "./photos/plate-03.jpg",
    tilt: -0.9
  },
  {
    id: "plate-04",
    plateNumber: "Plate No. 04",
    title: "The Royal Ballroom Procession",
    caption: "Walking the royal red carpet flanked by cheers and crystal chandeliers.",
    src: "./photos/plate-04.jpg",
    tilt: 1.5
  },
  {
    id: "plate-05",
    plateNumber: "Plate No. 05",
    title: "Shimmering Stage Smiles",
    caption: "Warm smiles on stage as family shower their loving blessings.",
    src: "./photos/plate-05.jpg",
    badge: "Bubbles",
    tilt: -1.2
  },
  {
    id: "plate-06",
    plateNumber: "Plate No. 06",
    title: "Solemn Vows & Eternal Devotion",
    caption: "Exchanging engagement rings surrounded by both proud sets of parents.",
    src: "./photos/plate-06.jpg",
    tilt: 0.8
  },
  {
    id: "plate-07",
    plateNumber: "Plate No. 07",
    title: "Radiant Bride Shivani",
    caption: "Shivani looking breathtaking with floral gajra, maang tikka, and an unforgettable smile.",
    src: "./photos/plate-07.jpg",
    tilt: -1.3
  },
  {
    id: "plate-08",
    plateNumber: "Plate No. 08",
    title: "The Groom's Adoring Glance",
    caption: "Harshvardhan's eyes filled with pride and quiet adoration.",
    src: "./photos/plate-08.jpg",
    tilt: 1.4
  },
  {
    id: "plate-09",
    plateNumber: "Plate No. 09",
    title: "Candid Elegance",
    caption: "A candid silhouette under the grand ballroom chandeliers.",
    src: "./photos/plate-09.jpg",
    tilt: -1.0
  },
  {
    id: "plate-10",
    plateNumber: "Plate No. 10",
    title: "Golden Jali Splendor",
    caption: "Framed against the ornate vintage Indian architectural backdrop.",
    src: "./photos/plate-10.jpg",
    tilt: 1.2
  },
  {
    id: "plate-11",
    plateNumber: "Plate No. 11",
    title: "Brothers & Companions",
    caption: "Lively camaraderie and laughter with close brothers and companions.",
    src: "./photos/plate-11.jpg",
    tilt: -1.5
  },
  {
    id: "plate-12",
    plateNumber: "Plate No. 12",
    title: "Blessings on the Throne",
    caption: "Elders placing hands of blessing on the newly engaged couple.",
    src: "./photos/plate-12.jpg",
    tilt: 0.9
  },
  {
    id: "plate-13",
    plateNumber: "Plate No. 13",
    title: "Shivani & Her Siblings",
    caption: "Cherished laughter and heartfelt embraces with sisters and cousins.",
    src: "./photos/plate-13.jpg",
    tilt: -1.1
  },
  {
    id: "plate-14",
    plateNumber: "Plate No. 14",
    title: "Two Families United",
    caption: "The united family portrait celebrating the harmonious union of two souls.",
    src: "./photos/plate-14.jpg",
    tilt: 1.3
  }
];

/**
 * EXTRA GALLERY PHOTOS
 * Exact file names in public/photos. To add a photo later:
 * upload it to public/photos and add its file name to this list.
 */
export const extraPhotoFiles: string[] = [
  "more (1).jpg",
  "more (2).jpeg",
  "more (2).jpg",
  "more (3).jpg",
  "more (4).jpg",
  "more (5).jpg",
  "more (6).jpg",
  "more (7).jpg",
  "more (8).jpg",
  "more (9).jpg",
  "more (10).jpg",
  "more (11).jpg",
  "more (12).jpg",
  "more (13).jpg",
  "more (14).jpg",
  "more (15).jpg",
  "more (16).jpg",
  "more (17).jpg",
  "more (18).jpg",
  "more (19).jpg",
  "more (20).jpg",
  "more (21).jpg",
  "more (22).jpg",
  "more (23).jpg",
  "more (24).jpg",
  "more (25).jpg",
  "more (26).jpg",
  "more (27).jpg",
  "more (28).jpg",
  "more (29).jpg",
  "more (30).jpg",
  "more (31).jpg",
  "more (32).jpg",
  "more (33).jpg",
  "more (34).jpg",
  "more (35).jpg",
  "more (36).jpg",
  "more (37).jpg",
  "more (38).jpg",
  "more (39).jpg",
  "more (40).jpg",
  "more (41).jpg",
  "more (42).jpg",
  "more (43).jpg",
  "more (44).jpg",
  "more (45).jpg",
  "more (46).jpg",
  "more (47).jpg",
  "more (48).jpg",
  "more (49).jpg",
  "more (51).jpg",
  "more (52).jpg",
  "more (53).jpg",
  "more (54).jpg",
  "more (55).jpg",
  "more (56).jpg",
  "more (57).jpg",
  "more (58).jpg",
  "more (59).jpg",
  "more (60).jpg",
  "more (61).jpg",
  "more (62).jpg",
  "more (63).jpg",
  "more (64).jpg",
  "more (65).jpg",
  "more (66).jpg",
  "more (67).jpg",
  "more (68).jpg",
  "more (69).jpg",
  "more (70).jpg",
  "more (71).jpg",
  "more (72).jpg",
  "more (73).jpg",
  "more (74).jpg",
  "more (75).jpg",
  "more (76).jpg",
  "more (77).jpg",
  "more (78).jpg",
  "more (79).jpg",
  "more (80).jpg",
  "more (81).jpg",
  "more (82).jpg",
  "more (83).jpg",
  "more (84).jpg",
  "more (85).jpg",
  "more (86).jpg",
  "more (87).jpg",
  "more (88).jpg",
  "more (89).jpg",
  "more (90).jpg",
  "more (91).jpg",
  "more (92).jpg",
  "more (93).jpg",
  "more (94).jpg",
  "more (95).jpg",
  "more (96).jpg",
  "more (97).jpg",
  "more (98).jpeg",
];

const extraPhotos: GalleryPhoto[] = extraPhotoFiles.map((file, i) => ({
  id: `extra-${i + 1}`,
  plateNumber: `Plate No. ${15 + i}`,
  title: "Cherished Moment",
  caption: "",
  src: encodeURI(`./photos/${file}`),
  tilt: i % 2 === 0 ? -1.1 : 1.1,
}));

galleryPhotos.push(...extraPhotos);



/**
 * MUSIC PLAYLIST (R.D. Burman Classics)
 * Hidden YouTube IFrame Audio player with gramophone / vinyl UI.
 */
export const musicPlaylist: SongTrack[] = [
  {
    title: "Tere Bina Zindagi Se",
    film: "Aandhi",
    year: "1975",
    youtubeId: "jXlCgLh44vQ"
  },
  {
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    film: "Yaadon Ki Baaraat",
    year: "1973",
    youtubeId: "Gg636E5N120"
  },
  {
    title: "O Mere Dil Ke Chain",
    film: "Mere Jeevan Saathi",
    year: "1972",
    youtubeId: "uJvYw62gB60"
  }
];
