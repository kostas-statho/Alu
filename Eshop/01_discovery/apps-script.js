var NOTIFY_EMAIL = 'kos.statho@gmail.com';

function stripEmoji(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/[\p{Extended_Pictographic}\uFE0F]\s*/gu, '').trim();
}

function sanitize(data) {
  // Strip emojis from fields used in email body and Sheets (not _display fields — those keep icons for PDF)
  var fields = [
    'services','systems','main_service','pages','features',
    'photos','logo','copy','articles',
    'palette','style','timeline','budget','hosting','template',
    'geo','maintenance','existing','summary'
  ];
  fields.forEach(function(f) { if (data[f]) data[f] = stripEmoji(data[f]); });
  // Strip emojis from price_lines item names (Sheets / email)
  try {
    var pl = JSON.parse(data.price_lines || '[]');
    pl = pl.map(function(item) { return { name: stripEmoji(item.name), val: item.val }; });
    data.price_lines = JSON.stringify(pl);
  } catch(err) {}
  return data;
}

function doPost(e) {
  try {
    var data = sanitize(JSON.parse(e.postData.contents));

    // Generate unique submission ID: yyyymmdd_XXXXX
    var now = new Date();
    var dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd');
    var rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    var uid = dateStr + '_' + rand;

    // 1. Write to Google Sheets
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    var headers = [
      'Timestamp','UID','Etaireia','Ypefthynos','Tilefono','Email','Poli',
      'Chronia','Pleonektima','Domain',
      'Ypiresies','Systimata','Kyria Yp.','Selides',
      'Features','Fotografies','Logo','Keimena','Arthra',
      'Paleta','Stylos','Apoyfgi Design','Template',
      'Palaio Site','Antagwnistis Site','Antagwnistes (keim.)',
      'Chronod.','Budget','Hosting','Geografia','Syntirisi',
      'Simeiosis'
    ];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    sheet.appendRow([
      new Date().toLocaleString(), uid,
      data.company, data.contact, data.phone, data.client_email, data.city,
      data.years, data.advantage, data.domain,
      data.services, data.systems, data.main_service, data.pages,
      data.features, data.photos, data.logo, data.copy, data.articles,
      data.palette, data.style, data.design_avoid, data.template,
      data.existing, data.competitor, data.competitors,
      data.timeline, data.budget, data.hosting, data.geo,
      data.maintenance, data.notes
    ]);

    // 2. Build PDF (uses _display fields — icons preserved, no prices)
    var pdf = buildPDF(data, uid);

    // 3. Send notification email to owner (icon-free body via sanitized summary)
    var subject = '[' + uid + '] Neo Erotimatologio - ' + data.company + ' | ' + data.total;
    var body = data.summary || buildEmailBody(data);
    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, { attachments: [pdf] });

    // 4. Send confirmation email to client — isolated so failures don't break the submission
    try {
      var email = (data.client_email || '').trim();
      if (email && email !== '—' && email.indexOf('@') > 0 && email.indexOf('.') > 0) {
        var clientSubject = 'Λάβαμε το ερωτηματολόγιό σας — Αρ. αναφοράς: ' + uid;
        var clientBody = [
          'Αγαπητέ/ή ' + (data.contact || ''),
          '',
          'Λάβαμε το συμπληρωμένο ερωτηματολόγιο για την εταιρεία "' + (data.company || '') + '".',
          '',
          'Αριθμός αναφοράς: ' + uid,
          '',
          'Θα επικοινωνήσουμε μαζί σας σύντομα για να συζητήσουμε τις λεπτομέρειες του έργου σας.',
          '',
          'Με εκτίμηση,',
          'Η ομάδα μας'
        ].join('\n');
        GmailApp.sendEmail(email, clientSubject, clientBody);
      }
    } catch(clientErr) {
      console.log('Client email failed: ' + clientErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', uid: uid }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fallback email body (used only if data.summary is missing)
function buildEmailBody(data) {
  var lines = [
    'Elhfthe neo erotimatologio.',
    '',
    'STOIXEIA PELATI',
    'Etaireia:    ' + data.company,
    'Ypefthynos:  ' + data.contact,
    'Tilefono:    ' + data.phone,
    'Email:       ' + data.client_email,
    'Poli:        ' + data.city,
    'Chronia:     ' + data.years,
    'Pleonektima: ' + data.advantage,
    'Domain:      ' + data.domain,
    '',
    'EPILOGES',
    'Ypiresies:   ' + data.services,
    'Systimata:   ' + data.systems,
    'Kyria Yp.:   ' + data.main_service,
    'Selides:     ' + data.pages,
    'Leitourgies: ' + data.features,
    '',
    'PERIEXOMENO',
    'Fotografies: ' + data.photos,
    'Logo:        ' + data.logo,
    'Keimena:     ' + data.copy,
    'Arthra:      ' + data.articles,
    '',
    'DESIGN',
    'Paleta:      ' + data.palette,
    'Stylos:      ' + data.style,
    'Template:    ' + data.template,
    'Antagw. site:' + data.competitor,
    'Apoyfgi:     ' + data.design_avoid,
    '',
    'TIMELINE & BUDGET',
    'Xronod.:     ' + data.timeline,
    'Budget:      ' + data.budget,
    'Hosting:     ' + data.hosting,
    '',
    'EXTRAS',
    'Antagwnistes:' + data.competitors,
    'Geografia:   ' + data.geo,
    'Syntirisi:   ' + data.maintenance,
    'Yparchon:    ' + data.existing,
    'Simeiosis:   ' + data.notes,
    '',
    'EKTIMOUMENO KOSTOS: ' + data.total
  ];
  return lines.join('\n');
}

// Helper: use _display field if available (icons), else fall back to stripped field
function disp(data, field) {
  return data[field + '_display'] || data[field] || '—';
}

function buildPDF(data, uid) {
  var today = new Date();

  var fmt = function(d) {
    return d.toLocaleDateString('el-GR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  var doc = DocumentApp.create('Erotimatologio_' + data.company.replace(/\s+/g, '_'));
  var b = doc.getBody();

  // Title
  var title = b.appendParagraph('EROTIMATOLOGIO PELATI');
  title.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  b.appendParagraph(data.company)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  b.appendParagraph('Hmeromhnia: ' + fmt(today))
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  if (uid) {
    b.appendParagraph('Ar. Anafotas: ' + uid)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  }

  b.appendHorizontalRule();

  // ΒΗΜΑ 01 – Στοιχεία Εταιρείας
  b.appendParagraph('BHMA 01 — Stoixeia Etaireias')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Etaireia',    data.company      || '—'],
    ['Ypefthynos',  data.contact      || '—'],
    ['Tilefono',    data.phone        || '—'],
    ['Email',       data.client_email || '—'],
    ['Poli',        data.city         || '—'],
    ['Chronia',     data.years        || '—'],
    ['Pleonektima', data.advantage    || '—'],
    ['Domain',      data.domain       || '—']
  ]);
  b.appendParagraph('');

  // ΒΗΜΑ 02 – Υπηρεσίες (icons from _display)
  b.appendParagraph('BHMA 02 — Ypiresies')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Ypiresies',   disp(data,'services')     ],
    ['Systimata',   data.systems      || '—'],
    ['Kyria Yp.',   data.main_service || '—']
  ]);
  b.appendParagraph('');

  // ΒΗΜΑ 03 – Σελίδες (icons)
  b.appendParagraph('BHMA 03 — Selides')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([['Selides', disp(data,'pages')]]);
  b.appendParagraph('');

  // ΒΗΜΑ 04 – Λειτουργίες (icons)
  b.appendParagraph('BHMA 04 — Leitourgies')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([['Leitourgies', disp(data,'features')]]);
  b.appendParagraph('');

  // ΒΗΜΑ 05 – Περιεχόμενο (icons)
  b.appendParagraph('BHMA 05 — Periexomeno')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Fotografies', disp(data,'photos')  ],
    ['Logo',        disp(data,'logo')    ],
    ['Keimena',     disp(data,'copy')    ],
    ['Arthra Blog', disp(data,'articles')]
  ]);
  b.appendParagraph('');

  // ΒΗΜΑ 06 – Design (icons)
  b.appendParagraph('BHMA 06 — Design & Aisthitiki')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Paleta',       disp(data,'palette')    ],
    ['Stylos',       disp(data,'style')      ],
    ['Antagw. site', data.competitor   || '—'],
    ['Apoyfgi',      data.design_avoid || '—']
  ]);
  b.appendParagraph('');

  // ΒΗΜΑ 07 – Timeline & Budget (icons, no prices)
  b.appendParagraph('BHMA 07 — Timeline & Budget')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Xronod.',  disp(data,'timeline')],
    ['Budget',   disp(data,'budget')  ],
    ['Hosting',  disp(data,'hosting') ]
  ]);
  b.appendParagraph('');

  // ΒΗΜΑ 08 – Template (icons)
  b.appendParagraph('BHMA 08 — Template')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([['Template', disp(data,'template')]]);
  b.appendParagraph('');

  // ΒΗΜΑ 09 – Extras (icons)
  b.appendParagraph('BHMA 09 — Extras')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendTable([
    ['Antagwnistes', data.competitors        || '—'],
    ['Geografia',    disp(data,'geo')              ],
    ['Syntirisi',    disp(data,'maintenance')      ],
    ['Yparchon site',disp(data,'existing')         ],
    ['Simeiosis',    data.notes             || '—']
  ]);
  b.appendParagraph('');

  // No price breakdown, totals, or payment schedule — per client instructions

  doc.saveAndClose();

  var fileId = doc.getId();
  var pdfBlob = DriveApp.getFileById(fileId).getAs('application/pdf');
  pdfBlob.setName('Erotimatologio-' + data.company.replace(/\s+/g, '-') + '.pdf');

  try { DriveApp.getFileById(fileId).setTrashed(true); } catch(e) {}

  return pdfBlob;
}
