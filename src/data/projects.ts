import type { Lang } from './content';
type Bilingual = Record<Lang, string>;
export type Project = {
  id: 'piano-app' | 'neon-riot';
  title: Bilingual;
  category: Bilingual;
  description: Bilingual;
  focus: Bilingual;
  status: Bilingual;
  tools: string[];
  url: string | null;
  linkLabel: Bilingual | null;
  secondaryLink?: { url: string; label: Bilingual };
};

export const projects: Project[] = [
  {
    id: 'piano-app',
    title: { en: 'Piano practice application', el: 'Εφαρμογή εξάσκησης πιάνου' },
    category: { en: 'Native Android · Music software', el: 'Εφαρμογή Android · Μουσικό λογισμικό' },
    status: { en: 'In development · Android build', el: 'Σε ανάπτυξη · Έκδοση Android' },
    description: { en: 'I am building a piano practice application in Kotlin and Jetpack Compose, with English and Greek interfaces. A shared practice engine connects generated exercises and imported songs with falling notes, a keyboard view, staff notation, tempo controls and section loops. Listen, play-along and wait modes support different ways of working through a piece.', el: 'Αναπτύσσω μια εφαρμογή εξάσκησης πιάνου σε Kotlin και Jetpack Compose, με περιβάλλον στα ελληνικά και στα αγγλικά. Μια κοινή μηχανή εξάσκησης συνδέει τις παραγόμενες ασκήσεις και τα εισαγόμενα κομμάτια με κινούμενες νότες, πληκτρολόγιο, πεντάγραμμο, ρύθμιση τέμπο και επανάληψη αποσπασμάτων. Υπάρχουν λειτουργίες ακρόασης, παράλληλης εξάσκησης και αναμονής για τη σωστή νότα.' },
    focus: { en: 'The project brings together touch and USB MIDI input, audio synthesis, custom Canvas rendering and local song storage. Import tools cover MIDI and MusicXML, alongside automatic reading from PDFs and recordings. These readings are presented as estimates to review. I am continuing to refine the hand guides and import tools; this is an ongoing project, with no public app release yet.', el: 'Το έργο συνδυάζει είσοδο αφής και USB MIDI, σύνθεση ήχου, σχεδίαση με Canvas και τοπική αποθήκευση κομματιών. Τα εργαλεία εισαγωγής καλύπτουν MIDI και MusicXML, καθώς και αυτόματη ανάγνωση PDF και ηχογραφήσεων. Τα αυτόματα αποτελέσματα παρουσιάζονται ως εκτιμήσεις που χρειάζονται έλεγχο. Συνεχίζω τη βελτίωση των οδηγών χεριών και των εργαλείων εισαγωγής· η εφαρμογή παραμένει σε ανάπτυξη, χωρίς δημόσια κυκλοφορία.' },
    tools: ['Kotlin', 'Jetpack Compose', 'Android Canvas', 'MIDI', 'Audio processing'],
    url: null,
    linkLabel: null,
  },
  {
    id: 'neon-riot',
    title: { en: 'Neon Riot', el: 'Neon Riot' },
    category: { en: 'Browser game · Interactive development', el: 'Παιχνίδι στον browser · Διαδραστική ανάπτυξη' },
    status: { en: 'In development · Playable web build', el: 'Σε ανάπτυξη · Παιχνίδι διαθέσιμο στον browser' },
    description: { en: 'Neon Riot is a browser-based arcade fighting game I am developing with Forge. It brings a neon-lit city, pixel-style characters and keyboard-driven combat into a playable web project. The current build includes movement, punches, kicks, jumps and combinations, presented through a retro game screen.', el: 'Το Neon Riot είναι ένα arcade παιχνίδι μάχης στον browser που αναπτύσσω με το Forge. Συνδυάζει μια πόλη με φωτισμό νέον, χαρακτήρες σε αισθητική pixel και χειρισμό μάχης από το πληκτρολόγιο σε ένα διαδραστικό έργο web. Η τρέχουσα έκδοση περιλαμβάνει κίνηση, γροθιές, κλωτσιές, άλματα και συνδυασμούς, σε μια οθόνη με ρετρό χαρακτήρα.' },
    focus: { en: 'My focus is the connection between controls, game state and visual feedback. The public build uses a React component around a Canvas game engine, with responsive scaling and adjustable presentation settings. Forge provides the environment for building, previewing and publishing the project as I develop it further.', el: 'Εστιάζω στη σύνδεση χειρισμού, κατάστασης παιχνιδιού και οπτικής απόκρισης. Η δημόσια έκδοση χρησιμοποιεί ένα component React γύρω από μηχανή παιχνιδιού σε Canvas, με προσαρμογή μεγέθους και ρυθμίσεις παρουσίασης. Το Forge προσφέρει το περιβάλλον κατασκευής, προεπισκόπησης και δημοσίευσης, καθώς συνεχίζω την ανάπτυξη.' },
    tools: ['Forge', 'React', 'TypeScript', 'Canvas', 'Game interaction'],
    url: 'https://neon-riot.ui8.dev',
    linkLabel: { en: 'Play Neon Riot', el: 'Παίξτε το Neon Riot' },
    secondaryLink: { url: 'https://ui8.ai/forge/', label: { en: 'About Forge', el: 'Σχετικά με το Forge' } },
  },
];
