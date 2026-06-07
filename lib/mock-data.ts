export type CategoryId =
  | "all"
  | "sofra"
  | "kahvalti"
  | "cay"
  | "oyun"
  | "kadin"
  | "atolye"

export type Category = {
  id: CategoryId
  label: string
  short: string
  description: string
}

export const categories: Category[] = [
  { id: "all", label: "Tümü", short: "Tümü", description: "Tüm etkinlikler" },
  {
    id: "sofra",
    label: "Sofra Akşamı",
    short: "Sofra",
    description: "6 yabancıyla samimi bir akşam yemeği",
  },
  {
    id: "kahvalti",
    label: "Kahvaltı Buluşması",
    short: "Kahvaltı",
    description: "Pazar sabahı uzun, keyifli Türk kahvaltısı",
  },
  {
    id: "cay",
    label: "Çay & Muhabbet",
    short: "Çay",
    description: "Derin sohbet için küçük çay halkası",
  },
  {
    id: "oyun",
    label: "Oyun Gecesi",
    short: "Oyun",
    description: "Mafya, tabu ve kutu oyunları",
  },
  {
    id: "kadin",
    label: "Kadınlara Özel",
    short: "Kadınlara",
    description: "Sadece kadınların katıldığı güvenli akşam",
  },
  {
    id: "atolye",
    label: "Atölye",
    short: "Atölye",
    description: "Seramik, yemek pişirme, ebru gibi atölyeler",
  },
]

export type Event = {
  id: string
  category: Exclude<CategoryId, "all">
  title: string
  hostNote: string
  date: string
  dateLong: string
  time: string
  endTime: string
  city: "İstanbul" | "Ankara" | "İzmir" | "Bursa" | "Antalya"
  neighborhood: string
  fullAddress: string
  seatsLeft: number
  totalSeats: number
  price: number
  ageRange: string
  image: string
  mood: string
  icebreakers: string[]
  whatHappens: string[]
}

