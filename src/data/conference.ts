import type { T } from "@/lib/i18n";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";

export const conference = {
  name: { ar: "Deep Dive 2026", en: "Deep Dive 2026" } as T,
  subtitle: { ar: "مؤتمر طب الأسرة", en: "Family Medicine Conference" } as T,
  headline: {
    ar: "المؤتمر الدولي لطب الأسرة",
    en: "The International Family Medicine Conference",
  } as T,
  intro: {
    ar: "ثلاثة أيام من أعمق النقاشات العلمية والجلسات التطبيقية في طب الأسرة والرعاية الأولية، بمشاركة نخبة من الخبراء والباحثين.",
    en: "Three days of deep scientific discussion and hands-on sessions in family medicine and primary care, with a select faculty of experts and researchers.",
  } as T,
  datesLabel: {
    ar: "3 – 5 ديسمبر 2026 · 08:00 – 17:00",
    en: "3 – 5 December 2026 · 08:00 – 17:00",
  } as T,
  venue: {
    ar: "مركز الرياض الدولي للمؤتمرات والمعارض",
    en: "Riyadh International Convention & Exhibition Center",
  } as T,
  address: {
    ar: "طريق الملك عبدالله، حي الملز، الرياض، المملكة العربية السعودية",
    en: "King Abdullah Road, Al Malaz, Riyadh, Saudi Arabia",
  } as T,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Riyadh+International+Convention+and+Exhibition+Center",
  mapEmbed:
    "https://www.google.com/maps?q=Riyadh%20International%20Convention%20and%20Exhibition%20Center&output=embed",
  startsAt: "2026-12-03T08:00:00+03:00",
  earlyBirdEndsAt: "2026-10-15T23:59:00+03:00",
  abstractsCloseAt: "2026-11-01T23:59:00+03:00",
  acceptanceDate: { ar: "12 نوفمبر 2026", en: "12 November 2026" } as T,
  registerUrl: "/register",
  abstractFormUrl: "#",
};

export const stats: { value: string; label: T }[] = [
  { value: "03", label: { ar: "أيام المؤتمر", en: "Conference days" } },
  { value: "18", label: { ar: "ساعة CME", en: "CME hours" } },
  { value: "24", label: { ar: "متحدثًا", en: "Speakers" } },
  { value: "18", label: { ar: "جلسة علمية", en: "Scientific sessions" } },
  { value: "04", label: { ar: "ورش عمل", en: "Workshops" } },
];

export const about = {
  vision: {
    title: { ar: "الرؤية", en: "Vision" } as T,
    body: {
      ar: "أن يكون المؤتمر المنصة العلمية المرجعية لطب الأسرة والرعاية الأولية في المنطقة.",
      en: "To be the reference scientific platform for family medicine and primary care in the region.",
    } as T,
  },
  mission: {
    title: { ar: "الرسالة", en: "Mission" } as T,
    body: {
      ar: "نقل أحدث الأدلة العلمية إلى الممارسة اليومية في العيادة عبر جلسات تطبيقية وورش عمل معتمدة.",
      en: "Translating the latest evidence into daily clinical practice through applied sessions and accredited workshops.",
    } as T,
  },
  audience: {
    title: { ar: "الفئات المستهدفة", en: "Who should attend" } as T,
    body: {
      ar: "أطباء الأسرة والرعاية الأولية، أطباء الامتياز والمقيمون، طلاب الطب، الممارسون الصحيون، والباحثون.",
      en: "Family and primary care physicians, interns and residents, medical students, allied health practitioners and researchers.",
    } as T,
  },
  why: {
    title: { ar: "أسباب الحضور", en: "Why attend" } as T,
    body: {
      ar: "18 ساعة تعليم طبي مستمر، ورش عملية محدودة المقاعد، ومساحة للتواصل المهني وعرض الأبحاث.",
      en: "18 CME hours, limited-seat hands-on workshops, and space for professional networking and research presentation.",
    } as T,
  },
};

export type Session = { time: string; title: T; speaker: T; type: T };

