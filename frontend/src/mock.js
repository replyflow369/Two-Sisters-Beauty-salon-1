// Two Sisters Beauty Salon — content source of truth (mock data)
import { Sparkles, Flower2, Sun, Hand, Footprints, Gem, ShieldCheck, HeartHandshake, Clock3, Award } from 'lucide-react';

export const BRAND = {
  name: 'Two Sisters',
  tagline: 'Beauty Salon',
  address: '327 Stanmore Road, Richmond, Christchurch 8013',
  phone: '03 930 0449',
  phoneHref: 'tel:+6439300449',
  email: 'twosistersbeautychch@gmail.com',
  hours: [
    { day: 'Monday – Friday', time: '9:00 am – 6:00 pm' },
    { day: 'Saturday', time: '9:00 am – 6:00 pm' },
    { day: 'Sunday', time: 'Closed' },
  ],
  bookingUrl: 'https://bookings.gettimely.com/twosistersbeautysalon/bb/book',
};

export const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit', href: '#contact' },
];

export const TRUST = [
  { icon: HeartHandshake, title: 'Personal care', copy: 'Treatments tailored to you' },
  { icon: ShieldCheck, title: 'Hygienic & safe', copy: 'Clean, professional service' },
  { icon: Award, title: 'Refined experience', copy: 'Considered care, always' },
  { icon: Clock3, title: 'Easy booking', copy: 'Simple appointments' },
];

