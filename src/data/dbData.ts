export const dbData = {
  "users": [
    {
      "id": "u-admin",
      "name": "Admin One",
      "email": "admin@demo.com",
      "password": "demo123",
      "role": "admin",
      "phone": "+91 90000 00002",
      "city": "Ahmedabad",
      "status": "active",
      "address": "CG Road, Ahmedabad",
      "about": "Platform admin for EventBiz Garba inventory."
    },
    {
      "id": "u-customer",
      "name": "Customer Priya",
      "email": "customer@demo.com",
      "password": "demo123",
      "role": "customer",
      "phone": "+91 98765 43210",
      "city": "Ahmedabad",
      "status": "active",
      "address": "Satellite, Ahmedabad"
    },
    {
      "id": "u-customer-2",
      "name": "Aarav Patel",
      "email": "aarav@demo.com",
      "password": "demo123",
      "role": "customer",
      "phone": "+91 98111 22334",
      "city": "Ahmedabad",
      "status": "active"
    },
    {
      "id": "u-scanner",
      "name": "Gate Scanner",
      "email": "scanner@demo.com",
      "password": "demo123",
      "role": "scanner",
      "phone": "+91 90000 44444",
      "city": "Ahmedabad",
      "status": "active",
      "about": "Venue entry scanner — verify Garba pass QR codes at the gate."
    }
  ],
  "events": [
    {
      "id": "e3",
      "name": "Dandiya Royale — One Night",
      "subtitle": "Single mega night · Science City",
      "adminId": "u-admin",
      "date": "2026-10-11",
      "endDate": "2026-10-11",
      "startTime": "19:00",
      "endTime": "01:00",
      "gatesOpen": "17:30",
      "venue": "Science City Amphitheatre",
      "address": "Science City Road, Sola, Ahmedabad 380060",
      "city": "Ahmedabad",
      "area": "Sola",
      "landmark": "Sola flyover LED",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/places/p04.jpg",
        "/images/places/p10.jpg"
      ],
      "shortDescription": "Single-night mega dandiya if you do not need the full 9x.",
      "description": "One-night Science City production for guests who want a single mega night instead of the 9x bundle.",
      "category": "Concert / Dandiya",
      "tags": [
        "Single night",
        "Mega",
        "LED stage"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 mega night",
      "dressCode": "Festive",
      "convenienceFee": 49,
      "publicPriceFrom": 799,
      "featured": false,
      "offerType": "single",
      "nights": 1,
      "highlights": [
        "National-style LED stage",
        "Lawn + gallery"
      ],
      "amenities": [
        "Large parking",
        "Food courts"
      ],
      "lineup": [
        {
          "name": "Royale Orchestra",
          "role": "Opening"
        }
      ],
      "schedule": [
        {
          "time": "17:30",
          "title": "Gates"
        },
        {
          "time": "19:30",
          "title": "Dandiya ras"
        }
      ],
      "terms": [
        "No re-entry"
      ],
      "refundPolicy": "Full refund until 72h before gates.",
      "faqs": [
        {
          "q": "Included in 9x?",
          "a": "East & Mega 9x includes a Science City night on Day 1 — this is a separate single sale."
        }
      ],
      "matchTags": [
        "high_energy",
        "group_friendly"
      ],
      "marketPrice": 1100
    },
    {
      "id": "e4",
      "name": "Family Garba — Maninagar Night",
      "subtitle": "Kids zone · Budget single",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "18:30",
      "endTime": "23:30",
      "gatesOpen": "17:45",
      "venue": "Maninagar Rambaug Ground",
      "address": "Near Rambaug, Maninagar, Ahmedabad 380008",
      "city": "Ahmedabad",
      "area": "Maninagar",
      "landmark": "Rambaug circle",
      "status": "active",
      "image": "/images/garba-fest/garba-02.jpg",
      "gallery": [
        "/images/places/p07.jpg"
      ],
      "shortDescription": "Neighbourhood family night at Maninagar Rambaug Ground.",
      "description": "Budget-friendly single night with kids zone — or upgrade to a 9x bundle for the full season.",
      "category": "Family",
      "tags": [
        "Kids",
        "Budget",
        "Single night"
      ],
      "languages": [
        "Gujarati",
        "Hindi"
      ],
      "ageLimit": "Kids under 12 with adult",
      "durationLabel": "Early family slot",
      "dressCode": "Casual festive",
      "convenienceFee": 19,
      "publicPriceFrom": 299,
      "featured": false,
      "offerType": "single",
      "nights": 1,
      "highlights": [
        "Kids zone",
        "Early family ras"
      ],
      "amenities": [
        "First-aid",
        "Volunteer desk"
      ],
      "lineup": [
        {
          "name": "Local Mandli",
          "role": "Orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Aarti"
        },
        {
          "time": "18:45",
          "title": "Family Garba"
        }
      ],
      "terms": [
        "Kids must be accompanied"
      ],
      "refundPolicy": "48h refund window.",
      "faqs": [
        {
          "q": "Kids zone free?",
          "a": "Yes with paying adult ticket."
        }
      ],
      "matchTags": [
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 400
    },
    {
      "id": "e-v-01",
      "name": "Mandavadi – Garba & Mandli — Single Night",
      "subtitle": "Individual venue pass · Ognaj Circle",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Mandavadi – Garba & Mandli",
      "address": "Nidhivan Party Plot, Ognaj Circle, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Ognaj Circle",
      "landmark": "Nidhivan Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg"
      ],
      "shortDescription": "One-night Garba pass at Mandavadi – Garba & Mandli.",
      "description": "Buy an individual night pass for Mandavadi – Garba & Mandli at Nidhivan Party Plot, Ognaj Circle, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Ognaj Circle",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 499,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-01",
      "highlights": [
        "Entry at Mandavadi – Garba & Mandli",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value"
      ],
      "marketPrice": 650
    },
    {
      "id": "e-v-02",
      "name": "Mandalam Garba — Single Night",
      "subtitle": "Individual venue pass · Bopal",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Mandalam Garba",
      "address": "VIP Road, Bopal, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bopal",
      "landmark": "VIP Road",
      "status": "active",
      "image": "/images/garba-fest/garba-02.jpg",
      "gallery": [
        "/images/garba-fest/garba-02.jpg"
      ],
      "shortDescription": "One-night Garba pass at Mandalam Garba.",
      "description": "Buy an individual night pass for Mandalam Garba at VIP Road, Bopal, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bopal",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 549,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-02",
      "highlights": [
        "Entry at Mandalam Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 750
    },
    {
      "id": "e-v-03",
      "name": "Dholki Garba – The Premium Mandli — Single Night",
      "subtitle": "Individual venue pass · Ognaj–Bhadaj",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Dholki Garba – The Premium Mandli",
      "address": "Ognaj–Bhadaj, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Ognaj–Bhadaj",
      "landmark": "Ognaj–Bhadaj",
      "status": "active",
      "image": "/images/garba-fest/garba-03.jpg",
      "gallery": [
        "/images/garba-fest/garba-03.jpg"
      ],
      "shortDescription": "One-night Garba pass at Dholki Garba – The Premium Mandli.",
      "description": "Buy an individual night pass for Dholki Garba – The Premium Mandli at Ognaj–Bhadaj, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Ognaj–Bhadaj",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 599,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-03",
      "highlights": [
        "Entry at Dholki Garba – The Premium Mandli",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium"
      ],
      "marketPrice": 800
    },
    {
      "id": "e-v-04",
      "name": "Maa Ni Mandvi — Single Night",
      "subtitle": "Individual venue pass · Opp. LK Farm Road",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Maa Ni Mandvi",
      "address": "Opp. LK Farm Road, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Opp. LK Farm Road",
      "landmark": "Opp. LK Farm Road",
      "status": "active",
      "image": "/images/garba-fest/garba-04.jpg",
      "gallery": [
        "/images/garba-fest/garba-04.jpg"
      ],
      "shortDescription": "One-night Garba pass at Maa Ni Mandvi.",
      "description": "Buy an individual night pass for Maa Ni Mandvi at Opp. LK Farm Road, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Opp. LK Farm Road",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 649,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-04",
      "highlights": [
        "Entry at Maa Ni Mandvi",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "high_energy",
        "group_friendly"
      ],
      "marketPrice": 900
    },
    {
      "id": "e-v-05",
      "name": "Ghammardi – Garba & Mandli — Single Night",
      "subtitle": "Individual venue pass · Khodiyar",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Ghammardi – Garba & Mandli",
      "address": "Khodiyar, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Khodiyar",
      "landmark": "Khodiyar",
      "status": "active",
      "image": "/images/garba-fest/garba-05.jpg",
      "gallery": [
        "/images/garba-fest/garba-05.jpg"
      ],
      "shortDescription": "One-night Garba pass at Ghammardi – Garba & Mandli.",
      "description": "Buy an individual night pass for Ghammardi – Garba & Mandli at Khodiyar, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Khodiyar",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 699,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-05",
      "highlights": [
        "Entry at Ghammardi – Garba & Mandli",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium"
      ],
      "marketPrice": 950
    },
    {
      "id": "e-v-06",
      "name": "Radhevan – The Mandli Garba — Single Night",
      "subtitle": "Individual venue pass · Bopal",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Radhevan – The Mandli Garba",
      "address": "S.P. Ring Road, Bopal, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bopal",
      "landmark": "S.P. Ring Road",
      "status": "active",
      "image": "/images/garba-fest/garba-06.jpg",
      "gallery": [
        "/images/garba-fest/garba-06.jpg"
      ],
      "shortDescription": "One-night Garba pass at Radhevan – The Mandli Garba.",
      "description": "Buy an individual night pass for Radhevan – The Mandli Garba at S.P. Ring Road, Bopal, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bopal",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 749,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-06",
      "highlights": [
        "Entry at Radhevan – The Mandli Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 1000
    },
    {
      "id": "e-v-07",
      "name": "Swarnim Nagari Garba — Single Night",
      "subtitle": "Individual venue pass · Makarba",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Swarnim Nagari Garba",
      "address": "LJ University Road, Makarba, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Makarba",
      "landmark": "LJ University Road",
      "status": "active",
      "image": "/images/garba-fest/garba-07.jpg",
      "gallery": [
        "/images/garba-fest/garba-07.jpg"
      ],
      "shortDescription": "One-night Garba pass at Swarnim Nagari Garba.",
      "description": "Buy an individual night pass for Swarnim Nagari Garba at LJ University Road, Makarba, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Makarba",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 799,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-07",
      "highlights": [
        "Entry at Swarnim Nagari Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium",
        "artist_pick"
      ],
      "marketPrice": 1100
    },
    {
      "id": "e-v-08",
      "name": "Divi Garba — Single Night",
      "subtitle": "Individual venue pass · Khodiyar",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Divi Garba",
      "address": "Master Farm, Khodiyar, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Khodiyar",
      "landmark": "Master Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-08.jpg",
      "gallery": [
        "/images/garba-fest/garba-08.jpg"
      ],
      "shortDescription": "One-night Garba pass at Divi Garba.",
      "description": "Buy an individual night pass for Divi Garba at Master Farm, Khodiyar, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Khodiyar",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 849,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-08",
      "highlights": [
        "Entry at Divi Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "high_energy",
        "group_friendly"
      ],
      "marketPrice": 1150
    },
    {
      "id": "e-v-09",
      "name": "Maavdee — Single Night",
      "subtitle": "Individual venue pass · SG Highway",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Maavdee",
      "address": "RM Patel Farm, SG Highway, Ahmedabad",
      "city": "Ahmedabad",
      "area": "SG Highway",
      "landmark": "RM Patel Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-09.jpg",
      "gallery": [
        "/images/garba-fest/garba-09.jpg"
      ],
      "shortDescription": "One-night Garba pass at Maavdee.",
      "description": "Buy an individual night pass for Maavdee at RM Patel Farm, SG Highway, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "SG Highway",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 499,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-09",
      "highlights": [
        "Entry at Maavdee",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value"
      ],
      "marketPrice": 650
    },
    {
      "id": "e-v-10",
      "name": "Radhe Raas Garba & Mandli — Single Night",
      "subtitle": "Individual venue pass · Vivianna Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Radhe Raas Garba & Mandli",
      "address": "Vivianna Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Vivianna Farm",
      "landmark": "Vivianna Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-10.jpg",
      "gallery": [
        "/images/garba-fest/garba-10.jpg"
      ],
      "shortDescription": "One-night Garba pass at Radhe Raas Garba & Mandli.",
      "description": "Buy an individual night pass for Radhe Raas Garba & Mandli at Vivianna Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Vivianna Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 549,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-10",
      "highlights": [
        "Entry at Radhe Raas Garba & Mandli",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "premium",
        "group_friendly"
      ],
      "marketPrice": 750
    },
    {
      "id": "e-v-11",
      "name": "RaasRatri — Single Night",
      "subtitle": "Individual venue pass · Oreva Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "RaasRatri",
      "address": "Oreva Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Oreva Farm",
      "landmark": "Oreva Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-11.jpg",
      "gallery": [
        "/images/garba-fest/garba-11.jpg"
      ],
      "shortDescription": "One-night Garba pass at RaasRatri.",
      "description": "Buy an individual night pass for RaasRatri at Oreva Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Oreva Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 599,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-11",
      "highlights": [
        "Entry at RaasRatri",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional"
      ],
      "marketPrice": 800
    },
    {
      "id": "e-v-12",
      "name": "SAIBO Navratri Garba — Single Night",
      "subtitle": "Individual venue pass · Shilaj",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "SAIBO Navratri Garba",
      "address": "Mahendra Farm, Shilaj, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Shilaj",
      "landmark": "Mahendra Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-12.jpg",
      "gallery": [
        "/images/garba-fest/garba-12.jpg"
      ],
      "shortDescription": "One-night Garba pass at SAIBO Navratri Garba.",
      "description": "Buy an individual night pass for SAIBO Navratri Garba at Mahendra Farm, Shilaj, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Shilaj",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 649,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-12",
      "highlights": [
        "Entry at SAIBO Navratri Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "high_energy",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 900
    },
    {
      "id": "e-v-13",
      "name": "Prachin Mandli Garba — Single Night",
      "subtitle": "Individual venue pass · Aagman Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Prachin Mandli Garba",
      "address": "Aagman Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Aagman Farm",
      "landmark": "Aagman Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-13.jpg",
      "gallery": [
        "/images/garba-fest/garba-13.jpg"
      ],
      "shortDescription": "One-night Garba pass at Prachin Mandli Garba.",
      "description": "Buy an individual night pass for Prachin Mandli Garba at Aagman Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Aagman Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 699,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-13",
      "highlights": [
        "Entry at Prachin Mandli Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional"
      ],
      "marketPrice": 950
    },
    {
      "id": "e-v-14",
      "name": "Aangan – The Mandali Garba — Single Night",
      "subtitle": "Individual venue pass · Arrissto Club & Resort",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Aangan – The Mandali Garba",
      "address": "Arrissto Club & Resort, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Arrissto Club & Resort",
      "landmark": "Arrissto Club & Resort",
      "status": "active",
      "image": "/images/garba-fest/garba-14.jpg",
      "gallery": [
        "/images/garba-fest/garba-14.jpg"
      ],
      "shortDescription": "One-night Garba pass at Aangan – The Mandali Garba.",
      "description": "Buy an individual night pass for Aangan – The Mandali Garba at Arrissto Club & Resort, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Arrissto Club & Resort",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 749,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-14",
      "highlights": [
        "Entry at Aangan – The Mandali Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "artist_pick",
        "group_friendly"
      ],
      "marketPrice": 1000
    },
    {
      "id": "e-v-15",
      "name": "Raaton Ni Rassleela — Single Night",
      "subtitle": "Individual venue pass · Bhadaj",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Raaton Ni Rassleela",
      "address": "Evergreen Party Plot, Bhadaj, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "landmark": "Evergreen Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-15.jpg",
      "gallery": [
        "/images/garba-fest/garba-15.jpg"
      ],
      "shortDescription": "One-night Garba pass at Raaton Ni Rassleela.",
      "description": "Buy an individual night pass for Raaton Ni Rassleela at Evergreen Party Plot, Bhadaj, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bhadaj",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 799,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-15",
      "highlights": [
        "Entry at Raaton Ni Rassleela",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium"
      ],
      "marketPrice": 1100
    },
    {
      "id": "e-v-16",
      "name": "Karnavati No Sanedo — Single Night",
      "subtitle": "Individual venue pass · Aagaman Party Plot & Resort",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Karnavati No Sanedo",
      "address": "Aagaman Party Plot & Resort, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Aagaman Party Plot & Resort",
      "landmark": "Aagaman Party Plot & Resort",
      "status": "active",
      "image": "/images/garba-fest/garba-16.jpg",
      "gallery": [
        "/images/garba-fest/garba-16.jpg"
      ],
      "shortDescription": "One-night Garba pass at Karnavati No Sanedo.",
      "description": "Buy an individual night pass for Karnavati No Sanedo at Aagaman Party Plot & Resort, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Aagaman Party Plot & Resort",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 849,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-16",
      "highlights": [
        "Entry at Karnavati No Sanedo",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "high_energy",
        "traditional",
        "group_friendly"
      ],
      "marketPrice": 1150
    },
    {
      "id": "e-v-17",
      "name": "Mirchi Rock N Dhol — Single Night",
      "subtitle": "Individual venue pass · Aman/Akash Party Plot",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Mirchi Rock N Dhol",
      "address": "Aman/Akash Party Plot, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Aman/Akash Party Plot",
      "landmark": "Aman/Akash Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-17.jpg",
      "gallery": [
        "/images/garba-fest/garba-17.jpg"
      ],
      "shortDescription": "One-night Garba pass at Mirchi Rock N Dhol.",
      "description": "Buy an individual night pass for Mirchi Rock N Dhol at Aman/Akash Party Plot, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Aman/Akash Party Plot",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 499,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-17",
      "highlights": [
        "Entry at Mirchi Rock N Dhol",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "high_energy",
        "traditional",
        "best_value"
      ],
      "marketPrice": 650
    },
    {
      "id": "e-v-18",
      "name": "Sheri Garba — Single Night",
      "subtitle": "Individual venue pass · Aarav Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Sheri Garba",
      "address": "Aarav Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Aarav Farm",
      "landmark": "Aarav Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-18.jpg",
      "gallery": [
        "/images/garba-fest/garba-18.jpg"
      ],
      "shortDescription": "One-night Garba pass at Sheri Garba.",
      "description": "Buy an individual night pass for Sheri Garba at Aarav Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Aarav Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 549,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-18",
      "highlights": [
        "Entry at Sheri Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 750
    },
    {
      "id": "e-v-19",
      "name": "PYC Navratri — Single Night",
      "subtitle": "Individual venue pass · Bhadaj",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "PYC Navratri",
      "address": "M K Farm House, Bhadaj, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "landmark": "M K Farm House",
      "status": "active",
      "image": "/images/garba-fest/garba-19.jpg",
      "gallery": [
        "/images/garba-fest/garba-19.jpg"
      ],
      "shortDescription": "One-night Garba pass at PYC Navratri.",
      "description": "Buy an individual night pass for PYC Navratri at M K Farm House, Bhadaj, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bhadaj",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 599,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-19",
      "highlights": [
        "Entry at PYC Navratri",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional"
      ],
      "marketPrice": 800
    },
    {
      "id": "e-v-20",
      "name": "Aadyaraas Garba — Single Night",
      "subtitle": "Individual venue pass · Bopal",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Aadyaraas Garba",
      "address": "Sankus Farm, Bopal, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bopal",
      "landmark": "Sankus Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-20.jpg",
      "gallery": [
        "/images/garba-fest/garba-20.jpg"
      ],
      "shortDescription": "One-night Garba pass at Aadyaraas Garba.",
      "description": "Buy an individual night pass for Aadyaraas Garba at Sankus Farm, Bopal, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bopal",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 649,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-20",
      "highlights": [
        "Entry at Aadyaraas Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium",
        "high_energy",
        "group_friendly"
      ],
      "marketPrice": 900
    },
    {
      "id": "e-v-21",
      "name": "Vrindavan Nagari — Single Night",
      "subtitle": "Individual venue pass · Makarba",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Vrindavan Nagari",
      "address": "Shubh Farm, Makarba, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Makarba",
      "landmark": "Shubh Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-21.jpg",
      "gallery": [
        "/images/garba-fest/garba-21.jpg"
      ],
      "shortDescription": "One-night Garba pass at Vrindavan Nagari.",
      "description": "Buy an individual night pass for Vrindavan Nagari at Shubh Farm, Makarba, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Makarba",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 699,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-21",
      "highlights": [
        "Entry at Vrindavan Nagari",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "artist_pick"
      ],
      "marketPrice": 950
    },
    {
      "id": "e-v-22",
      "name": "Night Zero Garba — Single Night",
      "subtitle": "Individual venue pass · Bhadaj",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Night Zero Garba",
      "address": "Evergreen Party Plot, Bhadaj, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "landmark": "Evergreen Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-22.jpg",
      "gallery": [
        "/images/garba-fest/garba-22.jpg"
      ],
      "shortDescription": "One-night Garba pass at Night Zero Garba.",
      "description": "Buy an individual night pass for Night Zero Garba at Evergreen Party Plot, Bhadaj, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Bhadaj",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 749,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-22",
      "highlights": [
        "Entry at Night Zero Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly"
      ],
      "marketPrice": 1000
    },
    {
      "id": "e-v-23",
      "name": "Navli Ratri — Single Night",
      "subtitle": "Individual venue pass · Shree Ganesh Tilak Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Navli Ratri",
      "address": "Shree Ganesh Tilak Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Shree Ganesh Tilak Farm",
      "landmark": "Shree Ganesh Tilak Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-23.jpg",
      "gallery": [
        "/images/garba-fest/garba-23.jpg"
      ],
      "shortDescription": "One-night Garba pass at Navli Ratri.",
      "description": "Buy an individual night pass for Navli Ratri at Shree Ganesh Tilak Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Shree Ganesh Tilak Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 799,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-23",
      "highlights": [
        "Entry at Navli Ratri",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional"
      ],
      "marketPrice": 1100
    },
    {
      "id": "e-v-24",
      "name": "Sacred Raas — Single Night",
      "subtitle": "Individual venue pass · Sacred Raas Ground",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Sacred Raas",
      "address": "Sacred Raas Ground, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Sacred Raas Ground",
      "landmark": "Sacred Raas Ground",
      "status": "active",
      "image": "/images/garba-fest/garba-24.jpg",
      "gallery": [
        "/images/garba-fest/garba-24.jpg"
      ],
      "shortDescription": "One-night Garba pass at Sacred Raas.",
      "description": "Buy an individual night pass for Sacred Raas at Sacred Raas Ground, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Sacred Raas Ground",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 849,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-24",
      "highlights": [
        "Entry at Sacred Raas",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "high_energy",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 1150
    },
    {
      "id": "e-v-25",
      "name": "Vibe With The Night — Single Night",
      "subtitle": "Individual venue pass · Ahmedabad",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Vibe With The Night",
      "address": "Ahmedabad",
      "city": "Ahmedabad",
      "area": "Ahmedabad",
      "landmark": "Ahmedabad",
      "status": "active",
      "image": "/images/garba-fest/garba-25.jpg",
      "gallery": [
        "/images/garba-fest/garba-25.jpg"
      ],
      "shortDescription": "One-night Garba pass at Vibe With The Night.",
      "description": "Buy an individual night pass for Vibe With The Night at Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Ahmedabad",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 499,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-25",
      "highlights": [
        "Entry at Vibe With The Night",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "premium"
      ],
      "marketPrice": 650
    },
    {
      "id": "e-v-26",
      "name": "Sachi Navratri AC Dome Garba — Single Night",
      "subtitle": "Individual venue pass · Ahmedabad",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Sachi Navratri AC Dome Garba",
      "address": "Ahmedabad",
      "city": "Ahmedabad",
      "area": "Ahmedabad",
      "landmark": "Ahmedabad",
      "status": "active",
      "image": "/images/garba-fest/garba-26.jpg",
      "gallery": [
        "/images/garba-fest/garba-26.jpg"
      ],
      "shortDescription": "One-night Garba pass at Sachi Navratri AC Dome Garba.",
      "description": "Buy an individual night pass for Sachi Navratri AC Dome Garba at Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Ahmedabad",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 549,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-26",
      "highlights": [
        "Entry at Sachi Navratri AC Dome Garba",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 750
    },
    {
      "id": "e-v-27",
      "name": "AadhyaShakti Garba Prasang — Single Night",
      "subtitle": "Individual venue pass · SG Highway / Chanakyapuri",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "AadhyaShakti Garba Prasang",
      "address": "SG Highway / Chanakyapuri, Ahmedabad",
      "city": "Ahmedabad",
      "area": "SG Highway / Chanakyapuri",
      "landmark": "SG Highway / Chanakyapuri",
      "status": "active",
      "image": "/images/garba-fest/garba-27.jpg",
      "gallery": [
        "/images/garba-fest/garba-27.jpg"
      ],
      "shortDescription": "One-night Garba pass at AadhyaShakti Garba Prasang.",
      "description": "Buy an individual night pass for AadhyaShakti Garba Prasang at SG Highway / Chanakyapuri, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "SG Highway / Chanakyapuri",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 599,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-27",
      "highlights": [
        "Entry at AadhyaShakti Garba Prasang",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional"
      ],
      "marketPrice": 800
    },
    {
      "id": "e-v-28",
      "name": "La Regal's Shubhaarambh — Single Night",
      "subtitle": "Individual venue pass · Shree Hari Party Plot",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "La Regal's Shubhaarambh",
      "address": "Shree Hari Party Plot, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Shree Hari Party Plot",
      "landmark": "Shree Hari Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-28.jpg",
      "gallery": [
        "/images/garba-fest/garba-28.jpg"
      ],
      "shortDescription": "One-night Garba pass at La Regal's Shubhaarambh.",
      "description": "Buy an individual night pass for La Regal's Shubhaarambh at Shree Hari Party Plot, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Shree Hari Party Plot",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 649,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-28",
      "highlights": [
        "Entry at La Regal's Shubhaarambh",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "high_energy",
        "traditional",
        "artist_pick",
        "group_friendly"
      ],
      "marketPrice": 900
    },
    {
      "id": "e-v-29",
      "name": "Pankhida – Root of Raas — Single Night",
      "subtitle": "Individual venue pass · Shree Hari Party Plot",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "Pankhida – Root of Raas",
      "address": "Shree Hari Party Plot, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Shree Hari Party Plot",
      "landmark": "Shree Hari Party Plot",
      "status": "active",
      "image": "/images/garba-fest/garba-29.jpg",
      "gallery": [
        "/images/garba-fest/garba-29.jpg"
      ],
      "shortDescription": "One-night Garba pass at Pankhida – Root of Raas.",
      "description": "Buy an individual night pass for Pankhida – Root of Raas at Shree Hari Party Plot, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Shree Hari Party Plot",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 699,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-29",
      "highlights": [
        "Entry at Pankhida – Root of Raas",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "high_energy",
        "traditional"
      ],
      "marketPrice": 950
    },
    {
      "id": "e-v-30",
      "name": "The Garba Experience with Kinjal Dave — Single Night",
      "subtitle": "Individual venue pass · Vivenza by Gopi Farm",
      "adminId": "u-admin",
      "date": "2026-10-08",
      "endDate": "2026-10-08",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:15",
      "venue": "The Garba Experience with Kinjal Dave",
      "address": "Vivenza by Gopi Farm, Ahmedabad",
      "city": "Ahmedabad",
      "area": "Vivenza by Gopi Farm",
      "landmark": "Vivenza by Gopi Farm",
      "status": "active",
      "image": "/images/garba-fest/garba-30.jpg",
      "gallery": [
        "/images/garba-fest/garba-30.jpg"
      ],
      "shortDescription": "One-night Garba pass at The Garba Experience with Kinjal Dave.",
      "description": "Buy an individual night pass for The Garba Experience with Kinjal Dave at Vivenza by Gopi Farm, Ahmedabad. Perfect if you want this mandli only — no 9x bundle required.",
      "category": "Venue Night",
      "tags": [
        "Individual pass",
        "Single night",
        "Vivenza by Gopi Farm",
        "Mandli"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages",
      "durationLabel": "1 night",
      "dressCode": "Festive / traditional preferred",
      "convenienceFee": 29,
      "publicPriceFrom": 749,
      "featured": false,
      "offerType": "venue",
      "nights": 1,
      "placeId": "place-30",
      "highlights": [
        "Entry at The Garba Experience with Kinjal Dave",
        "Single night only",
        "Digital QR ticket",
        "Parking nearby"
      ],
      "amenities": [
        "Food stalls",
        "Washrooms",
        "First-aid desk"
      ],
      "lineup": [
        {
          "name": "House Mandli",
          "role": "Live orchestra"
        }
      ],
      "schedule": [
        {
          "time": "18:15",
          "title": "Gates open"
        },
        {
          "time": "19:00",
          "title": "Garba begins"
        },
        {
          "time": "00:00",
          "title": "Last set"
        }
      ],
      "terms": [
        "Valid for this venue & date only",
        "Show QR + ID at gate"
      ],
      "refundPolicy": "Full refund until 48h before gates.",
      "faqs": [
        {
          "q": "Is this a 9x bundle?",
          "a": "No — this is a single-night pass for this venue only."
        },
        {
          "q": "Can I upgrade to 9x later?",
          "a": "Buy a 9x bundle separately from Discover; this pass stays single-night."
        }
      ],
      "matchTags": [
        "traditional",
        "premium",
        "best_value",
        "group_friendly"
      ],
      "marketPrice": 1000
    },
    {
      "id": "e-build-5",
      "name": "Build your Navratri · 5 nights",
      "subtitle": "Progressive 5-night custom Garba itinerary",
      "adminId": "u-admin",
      "date": "2026-10-05",
      "endDate": "2026-10-13",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:00",
      "venue": "Rotating — 9 Ahmedabad mandli grounds",
      "address": "See day-wise map & itinerary",
      "city": "Ahmedabad",
      "area": "West & Bopal circuit",
      "landmark": "Mandavadi – Garba & Mandli",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg",
        "/images/garba-fest/garba-02.jpg",
        "/images/garba-fest/garba-03.jpg",
        "/images/garba-fest/garba-06.jpg",
        "/images/garba-fest/garba-07.jpg",
        "/images/garba-fest/garba-09.jpg",
        "/images/garba-fest/garba-12.jpg",
        "/images/garba-fest/garba-15.jpg",
        "/images/garba-fest/garba-39.jpg"
      ],
      "shortDescription": "Pick any 5 Navratri nights and choose venues night by night.",
      "description": "Progressive custom bundle — unlock at 5 nights, keep adding for extra savings up to 9 nights.",
      "category": "Custom Bundle",
      "tags": [
        "Build your Navratri",
        "5 nights",
        "Progressive",
        "Ahmedabad"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages (under 5 free with adult)",
      "durationLabel": "5 nights",
      "dressCode": "Theme-wise (see each day)",
      "convenienceFee": 99,
      "publicPriceFrom": 2499,
      "featured": true,
      "offerType": "customBundle",
      "nights": 5,
      "bundleDays": [],
      "highlights": [
        "Access all 9 nights with one purchase",
        "Different Ahmedabad venue every night",
        "Theme nights with dress cues",
        "QR valid for the full season (show each night)",
        "Family-friendly early waves most nights"
      ],
      "amenities": [
        "Day-wise venue map",
        "Food courts most nights",
        "Medical desk",
        "Women help desk"
      ],
      "lineup": [
        {
          "name": "Classic House Orchestra",
          "role": "Resident band"
        },
        {
          "name": "Ahmedabad Dhol Collective",
          "role": "Opening nights"
        }
      ],
      "schedule": [
        {
          "time": "18:00",
          "title": "Day 1 · Sabarmati Riverfront Event Lawn",
          "detail": "Shailaputri Night"
        },
        {
          "time": "18:00",
          "title": "Day 2 · Law Garden Amphitheatre",
          "detail": "Brahmacharini Night"
        },
        {
          "time": "18:00",
          "title": "Day 3 · GMDC Ground",
          "detail": "Chandraghanta Night"
        }
      ],
      "terms": [
        "One attendee per 9x pass",
        "Valid only for listed nights & venues",
        "Non-transferable after first scan",
        "Show digital QR + ID every night"
      ],
      "refundPolicy": "Full refund until 7 days before Day 1. 40% until 72h before Day 1. No refund after Day 1 starts.",
      "faqs": [
        {
          "q": "Is this 9 separate tickets?",
          "a": "You buy one 9x season pass. Your ticket shows all 9 day venues; show the same QR each night."
        },
        {
          "q": "Can I skip a night?",
          "a": "Yes — unused nights stay on your pass. No partial refund for skipped nights."
        },
        {
          "q": "Different venue every day?",
          "a": "Yes — open the itinerary on the event page for full address, landmark, and theme."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 3350
    },
    {
      "id": "e-build-6",
      "name": "Build your Navratri · 6 nights",
      "subtitle": "Progressive 6-night custom Garba itinerary",
      "adminId": "u-admin",
      "date": "2026-10-05",
      "endDate": "2026-10-13",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:00",
      "venue": "Rotating — 9 Ahmedabad mandli grounds",
      "address": "See day-wise map & itinerary",
      "city": "Ahmedabad",
      "area": "West & Bopal circuit",
      "landmark": "Mandavadi – Garba & Mandli",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg",
        "/images/garba-fest/garba-02.jpg",
        "/images/garba-fest/garba-03.jpg",
        "/images/garba-fest/garba-06.jpg",
        "/images/garba-fest/garba-07.jpg",
        "/images/garba-fest/garba-09.jpg",
        "/images/garba-fest/garba-12.jpg",
        "/images/garba-fest/garba-15.jpg",
        "/images/garba-fest/garba-39.jpg"
      ],
      "shortDescription": "Pick any 6 Navratri nights and choose venues night by night.",
      "description": "Progressive custom bundle — unlock at 5 nights, keep adding for extra savings up to 9 nights.",
      "category": "Custom Bundle",
      "tags": [
        "Build your Navratri",
        "6 nights",
        "Progressive",
        "Ahmedabad"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages (under 5 free with adult)",
      "durationLabel": "6 nights",
      "dressCode": "Theme-wise (see each day)",
      "convenienceFee": 99,
      "publicPriceFrom": 2849,
      "featured": true,
      "offerType": "customBundle",
      "nights": 6,
      "bundleDays": [],
      "highlights": [
        "Access all 9 nights with one purchase",
        "Different Ahmedabad venue every night",
        "Theme nights with dress cues",
        "QR valid for the full season (show each night)",
        "Family-friendly early waves most nights"
      ],
      "amenities": [
        "Day-wise venue map",
        "Food courts most nights",
        "Medical desk",
        "Women help desk"
      ],
      "lineup": [
        {
          "name": "Classic House Orchestra",
          "role": "Resident band"
        },
        {
          "name": "Ahmedabad Dhol Collective",
          "role": "Opening nights"
        }
      ],
      "schedule": [
        {
          "time": "18:00",
          "title": "Day 1 · Sabarmati Riverfront Event Lawn",
          "detail": "Shailaputri Night"
        },
        {
          "time": "18:00",
          "title": "Day 2 · Law Garden Amphitheatre",
          "detail": "Brahmacharini Night"
        },
        {
          "time": "18:00",
          "title": "Day 3 · GMDC Ground",
          "detail": "Chandraghanta Night"
        }
      ],
      "terms": [
        "One attendee per 9x pass",
        "Valid only for listed nights & venues",
        "Non-transferable after first scan",
        "Show digital QR + ID every night"
      ],
      "refundPolicy": "Full refund until 7 days before Day 1. 40% until 72h before Day 1. No refund after Day 1 starts.",
      "faqs": [
        {
          "q": "Is this 9 separate tickets?",
          "a": "You buy one 9x season pass. Your ticket shows all 9 day venues; show the same QR each night."
        },
        {
          "q": "Can I skip a night?",
          "a": "Yes — unused nights stay on your pass. No partial refund for skipped nights."
        },
        {
          "q": "Different venue every day?",
          "a": "Yes — open the itinerary on the event page for full address, landmark, and theme."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 3850
    },
    {
      "id": "e-build-7",
      "name": "Build your Navratri · 7 nights",
      "subtitle": "Progressive 7-night custom Garba itinerary",
      "adminId": "u-admin",
      "date": "2026-10-05",
      "endDate": "2026-10-13",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:00",
      "venue": "Rotating — 9 Ahmedabad mandli grounds",
      "address": "See day-wise map & itinerary",
      "city": "Ahmedabad",
      "area": "West & Bopal circuit",
      "landmark": "Mandavadi – Garba & Mandli",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg",
        "/images/garba-fest/garba-02.jpg",
        "/images/garba-fest/garba-03.jpg",
        "/images/garba-fest/garba-06.jpg",
        "/images/garba-fest/garba-07.jpg",
        "/images/garba-fest/garba-09.jpg",
        "/images/garba-fest/garba-12.jpg",
        "/images/garba-fest/garba-15.jpg",
        "/images/garba-fest/garba-39.jpg"
      ],
      "shortDescription": "Pick any 7 Navratri nights and choose venues night by night.",
      "description": "Progressive custom bundle — unlock at 5 nights, keep adding for extra savings up to 9 nights.",
      "category": "Custom Bundle",
      "tags": [
        "Build your Navratri",
        "7 nights",
        "Progressive",
        "Ahmedabad"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages (under 5 free with adult)",
      "durationLabel": "7 nights",
      "dressCode": "Theme-wise (see each day)",
      "convenienceFee": 99,
      "publicPriceFrom": 3149,
      "featured": true,
      "offerType": "customBundle",
      "nights": 7,
      "bundleDays": [],
      "highlights": [
        "Access all 9 nights with one purchase",
        "Different Ahmedabad venue every night",
        "Theme nights with dress cues",
        "QR valid for the full season (show each night)",
        "Family-friendly early waves most nights"
      ],
      "amenities": [
        "Day-wise venue map",
        "Food courts most nights",
        "Medical desk",
        "Women help desk"
      ],
      "lineup": [
        {
          "name": "Classic House Orchestra",
          "role": "Resident band"
        },
        {
          "name": "Ahmedabad Dhol Collective",
          "role": "Opening nights"
        }
      ],
      "schedule": [
        {
          "time": "18:00",
          "title": "Day 1 · Sabarmati Riverfront Event Lawn",
          "detail": "Shailaputri Night"
        },
        {
          "time": "18:00",
          "title": "Day 2 · Law Garden Amphitheatre",
          "detail": "Brahmacharini Night"
        },
        {
          "time": "18:00",
          "title": "Day 3 · GMDC Ground",
          "detail": "Chandraghanta Night"
        }
      ],
      "terms": [
        "One attendee per 9x pass",
        "Valid only for listed nights & venues",
        "Non-transferable after first scan",
        "Show digital QR + ID every night"
      ],
      "refundPolicy": "Full refund until 7 days before Day 1. 40% until 72h before Day 1. No refund after Day 1 starts.",
      "faqs": [
        {
          "q": "Is this 9 separate tickets?",
          "a": "You buy one 9x season pass. Your ticket shows all 9 day venues; show the same QR each night."
        },
        {
          "q": "Can I skip a night?",
          "a": "Yes — unused nights stay on your pass. No partial refund for skipped nights."
        },
        {
          "q": "Different venue every day?",
          "a": "Yes — open the itinerary on the event page for full address, landmark, and theme."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 4250
    },
    {
      "id": "e-build-8",
      "name": "Build your Navratri · 8 nights",
      "subtitle": "Progressive 8-night custom Garba itinerary",
      "adminId": "u-admin",
      "date": "2026-10-05",
      "endDate": "2026-10-13",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:00",
      "venue": "Rotating — 9 Ahmedabad mandli grounds",
      "address": "See day-wise map & itinerary",
      "city": "Ahmedabad",
      "area": "West & Bopal circuit",
      "landmark": "Mandavadi – Garba & Mandli",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg",
        "/images/garba-fest/garba-02.jpg",
        "/images/garba-fest/garba-03.jpg",
        "/images/garba-fest/garba-06.jpg",
        "/images/garba-fest/garba-07.jpg",
        "/images/garba-fest/garba-09.jpg",
        "/images/garba-fest/garba-12.jpg",
        "/images/garba-fest/garba-15.jpg",
        "/images/garba-fest/garba-39.jpg"
      ],
      "shortDescription": "Pick any 8 Navratri nights and choose venues night by night.",
      "description": "Progressive custom bundle — unlock at 5 nights, keep adding for extra savings up to 9 nights.",
      "category": "Custom Bundle",
      "tags": [
        "Build your Navratri",
        "8 nights",
        "Progressive",
        "Ahmedabad"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages (under 5 free with adult)",
      "durationLabel": "8 nights",
      "dressCode": "Theme-wise (see each day)",
      "convenienceFee": 99,
      "publicPriceFrom": 3399,
      "featured": true,
      "offerType": "customBundle",
      "nights": 8,
      "bundleDays": [],
      "highlights": [
        "Access all 9 nights with one purchase",
        "Different Ahmedabad venue every night",
        "Theme nights with dress cues",
        "QR valid for the full season (show each night)",
        "Family-friendly early waves most nights"
      ],
      "amenities": [
        "Day-wise venue map",
        "Food courts most nights",
        "Medical desk",
        "Women help desk"
      ],
      "lineup": [
        {
          "name": "Classic House Orchestra",
          "role": "Resident band"
        },
        {
          "name": "Ahmedabad Dhol Collective",
          "role": "Opening nights"
        }
      ],
      "schedule": [
        {
          "time": "18:00",
          "title": "Day 1 · Sabarmati Riverfront Event Lawn",
          "detail": "Shailaputri Night"
        },
        {
          "time": "18:00",
          "title": "Day 2 · Law Garden Amphitheatre",
          "detail": "Brahmacharini Night"
        },
        {
          "time": "18:00",
          "title": "Day 3 · GMDC Ground",
          "detail": "Chandraghanta Night"
        }
      ],
      "terms": [
        "One attendee per 9x pass",
        "Valid only for listed nights & venues",
        "Non-transferable after first scan",
        "Show digital QR + ID every night"
      ],
      "refundPolicy": "Full refund until 7 days before Day 1. 40% until 72h before Day 1. No refund after Day 1 starts.",
      "faqs": [
        {
          "q": "Is this 9 separate tickets?",
          "a": "You buy one 9x season pass. Your ticket shows all 9 day venues; show the same QR each night."
        },
        {
          "q": "Can I skip a night?",
          "a": "Yes — unused nights stay on your pass. No partial refund for skipped nights."
        },
        {
          "q": "Different venue every day?",
          "a": "Yes — open the itinerary on the event page for full address, landmark, and theme."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 4600
    },
    {
      "id": "e-build-9",
      "name": "Build your Navratri · 9 nights",
      "subtitle": "Progressive 9-night custom Garba itinerary",
      "adminId": "u-admin",
      "date": "2026-10-05",
      "endDate": "2026-10-13",
      "startTime": "19:00",
      "endTime": "00:30",
      "gatesOpen": "18:00",
      "venue": "Rotating — 9 Ahmedabad mandli grounds",
      "address": "See day-wise map & itinerary",
      "city": "Ahmedabad",
      "area": "West & Bopal circuit",
      "landmark": "Mandavadi – Garba & Mandli",
      "status": "active",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg",
        "/images/garba-fest/garba-02.jpg",
        "/images/garba-fest/garba-03.jpg",
        "/images/garba-fest/garba-06.jpg",
        "/images/garba-fest/garba-07.jpg",
        "/images/garba-fest/garba-09.jpg",
        "/images/garba-fest/garba-12.jpg",
        "/images/garba-fest/garba-15.jpg",
        "/images/garba-fest/garba-39.jpg"
      ],
      "shortDescription": "Pick any 9 Navratri nights and choose venues night by night.",
      "description": "Progressive custom bundle — unlock at 5 nights, keep adding for extra savings up to 9 nights.",
      "category": "Custom Bundle",
      "tags": [
        "Build your Navratri",
        "9 nights",
        "Progressive",
        "Ahmedabad"
      ],
      "languages": [
        "Gujarati",
        "Hindi",
        "English"
      ],
      "ageLimit": "All ages (under 5 free with adult)",
      "durationLabel": "9 nights",
      "dressCode": "Theme-wise (see each day)",
      "convenienceFee": 99,
      "publicPriceFrom": 3599,
      "featured": true,
      "offerType": "customBundle",
      "nights": 9,
      "bundleDays": [],
      "highlights": [
        "Access all 9 nights with one purchase",
        "Different Ahmedabad venue every night",
        "Theme nights with dress cues",
        "QR valid for the full season (show each night)",
        "Family-friendly early waves most nights"
      ],
      "amenities": [
        "Day-wise venue map",
        "Food courts most nights",
        "Medical desk",
        "Women help desk"
      ],
      "lineup": [
        {
          "name": "Classic House Orchestra",
          "role": "Resident band"
        },
        {
          "name": "Ahmedabad Dhol Collective",
          "role": "Opening nights"
        }
      ],
      "schedule": [
        {
          "time": "18:00",
          "title": "Day 1 · Sabarmati Riverfront Event Lawn",
          "detail": "Shailaputri Night"
        },
        {
          "time": "18:00",
          "title": "Day 2 · Law Garden Amphitheatre",
          "detail": "Brahmacharini Night"
        },
        {
          "time": "18:00",
          "title": "Day 3 · GMDC Ground",
          "detail": "Chandraghanta Night"
        }
      ],
      "terms": [
        "One attendee per 9x pass",
        "Valid only for listed nights & venues",
        "Non-transferable after first scan",
        "Show digital QR + ID every night"
      ],
      "refundPolicy": "Full refund until 7 days before Day 1. 40% until 72h before Day 1. No refund after Day 1 starts.",
      "faqs": [
        {
          "q": "Is this 9 separate tickets?",
          "a": "You buy one 9x season pass. Your ticket shows all 9 day venues; show the same QR each night."
        },
        {
          "q": "Can I skip a night?",
          "a": "Yes — unused nights stay on your pass. No partial refund for skipped nights."
        },
        {
          "q": "Different venue every day?",
          "a": "Yes — open the itinerary on the event page for full address, landmark, and theme."
        }
      ],
      "matchTags": [
        "traditional",
        "group_friendly",
        "best_value"
      ],
      "marketPrice": 4850
    }
  ],
  "passLots": [
    {
      "id": "pl4",
      "eventId": "e3",
      "adminId": "u-admin",
      "name": "Lawn Access",
      "description": "Open lawn dance + stage view",
      "perks": [
        "Lawn",
        "Food court"
      ],
      "totalQty": 2000,
      "remainingQty": 1680,
      "pricePerPass": 799,
      "maxPerOrder": 8,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-11",
      "createdAt": "2026-09-06",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1,
      "cost": 549
    },
    {
      "id": "pl5",
      "eventId": "e4",
      "adminId": "u-admin",
      "name": "Single Entry",
      "description": "One adult/youth pass",
      "perks": [
        "Full night",
        "Kids zone with child"
      ],
      "totalQty": 1200,
      "remainingQty": 1200,
      "pricePerPass": 299,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-05",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1,
      "cost": 199
    },
    {
      "id": "pl-v-01",
      "eventId": "e-v-01",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Mandavadi – Garba & Mandli",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 499,
      "cost": 324,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-02",
      "eventId": "e-v-02",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Mandalam Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 549,
      "cost": 357,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-03",
      "eventId": "e-v-03",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Dholki Garba – The Premium Mandli",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 599,
      "cost": 389,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-04",
      "eventId": "e-v-04",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Maa Ni Mandvi",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 649,
      "cost": 422,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-05",
      "eventId": "e-v-05",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Ghammardi – Garba & Mandli",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 699,
      "cost": 454,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-06",
      "eventId": "e-v-06",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Radhevan – The Mandli Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 749,
      "cost": 487,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-07",
      "eventId": "e-v-07",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Swarnim Nagari Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 799,
      "cost": 519,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-08",
      "eventId": "e-v-08",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Divi Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 849,
      "cost": 552,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-09",
      "eventId": "e-v-09",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Maavdee",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 499,
      "cost": 324,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-10",
      "eventId": "e-v-10",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Radhe Raas Garba & Mandli",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 549,
      "cost": 357,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-11",
      "eventId": "e-v-11",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — RaasRatri",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 599,
      "cost": 389,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-12",
      "eventId": "e-v-12",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — SAIBO Navratri Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 649,
      "cost": 422,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-13",
      "eventId": "e-v-13",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Prachin Mandli Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 699,
      "cost": 454,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-14",
      "eventId": "e-v-14",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Aangan – The Mandali Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 749,
      "cost": 487,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-15",
      "eventId": "e-v-15",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Raaton Ni Rassleela",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 799,
      "cost": 519,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-16",
      "eventId": "e-v-16",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Karnavati No Sanedo",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 849,
      "cost": 552,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-17",
      "eventId": "e-v-17",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Mirchi Rock N Dhol",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 499,
      "cost": 324,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-18",
      "eventId": "e-v-18",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Sheri Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 549,
      "cost": 357,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-19",
      "eventId": "e-v-19",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — PYC Navratri",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 599,
      "cost": 389,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-20",
      "eventId": "e-v-20",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Aadyaraas Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 649,
      "cost": 422,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-21",
      "eventId": "e-v-21",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Vrindavan Nagari",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 699,
      "cost": 454,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-22",
      "eventId": "e-v-22",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Night Zero Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 749,
      "cost": 487,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-23",
      "eventId": "e-v-23",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Navli Ratri",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 799,
      "cost": 519,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-24",
      "eventId": "e-v-24",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Sacred Raas",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 849,
      "cost": 552,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-25",
      "eventId": "e-v-25",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Vibe With The Night",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 499,
      "cost": 324,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-26",
      "eventId": "e-v-26",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Sachi Navratri AC Dome Garba",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 549,
      "cost": 357,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-27",
      "eventId": "e-v-27",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — AadhyaShakti Garba Prasang",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 599,
      "cost": 389,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-28",
      "eventId": "e-v-28",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — La Regal's Shubhaarambh",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 649,
      "cost": 422,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-29",
      "eventId": "e-v-29",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — Pankhida – Root of Raas",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 699,
      "cost": 454,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-v-30",
      "eventId": "e-v-30",
      "adminId": "u-admin",
      "name": "Individual Venue Pass",
      "description": "Single night entry — The Garba Experience with Kinjal Dave",
      "perks": [
        "One night",
        "Main floor",
        "QR entry"
      ],
      "totalQty": 200,
      "remainingQty": 197,
      "pricePerPass": 749,
      "cost": 487,
      "maxPerOrder": 6,
      "saleStartsAt": "2026-09-01",
      "saleEndsAt": "2026-10-08",
      "createdAt": "2026-09-15",
      "status": "active",
      "isBundle": false,
      "bundleNights": 1
    },
    {
      "id": "pl-build-5",
      "eventId": "e-build-5",
      "adminId": "u-admin",
      "name": "5-night Build Pass",
      "description": "Progressive 5-night Navratri bundle",
      "perks": [
        "5 nights",
        "Choose your venues",
        "Progressive savings",
        "QR gate entry"
      ],
      "totalQty": 200,
      "remainingQty": 200,
      "pricePerPass": 2499,
      "cost": 2099,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01T00:00:00.000Z",
      "saleEndsAt": "2026-10-13T23:59:59.000Z",
      "createdAt": "2026-09-01T00:00:00.000Z",
      "status": "active",
      "isBundle": true,
      "bundleNights": 5
    },
    {
      "id": "pl-build-6",
      "eventId": "e-build-6",
      "adminId": "u-admin",
      "name": "6-night Build Pass",
      "description": "Progressive 6-night Navratri bundle",
      "perks": [
        "6 nights",
        "Choose your venues",
        "Progressive savings",
        "QR gate entry"
      ],
      "totalQty": 200,
      "remainingQty": 200,
      "pricePerPass": 2849,
      "cost": 2449,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01T00:00:00.000Z",
      "saleEndsAt": "2026-10-13T23:59:59.000Z",
      "createdAt": "2026-09-01T00:00:00.000Z",
      "status": "active",
      "isBundle": true,
      "bundleNights": 6
    },
    {
      "id": "pl-build-7",
      "eventId": "e-build-7",
      "adminId": "u-admin",
      "name": "7-night Build Pass",
      "description": "Progressive 7-night Navratri bundle",
      "perks": [
        "7 nights",
        "Choose your venues",
        "Progressive savings",
        "QR gate entry"
      ],
      "totalQty": 200,
      "remainingQty": 200,
      "pricePerPass": 3149,
      "cost": 2749,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01T00:00:00.000Z",
      "saleEndsAt": "2026-10-13T23:59:59.000Z",
      "createdAt": "2026-09-01T00:00:00.000Z",
      "status": "active",
      "isBundle": true,
      "bundleNights": 7
    },
    {
      "id": "pl-build-8",
      "eventId": "e-build-8",
      "adminId": "u-admin",
      "name": "8-night Build Pass",
      "description": "Progressive 8-night Navratri bundle",
      "perks": [
        "8 nights",
        "Choose your venues",
        "Progressive savings",
        "QR gate entry"
      ],
      "totalQty": 200,
      "remainingQty": 200,
      "pricePerPass": 3399,
      "cost": 2999,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01T00:00:00.000Z",
      "saleEndsAt": "2026-10-13T23:59:59.000Z",
      "createdAt": "2026-09-01T00:00:00.000Z",
      "status": "active",
      "isBundle": true,
      "bundleNights": 8
    },
    {
      "id": "pl-build-9",
      "eventId": "e-build-9",
      "adminId": "u-admin",
      "name": "9-night Build Pass",
      "description": "Progressive 9-night Navratri bundle",
      "perks": [
        "9 nights",
        "Choose your venues",
        "Progressive savings",
        "QR gate entry"
      ],
      "totalQty": 200,
      "remainingQty": 200,
      "pricePerPass": 3599,
      "cost": 3199,
      "maxPerOrder": 10,
      "saleStartsAt": "2026-09-01T00:00:00.000Z",
      "saleEndsAt": "2026-10-13T23:59:59.000Z",
      "createdAt": "2026-09-01T00:00:00.000Z",
      "status": "active",
      "isBundle": true,
      "bundleNights": 9
    }
  ],
  "sellRequests": [],
  "tickets": [
    {
      "id": "t4",
      "passLotId": "pl4",
      "eventId": "e3",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-EB-T4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Lawn Access"
    },
    {
      "id": "t5",
      "passLotId": "pl4",
      "eventId": "e3",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-EB-T5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Lawn Access"
    },
    {
      "id": "tv-01-1",
      "passLotId": "pl-v-01",
      "eventId": "e-v-01",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-01-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-01-2",
      "passLotId": "pl-v-01",
      "eventId": "e-v-01",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-01-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-01-3",
      "passLotId": "pl-v-01",
      "eventId": "e-v-01",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-01-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-02-1",
      "passLotId": "pl-v-02",
      "eventId": "e-v-02",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-02-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-02-2",
      "passLotId": "pl-v-02",
      "eventId": "e-v-02",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-02-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-02-3",
      "passLotId": "pl-v-02",
      "eventId": "e-v-02",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-02-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-03-1",
      "passLotId": "pl-v-03",
      "eventId": "e-v-03",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-03-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-03-2",
      "passLotId": "pl-v-03",
      "eventId": "e-v-03",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-03-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-03-3",
      "passLotId": "pl-v-03",
      "eventId": "e-v-03",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-03-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-04-1",
      "passLotId": "pl-v-04",
      "eventId": "e-v-04",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-04-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-04-2",
      "passLotId": "pl-v-04",
      "eventId": "e-v-04",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-04-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-04-3",
      "passLotId": "pl-v-04",
      "eventId": "e-v-04",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-04-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-05-1",
      "passLotId": "pl-v-05",
      "eventId": "e-v-05",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-05-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-05-2",
      "passLotId": "pl-v-05",
      "eventId": "e-v-05",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-05-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-05-3",
      "passLotId": "pl-v-05",
      "eventId": "e-v-05",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-05-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-06-1",
      "passLotId": "pl-v-06",
      "eventId": "e-v-06",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-06-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-06-2",
      "passLotId": "pl-v-06",
      "eventId": "e-v-06",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-06-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-06-3",
      "passLotId": "pl-v-06",
      "eventId": "e-v-06",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-06-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-07-1",
      "passLotId": "pl-v-07",
      "eventId": "e-v-07",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-07-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-07-2",
      "passLotId": "pl-v-07",
      "eventId": "e-v-07",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-07-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-07-3",
      "passLotId": "pl-v-07",
      "eventId": "e-v-07",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-07-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-08-1",
      "passLotId": "pl-v-08",
      "eventId": "e-v-08",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-08-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-08-2",
      "passLotId": "pl-v-08",
      "eventId": "e-v-08",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-08-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-08-3",
      "passLotId": "pl-v-08",
      "eventId": "e-v-08",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-08-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-09-1",
      "passLotId": "pl-v-09",
      "eventId": "e-v-09",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-09-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-09-2",
      "passLotId": "pl-v-09",
      "eventId": "e-v-09",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-09-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-09-3",
      "passLotId": "pl-v-09",
      "eventId": "e-v-09",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-09-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-10-1",
      "passLotId": "pl-v-10",
      "eventId": "e-v-10",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-10-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-10-2",
      "passLotId": "pl-v-10",
      "eventId": "e-v-10",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-10-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-10-3",
      "passLotId": "pl-v-10",
      "eventId": "e-v-10",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-10-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-11-1",
      "passLotId": "pl-v-11",
      "eventId": "e-v-11",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-11-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-11-2",
      "passLotId": "pl-v-11",
      "eventId": "e-v-11",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-11-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-11-3",
      "passLotId": "pl-v-11",
      "eventId": "e-v-11",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-11-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-12-1",
      "passLotId": "pl-v-12",
      "eventId": "e-v-12",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-12-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-12-2",
      "passLotId": "pl-v-12",
      "eventId": "e-v-12",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-12-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-12-3",
      "passLotId": "pl-v-12",
      "eventId": "e-v-12",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-12-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-13-1",
      "passLotId": "pl-v-13",
      "eventId": "e-v-13",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-13-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-13-2",
      "passLotId": "pl-v-13",
      "eventId": "e-v-13",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-13-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-13-3",
      "passLotId": "pl-v-13",
      "eventId": "e-v-13",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-13-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-14-1",
      "passLotId": "pl-v-14",
      "eventId": "e-v-14",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-14-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-14-2",
      "passLotId": "pl-v-14",
      "eventId": "e-v-14",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-14-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-14-3",
      "passLotId": "pl-v-14",
      "eventId": "e-v-14",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-14-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-15-1",
      "passLotId": "pl-v-15",
      "eventId": "e-v-15",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-15-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-15-2",
      "passLotId": "pl-v-15",
      "eventId": "e-v-15",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-15-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-15-3",
      "passLotId": "pl-v-15",
      "eventId": "e-v-15",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-15-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-16-1",
      "passLotId": "pl-v-16",
      "eventId": "e-v-16",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-16-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-16-2",
      "passLotId": "pl-v-16",
      "eventId": "e-v-16",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-16-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-16-3",
      "passLotId": "pl-v-16",
      "eventId": "e-v-16",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-16-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-17-1",
      "passLotId": "pl-v-17",
      "eventId": "e-v-17",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-17-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-17-2",
      "passLotId": "pl-v-17",
      "eventId": "e-v-17",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-17-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-17-3",
      "passLotId": "pl-v-17",
      "eventId": "e-v-17",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-17-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-18-1",
      "passLotId": "pl-v-18",
      "eventId": "e-v-18",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-18-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-18-2",
      "passLotId": "pl-v-18",
      "eventId": "e-v-18",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-18-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-18-3",
      "passLotId": "pl-v-18",
      "eventId": "e-v-18",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-18-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-19-1",
      "passLotId": "pl-v-19",
      "eventId": "e-v-19",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-19-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-19-2",
      "passLotId": "pl-v-19",
      "eventId": "e-v-19",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-19-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-19-3",
      "passLotId": "pl-v-19",
      "eventId": "e-v-19",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-19-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-20-1",
      "passLotId": "pl-v-20",
      "eventId": "e-v-20",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-20-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-20-2",
      "passLotId": "pl-v-20",
      "eventId": "e-v-20",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-20-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-20-3",
      "passLotId": "pl-v-20",
      "eventId": "e-v-20",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-20-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-21-1",
      "passLotId": "pl-v-21",
      "eventId": "e-v-21",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-21-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-21-2",
      "passLotId": "pl-v-21",
      "eventId": "e-v-21",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-21-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-21-3",
      "passLotId": "pl-v-21",
      "eventId": "e-v-21",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-21-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-22-1",
      "passLotId": "pl-v-22",
      "eventId": "e-v-22",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-22-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-22-2",
      "passLotId": "pl-v-22",
      "eventId": "e-v-22",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-22-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-22-3",
      "passLotId": "pl-v-22",
      "eventId": "e-v-22",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-22-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-23-1",
      "passLotId": "pl-v-23",
      "eventId": "e-v-23",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-23-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-23-2",
      "passLotId": "pl-v-23",
      "eventId": "e-v-23",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-23-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-23-3",
      "passLotId": "pl-v-23",
      "eventId": "e-v-23",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-23-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-24-1",
      "passLotId": "pl-v-24",
      "eventId": "e-v-24",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-24-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-24-2",
      "passLotId": "pl-v-24",
      "eventId": "e-v-24",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-24-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-24-3",
      "passLotId": "pl-v-24",
      "eventId": "e-v-24",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-24-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-25-1",
      "passLotId": "pl-v-25",
      "eventId": "e-v-25",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-25-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-25-2",
      "passLotId": "pl-v-25",
      "eventId": "e-v-25",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-25-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-25-3",
      "passLotId": "pl-v-25",
      "eventId": "e-v-25",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-25-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-26-1",
      "passLotId": "pl-v-26",
      "eventId": "e-v-26",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-26-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-26-2",
      "passLotId": "pl-v-26",
      "eventId": "e-v-26",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-26-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-26-3",
      "passLotId": "pl-v-26",
      "eventId": "e-v-26",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-26-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-27-1",
      "passLotId": "pl-v-27",
      "eventId": "e-v-27",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-27-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-27-2",
      "passLotId": "pl-v-27",
      "eventId": "e-v-27",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-27-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-27-3",
      "passLotId": "pl-v-27",
      "eventId": "e-v-27",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-27-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-28-1",
      "passLotId": "pl-v-28",
      "eventId": "e-v-28",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-28-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-28-2",
      "passLotId": "pl-v-28",
      "eventId": "e-v-28",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-28-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-28-3",
      "passLotId": "pl-v-28",
      "eventId": "e-v-28",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-28-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-29-1",
      "passLotId": "pl-v-29",
      "eventId": "e-v-29",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-29-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-29-2",
      "passLotId": "pl-v-29",
      "eventId": "e-v-29",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-29-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-29-3",
      "passLotId": "pl-v-29",
      "eventId": "e-v-29",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-29-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-30-1",
      "passLotId": "pl-v-30",
      "eventId": "e-v-30",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-30-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-30-2",
      "passLotId": "pl-v-30",
      "eventId": "e-v-30",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-30-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tv-30-3",
      "passLotId": "pl-v-30",
      "eventId": "e-v-30",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-V-30-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "Individual Venue Pass"
    },
    {
      "id": "tbuild5-1",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "customer",
      "ownerId": "u-customer",
      "status": "sold",
      "qrCode": "QR-BUILD-5-1",
      "soldBy": "u-admin",
      "soldAt": "2026-09-22T12:39:28.933Z",
      "pricePaid": 4694,
      "listedForSale": false,
      "lotName": "5-night Build Pass",
      "attendeeName": "vmkmym",
      "attendeePhone": "4238578478",
      "orderId": "ord-mucnvd7p-cehvn"
    },
    {
      "id": "tbuild5-2",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "customer",
      "ownerId": "u-customer",
      "status": "sold",
      "qrCode": "QR-BUILD-5-2",
      "soldBy": "u-admin",
      "soldAt": "2026-09-23T13:13:18.906Z",
      "pricePaid": 3096,
      "listedForSale": false,
      "lotName": "5-night Build Pass",
      "attendeeName": "ferfger",
      "attendeePhone": "1234543211",
      "orderId": "ord-mue4iq7u-ftfy6"
    },
    {
      "id": "tbuild5-3",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-4",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-5",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-6",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-6",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-7",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-7",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-8",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-8",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-9",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-9",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-10",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-10",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-11",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-11",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild5-12",
      "passLotId": "pl-build-5",
      "eventId": "e-build-5",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-5-12",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "5-night Build Pass"
    },
    {
      "id": "tbuild6-1",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-2",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-3",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-4",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-5",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-6",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-6",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-7",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-7",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-8",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-8",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-9",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-9",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-10",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-10",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-11",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-11",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild6-12",
      "passLotId": "pl-build-6",
      "eventId": "e-build-6",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-6-12",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "6-night Build Pass"
    },
    {
      "id": "tbuild7-1",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-2",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-3",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-4",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-5",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-6",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-6",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-7",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-7",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-8",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-8",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-9",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-9",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-10",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-10",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-11",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-11",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild7-12",
      "passLotId": "pl-build-7",
      "eventId": "e-build-7",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-7-12",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "7-night Build Pass"
    },
    {
      "id": "tbuild8-1",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-2",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-3",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-4",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-5",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-6",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-6",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-7",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-7",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-8",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-8",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-9",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-9",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-10",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-10",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-11",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-11",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild8-12",
      "passLotId": "pl-build-8",
      "eventId": "e-build-8",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-8-12",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "8-night Build Pass"
    },
    {
      "id": "tbuild9-1",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-1",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-2",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-2",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-3",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-3",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-4",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-4",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-5",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-5",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-6",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-6",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-7",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-7",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-8",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-8",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-9",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-9",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-10",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-10",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-11",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-11",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    },
    {
      "id": "tbuild9-12",
      "passLotId": "pl-build-9",
      "eventId": "e-build-9",
      "ownerType": "admin",
      "ownerId": "u-admin",
      "status": "available",
      "qrCode": "QR-BUILD-9-12",
      "soldBy": null,
      "soldAt": null,
      "pricePaid": null,
      "listedForSale": true,
      "lotName": "9-night Build Pass"
    }
  ],
  "orders": [
    {
      "id": "ord1",
      "eventId": "e-b1",
      "buyerId": "u-customer",
      "ticketIds": [],
      "quantity": 1,
      "subtotal": 3999,
      "convenienceFee": 99,
      "total": 4098,
      "paymentMethod": "UPI",
      "buyerName": "Customer Priya",
      "buyerEmail": "customer@demo.com",
      "buyerPhone": "+91 98765 43210",
      "attendees": [
        {
          "name": "Customer Priya",
          "phone": "+91 98765 43210"
        }
      ],
      "gstInvoice": false,
      "status": "confirmed",
      "createdAt": "2026-09-10T19:00:00+05:30",
      "sellerId": "u-admin"
    },
    {
      "id": "ord-mu846kkd-ems3x",
      "eventId": "e-b2",
      "buyerId": "u-customer",
      "sellerId": "u-admin",
      "ticketIds": [],
      "quantity": 1,
      "subtotal": 4499,
      "convenienceFee": 119,
      "total": 4618,
      "paymentMethod": "NetBanking",
      "buyerName": "vyom",
      "buyerEmail": "dkmsa@gmail.com",
      "buyerPhone": "9825793602",
      "attendees": [
        {
          "name": "fmne",
          "phone": "8743249823"
        }
      ],
      "status": "confirmed",
      "createdAt": "2026-09-19T08:17:14.684Z"
    },
    {
      "id": "ord-mucnvd7p-cehvn",
      "eventId": "e-build-5",
      "buyerId": "u-customer",
      "sellerId": "u-admin",
      "ticketIds": [
        "tbuild5-1"
      ],
      "quantity": 1,
      "subtotal": 4694,
      "convenienceFee": 99,
      "total": 4793,
      "paymentMethod": "UPI",
      "buyerName": "vyom",
      "buyerEmail": "vyom@gmail.com",
      "buyerPhone": "9594396758",
      "attendees": [
        {
          "name": "vmkmym",
          "phone": "4238578478"
        }
      ],
      "status": "confirmed",
      "createdAt": "2026-09-22T12:39:28.987Z",
      "customBundleDays": [
        {
          "day": 1,
          "date": "2026-10-06",
          "placeId": "place-02",
          "venue": "Mandalam Garba",
          "area": "Bopal",
          "address": "VIP Road, Bopal, Ahmedabad",
          "landmark": "VIP Road",
          "lat": 23.032,
          "lng": 72.465,
          "theme": "Brahmacharini Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-02.jpg",
          "passTier": "platinum",
          "highlights": [
            "👑 Platinum",
            "Bopal Folk Orchestra",
            "Garba",
            "Mandli"
          ],
          "note": "VIP lounge · soft seating"
        },
        {
          "day": 2,
          "date": "2026-10-09",
          "placeId": "place-03",
          "venue": "Dholki Garba – The Premium Mandli",
          "area": "Ognaj–Bhadaj",
          "address": "Ognaj–Bhadaj, Ahmedabad",
          "landmark": "Ognaj–Bhadaj",
          "lat": 23.095,
          "lng": 72.475,
          "theme": "Skandamata Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-03.jpg",
          "passTier": "platinum",
          "highlights": [
            "👑 Platinum",
            "Ognaj Classic Ensemble",
            "Garba",
            "Mandli"
          ],
          "note": "VIP lounge · soft seating"
        },
        {
          "day": 3,
          "date": "2026-10-10",
          "placeId": "place-03",
          "venue": "Dholki Garba – The Premium Mandli",
          "area": "Ognaj–Bhadaj",
          "address": "Ognaj–Bhadaj, Ahmedabad",
          "landmark": "Ognaj–Bhadaj",
          "lat": 23.095,
          "lng": 72.475,
          "theme": "Katyayani Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-03.jpg",
          "passTier": "platinum",
          "highlights": [
            "👑 Platinum",
            "GIFT City Night Band",
            "Garba",
            "Mandli"
          ],
          "note": "VIP lounge · soft seating"
        },
        {
          "day": 4,
          "date": "2026-10-11",
          "placeId": "place-08",
          "venue": "Divi Garba",
          "area": "Khodiyar",
          "address": "Master Farm, Khodiyar, Ahmedabad",
          "landmark": "Master Farm",
          "lat": 23.142,
          "lng": 72.545,
          "theme": "Kalaratri Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-08.jpg",
          "passTier": "diamond",
          "highlights": [
            "💎 Diamond",
            "Kalaratri Live Circle",
            "Garba",
            "Mandli"
          ],
          "note": "Better circle · priority entry"
        },
        {
          "day": 5,
          "date": "2026-10-13",
          "placeId": "place-18",
          "venue": "Sheri Garba",
          "area": "Aarav Farm",
          "address": "Aarav Farm, Ahmedabad",
          "landmark": "Aarav Farm",
          "lat": 23.05,
          "lng": 72.495,
          "theme": "Siddhidatri Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-18.jpg",
          "passTier": "platinum",
          "highlights": [
            "👑 Platinum",
            "Siddhidatri Finale Cast",
            "Garba",
            "Mandli"
          ],
          "note": "VIP lounge · soft seating"
        }
      ],
      "customNights": 5
    },
    {
      "id": "ord-mue4iq7u-ftfy6",
      "eventId": "e-build-5",
      "buyerId": "u-customer",
      "sellerId": "u-admin",
      "ticketIds": [
        "tbuild5-2"
      ],
      "quantity": 1,
      "subtotal": 3096,
      "convenienceFee": 99,
      "total": 3195,
      "paymentMethod": "UPI",
      "buyerName": "koeejhfer",
      "buyerEmail": "vyom.korat@kysz.tech",
      "buyerPhone": "1234567765",
      "attendees": [
        {
          "name": "ferfger",
          "phone": "1234543211"
        }
      ],
      "status": "confirmed",
      "createdAt": "2026-09-23T13:13:18.964Z",
      "customBundleDays": [
        {
          "day": 1,
          "date": "2026-10-07",
          "placeId": "place-02",
          "venue": "Mandalam Garba",
          "area": "Bopal",
          "address": "VIP Road, Bopal, Ahmedabad",
          "landmark": "VIP Road",
          "lat": 23.032,
          "lng": 72.465,
          "theme": "Chandraghanta Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-02.jpg",
          "passTier": "diamond",
          "highlights": [
            "💎 Diamond",
            "DJ Raas + Live Dhol",
            "Garba",
            "Mandli"
          ],
          "note": "Better circle · priority entry"
        },
        {
          "day": 2,
          "date": "2026-10-09",
          "placeId": "place-09",
          "venue": "Maavdee",
          "area": "SG Highway",
          "address": "RM Patel Farm, SG Highway, Ahmedabad",
          "landmark": "RM Patel Farm",
          "lat": 23.055,
          "lng": 72.508,
          "theme": "Skandamata Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-09.jpg",
          "passTier": "diamond",
          "highlights": [
            "💎 Diamond",
            "Ognaj Classic Ensemble",
            "Garba",
            "Mandli"
          ],
          "note": "Better circle · priority entry"
        },
        {
          "day": 3,
          "date": "2026-10-10",
          "placeId": "place-07",
          "venue": "Swarnim Nagari Garba",
          "area": "Makarba",
          "address": "LJ University Road, Makarba, Ahmedabad",
          "landmark": "LJ University Road",
          "lat": 22.992,
          "lng": 72.498,
          "theme": "Katyayani Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-07.jpg",
          "passTier": "gold",
          "highlights": [
            "🟡 Gold",
            "GIFT City Night Band",
            "Garba",
            "Mandli"
          ],
          "note": "Full floor access · classic Garba night"
        },
        {
          "day": 4,
          "date": "2026-10-12",
          "placeId": "place-07",
          "venue": "Swarnim Nagari Garba",
          "area": "Makarba",
          "address": "LJ University Road, Makarba, Ahmedabad",
          "landmark": "LJ University Road",
          "lat": 22.992,
          "lng": 72.498,
          "theme": "Mahagauri Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-07.jpg",
          "passTier": "diamond",
          "highlights": [
            "💎 Diamond",
            "Mahagauri House Band",
            "Garba",
            "Mandli"
          ],
          "note": "Better circle · priority entry"
        },
        {
          "day": 5,
          "date": "2026-10-13",
          "placeId": "place-03",
          "venue": "Dholki Garba – The Premium Mandli",
          "area": "Ognaj–Bhadaj",
          "address": "Ognaj–Bhadaj, Ahmedabad",
          "landmark": "Ognaj–Bhadaj",
          "lat": 23.095,
          "lng": 72.475,
          "theme": "Siddhidatri Night",
          "dressHint": "Traditional chaniya choli / kediyu",
          "startTime": "19:00",
          "endTime": "00:30",
          "gatesOpen": "18:00",
          "image": "/images/garba-fest/garba-03.jpg",
          "passTier": "gold",
          "highlights": [
            "🟡 Gold",
            "Siddhidatri Finale Cast",
            "Garba",
            "Mandli"
          ],
          "note": "Full floor access · classic Garba night"
        }
      ],
      "customNights": 5
    }
  ],
  "transactions": [
    {
      "id": "tx1",
      "ticketId": "t6",
      "eventId": "e1",
      "orderId": "ord1",
      "sellerId": "u-admin",
      "sellerRole": "admin",
      "buyerId": "u-customer",
      "amount": 549,
      "cost": 349,
      "commission": 200,
      "timestamp": "2026-09-10T19:00:00+05:30"
    },
    {
      "id": "tx-mu846kkr-wxxus",
      "ticketId": "tb2-1",
      "eventId": "e-b2",
      "orderId": "ord-mu846kkd-ems3x",
      "sellerId": "u-admin",
      "sellerRole": "admin",
      "buyerId": "u-customer",
      "amount": 4499,
      "cost": 3149,
      "commission": 1350,
      "timestamp": "2026-09-19T08:17:14.667Z"
    },
    {
      "id": "tx-mucnvd8k-m5umu",
      "ticketId": "tbuild5-1",
      "eventId": "e-build-5",
      "orderId": "ord-mucnvd7p-cehvn",
      "sellerId": "u-admin",
      "sellerRole": "admin",
      "buyerId": "u-customer",
      "amount": 4694,
      "cost": 2099,
      "commission": 2595,
      "timestamp": "2026-09-22T12:39:28.964Z"
    },
    {
      "id": "tx-mue4iq8n-onyox",
      "ticketId": "tbuild5-2",
      "eventId": "e-build-5",
      "orderId": "ord-mue4iq7u-ftfy6",
      "sellerId": "u-admin",
      "sellerRole": "admin",
      "buyerId": "u-customer",
      "amount": 3096,
      "cost": 2099,
      "commission": 997,
      "timestamp": "2026-09-23T13:13:18.935Z"
    }
  ],
  "wallets": [
    {
      "id": "w-admin",
      "userId": "u-admin",
      "role": "admin",
      "totalEarned": 4942,
      "totalOwed": 0,
      "availableBalance": 4942,
      "lastPayoutAt": null
    }
  ],
  "places": [
    {
      "id": "place-01",
      "name": "Mandavadi – Garba & Mandli",
      "city": "Ahmedabad",
      "area": "Ognaj Circle",
      "address": "Nidhivan Party Plot, Ognaj Circle, Ahmedabad",
      "landmark": "Nidhivan Party Plot",
      "image": "/images/garba-fest/garba-01.jpg",
      "gallery": [
        "/images/garba-fest/garba-01.jpg"
      ],
      "lat": 23.1025,
      "lng": 72.481,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Ognaj Circle"
      ],
      "capacityHint": 1200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-02",
      "name": "Mandalam Garba",
      "city": "Ahmedabad",
      "area": "Bopal",
      "address": "VIP Road, Bopal, Ahmedabad",
      "landmark": "VIP Road",
      "image": "/images/garba-fest/garba-02.jpg",
      "gallery": [
        "/images/garba-fest/garba-02.jpg"
      ],
      "lat": 23.032,
      "lng": 72.465,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bopal"
      ],
      "capacityHint": 1400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-03",
      "name": "Dholki Garba – The Premium Mandli",
      "city": "Ahmedabad",
      "area": "Ognaj–Bhadaj",
      "address": "Ognaj–Bhadaj, Ahmedabad",
      "landmark": "Ognaj–Bhadaj",
      "image": "/images/garba-fest/garba-03.jpg",
      "gallery": [
        "/images/garba-fest/garba-03.jpg"
      ],
      "lat": 23.095,
      "lng": 72.475,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Ognaj–Bhadaj"
      ],
      "capacityHint": 1600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-04",
      "name": "Maa Ni Mandvi",
      "city": "Ahmedabad",
      "area": "Opp. LK Farm Road",
      "address": "Opp. LK Farm Road, Ahmedabad",
      "landmark": "Opp. LK Farm Road",
      "image": "/images/garba-fest/garba-04.jpg",
      "gallery": [
        "/images/garba-fest/garba-04.jpg"
      ],
      "lat": 23.088,
      "lng": 72.492,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Opp. LK Farm Road"
      ],
      "capacityHint": 1800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-05",
      "name": "Ghammardi – Garba & Mandli",
      "city": "Ahmedabad",
      "area": "Khodiyar",
      "address": "Khodiyar, Ahmedabad",
      "landmark": "Khodiyar",
      "image": "/images/garba-fest/garba-05.jpg",
      "gallery": [
        "/images/garba-fest/garba-05.jpg"
      ],
      "lat": 23.138,
      "lng": 72.538,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Khodiyar"
      ],
      "capacityHint": 2000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-06",
      "name": "Radhevan – The Mandli Garba",
      "city": "Ahmedabad",
      "area": "Bopal",
      "address": "S.P. Ring Road, Bopal, Ahmedabad",
      "landmark": "S.P. Ring Road",
      "image": "/images/garba-fest/garba-06.jpg",
      "gallery": [
        "/images/garba-fest/garba-06.jpg"
      ],
      "lat": 23.028,
      "lng": 72.458,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bopal"
      ],
      "capacityHint": 2200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-07",
      "name": "Swarnim Nagari Garba",
      "city": "Ahmedabad",
      "area": "Makarba",
      "address": "LJ University Road, Makarba, Ahmedabad",
      "landmark": "LJ University Road",
      "image": "/images/garba-fest/garba-07.jpg",
      "gallery": [
        "/images/garba-fest/garba-07.jpg"
      ],
      "lat": 22.992,
      "lng": 72.498,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Makarba"
      ],
      "capacityHint": 2400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-08",
      "name": "Divi Garba",
      "city": "Ahmedabad",
      "area": "Khodiyar",
      "address": "Master Farm, Khodiyar, Ahmedabad",
      "landmark": "Master Farm",
      "image": "/images/garba-fest/garba-08.jpg",
      "gallery": [
        "/images/garba-fest/garba-08.jpg"
      ],
      "lat": 23.142,
      "lng": 72.545,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Khodiyar"
      ],
      "capacityHint": 2600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-09",
      "name": "Maavdee",
      "city": "Ahmedabad",
      "area": "SG Highway",
      "address": "RM Patel Farm, SG Highway, Ahmedabad",
      "landmark": "RM Patel Farm",
      "image": "/images/garba-fest/garba-09.jpg",
      "gallery": [
        "/images/garba-fest/garba-09.jpg"
      ],
      "lat": 23.055,
      "lng": 72.508,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "SG Highway"
      ],
      "capacityHint": 2800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-10",
      "name": "Radhe Raas Garba & Mandli",
      "city": "Ahmedabad",
      "area": "Vivianna Farm",
      "address": "Vivianna Farm, Ahmedabad",
      "landmark": "Vivianna Farm",
      "image": "/images/garba-fest/garba-10.jpg",
      "gallery": [
        "/images/garba-fest/garba-10.jpg"
      ],
      "lat": 23.078,
      "lng": 72.488,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Vivianna Farm"
      ],
      "capacityHint": 3000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-11",
      "name": "RaasRatri",
      "city": "Ahmedabad",
      "area": "Oreva Farm",
      "address": "Oreva Farm, Ahmedabad",
      "landmark": "Oreva Farm",
      "image": "/images/garba-fest/garba-11.jpg",
      "gallery": [
        "/images/garba-fest/garba-11.jpg"
      ],
      "lat": 23.07,
      "lng": 72.5,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Oreva Farm"
      ],
      "capacityHint": 1200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-12",
      "name": "SAIBO Navratri Garba",
      "city": "Ahmedabad",
      "area": "Shilaj",
      "address": "Mahendra Farm, Shilaj, Ahmedabad",
      "landmark": "Mahendra Farm",
      "image": "/images/garba-fest/garba-12.jpg",
      "gallery": [
        "/images/garba-fest/garba-12.jpg"
      ],
      "lat": 23.068,
      "lng": 72.478,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Shilaj"
      ],
      "capacityHint": 1400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-13",
      "name": "Prachin Mandli Garba",
      "city": "Ahmedabad",
      "area": "Aagman Farm",
      "address": "Aagman Farm, Ahmedabad",
      "landmark": "Aagman Farm",
      "image": "/images/garba-fest/garba-13.jpg",
      "gallery": [
        "/images/garba-fest/garba-13.jpg"
      ],
      "lat": 23.085,
      "lng": 72.505,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Aagman Farm"
      ],
      "capacityHint": 1600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-14",
      "name": "Aangan – The Mandali Garba",
      "city": "Ahmedabad",
      "area": "Arrissto Club & Resort",
      "address": "Arrissto Club & Resort, Ahmedabad",
      "landmark": "Arrissto Club & Resort",
      "image": "/images/garba-fest/garba-14.jpg",
      "gallery": [
        "/images/garba-fest/garba-14.jpg"
      ],
      "lat": 23.06,
      "lng": 72.49,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Arrissto Club & Resort"
      ],
      "capacityHint": 1800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-15",
      "name": "Raaton Ni Rassleela",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "address": "Evergreen Party Plot, Bhadaj, Ahmedabad",
      "landmark": "Evergreen Party Plot",
      "image": "/images/garba-fest/garba-15.jpg",
      "gallery": [
        "/images/garba-fest/garba-15.jpg"
      ],
      "lat": 23.098,
      "lng": 72.468,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bhadaj"
      ],
      "capacityHint": 2000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-16",
      "name": "Karnavati No Sanedo",
      "city": "Ahmedabad",
      "area": "Aagaman Party Plot & Resort",
      "address": "Aagaman Party Plot & Resort, Ahmedabad",
      "landmark": "Aagaman Party Plot & Resort",
      "image": "/images/garba-fest/garba-16.jpg",
      "gallery": [
        "/images/garba-fest/garba-16.jpg"
      ],
      "lat": 23.082,
      "lng": 72.51,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Aagaman Party Plot & Resort"
      ],
      "capacityHint": 2200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-17",
      "name": "Mirchi Rock N Dhol",
      "city": "Ahmedabad",
      "area": "Aman/Akash Party Plot",
      "address": "Aman/Akash Party Plot, Ahmedabad",
      "landmark": "Aman/Akash Party Plot",
      "image": "/images/garba-fest/garba-17.jpg",
      "gallery": [
        "/images/garba-fest/garba-17.jpg"
      ],
      "lat": 23.045,
      "lng": 72.52,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Aman/Akash Party Plot"
      ],
      "capacityHint": 2400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-18",
      "name": "Sheri Garba",
      "city": "Ahmedabad",
      "area": "Aarav Farm",
      "address": "Aarav Farm, Ahmedabad",
      "landmark": "Aarav Farm",
      "image": "/images/garba-fest/garba-18.jpg",
      "gallery": [
        "/images/garba-fest/garba-18.jpg"
      ],
      "lat": 23.05,
      "lng": 72.495,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Aarav Farm"
      ],
      "capacityHint": 2600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-19",
      "name": "PYC Navratri",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "address": "M K Farm House, Bhadaj, Ahmedabad",
      "landmark": "M K Farm House",
      "image": "/images/garba-fest/garba-19.jpg",
      "gallery": [
        "/images/garba-fest/garba-19.jpg"
      ],
      "lat": 23.1,
      "lng": 72.47,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bhadaj"
      ],
      "capacityHint": 2800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-20",
      "name": "Aadyaraas Garba",
      "city": "Ahmedabad",
      "area": "Bopal",
      "address": "Sankus Farm, Bopal, Ahmedabad",
      "landmark": "Sankus Farm",
      "image": "/images/garba-fest/garba-20.jpg",
      "gallery": [
        "/images/garba-fest/garba-20.jpg"
      ],
      "lat": 23.025,
      "lng": 72.462,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bopal"
      ],
      "capacityHint": 3000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-21",
      "name": "Vrindavan Nagari",
      "city": "Ahmedabad",
      "area": "Makarba",
      "address": "Shubh Farm, Makarba, Ahmedabad",
      "landmark": "Shubh Farm",
      "image": "/images/garba-fest/garba-21.jpg",
      "gallery": [
        "/images/garba-fest/garba-21.jpg"
      ],
      "lat": 22.995,
      "lng": 72.505,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Makarba"
      ],
      "capacityHint": 1200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-22",
      "name": "Night Zero Garba",
      "city": "Ahmedabad",
      "area": "Bhadaj",
      "address": "Evergreen Party Plot, Bhadaj, Ahmedabad",
      "landmark": "Evergreen Party Plot",
      "image": "/images/garba-fest/garba-22.jpg",
      "gallery": [
        "/images/garba-fest/garba-22.jpg"
      ],
      "lat": 23.099,
      "lng": 72.469,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Bhadaj"
      ],
      "capacityHint": 1400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-23",
      "name": "Navli Ratri",
      "city": "Ahmedabad",
      "area": "Shree Ganesh Tilak Farm",
      "address": "Shree Ganesh Tilak Farm, Ahmedabad",
      "landmark": "Shree Ganesh Tilak Farm",
      "image": "/images/garba-fest/garba-23.jpg",
      "gallery": [
        "/images/garba-fest/garba-23.jpg"
      ],
      "lat": 23.075,
      "lng": 72.515,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Shree Ganesh Tilak Farm"
      ],
      "capacityHint": 1600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-24",
      "name": "Sacred Raas",
      "city": "Ahmedabad",
      "area": "Sacred Raas Ground",
      "address": "Sacred Raas Ground, Ahmedabad",
      "landmark": "Sacred Raas Ground",
      "image": "/images/garba-fest/garba-24.jpg",
      "gallery": [
        "/images/garba-fest/garba-24.jpg"
      ],
      "lat": 23.04,
      "lng": 72.53,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Sacred Raas Ground"
      ],
      "capacityHint": 1800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-25",
      "name": "Vibe With The Night",
      "city": "Ahmedabad",
      "area": "Ahmedabad",
      "address": "Ahmedabad",
      "landmark": "Ahmedabad",
      "image": "/images/garba-fest/garba-25.jpg",
      "gallery": [
        "/images/garba-fest/garba-25.jpg"
      ],
      "lat": 23.035,
      "lng": 72.55,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Ahmedabad"
      ],
      "capacityHint": 2000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-26",
      "name": "Sachi Navratri AC Dome Garba",
      "city": "Ahmedabad",
      "area": "Ahmedabad",
      "address": "Ahmedabad",
      "landmark": "Ahmedabad",
      "image": "/images/garba-fest/garba-26.jpg",
      "gallery": [
        "/images/garba-fest/garba-26.jpg"
      ],
      "lat": 23.022,
      "lng": 72.54,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Ahmedabad"
      ],
      "capacityHint": 2200,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-27",
      "name": "AadhyaShakti Garba Prasang",
      "city": "Ahmedabad",
      "area": "SG Highway / Chanakyapuri",
      "address": "SG Highway / Chanakyapuri, Ahmedabad",
      "landmark": "SG Highway / Chanakyapuri",
      "image": "/images/garba-fest/garba-27.jpg",
      "gallery": [
        "/images/garba-fest/garba-27.jpg"
      ],
      "lat": 23.048,
      "lng": 72.512,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "SG Highway / Chanakyapuri"
      ],
      "capacityHint": 2400,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-28",
      "name": "La Regal's Shubhaarambh",
      "city": "Ahmedabad",
      "area": "Shree Hari Party Plot",
      "address": "Shree Hari Party Plot, Ahmedabad",
      "landmark": "Shree Hari Party Plot",
      "image": "/images/garba-fest/garba-28.jpg",
      "gallery": [
        "/images/garba-fest/garba-28.jpg"
      ],
      "lat": 23.065,
      "lng": 72.525,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Shree Hari Party Plot"
      ],
      "capacityHint": 2600,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-29",
      "name": "Pankhida – Root of Raas",
      "city": "Ahmedabad",
      "area": "Shree Hari Party Plot",
      "address": "Shree Hari Party Plot, Ahmedabad",
      "landmark": "Shree Hari Party Plot",
      "image": "/images/garba-fest/garba-29.jpg",
      "gallery": [
        "/images/garba-fest/garba-29.jpg"
      ],
      "lat": 23.066,
      "lng": 72.526,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Shree Hari Party Plot"
      ],
      "capacityHint": 2800,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    },
    {
      "id": "place-30",
      "name": "The Garba Experience with Kinjal Dave",
      "city": "Ahmedabad",
      "area": "Vivenza by Gopi Farm",
      "address": "Vivenza by Gopi Farm, Ahmedabad",
      "landmark": "Vivenza by Gopi Farm",
      "image": "/images/garba-fest/garba-30.jpg",
      "gallery": [
        "/images/garba-fest/garba-30.jpg"
      ],
      "lat": 23.09,
      "lng": 72.495,
      "tags": [
        "Garba",
        "Mandli",
        "Navratri",
        "Vivenza by Gopi Farm"
      ],
      "capacityHint": 3000,
      "parking": true,
      "metroNearby": false,
      "photoStyle": "garba-festival"
    }
  ]
}
;
