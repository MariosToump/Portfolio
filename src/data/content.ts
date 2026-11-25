export type Lang = 'en' | 'el';
type Bilingual = Record<Lang, string>;
export { projects } from './projects';
type Role = { id: string; start: string; end: string | null; groups: ('operations' | 'technical')[]; title: Bilingual; employer: Bilingual; description: Bilingual };
export const roles: Role[] = [
  { id: 'accenture', start: '2026-08', end: null, groups: ['operations'], title: { en: 'Claims Adjuster (Greek-speaking)', el: 'Υπάλληλος διαχείρισης αποζημιώσεων με ελληνικά' }, employer: { en: 'Accenture Bulgaria', el: 'Accenture Bulgaria' }, description: { en: 'Handle Greek-language claims at Accenture Bulgaria.', el: 'Χειρίζομαι ελληνόφωνες υποθέσεις αποζημιώσεων στην Accenture Bulgaria.' } },
  { id: 'telus', start: '2025-02', end: '2026-07', groups: ['operations'], title: { en: 'Digital Trust & Safety Analyst', el: 'Αναλυτής ασφάλειας ψηφιακού περιεχομένου' }, employer: { en: 'TELUS Digital · Sofia', el: 'TELUS Digital · Σόφια' }, description: { en: 'Reviewed flagged user content against platform policies. Shared recurring findings in quality reviews with international colleagues and discussed how the policies applied to the cases.', el: 'Εξέταζα περιεχόμενο που είχε επισημανθεί, εφαρμόζοντας τους κανόνες της πλατφόρμας. Στους ελέγχους ποιότητας παρουσίαζα επαναλαμβανόμενα ζητήματα και συζητούσα την εφαρμογή των κανόνων με συναδέλφους από άλλες χώρες.' } },
  { id: 'sovel-maintenance', start: '2023-05', end: '2024-12', groups: ['operations', 'technical'], title: { en: 'Maintenance Shop Analyst & Database Specialist', el: 'Αναλυτής συντήρησης και υπεύθυνος βάσεων δεδομένων' }, employer: { en: 'Sovel S.A. · Almyros', el: 'Sovel Α.Ε. · Άλμυρος' }, description: { en: 'Maintained spare parts and maintenance records in SAP and Excel at the Almyros steel plant. Reviewed equipment breakdown histories to support servicing schedules and parts orders.', el: 'Τηρούσα αρχεία ανταλλακτικών και συντήρησης σε SAP και Excel στη χαλυβουργία του Αλμυρού. Αξιοποιούσα το ιστορικό βλαβών για να υποστηρίξω τον προγραμματισμό συντήρησης και τις παραγγελίες ανταλλακτικών.' } },
  { id: 'sovel-web', start: '2023-01', end: '2023-05', groups: ['technical'], title: { en: 'Web Developer', el: 'Προγραμματιστής εφαρμογών web' }, employer: { en: 'Sovel S.A. · Almyros', el: 'Sovel Α.Ε. · Άλμυρος' }, description: { en: 'Developed a Django fault-reporting application for factory staff and management. The application supported fault logging, critical-issue flags and status updates within a shared reporting workflow.', el: 'Ανέπτυξα εφαρμογή αναφοράς βλαβών σε Django για το προσωπικό και τη διοίκηση. Η εφαρμογή υποστήριζε καταγραφή προβλημάτων, επισήμανση κρίσιμων βλαβών και ενημέρωση κατάστασης σε ένα κοινό σύστημα αναφορών.' } },
  { id: 'cnc', start: '2016', end: '2022', groups: ['technical'], title: { en: 'CNC Machinist & Technical Operator', el: 'Χειριστής και προγραμματιστής CNC' }, employer: { en: 'Koutsogiannis Steel Workshop & Sovel S.A.', el: 'Μηχανουργείο Κουτσογιάννη και Sovel Α.Ε.' }, description: { en: 'Set up and programmed CNC milling machines from technical drawings. Inspected finished parts, calibrated equipment and investigated machine faults.', el: 'Ρύθμιζα και προγραμμάτιζα φρέζες CNC βάσει τεχνικών σχεδίων. Έλεγχα τα τελικά εξαρτήματα, βαθμονομούσα τον εξοπλισμό και διερευνούσα βλάβες μηχανών.' } },
  { id: 'other', start: '2014', end: '2021', groups: ['operations', 'technical'], title: { en: 'Other roles', el: 'Άλλες θέσεις' }, employer: { en: 'Sovel S.A. & Athens International Airport', el: 'Sovel Α.Ε. και Διεθνές Αεροδρόμιο Αθηνών' }, description: { en: 'Casting valve operator at Sovel and cargo handler at Athens International Airport. Roles held within the grouped period shown.', el: 'Χειριστής βαλβίδων στο χυτήριο της Sovel και διαχείριση φορτίων στο Διεθνές Αεροδρόμιο Αθηνών. Οι θέσεις εντάσσονται στη συνολική περίοδο που αναφέρεται.' } },
];
export function date(value: string | null, lang: Lang): string {
  if (!value) return lang === 'en' ? 'present' : 'σήμερα';
  if (value.length === 4) return value;
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'el-GR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T00:00:00Z`));
}
export const education = [
  { school: { en: 'IEK DELTA · Athens', el: 'ΙΕΚ ΔΕΛΤΑ · Αθήνα' }, start: '2019', end: '2021', subject: { en: 'Web Design, Video Game & Content Creation', el: 'Σχεδιασμός ιστοσελίδων, βιντεοπαιχνιδιών και περιεχομένου' } },
  { school: { en: 'SELETE', el: 'ΣΕΛΕΤΕ' }, start: '2007', end: '2014', subject: { en: 'Electrical installations', el: 'Ηλεκτρολογικές εγκαταστάσεις' } },
  { school: { en: 'OAED', el: 'ΟΑΕΔ' }, start: '2007', end: '2009', subject: { en: 'Machinist operator', el: 'Χειριστής μηχανημάτων' } },
  { school: { en: 'Udemy · Additional courses', el: 'Udemy · Σεμινάρια' }, start: '2022', end: '2025', subject: { en: 'Python, full-stack Django, Premiere Pro & After Effects', el: 'Python, Django full-stack, Premiere Pro και After Effects' } },
];
export const copy = {
  en: {
    all: 'All', operations: 'Claims & operations', technical: 'Technical', filterLabel: 'Filter experience', showing: 'roles shown',
    demoTitle: 'Illustrative demo', demoNote: 'Fictional sample. Inspired by the workflow, separate from the original software. Runs only in this page; nothing is saved.', issue: 'Sample equipment issue', issues: ['Conveyor A · Unusual vibration', 'Cooling pump B · Low pressure', 'Workshop mill C · Sensor warning'], critical: 'Flag as critical', status: 'Report status', statuses: ['Reported', 'In progress', 'Resolved'], summary: 'Management summary', normal: 'Standard priority', urgent: 'Critical priority', reset: 'Reset demo',
  },
  el: {
    all: 'Όλες', operations: 'Αποζημιώσεις & υποστήριξη', technical: 'Τεχνικές θέσεις', filterLabel: 'Φίλτρα εμπειρίας', showing: 'θέσεις εμφανίζονται',
    demoTitle: 'Ενδεικτική επίδειξη', demoNote: 'Φανταστικό παράδειγμα, εμπνευσμένο από τη ροή εργασίας και ανεξάρτητο από την αρχική εφαρμογή. Λειτουργεί μόνο στη σελίδα, χωρίς αποθήκευση.', issue: 'Ενδεικτικό πρόβλημα εξοπλισμού', issues: ['Ταινία Α · Ασυνήθιστη δόνηση', 'Αντλία ψύξης Β · Χαμηλή πίεση', 'Φρέζα Γ · Προειδοποίηση αισθητήρα'], critical: 'Επισήμανση ως κρίσιμη', status: 'Κατάσταση αναφοράς', statuses: ['Καταγράφηκε', 'Σε εξέλιξη', 'Επιλύθηκε'], summary: 'Σύνοψη για τη διοίκηση', normal: 'Κανονική προτεραιότητα', urgent: 'Κρίσιμη προτεραιότητα', reset: 'Επαναφορά επίδειξης',
  },
};