export const SERVICES = [
  { icon: Flower2, key: 'threading', title: 'Threading & Waxing', copy: 'Precise brow shaping and full-body waxing for a clean, polished finish.', image: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85' },
  { icon: Sparkles, key: 'brows', title: 'Brows & Lashes', copy: 'Henna brows, lash lifts and tinting to define and enhance your natural look.', image: 'https://images.unsplash.com/photo-1639629509821-c54cdd984227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85' },
  { icon: Sun, key: 'facials', title: 'Facials', copy: 'Relaxing treatments designed to cleanse, hydrate and brighten your skin.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85' },
  { icon: Hand, key: 'manicure', title: 'Manicure', copy: 'Express to classic manicures, gel finishes and nail art for neat hands.', image: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuaWN1cmV8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85' },
  { icon: Footprints, key: 'pedicure', title: 'Pedicure', copy: 'Express to classic pedicures with a relaxing massage add-on for tired feet.', image: 'https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { icon: Gem, key: 'piercing', title: 'Piercing', copy: 'Ear and nose piercing, including cubic zirconia and mirror ball options.', image: 'https://images.unsplash.com/photo-1643684391140-c5056cfd3436?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85' },
];

export const STATS = [
  { value: 12, suffix: '+', label: 'Years of care' },
  { value: 6800, suffix: '+', label: 'Happy clients' },
  { value: 45, suffix: '', label: 'Signature treatments' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
];

export const PROCESS = [
  { step: '01', title: 'Consult', copy: 'A calm chat about your skin, style and what would make you feel your best.' },
  { step: '02', title: 'Prepare', copy: 'A clean, considered room. Skin-friendly products laid out just for you.' },
  { step: '03', title: 'Treatment', copy: 'Focused, unhurried care delivered by experienced hands.' },
  { step: '04', title: 'Aftercare', copy: 'Honest advice and simple steps to keep your results looking fresh.' },
];

export const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85', tag: 'Facials', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuaWN1cmV8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85', tag: 'Manicure', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85', tag: 'Lashes', size: 'square' },
  { src: 'https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'French', size: 'square' },
  { src: 'https://images.unsplash.com/photo-1643684391140-c5056cfd3436?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85', tag: 'Massage', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1639629509821-c54cdd984227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85', tag: 'Brows', size: 'tall' },
];

export const TESTIMONIALS = [
  { name: 'Amelia Turner', role: 'Regular client, Merivale', quote: 'The most calming appointment in my week. My brows have never looked better, and Priya notices everything.', avatar: 'https://images.unsplash.com/photo-1672794776762-18dddc72982e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwzfHxiZWF1dHklMjBwb3J0cmFpdHxlbnwwfHx8fDE3ODk5MDAxMjh8MA&ixlib=rb-4.1.0&q=85', rating: 5 },
  { name: 'Sophie Alexander', role: 'Bridal client, Christchurch', quote: 'A truly considered experience from the moment you walk in. My skin was glowing on my wedding day.', avatar: 'https://images.unsplash.com/photo-1603775020644-eb8decd79994?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxiZWF1dHklMjBwb3J0cmFpdHxlbnwwfHx8fDE3ODk5MDAxMjh8MA&ixlib=rb-4.1.0&q=85', rating: 5 },
  { name: 'Isabella Reyes', role: 'New client, Richmond', quote: 'Honest, warm and completely unhurried. Best henna brows I have ever had — worth every dollar.', avatar: 'https://images.pexels.com/photos/17387800/pexels-photo-17387800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', rating: 5 },
];

export const FAQ = [
  { q: 'Do I need to book in advance?', a: 'We recommend booking a few days ahead, especially for Saturdays. Online booking through our system is the quickest way to secure your preferred time.' },
  { q: 'What products do you use?', a: 'We work with skin-friendly, professional-grade products chosen for their results and gentleness. If you have sensitive skin, please let us know at consultation.' },
  { q: 'Can I combine treatments in one visit?', a: 'Absolutely — many clients pair a facial with brow shaping or a manicure. Our team will help you build the perfect combination and time it thoughtfully.' },
  { q: 'What is your cancellation policy?', a: 'A courteous 24 hours notice is appreciated so we can offer your slot to another client. We understand life happens — please just get in touch.' },
  { q: 'Do you offer gift vouchers?', a: 'Yes. Vouchers are a beautiful way to gift a treatment. Ask us in salon or by email and we will arrange one for you.' },
];

export const HERO_IMAGE = 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export const PRICING = {
  threading: {
    title: 'Threading & Waxing',
    groups: [{ items: [
      ['Eyebrows Shape', '$14'], ['Upper Lip / Chin / Forehead', '$8'], ['Cheek / Nose / Ear', '$8'],
      ['Side Burns', '$13'], ['Neck', '$15'], ['Full Face', '$55'],
      ['Underarms', '$15'], ['Stomach', '$18'], ['Back', '$32'],
      ['Half Arms', '$18'], ['¾ Arms', '$22'], ['Full Arms', '$28'],
      ['Half Legs', '$28'], ['¾ Legs', '$32'], ['Full Legs', '$42'],
      ['Bikini', '$20'], ['Bikini Extended', '$25'], ['Bikini & Full Legs', '$55'],
      ['Brazilian Maintenance (within 5 weeks)', '$40'], ['Brazilian First Visit', '$50'],
      ['Brazilian Maintenance & Full Legs', '$78'], ['Brazilian First Visit & Full Legs', '$88'],
      ['Full Body', '$190'],
    ]}],
  },
  brows: {
    title: 'Brows, Lashes & Tinting',
    groups: [
      { name: 'Henna Brows', items: [['Henna Brows', '$39'], ['Henna Brow & Shape', '$48']] },
      { name: 'Lash Lift & Perming', items: [['Lash Lift', '$60'], ['Lash Lift + Tint', '$70']] },
      { name: 'Tinting', items: [['Eyebrows Tint', '$12'], ['Eyelashes Tint', '$16'], ['Eyetrio – Brow Shape, Tint & Lash Tint', '$39'], ['Eyetrio + Head Massage', '$42']] },
      { name: 'Massage', items: [['Coconut Oil Head Massage (20 min)', '$25']] },
    ],
  },
  facials: {
    title: 'Facials',
    groups: [{ items: [
      ['Express Facial (45 min)', '$55'], ['Calming Anti-Stress Facial (1 hr)', '$110'],
      ['Clear Skin Facial (1 hr)', '$80'], ['Deluxe Facial (1 hr)', '$95'],
    ]}],
  },
  mens: {
    title: 'Men\u2019s Threading & Waxing',
    groups: [{ items: [
      ['Eyebrows Shape', '$15'], ['Nose / Ear', '$12'], ['Back', '$35'], ['Chest', '$30'],
      ['Shoulders', '$20'], ['Chest & Shoulders', '$42'], ['Back & Shoulders', '$48'],
      ['Chest & Stomach', '$48'], ['Half Arms', '$28'], ['Full Arms', '$38'],
      ['Half Legs', '$38'], ['¾ Legs', '$48'],
    ]}],
  },
  piercing: {
    title: 'Piercing',
    groups: [{ items: [
      ['Ear Piercing', 'from $45'], ['Ear Piercing – Cubic Zirconia (2mm & 3mm)', '$45'],
      ['Ear Piercing – Mirror Ball', '$50'], ['Nose Piercing', '$55'],
    ]}],
  },
  nails: {
    title: 'Nail Prices',
    groups: [
      { name: 'Manicures – Hands', items: [
        ['Express Tidy Manicure – without polish', '$30'], ['Express Tidy Manicure – with polish', '$35'],
        ['Express Tidy Manicure – gel polish (no removal)', '$40'], ['Express Tidy Manicure – gel polish (with removal)', '$45'],
        ['Classic Manicure – with or without traditional polish', '$50'], ['Classic Manicure – gel polish', '$55'],
        ['Gel Polish Colour Add-On', '$15'], ['Gel Removal Only', '$15'], ['French Finish', '$10'],
        ['Nail Art (per nail)', '$5'], ['Nail Repair (per nail)', '$8'],
        ['Children\u2019s Gel Manicure (under 12)', '$35'], ['Children\u2019s Manicure – traditional polish (under 12)', '$25'],
        ['Children\u2019s Manicure – polish only (under 12)', '$15'],
      ]},
      { name: 'Pedicures – Toes', items: [
        ['Express Tidy Pedicure – with or without traditional polish', '$40'], ['Express Tidy Pedicure – gel polish', '$45'],
        ['Classic Pedicure – with or without traditional polish', '$60'], ['Classic Pedicure – gel polish', '$65'],
        ['10-Min Massage Add-On', '$10'],
        ['Children\u2019s Gel Pedicure (under 12)', '$40'], ['Children\u2019s Pedicure – traditional polish (under 12)', '$30'],
        ['Children\u2019s Pedicure – polish only (under 12)', '$15'],
      ]},
      { name: 'Nail Trim', items: [['Nail Trim & Shape – Hands', '$12'], ['Nail Trim & Shape – Toes', '$15']] },
    ],
  },
};
