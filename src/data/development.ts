import { projects, type Project } from './projects';
import type { Lang } from './content';
type Text = Record<Lang, string>;
export type DevelopmentProject = Omit<Project, 'id'> & { id: string; summary: Text; role: Text; professional: boolean };
const summaries: Record<string, Text> = {
  'piano-app': { en: 'An Android piano practice app with MIDI input, falling notes and a staff view. Built in Kotlin and Jetpack Compose.', el: 'Εφαρμογή εξάσκησης πιάνου για Android με είσοδο MIDI, κινούμενες νότες και πεντάγραμμο. Αναπτύσσεται σε Kotlin και Jetpack Compose.' },
  'warlocks-android': { en: 'A Godot arena game for Android. Touch controls and AI opponents turn a shrinking platform into a fight to stay out of the lava.', el: 'Παιχνίδι αρένας σε Godot για Android. Χειρισμός αφής και αντίπαλοι με τεχνητή νοημοσύνη σε μια πλατφόρμα που μικραίνει μέσα στη λάβα.' },
  'neon-riot': { en: 'A playable arcade fighting game developed with Forge. Keyboard combat, pixel characters and a neon city in the browser.', el: 'Arcade παιχνίδι μάχης που αναπτύσσω με το Forge. Χειρισμός από το πληκτρολόγιο, χαρακτήρες pixel και μια πόλη νέον στον browser.' },
};
const responsibilities: Record<string, Text> = {
  'piano-app': { en: 'Android application development', el: 'Ανάπτυξη εφαρμογής Android' },
  'warlocks-android': { en: 'Game development in Godot; pixel art with PixelLab', el: 'Ανάπτυξη παιχνιδιού σε Godot· γραφικά με PixelLab' },
  'neon-riot': { en: 'Game development using Forge', el: 'Ανάπτυξη παιχνιδιού με Forge' },
};
export const developmentProjects: DevelopmentProject[] = [
  {
    id: 'factory-reporting', professional: true,
    title: { en: 'Factory reporting system', el: 'Σύστημα αναφοράς βλαβών' },
    category: { en: 'Web application · Sovel S.A.', el: 'Εφαρμογή web · Sovel Α.Ε.' },
    status: { en: 'Professional work · January to May 2023', el: 'Επαγγελματικό έργο · Ιανουάριος έως Μάιος 2023' },
    summary: { en: 'A Django application for factory staff to report equipment faults, flag critical issues and keep management informed of their status.', el: 'Εφαρμογή Django για την καταγραφή βλαβών εξοπλισμού, την επισήμανση κρίσιμων προβλημάτων και την ενημέρωση της διοίκησης για την κατάστασή τους.' },
    role: { en: 'Web Developer at Sovel S.A.', el: 'Προγραμματιστής web στη Sovel Α.Ε.' },
    description: { en: 'Factory employees needed a way to record equipment problems and make report status visible to management. I developed a Django application where colleagues could submit fault reports, mark critical issues and update their status. Staff and management could follow the same reports through a shared workflow.', el: 'Το προσωπικό του εργοστασίου χρειαζόταν έναν τρόπο να καταγράφει προβλήματα εξοπλισμού και να ενημερώνει τη διοίκηση για την κατάστασή τους. Ανέπτυξα εφαρμογή Django για την υποβολή αναφορών, την επισήμανση κρίσιμων βλαβών και την ενημέρωση της κατάστασής τους. Προσωπικό και διοίκηση παρακολουθούσαν τις ίδιες αναφορές μέσα από μια κοινή ροή εργασίας.' },
    focus: { en: 'The work involved translating a maintenance reporting process into a web interface using Python, Django, JavaScript, HTML and CSS. The example below recreates the reporting steps with fictional equipment. It is separate from the original application and does not save or send data.', el: 'Η δουλειά αφορούσε τη μεταφορά μιας διαδικασίας αναφοράς βλαβών σε περιβάλλον web, με Python, Django, JavaScript, HTML και CSS. Το παρακάτω παράδειγμα αναπαριστά τα βήματα με φανταστικό εξοπλισμό. Είναι ανεξάρτητο από την αρχική εφαρμογή και δεν αποθηκεύει ούτε στέλνει δεδομένα.' },
    tools: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS'], url: null, linkLabel: null,
  },
  ...['piano-app', 'warlocks-android', 'neon-riot'].map(id => ({ ...projects.find(project => project.id === id)!, professional: false, summary: summaries[id], role: responsibilities[id] })),
];