export const program: { day: T; date: T; sessions: Session[] }[] = [
  {
    day: { ar: "اليوم الأول", en: "Day 1" },
    date: { ar: "3 ديسمبر 2026", en: "3 December 2026" },
    sessions: [
      {
        time: "09:00",
        title: {
          ar: "الجلسة الافتتاحية وكلمة رئيس المؤتمر",
          en: "Opening ceremony & chair address",
        },
        speaker: { ar: "د. سارة العتيبي", en: "Dr. Sarah Al-Otaibi" },
        type: { ar: "افتتاح", en: "Opening" },
      },
      {
        time: "10:30",
        title: { ar: "طبيب الأسرة كمنسّق للرعاية", en: "The family physician as care coordinator" },
        speaker: { ar: "د. خالد المنصور", en: "Dr. Khalid Al-Mansour" },
        type: { ar: "محاضرة رئيسية", en: "Keynote" },
      },
      {
        time: "13:30",
        title: {
          ar: "مسارات الأمراض المزمنة في الرعاية الأولية",
          en: "Chronic disease pathways in primary care",
        },
        speaker: { ar: "د. ليلى حسن", en: "Dr. Layla Hassan" },
        type: { ar: "جلسة علمية", en: "Session" },
      },
    ],
  },
  {
    day: { ar: "اليوم الثاني", en: "Day 2" },
    date: { ar: "4 ديسمبر 2026", en: "4 December 2026" },
    sessions: [
      {
        time: "09:00",
        title: { ar: "صحة الأسرة عبر الأجيال", en: "Family health across generations" },
        speaker: { ar: "د. ليلى حسن", en: "Dr. Layla Hassan" },
        type: { ar: "جلسة علمية", en: "Session" },
      },
      {
        time: "11:00",
        title: {
          ar: "الذكاء الاصطناعي في الفرز والتشخيص المبكر",
          en: "AI in triage and early diagnosis",
        },
        speaker: { ar: "د. عمر فاروق", en: "Dr. Omar Farouk" },
        type: { ar: "حلقة نقاش", en: "Panel" },
      },
      {
        time: "14:00",
        title: { ar: "ورش العمل التطبيقية المتوازية", en: "Parallel hands-on workshops" },
        speaker: { ar: "مدربون معتمدون", en: "Certified trainers" },
        type: { ar: "ورش عمل", en: "Workshops" },
      },
    ],
  },
  {
    day: { ar: "اليوم الثالث", en: "Day 3" },
    date: { ar: "5 ديسمبر 2026", en: "5 December 2026" },
    sessions: [
      {
        time: "09:00",
        title: {
          ar: "جلسة البوسترات والملخصات المقبولة",
          en: "Poster & accepted abstracts session",
        },
        speaker: { ar: "اللجنة العلمية", en: "Scientific committee" },
        type: { ar: "بوسترات", en: "Posters" },
      },
      {
        time: "11:30",
        title: {
          ar: "مستقبل الرعاية الأولية والطب الاتصالي",
          en: "The future of primary care and telehealth",
        },
        speaker: { ar: "د. عمر فاروق", en: "Dr. Omar Farouk" },
        type: { ar: "محاضرة رئيسية", en: "Keynote" },
      },
      {
        time: "15:00",
        title: {
          ar: "التوصيات والختام وتسليم الشهادات",
          en: "Recommendations, closing & certificates",
        },
        speaker: { ar: "اللجنة المنظمة", en: "Organizing committee" },
        type: { ar: "ختام", en: "Closing" },
      },
    ],
  },
];

export const workshops: {
  title: T;
  date: T;
  time: string;
  trainer: T;
  audience: T;
  seats: number;
  fee: T;
}[] = [
  {
    title: { ar: "الموجات فوق الصوتية في العيادة (POCUS)", en: "Point-of-care ultrasound (POCUS)" },
    date: { ar: "4 ديسمبر 2026", en: "4 December 2026" },
    time: "14:00 – 17:00",
    trainer: { ar: "د. خالد المنصور", en: "Dr. Khalid Al-Mansour" },
    audience: { ar: "أطباء الأسرة والمقيمون", en: "Family physicians & residents" },
    seats: 25,
    fee: { ar: "400 ريال", en: "SAR 400" },
  },
  {
    title: { ar: "إدارة الجروح والإجراءات الصغرى", en: "Wound care & minor procedures" },
    date: { ar: "4 ديسمبر 2026", en: "4 December 2026" },
    time: "14:00 – 17:00",
    trainer: { ar: "د. ليلى حسن", en: "Dr. Layla Hassan" },
    audience: { ar: "الممارسون الصحيون", en: "Allied health practitioners" },
    seats: 30,
    fee: { ar: "350 ريال", en: "SAR 350" },
  },
  {
    title: {
      ar: "مهارات التواصل مع المريض وأسرته",
      en: "Communication skills with patient and family",
    },
    date: { ar: "5 ديسمبر 2026", en: "5 December 2026" },
    time: "09:00 – 12:00",
    trainer: { ar: "د. سارة العتيبي", en: "Dr. Sarah Al-Otaibi" },
    audience: { ar: "جميع الفئات", en: "All attendees" },
    seats: 40,
    fee: { ar: "250 ريال", en: "SAR 250" },
  },
  {
    title: {
      ar: "منهجية البحث وكتابة الملخص العلمي",
      en: "Research methodology & abstract writing",
    },
    date: { ar: "5 ديسمبر 2026", en: "5 December 2026" },
    time: "13:00 – 16:00",
    trainer: { ar: "د. عمر فاروق", en: "Dr. Omar Farouk" },
    audience: { ar: "الباحثون وطلاب الطب", en: "Researchers & medical students" },
    seats: 35,
    fee: { ar: "300 ريال", en: "SAR 300" },
  },
];

