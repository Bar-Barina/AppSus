'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const emailsDB = [
  {
    id: 'e101',
    subject:
      'My $9.99 UX Portfolio Course sale ends TOMORROW!',
    body: 'Do yourself a favor and pick up the How to Write a Compelling Case Study guidebook',
    isRead: false,
    sentAt: new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
    removedAt: null,
    from: 'Udemy Instructor',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/UdemyImg.jpg',
    isStarred: false,
  },
  {
    id: 'e102',
    subject: 'הירדמו עם צלילים מרגיעים.',
    body: 'New music from artists you love, with Ravid Plotnik on your Release Radar now',
    isRead: false,
    sentAt: '06:30 AM',
    removedAt: null,
    from: 'Spotify',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/arini.jpg',
    isStarred: false,
  },
  {
    id: 'e103',
    subject: 'Build a better UX Portfolio for just $9.99!',
    body: 'Dont sleep on this sale...',
    isRead: true,
    sentAt: '05:57 AM',
    removedAt: null,
    from: 'codeRed@spmail.com',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/udemy.jpg',
    isStarred: true,
  },
  {
    id: 'e104',
    subject: 'חג פורים, חג גדול לגיימרים!',
    body: 'כל מוצרי Logitech G ב-20% הנחה! מקלדות, עכברים, אוזניות (וריקודים).',
    isRead: false,
    sentAt: '2:00 AM',
    removedAt: null,
    from: 'KSP.co.il ',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/kspGamers.png',
    isStarred: true,
  },
  {
    id: 'e105',
    subject: 'ההופעות הכי שוות ב גריי בחודש מרץ! (פרסומת)',
    body: 'עידן רייכל, שלמה ארצי והיהודים!',
    isRead: true,
    sentAt: 'Mar 3',
    removedAt: null,
    from: 'קופת תל אביב- 2207',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/telaviv.jpg',
    isStarred: false,
  },
  {
    id: 'e106',
    subject: 'דור and 62 others made changes in your shared folders',
    body: 'CaJan23-ExcerciseSubmission',
    isRead: false,
    sentAt: 'Mar 2',
    removedAt: null,
    from: 'Dropbox',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/dropbox.png',
    isStarred: true,
  },
  {
    id: 'e107',
    subject: 'אשמח להגיע למסיבה בחמישי!',
    body: 'האם יהיה אוכל באירוע?',
    isRead: true,
    sentAt: new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
    removedAt: null,
    from: 'Me',
    to: 'user@appsus2.com',
    status: 'sent',
    img: 'assets/img/footlocker.png',
    isStarred: true,
  },
  {
    id: 'e108',
    subject: 'תודה רבה על ההפקדה המהירה! אשמח לעזור אם תצטרך!',
    body: 'אתה אלוף',
    isRead: true,
    sentAt: 'Mar 1',
    removedAt: null,
    from: 'Me',
    to: 'user@appsus2.com',
    status: 'sent',
    img: 'assets/img/googlecalander.png',
    isStarred: false,
  },
  {
    id: 'e109',
    subject: 'ההטבה עדיין מחכה לך בחשבון 💰 | פרסומת',
    body: 'עדיין מחכים לך 25 ש״ח לרכישה במגוון החנויות שלנו',
    isRead: false,
    sentAt: 'Feb 28',
    removedAt: null,
    from: 'Hadas from Wolt',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/wolt.png',
    isStarred: false,
  },
  {
    id: 'e110',
    subject: 'Wishing for an encounter with Shiny Jirachi?',
    body: 'Wishes can come true—just ask Jirachi!',
    isRead: true,
    sentAt: 'Feb 28',
    removedAt: null,
    from: 'Pokémon GO',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/pokemongo.png',
    isStarred: true,
  },
  {
    id: 'e111',
    subject: 'יש אירועים שממש לא כדאי לפספס... ובמייל הזה נמצא אחד מהם',
    body: 'פנייה זו נעשית בהסתמך על מידע מתוך מאגר מידע שבבעלות החברה.',
    isRead: false,
    sentAt: 'Feb 25',
    removedAt: null,
    from: 'Duty Free - James Richardson',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/james.png',
    isStarred: true,
  },
  {
    id: 'e112',
    subject: '🏋️‍♂️ How much progress did you make?',
    body: 'Check out your learning progress.',
    isRead: false,
    sentAt: 'Feb 22',
    removedAt: null,
    from: 'Duolingo@walla.com',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/dou.png',
    isStarred: false,
  },
  {
    id: 'e113',
    subject: 'קבלה שלך מ-Apple',
    body: 'שירות +iCloud עם שטח אחסון בגודל 50 ג״ב',
    isRead: false,
    sentAt: 'Feb 21',
    removedAt: null,
    from: 'Apple@tapoah.com',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/pokemonHome.png',
    isStarred: true,
  },
  {
    id: 'e114',
    subject: 'היי פרטנר! , אני החשבונית החודשית שלך',
    body: 'נא לא לענות להודעה זו',
    isRead: true,
    sentAt: 'Feb 20',
    removedAt: null,
    from: 'Partner',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/partner.jpg',
    isStarred: false,
  },
  {
    id: 'e115',
    subject:
      'סופ"ש קפה מתחיל! |(פרסומת)',
    body: 'כל מותגי הקפה הטחון והפולים במשלוח חינם לרוכשים ב-₪249',
    isRead: true,
    sentAt: 'Feb 17',
    removedAt: null,
    from: 'CafeCafo@gmail.com',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/coffee.png',
    isStarred: true,
  },
  {
    id: 'e116',
    subject: 'Welcome to Google Maps Platform',
    body: 'Find the right API',
    isRead: false,
    sentAt: 'Feb 15',
    removedAt: null,
    from: 'Google Maps Platform',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/map.png',
    isStarred: true,
  },
  {
    id: 'e117',
    subject: 'מצורפים קורות החיים שלי',
    body: 'במידה והמשרה עוד פנויה, אשמח לתשובה מהירה',
    isRead: true,
    sentAt: 'Feb 11',
    removedAt: null,
    from: 'Me',
    to: 'user@appsus2.com',
    status: 'sent',
    img: 'assets/img/wolt.png',
    isStarred: false,
  },
  {
    id: 'e118',
    subject: 'טל and 62 others made changes in your shared folders',
    body: 'CaJan23-ExcerciseSubmission',
    isRead: false,
    sentAt: 'Feb 11',
    removedAt: null,
    from: 'Dropbox@gmail.com',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/dropbox.png',
    isStarred: true,
  },
  {
    id: 'e119',
    subject:
      'My $9.99 UX Portfolio Course sale ends TOMORROW!',
    body: 'Do yourself a favor and pick up the How to Write a Compelling Case Study guidebook',
    isRead: false,
    sentAt: 'Feb 9',
    removedAt: null,
    from: 'Udemy Instructor',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/udemy.jpg',
    isStarred: false,
  },
  {
    id: 'e120',
    subject:
      'אלפי ישראלים לא טועים, הרשמו למנוי שלנו.',
    body: 'Come visit Eilat, or just stay and code some vue apps. ',
    isRead: true,
    sentAt: 'Feb 7',
    removedAt: null,
    from: 'eilat@walla.com',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/ksp.png',
    isStarred: false,
  },
  {
    id: 'e121',
    subject: 'היי פרטנר! , אני החשבונית החודשית שלך',
    body: 'נא לא לענות להודעה זו',
    isRead: false,
    sentAt: 'Feb 5',
    removedAt: null,
    from: 'Partner',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/partner.png',
    isStarred: false,
  },
  {
    id: 'e122',
    subject: 'SMACKDOWN AND MONEY IN THE BANK ARE COMING TO THE UK!',
    body: '© Copyright WWE 1980-2023 All Rights Reserved',
    isRead: false,
    sentAt: 'Feb 4',
    removedAt: null,
    from: 'WWE',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/wwe.jpg',
    isStarred: false,
  },
  {
    id: 'e123',
    subject:'Your Zoom password has been reset.',
    body: 'If you have any questions, please contact Zoom Customer Support.',
    isRead: false,
    sentAt: 'Feb 2',
    removedAt: null,
    from: 'Zoom',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/zoom.jpg',
    isStarred: true,
  },
  {
    id: 'e124',
    subject:'Confirm Your Font Awesome Account Email Address',
    body: 'Youre so close to using your first Font Awesome Kit!',
    isRead: false,
    sentAt: 'Feb 1',
    removedAt: null,
    from: 'FontAwesome@gmail.com',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/fontAwsome.png',
    isStarred: false,
  },
  {
    id: 'e125',
    subject:'Save the dates for next Seasons Community Day',
    body: 'Stay tuned for more details about March Community Day!',
    isRead: false,
    sentAt: 'Jan 31',
    removedAt: null,
    from: 'Pokémon GO',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/pokemongo.png',
    isStarred: false,
  },
  {
    id: 'e126',
    subject:'WINTER SALE! ⛈️ 30% OFFFFFF | פרסומת',
    body: 'מותגים מנצחים עם פריטי חורף שווים - עכשיו ב-30% הנחה.',
    isRead: true,
    sentAt: 'Jan 22',
    removedAt: null,
    from: 'Footlocker',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/footlocker.jpg',
    isStarred: false,
  },
  {
    id: 'e127',
    subject: 'היי פרטנר! , אני החשבונית החודשית שלך',
    body: 'נא לא לענות להודעה זו',
    isRead: false,
    sentAt: 'Jan 21',
    removedAt: null,
    from: 'Partner',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/partner.png',
    isStarred: false,
  },
  {
    id: 'e128',
    subject:
      'סופ"ש קפה מתחיל! |(פרסומת)',
    body: 'כל מותגי הקפה הטחון והפולים במשלוח חינם לרוכשים ב-₪249',
    isRead: true,
    sentAt: 'Jan 19',
    removedAt: null,
    from: 'CafeCafo@gmail.com',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/coffee.png',
    isStarred: true,
  },
  {
    id: 'e129',
    subject: 'Welcome to Google Maps Platform',
    body: 'Find the right API',
    isRead: false,
    sentAt: 'Jan 15',
    removedAt: null,
    from: 'Google Maps Platform',
    to: 'user@appsus2.com',
    status: 'trash',
    img: 'assets/img/maps.png',
    isStarred: true,
  },
  {
    id: 'e130',
    subject:
      'My $9.99 UX Portfolio Course sale ends TOMORROW!',
    body: 'Do yourself a favor and pick up the How to Write a Compelling Case Study guidebook',
    isRead: false,
    sentAt: 'Jan 14',
    removedAt: null,
    from: 'Udemy Instructor',
    to: 'user@appsus.com',
    status: 'inbox',
    img: 'assets/img/UdemyImg.jpg',
    isStarred: false,
  },
  {
    id: 'e131',
    subject: 'בנוגע לדירה בקריית חיים, אשמח לשאו',
    body: '',
    isRead: true,
    sentAt: 'Jan 12',
    removedAt: null,
    from: 'Me',
    to: 'user@appsus2.com',
    status: 'draft',
    img: 'assets/img/arini.jpg',
    isStarred: false,
  },
  {
    id: 'e132',
    subject: 'Build a better UX Portfolio for just $9.99!',
    body: 'Dont sleep on this sale...',
    isRead: true,
    sentAt: 'Jan 10',
    removedAt: null,
    from: 'codeRed@spmail.com',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/UdemyImg.jpg',
    isStarred: true,
  },
  {
    id: 'e133',
    subject: 'חג פורים, חג גדול לגיימרים!',
    body: 'כל מוצרי Logitech G ב-20% הנחה! מקלדות, עכברים, אוזניות (וריקודים).',
    isRead: false,
    sentAt: 'Jan 5',
    removedAt: null,
    from: 'KSP.co.il ',
    to: 'user@appsus2.com',
    status: 'inbox',
    img: 'assets/img/kspGamers.png',
    isStarred: true,
  },
]

const EMAIL_KEY = 'emailDB'

_createEmails()

export const emailService = {
  query,
  getUser,
  get,
  save,
  getEmptyEmail,
  remove,
}

function query(filterBy = {}) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    if (filterBy.status) {
      const regex = new RegExp(filterBy.status, 'i')
      emails = emails.filter((email) => regex.test(email.status))
    }
    return emails
  })
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email)
  } else {
    return storageService.post(EMAIL_KEY, email)
  }
}

function getEmptyEmail(from = 'newUser', to = '',subject = '',body = '' , sentAt = '22:10 PM',status = 'inbox') {
  return { from, to, subject, body,sentAt,status }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = emailsDB
    utilService.saveToStorage(EMAIL_KEY, emails)
  }
}

function _createEmail(id, body = 'Hello') {
  const email = getEmptyEmail(id, body)
  email.id = utilService.makeId()
  return email
}

function getUser() {
  const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus',
  }
  return loggedInUser
}
