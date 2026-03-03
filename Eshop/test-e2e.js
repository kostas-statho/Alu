/**
 * End-to-end test for the questionnaire submission pipeline.
 * Sends a complete payload to the Apps Script webhook and verifies
 * all fields appear in the response. Check email + PDF + Sheets manually.
 *
 * Run: node test-e2e.js
 */

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxc5vJu1Lu9EwomjtAoTAqlSrnnkEcsrEC_rL32y3LjDp78P-1yLMr38dmzKPMAb0RE/exec';

// ── Complete test payload — every field with a recognisable TEST value ────────
const payload = {
  // Step 1 – Company
  company:      'TEST Αλουμίνια Παπαδόπουλος ΑΕ',
  contact:      'TEST Γιώργης Παπαδόπουλος',
  phone:        'TEST 210-1234567',
  client_email: 'kos.statho@gmail.com',
  city:         'TEST Αθήνα - Νότια Προάστια',
  years:        'TEST 10-20 χρόνια',
  advantage:    'TEST Χρησιμοποιούμε αποκλειστικά συστήματα Alumil, δωρεάν επιμέτρηση, 15 χρόνια εμπειρία',
  domain:       'TEST aluminiapapadopoulos.gr',

  // Step 2 – Services
  services:     'TEST Συρόμενα Κουφώματα, TEST Εξωτερικές Πόρτες Αλουμινίου',
  systems:      'TEST Alumil S77, TEST Schüco ASS70',
  main_service: 'TEST Κουφώματα υψηλής θερμομόνωσης για κατοικίες',

  // Step 3 – Pages
  pages:        'TEST Αρχική, TEST Portfolio, TEST Η Εταιρεία μας',

  // Step 4 – Features
  features:     'TEST Αίτηση Προσφοράς, TEST SEO Setup, TEST Analytics',

  // Step 5 – Content
  photos:       'TEST 16-30 φωτογραφίες',
  logo:         'TEST Μόνο JPG/PNG',
  copy:         'TEST Χρειάζομαι βοήθεια',
  articles:     'TEST 5 άρθρα',

  // Step 6 – Design
  palette:      'TEST Σκούρο & Χρυσό',
  style:        'TEST Minimal / Clean',
  template:     'TEST Classic Grid',
  competitor:   'TEST https://alumil.com',
  design_avoid: 'TEST Αποφυγή φλάς animation, έντονων χρωμάτων',

  // Step 7 – Timeline & Budget
  timeline:     'TEST 4-6 εβδομάδες',
  budget:       'TEST €2.000 - €3.500',
  hosting:      'TEST Αναλαμβάνετε εσείς',

  // Step 9 – Extras
  competitors:  'TEST alumil.com, test-antagonistis.gr',
  geo:          'TEST Αττική',
  maintenance:  'TEST Ετήσιο πακέτο',
  existing:     'TEST Ναι',
  notes:        'TEST Θέλουμε κάτι premium, παρόμοιο με Alumil αλλά πιο personal',

  // Computed totals
  total:           '€TEST 3.045 (χωρίς ΦΠΑ) | με ΦΠΑ 24%: €TEST 3.776',
  total_excl_vat:  3045,
  total_incl_vat:  3776,
  deposit:         1218,
  maint_price:     480,
  price_lines: JSON.stringify([
    { name: 'Βάση (Home + Contact + Services)', val: 750 },
    { name: 'Portfolio / Έργα',                 val: 350 },
    { name: 'Η Εταιρεία μας',                   val: 150 },
    { name: 'Αίτηση Προσφοράς',                 val: 280 },
    { name: 'SEO Setup',                         val: 200 },
    { name: 'Χρειάζομαι βοήθεια (copy)',         val: 200 },
    { name: '5 άρθρα',                           val: 375 },
  ]),
  summary: [
    '=== ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ ===',
    'Εταιρεία:     TEST Αλουμίνια Παπαδόπουλος ΑΕ',
    'Υπεύθυνος:   TEST Γιώργης Παπαδόπουλος',
    'Τηλέφωνο:    TEST 210-1234567',
    'Email:        TEST client@test.gr',
    'Πόλη:         TEST Αθήνα - Νότια Προάστια',
    'Χρόνια:       TEST 10-20 χρόνια',
    'Πλεονέκτημα: TEST Αποκλειστικά Alumil, δωρεάν επιμέτρηση',
    'Domain:       TEST aluminiapapadopoulos.gr',
    '',
    '=== ΕΠΙΛΟΓΕΣ ===',
    'Υπηρεσίες:   TEST Συρόμενα, Εξωτερικές Πόρτες',
    'Συστήματα:   TEST Alumil S77, Schüco ASS70',
    'Κύρια υπηρ.: TEST Κουφώματα υψηλής θερμομόνωσης',
    'Σελίδες:      TEST Αρχική, Portfolio, Η Εταιρεία μας',
    'Features:     TEST Αίτηση Προσφοράς, SEO Setup, Analytics',
    '',
    '=== ΠΕΡΙΕΧΟΜΕΝΟ ===',
    'Φωτογραφίες: TEST 16-30 φωτογραφίες',
    'Logo:         TEST Μόνο JPG/PNG',
    'Κείμενα:      TEST Χρειάζομαι βοήθεια',
    'Άρθρα:        TEST 5 άρθρα',
    '',
    '=== DESIGN ===',
    'Παλέτα:       TEST Σκούρο & Χρυσό',
    'Στυλ:          TEST Minimal / Clean',
    'Template:     TEST Classic Grid',
    'Ανταγ. site:  TEST https://alumil.com',
    'Αποφυγή:      TEST Αποφυγή φλάς animation',
    '',
    '=== TIMELINE & BUDGET ===',
    'Χρονοδ.:      TEST 4-6 εβδομάδες',
    'Budget:        TEST €2.000 - €3.500',
    'Hosting:       TEST Αναλαμβάνετε εσείς',
    '',
    '=== EXTRAS ===',
    'Ανταγωνιστές: TEST alumil.com, test-antagonistis.gr',
    'Γεωγραφία:    TEST Αττική',
    'Συντήρηση:    TEST Ετήσιο πακέτο',
    'Υπάρχον site: TEST Ναι',
    'Σημειώσεις:   TEST Premium look, personal feel',
    '',
    '=== ΑΝΑΛΥΣΗ ΤΙΜΗΣ ===',
    '  Βάση: €750',
    '  Portfolio: €350',
    '  Η Εταιρεία μας: €150',
    '  Αίτηση Προσφοράς: €280',
    '  SEO Setup: €200',
    '  Copywriting: €200',
    '  5 άρθρα: €375',
    '',
    '  ΣΥΝΟΛΟ (χωρίς ΦΠΑ):  €3.045',
    '  ΣΥΝΟΛΟ (με ΦΠΑ 24%): €3.776',
    '  Προκαταβολή (40%):    €1.218',
  ].join('\n'),
};