export const speakers: {
  photo: string;
  name: T;
  specialty: T;
  role: T;
  org: T;
  bio: T;
}[] = [
  {
    photo: speaker1,
    name: { ar: "د. سارة العتيبي", en: "Dr. Sarah Al-Otaibi" },
    specialty: { ar: "طب الأسرة", en: "Family Medicine" },
    role: { ar: "استشارية ورئيسة المؤتمر", en: "Consultant & Conference Chair" },
    org: { ar: "المدينة الطبية الجامعية", en: "University Medical City" },
    bio: {
      ar: "خبرة تتجاوز 20 عامًا في الرعاية الأولية وتطوير البرامج التدريبية لأطباء الأسرة.",
      en: "Over 20 years in primary care and in developing training programs for family physicians.",
    },
  },
  {
    photo: speaker2,
    name: { ar: "د. خالد المنصور", en: "Dr. Khalid Al-Mansour" },
    specialty: { ar: "الرعاية الأولية", en: "Primary Care" },
    role: { ar: "رئيس قسم الرعاية الأولية", en: "Head of Primary Care" },
    org: { ar: "مستشفى النور", en: "Al Noor Hospital" },
    bio: {
      ar: "مهتم بتطبيقات الموجات فوق الصوتية في العيادة وتحسين مسارات الإحالة.",
      en: "Focused on point-of-care ultrasound and improving referral pathways.",
    },
  },
  {
    photo: speaker3,
    name: { ar: "د. ليلى حسن", en: "Dr. Layla Hassan" },
    specialty: { ar: "طب الأطفال", en: "Pediatrics" },
    role: { ar: "أستاذة وباحثة", en: "Professor & Researcher" },
    org: { ar: "مركز المعرفة الصحي", en: "Health Knowledge Center" },
    bio: {
      ar: "أبحاث منشورة في صحة الطفل والمراهق ورعاية الأسرة الممتدة.",
      en: "Published research in child and adolescent health and extended family care.",
    },
  },
  {
    photo: speaker4,
    name: { ar: "د. عمر فاروق", en: "Dr. Omar Farouk" },
    specialty: { ar: "الصحة الرقمية", en: "Digital Health" },
    role: { ar: "أستاذ الطب الباطني", en: "Professor of Internal Medicine" },
    org: { ar: "معهد الخليج الطبي", en: "Gulf Medical Institute" },
    bio: {
      ar: "يعمل على دمج أدوات الذكاء الاصطناعي في مسارات الفرز داخل الرعاية الأولية.",
      en: "Works on integrating AI tools into primary-care triage pathways.",
    },
  },
];

export const leadership: { group: T; members: { name: T; role: T }[] }[] = [
  {
    group: { ar: "رئاسة المؤتمر", en: "Conference Chair" },
    members: [
      {
        name: { ar: "د. سارة العتيبي", en: "Dr. Sarah Al-Otaibi" },
        role: { ar: "رئيسة المؤتمر", en: "Conference Chair" },
      },
      {
        name: { ar: "د. خالد المنصور", en: "Dr. Khalid Al-Mansour" },
        role: { ar: "نائب رئيس المؤتمر", en: "Vice Chair" },
      },
    ],
  },
  {
    group: { ar: "اللجنة العلمية", en: "Scientific Committee" },
    members: [
      {
        name: { ar: "د. ليلى حسن", en: "Dr. Layla Hassan" },
        role: { ar: "رئيسة اللجنة العلمية", en: "Scientific Committee Chair" },
      },
      { name: { ar: "د. عمر فاروق", en: "Dr. Omar Farouk" }, role: { ar: "عضو", en: "Member" } },
      {
        name: { ar: "د. نورة القحطاني", en: "Dr. Noura Al-Qahtani" },
        role: { ar: "عضو", en: "Member" },
      },
    ],
  },
  {
    group: { ar: "اللجنة المنظمة", en: "Organizing Committee" },
    members: [
      {
        name: { ar: "أ. محمد الشمري", en: "Mr. Mohammed Al-Shammari" },
        role: { ar: "مدير التنظيم", en: "Operations Director" },
      },
      {
        name: { ar: "أ. هند الزهراني", en: "Ms. Hind Al-Zahrani" },
        role: { ar: "التسجيل والخدمات", en: "Registration & Services" },
      },
      {
        name: { ar: "أ. فيصل العمري", en: "Mr. Faisal Al-Omari" },
        role: { ar: "الرعاية والمعرض", en: "Sponsorship & Exhibition" },
      },
    ],
  },
];