export const events: Event[] = [
  {
    id: "evt-cihangir",
    category: "sofra",
    title: "Cihangir'de Mevsim Sofrası",
    hostNote:
      "Küçük, sıcak bir restoranda 6 kişilik bir masa ayırdık. Mezeler, ana yemek ve tatlı eşliğinde yeni hikâyeler.",
    date: "Cuma · 20:00",
    dateLong: "15 Mayıs Cuma",
    time: "20:00",
    endTime: "23:00",
    city: "İstanbul",
    neighborhood: "Cihangir, Beyoğlu",
    fullAddress: "Akarsu Cad. No:32, Cihangir / İstanbul",
    seatsLeft: 2,
    totalSeats: 6,
    price: 149,
    ageRange: "26 – 36",
    image: "/turkish-meze-table-warm-candlelight-cihangir-resta.jpg",
    mood: "Sıcak, samimi, mum ışığı",
    icebreakers: [
      "En garip yemek kombinasyonun ne?",
      "Şehirde en sevdiğin gizli köşe?",
      "Babanın sana öğrettiği bir söz?",
    ],
    whatHappens: [
      "Tanışma turu (3 dakika kuralı)",
      "Mevsim mezeleri ile sofra açılışı",
      "“İlk kahkaha garantisi” soru kartları",
      "Tatlı eşliğinde anı paylaşımı",
    ],
  },
  {
    id: "evt-moda-kahvalti",
    category: "kahvalti",
    title: "Moda'da Uzun Kahvaltı",
    hostNote:
      "Deniz manzaralı bir kahvaltı bahçesinde, eski usul Türk kahvaltısı. Demli çay sınırsız.",
    date: "Pazar · 10:30",
    dateLong: "17 Mayıs Pazar",
    time: "10:30",
    endTime: "13:00",
    city: "İstanbul",
    neighborhood: "Moda, Kadıköy",
    fullAddress: "Moda Cad. No:140, Kadıköy / İstanbul",
    seatsLeft: 3,
    totalSeats: 7,
    price: 219,
    ageRange: "24 – 38",
    image: "/turkish-breakfast-spread-with-tea-glasses-and-simi.jpg",
    mood: "Güneşli, ferah, deniz kokulu",
    icebreakers: [
      "Çocuklukta en sevdiğin kahvaltı sofrası neydi?",
      "Hangi şehrin kahvaltısı en iyisi?",
      "Bu hafta hayatına giren güzel bir şey?",
    ],
    whatHappens: [
      "Sınırsız demli çay",
      "“Sofra hatırası” fotoğraf turu",
      "Mahalle yürüyüşü (opsiyonel)",
    ],
  },
  {
    id: "evt-cay-besiktas",
    category: "cay",
    title: "Çay & Muhabbet Halkası",
    hostNote:
      "5 kişilik küçük bir halka. Telefonlar bir kutuya, sohbet derinleşsin.",
    date: "Çarşamba · 19:30",
    dateLong: "20 Mayıs Çarşamba",
    time: "19:30",
    endTime: "21:30",
    city: "İstanbul",
    neighborhood: "Beşiktaş",
    fullAddress: "Akaretler 12. Sok. No:8, Beşiktaş / İstanbul",
    seatsLeft: 1,
    totalSeats: 5,
    price: 89,
    ageRange: "28 – 42",
    image: "/turkish-tea-glasses-on-wooden-table-cozy-evening-l.jpg",
    mood: "Sakin, derin, mum ışığı",
    icebreakers: [
      "Son zamanlarda seni en çok etkileyen kitap?",
      "Bir günü baştan yaşasan ne değiştirirdin?",
      "Sessizlikten ne anlıyorsun?",
    ],
    whatHappens: [
      "Telefonlar kutuya",
      "3 derin soru turu",
      "Demli çay & kuru pasta",
    ],
  },
  {
    id: "evt-oyun-kadikoy",
    category: "oyun",
    title: "Mafya Gecesi · Yedek Kontör",
    hostNote:
      "Klasik mafya, biraz da “Bir Şair, Bir Yalancı”. 8 kişilik şenlikli bir gece.",
    date: "Cumartesi · 21:00",
    dateLong: "16 Mayıs Cumartesi",
    time: "21:00",
    endTime: "00:30",
    city: "İstanbul",
    neighborhood: "Kadıköy",
    fullAddress: "Yeldeğirmeni, Misak-ı Milli Sok. No:12, Kadıköy",
    seatsLeft: 4,
    totalSeats: 8,
    price: 129,
    ageRange: "23 – 35",
    image: "/board-game-night-cards-on-table-warm-string-lights.jpg",
    mood: "Enerjik, kahkahalı",
    icebreakers: [
      "En iyi yalanını söyle, biz inanalım.",
      "Hangi karakter sensin: dedektif mi mafya mı?",
    ],
    whatHappens: [
      "3 tur mafya",
      "Atıştırmalık & limonata",
      "Final turu: doğaçlama hikâye",
    ],
  },
  {
    id: "evt-kadin-nisantasi",
    category: "kadin",
    title: "Kadınlara Özel Akşam · Nişantaşı",
    hostNote:
      "Sadece kadınların katıldığı küçük, güvenli bir akşam. Şarap & meze.",
    date: "Perşembe · 20:00",
    dateLong: "21 Mayıs Perşembe",
    time: "20:00",
    endTime: "23:00",
    city: "İstanbul",
    neighborhood: "Nişantaşı, Şişli",
    fullAddress: "Abdi İpekçi Cad. No:24, Nişantaşı / İstanbul",
    seatsLeft: 2,
    totalSeats: 6,
    price: 189,
    ageRange: "27 – 40",
    image: "/elegant-dinner-table-with-flowers-women-only-warm-.jpg",
    mood: "Şık, içten, kız kıza",
    icebreakers: [
      "Bu yıl kendine verdiğin en güzel söz?",
      "Yeniden 22 olsan ne yaparsın?",
    ],
    whatHappens: [
      "Tanışma & şarap servisi",
      "“Kadın olmak” üstüne kart soruları",
      "Tatlı & kahve",
    ],
  },
  {
    id: "evt-atolye-seramik",
    category: "atolye",
    title: "Seramik Atölyesi · Karaköy",
    hostNote:
      "Sıfırdan bir kupa şekillendireceğiz. Ustamız Aylin eşliğinde, çay molalı.",
    date: "Cumartesi · 14:00",
    dateLong: "23 Mayıs Cumartesi",
    time: "14:00",
    endTime: "17:00",
    city: "İstanbul",
    neighborhood: "Karaköy",
    fullAddress: "Kemankeş Cad. No:45, Karaköy / İstanbul",
    seatsLeft: 5,
    totalSeats: 8,
    price: 349,
    ageRange: "20 – 50",
    image: "/ceramic-pottery-workshop-hands-shaping-clay-warm-l.jpg",
    mood: "Yaratıcı, sakin, çamur kokulu",
    icebreakers: [
      "Elinle yaptığın son şey neydi?",
      "Bir nesneyi neden saklıyorsun?",
    ],
    whatHappens: [
      "Çamur şekillendirme",
      "Çay & kurabiye molası",
      "Kupanın fırınlanma süreci anlatımı",
    ],
  },
]