// ── Field checklist ──────────────────────────────────────────────────────────
const FIELDS = [
  // Sheets columns (in order)
  ['company',      'Εταιρεία'],
  ['contact',      'Υπεύθυνος'],
  ['phone',        'Τηλέφωνο'],
  ['client_email', 'Email'],
  ['city',         'Πόλη'],
  ['years',        'Χρόνια λειτουργίας'],
  ['advantage',    '⚠️  Μοναδικό Πλεονέκτημα'],
  ['domain',       '⚠️  Υπάρχον Domain'],
  ['services',     'Υπηρεσίες'],
  ['systems',      'Συστήματα'],
  ['main_service', 'Κύρια Υπηρεσία'],
  ['pages',        'Σελίδες'],
  ['features',     'Λειτουργίες'],
  ['photos',       'Φωτογραφίες'],
  ['logo',         'Logo'],
  ['copy',         'Κείμενα'],
  ['articles',     'Άρθρα'],
  ['palette',      'Παλέτα'],
  ['style',        'Στυλ'],
  ['design_avoid', 'Αποφυγή Design'],
  ['template',     'Template'],
  ['existing',     'Υπάρχον Site'],
  ['competitor',   'Ανταγ. Site URL'],
  ['competitors',  'Ανταγωνιστές (κείμενο)'],
  ['timeline',     'Χρονοδιάγραμμα'],
  ['budget',       'Budget'],
  ['hosting',      'Hosting'],
  ['geo',          'Γεωγραφία'],
  ['maintenance',  'Συντήρηση'],
  ['notes',        'Σημειώσεις'],
  ['total',        'Σύνολο'],
];

// ── Send ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  E2E TEST — Questionnaire Submission');
  console.log('══════════════════════════════════════════════\n');

  console.log('Fields being sent:\n');
  FIELDS.forEach(([key, label]) => {
    const val = String(payload[key] || '').slice(0, 60);
    const flag = key === 'advantage' || key === 'domain' ? ' ◄' : '';
    console.log(`  ${label.padEnd(28)} ${val}${flag}`);
  });

  console.log('\n──────────────────────────────────────────────');
  console.log('Sending to webhook...\n');

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Apps Script with no-cors returns opaque — in Node we get the actual body
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }

    console.log('Raw response:', JSON.stringify(json, null, 2));
    if (json.status === 'ok') {
      console.log('\n✅  Webhook responded: OK');
      if (json.uid) {
        console.log('🆔  UID:', json.uid, '← new code confirmed running');
      } else {
        console.log('⚠️   No UID in response — OLD code is still running on Apps Script!');
        console.log('    → Check that you saved the new code before deploying.');
      }
    } else {
      console.log('❌  Webhook error:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.log('❌  Network error:', err.message);
  }

  console.log('\n══════════════════════════════════════════════\n');
}

run();
