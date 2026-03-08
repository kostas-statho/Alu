import { client } from './client'
import type { Service, FaqItem, SiteSettings, ExoikonomwPage } from '@/lib/types'

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const fallbackServices: Service[] = [
  {
    _id: 'demo-1',
    title: 'Συρόμενα Κουφώματα',
    slug: { current: 'syromena-koufomata' },
    shortDescription: 'Μοντέρνα συρόμενα συστήματα αλουμινίου Exalco με θερμοδιακοπή για μέγιστη ενεργειακή απόδοση.',
    description: [{ _type: 'block', _key: 'd1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Τα συρόμενα κουφώματα αλουμινίου προσφέρουν εξοικονόμηση χώρου και μοντέρνα αισθητική. Χρησιμοποιούμε αποκλειστικά συστήματα Exalco με θερμοδιακοπή για άριστη θερμομόνωση και ηχομόνωση.' }] }],
    icon: 'DoorOpen',
    order: 1,
  },
  {
    _id: 'demo-2',
    title: 'Ανοιγόμενα Κουφώματα',
    slug: { current: 'anoigomena-koufomata' },
    shortDescription: 'Ανοιγόμενα και ανακλινόμενα κουφώματα αλουμινίου με κορυφαία θερμομόνωση και ηχομόνωση.',
    description: [{ _type: 'block', _key: 'd2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Τα ανοιγόμενα κουφώματα αλουμινίου είναι η κλασική και πιο δημοφιλής επιλογή. Προσφέρουν εξαιρετική στεγανότητα, θερμομόνωση και ηχομόνωση με συστήματα Exalco.' }] }],
    icon: 'DoorClosed',
    order: 2,
  },
  {
    _id: 'demo-3',
    title: 'Πόρτες Ασφαλείας',
    slug: { current: 'portes-asfaleias' },
    shortDescription: 'Θωρακισμένες πόρτες ασφαλείας με πιστοποίηση αντιδιαρρηκτικής προστασίας.',
    description: [{ _type: 'block', _key: 'd3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Οι πόρτες ασφαλείας μας συνδυάζουν κορυφαία αντιδιαρρηκτική προστασία με μοντέρνα σχεδίαση. Κατασκευάζονται με θωρακισμένο πλαίσιο και κλειδαριές πολλαπλών σημείων.' }] }],
    icon: 'ShieldCheck',
    order: 3,
  },
  {
    _id: 'demo-4',
    title: 'Στέγαστρα',
    slug: { current: 'stegastra' },
    shortDescription: 'Στέγαστρα και πέργκολες αλουμινίου για αίθρια, βεράντες και parking.',
    description: [{ _type: 'block', _key: 'd4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Σχεδιάζουμε και κατασκευάζουμε στέγαστρα αλουμινίου κατά παραγγελία. Ιδανικά για αίθρια, βεράντες, είσοδους πολυκατοικιών και χώρους στάθμευσης.' }] }],
    icon: 'Home',
    order: 4,
  },
  {
    _id: 'demo-5',
    title: 'Κιγκλιδώματα',
    slug: { current: 'kigklidomata' },
    shortDescription: 'Κιγκλιδώματα αλουμινίου για μπαλκόνια, σκάλες και περιφράξεις σε πολλά σχέδια.',
    description: [{ _type: 'block', _key: 'd5', style: 'normal', children: [{ _type: 'span', _key: 's5', text: 'Κατασκευάζουμε κιγκλιδώματα αλουμινίου σε μεγάλη ποικιλία σχεδίων. Κατάλληλα για μπαλκόνια, σκάλες, αίθρια και περιφράξεις με εγγύηση ανθεκτικότητας.' }] }],
    icon: 'Fence',
    order: 5,
  },
  {
    _id: 'demo-6',
    title: 'Τζαμαρίες & Διαχωριστικά',
    slug: { current: 'tzamaries-diachoristika' },
    shortDescription: 'Γυάλινα διαχωριστικά και τζαμαρίες για καταστήματα, γραφεία και κατοικίες.',
    description: [{ _type: 'block', _key: 'd6', style: 'normal', children: [{ _type: 'span', _key: 's6', text: 'Τζαμαρίες και γυάλινα διαχωριστικά αλουμινίου για εμπορικούς και οικιακούς χώρους. Σύγχρονη αισθητική με μέγιστη φωτεινότητα και λειτουργικότητα.' }] }],
    icon: 'GlassWater',
    order: 6,
  },
  {
    _id: 'demo-7',
    title: 'Προσόψεις (Facades)',
    slug: { current: 'prosopseis-facades' },
    shortDescription: 'Υαλοπετάσματα και προσόψεις κτιρίων με σύγχρονα συστήματα αλουμινίου.',
    description: [{ _type: 'block', _key: 'd7', style: 'normal', children: [{ _type: 'span', _key: 's7', text: 'Κατασκευάζουμε σύγχρονες προσόψεις κτιρίων με υαλοπετάσματα αλουμινίου. Ιδανικές για εμπορικά κτίρια, γραφεία και πολυκατοικίες με υψηλές αισθητικές απαιτήσεις.' }] }],
    icon: 'Building2',
    order: 7,
  },
  {
    _id: 'demo-8',
    title: 'Ρολά',
    slug: { current: 'rola' },
    shortDescription: 'Ρολά αλουμινίου ασφαλείας και σκίασης, χειροκίνητα ή ηλεκτροκίνητα.',
    description: [{ _type: 'block', _key: 'd8', style: 'normal', children: [{ _type: 'span', _key: 's8', text: 'Εξωτερικά ρολά αλουμινίου για ασφάλεια, σκίαση και θερμομόνωση. Διαθέσιμα σε χειροκίνητη ή ηλεκτροκίνητη εκδοχή με τηλεχειρισμό.' }] }],
    icon: 'ArrowUpDown',
    order: 8,
  },
  {
    _id: 'demo-9',
    title: 'Σιδηροκατασκευές',
    slug: { current: 'sidirokataskeues' },
    shortDescription: 'Σιδηροκατασκευές παντός τύπου: πόρτες, κάγκελα, σκάλες, αποθήκες.',
    description: [{ _type: 'block', _key: 'd9', style: 'normal', children: [{ _type: 'span', _key: 's9', text: 'Αναλαμβάνουμε σιδηροκατασκευές κάθε τύπου. Πόρτες, κάγκελα, σκάλες, μεταλλικές αποθήκες και ειδικές κατασκευές κατά παραγγελία.' }] }],
    icon: 'Wrench',
    order: 9,
  },
]