export const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"] as const

export type Attendee = {
  id: string
  alias: string
  ruh: string
  trustScore: number
}

export const sampleAttendees: Attendee[] = [
  { id: "a1", alias: "Misafir 1", ruh: "Çay Bardağı", trustScore: 9.2 },
  { id: "a2", alias: "Misafir 2", ruh: "Nazar", trustScore: 8.7 },
  { id: "a3", alias: "Misafir 3", ruh: "Simit", trustScore: 9.5 },
  { id: "a4", alias: "Misafir 4", ruh: "Lokum", trustScore: 8.1 },
  { id: "a5", alias: "Misafir 5", ruh: "Kına", trustScore: 9.0 },
]

export type QuizQuestion = {
  id: string
  q: string
  options: { id: string; label: string; ruh: string }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    q: "Cumartesi sabahı ideal planın?",
    options: [
      { id: "a", label: "Sakin, uzun bir kahvaltı", ruh: "Simit" },
      { id: "b", label: "Enerjik bir oyun gecesi öncesi yürüyüş", ruh: "Nazar" },
      { id: "c", label: "Bir sergi, sonra kahve", ruh: "Çay Bardağı" },
      { id: "d", label: "Mutfakta bir şey pişirmek", ruh: "Lokum" },
    ],
  },
  {
    id: "q2",
    q: "Muhabbette seni en çok ne çeker?",
    options: [
      { id: "a", label: "Derin, sessiz dinleyenler", ruh: "Çay Bardağı" },
      { id: "b", label: "Kahkaha attıran espriler", ruh: "Lokum" },
      { id: "c", label: "Yeni fikirler, tartışma", ruh: "Nazar" },
      { id: "d", label: "Anılar ve hikâyeler", ruh: "Simit" },
    ],
  },
  {
    id: "q3",
    q: "Sofrada en sevdiğin yer?",
    options: [
      { id: "a", label: "Pencere kenarı, sokağı izlemek", ruh: "Çay Bardağı" },
      { id: "b", label: "Tam ortası, herkesle göz göze", ruh: "Lokum" },
      { id: "c", label: "Mutfak tarafı, yardım edebileceğim yer", ruh: "Simit" },
      { id: "d", label: "Bir köşe, sessiz gözlem", ruh: "Nazar" },
    ],
  },
  {
    id: "q4",
    q: "Yeni biriyle tanışınca ilk sorduğun?",
    options: [
      { id: "a", label: "Nereden geliyorsun?", ruh: "Simit" },
      { id: "b", label: "Bu hafta seni mutlu eden bir şey?", ruh: "Lokum" },
      { id: "c", label: "Ne okuyorsun bugünlerde?", ruh: "Çay Bardağı" },
      { id: "d", label: "Hayatın en garip anısı?", ruh: "Nazar" },
    ],
  },
  {
    id: "q5",
    q: "Akşam bittiğinde içinde kalan en güzel şey?",
    options: [
      { id: "a", label: "Yeni bir hikâye", ruh: "Simit" },
      { id: "b", label: "Gerçek bir kahkaha", ruh: "Lokum" },
      { id: "c", label: "Bir cümle, günlerce düşünülecek", ruh: "Çay Bardağı" },
      { id: "d", label: "Beklenmedik bir bağlantı", ruh: "Nazar" },
    ],
  },
  {
    id: "q6",
    q: "Sofranın olmazsa olmazı?",
    options: [
      { id: "a", label: "Demli çay", ruh: "Çay Bardağı" },
      { id: "b", label: "Tatlı bir şey", ruh: "Lokum" },
      { id: "c", label: "Yeni tanıdık biri", ruh: "Nazar" },
      { id: "d", label: "Sıcak ekmek kokusu", ruh: "Simit" },
    ],
  },
  {
    id: "q7",
    q: "Telefonunla aran nasıl?",
    options: [
      { id: "a", label: "Sofrada cebimde unuturum", ruh: "Çay Bardağı" },
      { id: "b", label: "Fotoğraf için açılır", ruh: "Simit" },
      { id: "c", label: "Bir video paylaşmadan duramam", ruh: "Lokum" },
      { id: "d", label: "Sadece saate bakarım", ruh: "Nazar" },
    ],
  },
  {
    id: "q8",
    q: "Soframdan ne bekliyorsun?",
    options: [
      { id: "a", label: "Yeni dostluklar", ruh: "Lokum" },
      { id: "b", label: "Şehre ait hissetmek", ruh: "Simit" },
      { id: "c", label: "Sakin bir akşam", ruh: "Çay Bardağı" },
      { id: "d", label: "Kendimi keşfetmek", ruh: "Nazar" },
    ],
  },
]