export const pricing: {
  id: string;
  category: T;
  early: T;
  regular: T;
  earlyAmount: number;
  regularAmount: number;
  includes: T;
}[] = [
  {
    id: "consultant",
    category: { ar: "استشاري / أخصائي", en: "Consultant / Specialist" },
    early: { ar: "1,200 ريال", en: "SAR 1,200" },
    regular: { ar: "1,500 ريال", en: "SAR 1,500" },
    earlyAmount: 1200,
    regularAmount: 1500,
    includes: {
      ar: "حضور كامل + شهادة CME + الضيافة",
      en: "Full access + CME certificate + catering",
    },
  },
  {
    id: "resident",
    category: { ar: "طبيب مقيم / امتياز", en: "Resident / Intern" },
    early: { ar: "700 ريال", en: "SAR 700" },
    regular: { ar: "900 ريال", en: "SAR 900" },
    earlyAmount: 700,
    regularAmount: 900,
    includes: {
      ar: "حضور كامل + شهادة CME + الضيافة",
      en: "Full access + CME certificate + catering",
    },
  },
  {
    id: "allied",
    category: { ar: "ممارس صحي", en: "Allied health practitioner" },
    early: { ar: "600 ريال", en: "SAR 600" },
    regular: { ar: "800 ريال", en: "SAR 800" },
    earlyAmount: 600,
    regularAmount: 800,
    includes: { ar: "حضور كامل + شهادة حضور", en: "Full access + attendance certificate" },
  },
  {
    id: "student",
    category: { ar: "طالب طب", en: "Medical student" },
    early: { ar: "300 ريال", en: "SAR 300" },
    regular: { ar: "450 ريال", en: "SAR 450" },
    earlyAmount: 300,
    regularAmount: 450,
    includes: { ar: "حضور الجلسات العلمية", en: "Scientific sessions access" },
  },
];

export const sponsors: { tier: T; names: string[] }[] = [
  { tier: { ar: "الراعي الماسي", en: "Diamond sponsor" }, names: ["MediTrust"] },
  { tier: { ar: "الرعاة الذهبيون", en: "Gold sponsors" }, names: ["GulfPharm", "NovaLab"] },
  {
    tier: { ar: "الرعاة الفضيون", en: "Silver sponsors" },
    names: ["CareBridge", "Vitalis", "HealthLink"],
  },
  {
    tier: { ar: "شركاء المعرض", en: "Exhibition partners" },
    names: ["OrbitMed", "SanaCare", "PrimeDx", "Medira"],
  },
];

export const contacts: { title: T; email: string; phone: string }[] = [
  {
    title: { ar: "دعم التسجيل", en: "Registration support" },
    email: "register@deepdive2026.sa",
    phone: "+966 11 000 2200",
  },
  {
    title: { ar: "الملخصات والبوسترات", en: "Abstracts & posters" },
    email: "abstracts@deepdive2026.sa",
    phone: "+966 11 000 2201",
  },
  {
    title: { ar: "الرعاية والمعرض", en: "Sponsorship & exhibition" },
    email: "sponsors@deepdive2026.sa",
    phone: "+966 11 000 2202",
  },
  {
    title: { ar: "الاستفسارات العامة", en: "General enquiries" },
    email: "info@deepdive2026.sa",
    phone: "+966 11 000 2203",
  },
];

export const nav = [
  { to: "/program", label: { ar: "البرنامج العلمي", en: "Program" } },
  { to: "/workshops", label: { ar: "ورش العمل", en: "Workshops" } },
  { to: "/speakers", label: { ar: "المتحدثون", en: "Speakers" } },
  { to: "/leadership", label: { ar: "قيادة المؤتمر", en: "Leadership" } },
  { to: "/registration", label: { ar: "التسجيل", en: "Registration" } },
  { to: "/abstracts", label: { ar: "الملخصات", en: "Abstracts" } },
  { to: "/venue", label: { ar: "الموقع", en: "Venue" } },
  { to: "/sponsors", label: { ar: "الرعاة", en: "Sponsors" } },
  { to: "/contact", label: { ar: "التواصل", en: "Contact" } },
] as const;