export async function getAllServices(): Promise<Service[]> {
  if (!isSanityConfigured) return fallbackServices
  try {
    const services = await client.fetch(
      `*[_type == "service"] | order(order asc) {
        _id, title, slug, shortDescription, description, icon,
        heroImage, specs, gallery, faq, order, seoTitle, seoDescription
      }`
    )
    return services.length > 0 ? services : fallbackServices
  } catch {
    return fallbackServices
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isSanityConfigured) {
    return fallbackServices.find((s) => s.slug.current === slug) || null
  }
  try {
    const service = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0] {
        _id, title, slug, shortDescription, description, icon,
        heroImage, specs, gallery, faq, order, seoTitle, seoDescription
      }`,
      { slug }
    )
    return service || fallbackServices.find((s) => s.slug.current === slug) || null
  } catch {
    return fallbackServices.find((s) => s.slug.current === slug) || null
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return fallbackServices.map((s) => s.slug.current)
  try {
    const slugs = await client.fetch(`*[_type == "service"].slug.current`)
    return slugs.length > 0 ? slugs : fallbackServices.map((s) => s.slug.current)
  } catch {
    return fallbackServices.map((s) => s.slug.current)
  }
}

const fallbackFaqItems: FaqItem[] = [
  { _id: 'faq-1', question: 'Τι τύπους κουφωμάτων αλουμινίου προσφέρετε;', answer: 'Προσφέρουμε συρόμενα, ανοιγόμενα και ανακλινόμενα κουφώματα αλουμινίου με θερμοδιακοπή. Όλα τα συστήματα είναι πιστοποιημένα Exalco και προσαρμόζονται στις ανάγκες κάθε χώρου.', category: 'products', order: 1 },
  { _id: 'faq-2', question: 'Γιατί να επιλέξω αλουμίνιο αντί για PVC ή ξύλο;', answer: 'Το αλουμίνιο είναι ανθεκτικό στη διάβρωση, δεν παραμορφώνεται με τις καιρικές αλλαγές, έχει μεγαλύτερη διάρκεια ζωής και απαιτεί ελάχιστη συντήρηση. Με τη θερμοδιακοπή, η θερμομόνωση είναι εξίσου καλή με τα PVC.', category: 'products', order: 2 },
  { _id: 'faq-3', question: 'Τι είναι η θερμοδιακοπή στα κουφώματα αλουμινίου;', answer: 'Η θερμοδιακοπή είναι μια μονωτική ράβδος (polyamide) μεταξύ εσωτερικής και εξωτερικής πλευράς του πλαισίου. Αποτρέπει τη μεταφορά θερμότητας/ψύχους, βελτιώνοντας σημαντικά την ενεργειακή απόδοση.', category: 'products', order: 3 },
  { _id: 'faq-4', question: 'Τι σημαίνει πιστοποιημένος κατασκευαστής Exalco;', answer: 'Σημαίνει ότι χρησιμοποιούμε αποκλειστικά γνήσια συστήματα Exalco, ακολουθούμε τις τεχνικές προδιαγραφές του κατασκευαστή και υπάρχει εγγύηση ποιότητας τόσο στα υλικά όσο και στην κατασκευή.', category: 'products', order: 4 },
  { _id: 'faq-5', question: 'Πόσο διαρκεί η εγκατάσταση κουφωμάτων;', answer: 'Η τοποθέτηση για ένα τυπικό διαμέρισμα (5-8 κουφώματα) ολοκληρώνεται σε 1-2 ημέρες. Η αφαίρεση παλιών κουφωμάτων, τοποθέτηση νέων και αποκατάσταση σοβά γίνονται στον ίδιο χρόνο.', category: 'installation', order: 1 },
  { _id: 'faq-6', question: 'Κάνετε δωρεάν επιμέτρηση στον χώρο μου;', answer: 'Ναι, κλείνετε ραντεβού και ερχόμαστε στον χώρο σας για δωρεάν επιμέτρηση και εκτίμηση κόστους. Η επίσκεψη περιλαμβάνει μετρήσεις, συμβουλές για τα κατάλληλα συστήματα και αναλυτική προσφορά.', category: 'installation', order: 2 },
  { _id: 'faq-7', question: 'Αναλαμβάνετε και την αφαίρεση των παλιών κουφωμάτων;', answer: 'Ναι, αναλαμβάνουμε πλήρως την αφαίρεση των παλιών κουφωμάτων, τη μεταφορά τους και την αποκατάσταση του δομικού πλαισίου πριν την τοποθέτηση των νέων.', category: 'installation', order: 3 },
  { _id: 'faq-8', question: 'Τι είναι το πρόγραμμα Εξοικονομώ;', answer: 'Το Εξοικονομώ 2.0 είναι πρόγραμμα επιδότησης του ελληνικού δημοσίου για ενεργειακή αναβάθμιση κατοικιών. Καλύπτει 50-90% του κόστους αντικατάστασης κουφωμάτων, ανάλογα με το εισόδημα.', category: 'exoikonomw', order: 1 },
  { _id: 'faq-9', question: 'Μπορώ να αλλάξω κουφώματα μέσω Εξοικονομώ;', answer: 'Ναι, η αντικατάσταση κουφωμάτων είναι η πιο δημοφιλής παρέμβαση στο πρόγραμμα. Σας βοηθάμε σε κάθε βήμα — από την αίτηση μέχρι την πιστοποίηση.', category: 'exoikonomw', order: 2 },
  { _id: 'faq-10', question: 'Ποια δικαιολογητικά χρειάζομαι για το Εξοικονομώ;', answer: 'Χρειάζεστε ενεργειακό πιστοποιητικό, αίτηση στην πλατφόρμα, φορολογικά δικαιολογητικά και προσφορές. Σας καθοδηγούμε αναλυτικά σε κάθε βήμα της διαδικασίας.', category: 'exoikonomw', order: 3 },
  { _id: 'faq-11', question: 'Πώς γίνεται η τιμολόγηση;', answer: 'Η τιμή εξαρτάται από τις διαστάσεις, τον τύπο συστήματος (συρόμενο/ανοιγόμενο), το χρώμα, τον τύπο υαλοπίνακα και τα εξαρτήματα. Μετά την επιμέτρηση, λαμβάνετε αναλυτική γραπτή προσφορά.', category: 'pricing', order: 1 },
  { _id: 'faq-12', question: 'Παρέχετε εγγύηση;', answer: 'Ναι, παρέχουμε εγγύηση κατασκευαστή Exalco στα υλικά (10+ έτη), εγγύηση στους υαλοπίνακες και εγγύηση εργασίας τοποθέτησης. Τα ακριβή χρόνια εγγύησης αναφέρονται στην προσφορά.', category: 'pricing', order: 2 },
  { _id: 'faq-13', question: 'Ποιες περιοχές εξυπηρετείτε;', answer: 'Εξυπηρετούμε Αθήνα και Αττική. Για έργα εκτός Αττικής, επικοινωνήστε μαζί μας για να συζητήσουμε τη δυνατότητα συνεργασίας.', category: 'general', order: 1 },
]

export async function getAllFaqItems(): Promise<FaqItem[]> {
  if (!isSanityConfigured) return fallbackFaqItems
  try {
    return await client.fetch(
      `*[_type == "faqItem"] | order(category asc, order asc) {
        _id, question, answer, category, order
      }`
    )
  } catch {
    return fallbackFaqItems
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    companyName: 'Aluminium Company Ltd',
    phone: '+306984106315',
    email: 'kos.statho@gmail.com',
    whatsappNumber: '306984106315',
    viberNumber: '+306984106315',
    address: 'Αθήνα',
    city: 'Αθήνα',
  }
  if (!isSanityConfigured) return defaults
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0] {
        companyName, phone, email, whatsappNumber, viberNumber,
        address, city, businessHours, googleMapsUrl
      }`
    )
    return settings || defaults
  } catch {
    return defaults
  }
}

export async function getExoikonomwPage(): Promise<ExoikonomwPage | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch(
      `*[_type == "exoikonomwPage"][0] {
        heroTitle, heroSubtitle, introText, subsidyTiers,
        eligibleWorks, processSteps, whyUsPoints,
        programmeStatus, nextDeadline
      }`
    )
  } catch {
    return null
  }
}