export const ruhDescriptions: Record<
  string,
  { title: string; subtitle: string; emoji: string }
> = {
  "Çay Bardağı": {
    title: "Çay Bardağı",
    subtitle: "Sakin, derin, dinleyen. Sohbeti demlendirirsin.",
    emoji: "☕",
  },
  Nazar: {
    title: "Nazar",
    subtitle: "Sezgili, gözlemci, koruyucu. Sofranın iyi enerjisi.",
    emoji: "🧿",
  },
  Simit: {
    title: "Simit",
    subtitle: "Sıcak, samimi, herkese yakın. Sofranın ortak dili.",
    emoji: "🥯",
  },
  Lokum: {
    title: "Lokum",
    subtitle: "Tatlı, eğlenceli, kahkahalı. Sofranın neşesi.",
    emoji: "🍬",
  },
}

export const trustWallActions = [
  "Bugün 127 kişi kimliğini doğruladı",
  "Bu hafta 12 sofra başarıyla tamamlandı",
  "Geçen hafta 3 kullanıcı şikayet sonucu uzaklaştırıldı",
  "Bu ay ortalama topluluk puanı: 9.2 / 10",
  "Son 30 günde 0 ciddi olay raporu",
]

export const notifications = [
  {
    id: "n1",
    type: "rating" as const,
    title: "Dün akşamki sofra nasıldı?",
    body: "Cihangir Sofrası için kısa bir değerlendirme bırakır mısın?",
    time: "30 dk önce",
    eventId: "evt-cihangir",
    cta: "Değerlendir",
  },
  {
    id: "n2",
    type: "reminder" as const,
    title: "Yarın 20:00 — sofran hazır",
    body: "Cihangir, Akarsu Cad. No:32. Yanında: iyi enerji ve açık fikir.",
    time: "5 saat önce",
    eventId: "evt-cihangir",
    cta: "Detaylar",
  },
  {
    id: "n3",
    type: "match" as const,
    title: "Karşılıklı bağlantı kuruldu",
    body: "Misafir 3 ile mesajlaşmaya başlayabilirsin.",
    time: "Dün",
    eventId: "evt-cihangir",
    cta: "Mesajı aç",
  },
  {
    id: "n4",
    type: "trust" as const,
    title: "Kimliğin onaylandı",
    body: "Artık tüm sofralara koltuk ayırtabilirsin.",
    time: "2 gün önce",
    eventId: null,
    cta: "Etkinlikleri keşfet",
  },
]

export const pastEvents = [
  {
    id: "past-1",
    title: "Karaköy Pazar Kahvaltısı",
    date: "3 Mayıs",
    ratingGiven: 4.8,
    ratingReceived: 9.1,
    category: "kahvalti" as const,
  },
  {
    id: "past-2",
    title: "Galata Çay Halkası",
    date: "27 Nisan",
    ratingGiven: 4.6,
    ratingReceived: 8.9,
    category: "cay" as const,
  },
  {
    id: "past-3",
    title: "Beyoğlu Mafya Gecesi",
    date: "12 Nisan",
    ratingGiven: 5.0,
    ratingReceived: 9.4,
    category: "oyun" as const,
  },
]
