// WRONG ANSWER ONLY — Question bank (225 questions)
// FORMAT: [question, ...TRUE options, WRONG option]  → the LAST option is the odd/wrong one.
// Example: ["Which is a Vijay film?", "Sivakasi", "Ghilli", "Kaththi", "Veeram"]
//   Sivakasi, Ghilli, Kaththi = true Vijay films. Veeram (Ajith) = the WRONG one → player must tap it.
// GAME RULE: tapping the WRONG option (q.wrong) = PASS. Tapping any true option = FAIL.
// build() shuffles the options and stores the wrong option's id in `wrong`.

const shuffle = (a) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

const build = (lvl, rows) =>
  rows.map((row, i) => {
    const [q, ...opts] = row;
    const wrongText = opts[opts.length - 1];
    const ids = ["a", "b", "c", "d"];
    const options = shuffle(opts).map((t, k) => ({ id: ids[k], t }));
    const wrong = options.find((o) => o.t === wrongText).id;
    return { id: `L${lvl}-${String(i + 1).padStart(2, "0")}`, q, options, wrong };
  });

// Use in the game: true when the player tapped the WRONG option (= PASS)
export const isPass = (question, pickedId) => pickedId === question.wrong;

/* ───────── LEVEL 1 · 15 questions · 2 options ───────── */
const L1 = [
  ["Which is a Vijay movie?", "Leo", "Jailer"],
  ["Which film stars Vijay?", "Ghilli", "Kaithi"],
  ["Which is Vijay's party?", "TVK", "DMK"],
  ["Which is Rajinikanth's title?", "Superstar", "Ulaganayagan"],
  ["Who is called 'Thala'?", "Ajith", "Dhanush"],
  ["Which is a Tamil Nadu city?", "Madurai", "Mumbai"],
  ["Tamil cinema is called...", "Kollywood", "Tollywood"],
  ["Which is a Tamil Nadu party?", "DMK", "TDP"],
  ["Which is a Tamil Nadu dish?", "Pongal", "Pav Bhaji"],
  ["Which is a Vijay song?", "Vaathi Coming", "Rowdy Baby"],
  ["Which is a CSK jersey colour?", "Yellow", "Pink"],
  ["Which is in Chennai?", "Marina Beach", "Charminar"],
  ["Who is a Kollywood hero?", "Suriya", "Mahesh Babu"],
  ["Nesamani meme is from...", "Friends", "Master"],
  ["Who was a Tamil Nadu CM?", "Jayalalithaa", "Narendra Modi"],
];

/* ───────── LEVEL 2 · 30 questions · 3 options ───────── */
const L2 = [
  ["Who directed Vijay?", "Atlee", "Lokesh Kanagaraj", "Mani Ratnam"],
  ["Which is an Atlee film?", "Theri", "Mersal", "Jailer"],
  ["Which is a Lokesh film?", "Kaithi", "Master", "Beast"],
  ["Which is a Nelson film?", "Doctor", "Jailer", "Leo"],
  ["Which is a Shankar film?", "Anniyan", "Enthiran", "Ghilli"],
  ["Which is a Vijay–Murugadoss film?", "Thuppakki", "Kaththi", "Mersal"],
  ["Which is a Rajini film?", "Padayappa", "Baashha", "Thuppakki"],
  ["Which is a Kamal film?", "Nayakan", "Indian", "Anniyan"],
  ["Which is an Ajith film?", "Mankatha", "Viswasam", "Mersal"],
  ["Which is a Suriya film?", "Singam", "Kaakha Kaakha", "Asuran"],
  ["Which is a Dhanush film?", "Asuran", "Karnan", "Remo"],
  ["Which is an SK film?", "Doctor", "Don", "Vada Chennai"],
  ["Which is a Vijay Sethupathi film?", "96", "Super Deluxe", "Anniyan"],
  ["Which is an Anirudh film?", "Master", "Jailer", "Mersal"],
  ["Which is a Vijay–Anirudh film?", "Kaththi", "Beast", "Bigil"],
  ["Which is a Vijay film song?", "Arabic Kuthu", "Vaathi Coming", "Why This Kolaveri Di"],
  ["Which is from Master?", "Vaathi Coming", "Kutti Story", "Naa Ready"],
  ["Which is from Beast?", "Arabic Kuthu", "Jolly O Gymkhana", "Ranjithame"],
  ["Who is a comedian?", "Vadivelu", "Goundamani", "Nayanthara"],
  ["Who is a music composer?", "Ilaiyaraaja", "Anirudh", "Kishore Kumar"],
  ["Who is a Tamil heroine?", "Trisha", "Nayanthara", "Alia Bhatt"],
  ["Which is a Dravidian party?", "DMK", "AIADMK", "BJP"],
  ["Who was a TN CM?", "Kamaraj", "Annadurai", "Vijayakanth"],
  ["Who became Tamil Nadu CM?", "MGR", "Jayalalithaa", "Seeman"],
  ["Which pairing is RIGHT?", "Rising Sun – DMK", "Two Leaves – AIADMK", "Mango – DMK"],
  ["Which leader–party pair is RIGHT?", "Seeman – NTK", "Anbumani – PMK", "Vaiko – DMK"],
  ["Which leader–party match is TRUE?", "Vijayakanth – DMDK", "Kamal Haasan – MNM", "Annamalai – DMK"],
  ["Which is a TN district?", "Theni", "Karur", "Kochi"],
  ["Which colour is on TVK's flag?", "Red", "Yellow", "Green"],
  ["Which is a Chennai thing?", "Filter coffee", "Marina Beach", "Gateway of India"],
];

/* ───────── LEVEL 3 · 45 questions · 3 options ───────── */
const L3 = [
  ["Which HQ pairing is RIGHT?", "DMK – Anna Arivalayam", "AIADMK – MGR Maaligai", "BJP – Anna Arivalayam"],
  ["Which is Karunanidhi's title?", "Kalaignar", "Muthamizh Arignar", "Puratchi Thalaivar"],
  ["Which is MGR's title?", "Puratchi Thalaivar", "Makkal Thilagam", "Kalaignar"],
  ["Which is Jayalalithaa's title?", "Amma", "Puratchi Thalaivi", "Thalapathy"],
  ["Which founder match is RIGHT?", "DMK – Annadurai", "AIADMK – M.G. Ramachandran", "DMDK – Seeman"],
  ["Which founder pair is TRUE?", "DMDK – Vijayakanth", "MNM – Kamal Haasan", "NTK – Anbumani"],
  ["Which party–symbol pair is RIGHT?", "DMK – Rising Sun", "AIADMK – Two Leaves", "BJP – Mango"],
  ["Which symbol match is TRUE?", "Congress – Hand", "BJP – Lotus", "MNM – Rising Sun"],
  ["Which founding year is RIGHT?", "DMK founded 1949", "AIADMK founded 1972", "TVK founded 1999"],
  ["Which TN number is RIGHT?", "TN Assembly: 234 seats", "TN Lok Sabha: 39 seats", "TN districts: 100"],
  ["Which TN fact is TRUE?", "Capital: Chennai", "Secretariat: Fort St George", "Assembly majority: 200"],
  ["Which is a TN state symbol?", "Nilgiri Tahr", "Palmyra", "Bengal Tiger"],
  ["Which is a TN river?", "Kaveri", "Vaigai", "Ganga"],
  ["Which is a TN hill station?", "Ooty", "Kodaikanal", "Munnar"],
  ["Which is a TN temple town?", "Madurai", "Kanchipuram", "Tirupati"],
  ["Which is Kamal Haasan's title?", "Ulaganayagan", "Kalaignani", "Superstar"],
  ["Which is Vijayakanth's title?", "Captain", "Karuppu MGR", "Thalapathy"],
  ["Which release year is RIGHT?", "Master – 2021", "Leo – 2023", "Varisu – 2019"],
  ["Which film–director pair is RIGHT?", "Leo – Lokesh", "Theri – Atlee", "Beast – Atlee"],
  ["Which film–director match is TRUE?", "Ghilli – Dharani", "Pokkiri – Prabhu Deva", "Kaththi – Lokesh"],
  ["Which pairing is TRUE?", "Varisu – Vamshi Paidipally", "The GOAT – Venkat Prabhu", "Bigil – Nelson"],
  ["Which film–composer pair is RIGHT?", "Mersal – AR Rahman", "Master – Anirudh", "Varisu – Anirudh"],
  ["Which film–composer match is TRUE?", "Leo – Anirudh", "The GOAT – Yuvan Shankar Raja", "Sarkar – Anirudh"],
  ["Which is a Vijay oldie?", "Kushi", "Youth", "Chandramukhi"],
  ["Which T-film is Vijay's?", "Thirumalai", "Thirupaachi", "Thirupathi"],
  ["Which is a Mani Ratnam film?", "Roja", "Bombay", "Anniyan"],
  ["Which is a Bala film?", "Sethu", "Pithamagan", "Paruthiveeran"],
  ["Which is a Vetrimaaran film?", "Visaranai", "Asuran", "Kaithi"],
  ["Which is a Pa. Ranjith film?", "Kabali", "Kaala", "Karnan"],
  ["Which is a Mari Selvaraj film?", "Pariyerum Perumal", "Karnan", "Madras"],
  ["Which is a Venkat Prabhu film?", "Mankatha", "Chennai 600028", "Vedalam"],
  ["Which is Ilaiyaraaja's title?", "Isaignani", "Maestro", "Isai Puyal"],
  ["Which is an Anirudh hit?", "Why This Kolaveri Di", "Vaathi Coming", "Rowdy Baby"],
  ["Which character–film match is TRUE?", "Nesamani – Friends", "Naai Sekar – Thalai Nagaram", "Kaipulla – Master"],
  ["Which is an IPL team?", "CSK", "KKR", "DMK"],
  ["Which CSK fact is TRUE?", "Home ground: Chepauk", "Dhoni's jersey number: 7", "CSK has won 10 IPL titles"],
  ["Which year did CSK win IPL?", "2010", "2011", "2016"],
  ["Which is a Tamil art form?", "Bharatanatyam", "Karagattam", "Kathakali"],
  ["Which is a Tamil Nadu sport?", "Jallikattu", "Silambam", "Sumo"],
  ["Which is a Pongal day?", "Bhogi", "Mattu Pongal", "Ugadi"],
  ["Which is a Tamil month?", "Chithirai", "Aadi", "March"],
  ["Which is seen in election season?", "Flex banners", "Loudspeaker campaigns", "Peaceful, silent streets"],
  ["Which is on a typical flex banner?", "Giant leader face", "Ten tiny local leaders", "A blank white banner"],
  ["Which CM–first term pair is RIGHT?", "Karunanidhi – 1969", "MGR – 1977", "Stalin – 2011"],
  ["Which Rajini fact is TRUE?", "Real name: Sivaji Rao Gaekwad", "Debut: Apoorva Raagangal", "Born in Madurai"],
];

/* ───────── LEVEL 4 · 60 questions · 3 options · 1.5s ───────── */
const L4 = [
  ["Which Vijay fact is TRUE?", "Born in Chennai", "Father: S. A. Chandrasekhar", "Born in 1984"],
  ["Which TVK fact is TRUE?", "Party: Tamilaga Vettri Kazhagam", "Fan club: Vijay Makkal Iyakkam", "First conference: Madurai"],
  ["Which is on TVK's flag?", "Elephants", "Vaagai flower", "Rising Sun"],
  ["Which release year is RIGHT?", "Theri – 2016", "Mersal – 2017", "Sarkar – 2019"],
  ["Which year matches?", "Bigil – 2019", "Beast – 2022", "Bairavaa – 2018"],
  ["Which release year is TRUE?", "Thuppakki – 2012", "Kaththi – 2014", "Puli – 2017"],
  ["Which release year is CORRECT?", "Ghilli – 2004", "Pokkiri – 2007", "Thalaivaa – 2008"],
  ["Which Vijay year is correct?", "Master – 2021", "Leo – 2023", "The GOAT – 2022"],
  ["Which song did Vijay sing?", "Kutti Story", "Naa Ready", "Arabic Kuthu"],
  ["Which is in the LCU?", "Kaithi", "Vikram", "Beast"],
  ["Which is an LCU character?", "Dilli", "Agent Vikram", "Singam"],
  ["Which is a Karthik Subbaraj film?", "Jigarthanda", "Petta", "Kaithi"],
  ["Which is a Gautham Menon film?", "Vaaranam Aayiram", "Vinnaithaandi Varuvaayaa", "Singam"],
  ["Which is a Hari film?", "Singam", "Saamy", "Vaaranam Aayiram"],
  ["Pick the Shankar movie", "Mudhalvan", "Jeans", "Vikram Vedha"],
  ["Pick the Rajini movie", "Muthu", "Sivaji", "Maaveeran"],
  ["Pick the Kamal movie", "Thevar Magan", "Vishwaroopam", "Soorarai Pottru"],
  ["Pick the Ajith movie", "Billa", "Vedalam", "Remo"],
  ["Pick the Suriya movie", "Jai Bhim", "Vaaranam Aayiram", "Maanagaram"],
  ["Pick the Karthi movie", "Paruthiveeran", "Madras", "Pithamagan"],
  ["Pick the Vikram movie", "Anniyan", "Thangalaan", "Aaru"],
  ["Pick the Simbu movie", "Vinnaithaandi Varuvaayaa", "Maanaadu", "Mankatha"],
  ["Pick the Nayanthara movie", "Aramm", "Kolamaavu Kokila", "Soodhu Kavvum"],
  ["Which song is from Jailer?", "Kaavaalaa", "Hukum", "Naa Ready"],
  ["Which song is from Vikram?", "Pathala Pathala", "Once Upon A Time", "Kaavaalaa"],
  ["Which song is from Varisu?", "Ranjithame", "Thee Thalapathy", "Vaathi Coming"],
  ["Which song is from Leo?", "Naa Ready", "Badass", "Selfie Pulla"],
  ["Which song is from Mersal?", "Aalaporan Thamizhan", "Neethaane", "Verithanam"],
  ["Which song is from Bigil?", "Verithanam", "Singappenney", "Aalaporan Thamizhan"],
  ["Pick the Rahman score", "Roja", "Bombay", "Kaithi"],
  ["Pick the Ilaiyaraaja score", "Mouna Ragam", "Thalapathi", "Roja"],
  ["Which assembly fact is TRUE?", "Constituencies: 234", "The Speaker presides over the Assembly", "The Governor is elected by voters"],
  ["Who acted in films?", "MGR", "Jayalalithaa", "Kamaraj"],
  ["Which party was born in Tamil Nadu?", "DMK", "PMK", "Shiv Sena"],
  ["Which leader–title pair is RIGHT?", "Karunanidhi – Kalaignar", "Vijayakanth – Captain", "Seeman – Puratchi Thalaivar"],
  ["Which person–title pair is RIGHT?", "Jayalalithaa – Amma", "MGR – Makkal Thilagam", "Annadurai – Kalaignar"],
  ["Which leader–nickname is RIGHT?", "Kamaraj – Kingmaker", "Periyar – Thanthai Periyar", "Annadurai – Captain"],
  ["Which meme–star match is RIGHT?", "'Mind it' – Rajinikanth", "'Nesamani' – Friends", "'Kabali da' – Vijay"],
  ["Which film–hero pair is RIGHT?", "Baashha – Rajinikanth", "Nayakan – Kamal Haasan", "Mankatha – Vijay"],
  ["Which film–hero match is TRUE?", "Asuran – Dhanush", "Maharaja – Vijay Sethupathi", "Amaran – Vikram"],
  ["Which hero–film pairing is right?", "Thunivu – Ajith", "Jailer – Rajinikanth", "Leo – Suriya"],
  ["Which hero–film link is TRUE?", "Soorarai Pottru – Suriya", "Madras – Karthi", "Doctor – Dhanush"],
  ["Who is in Master?", "Vijay Sethupathi", "Malavika Mohanan", "Ajith"],
  ["Who is in Leo?", "Trisha", "Sanjay Dutt", "Rajinikanth"],
  ["Who is in Jailer?", "Rajinikanth", "Shiva Rajkumar", "Vijay"],
  ["Who is in Vikram?", "Kamal Haasan", "Fahadh Faasil", "Dhanush"],
  ["Who is in Thuppakki?", "Kajal Aggarwal", "Vidyut Jammwal", "Trisha"],
  ["Who is in Beast?", "Pooja Hegde", "Yogi Babu", "Samantha"],
  ["Who is in Varisu?", "Rashmika Mandanna", "Prakash Raj", "Nayanthara"],
  ["Who is in Bigil?", "Nayanthara", "Jackie Shroff", "Pooja Hegde"],
  ["Which is a Chennai locality?", "T. Nagar", "Adyar", "Bandra"],
  ["Which is a Chennai beach?", "Marina", "Elliot's", "Juhu"],
  ["Which airport is in Tamil Nadu?", "Madurai", "Tiruchirappalli", "Kochi"],
  ["Which biryani is TN-born?", "Ambur", "Dindigul", "Hyderabadi"],
  ["Which is a Madurai thing?", "Jigarthanda", "Meenakshi Amman Temple", "Mysore Palace"],
  ["Which is a Rameswaram link?", "Pamban Bridge", "Dhanushkodi", "Golden Temple"],
  ["Which is a Tamil folk instrument?", "Parai", "Thavil", "Sitar"],
  ["Which is a Tamil literary work?", "Thirukkural", "Silappathikaram", "Ramcharitmanas"],
  ["Who is a Tamil poet?", "Thiruvalluvar", "Bharathiyar", "Tulsidas"],
  ["Which is linked to Kollywood?", "Kodambakkam", "Vadapalani", "Juhu"],
];

/* ───────── LEVEL 5 · 75 questions · 4 options · 1.5s ───────── */
const L5 = [
  ["Which is a Vijay film?", "Sivakasi", "Ghilli", "Kaththi", "Veeram"],
  ["Which one stars Vijay?", "Nanban", "Velayudham", "Sura", "Vedalam"],
  ["Pick the Vijay film", "Kaavalan", "Priyamudan", "Minsara Kanna", "Citizen"],
  ["Spot Vijay's film", "Friends", "Youth", "Shahjahan", "Run"],
  ["Which is a Vijay oldie?", "Poove Unakkaga", "Nenjinile", "Thullatha Manamum Thullum", "Kadhal Kottai"],
  ["Which is from Vijay's 90s?", "Kadhalukku Mariyadhai", "Once More", "Rasigan", "Kaadhal Mannan"],
  ["Which is an AR Murugadoss film?", "Ghajini", "Thuppakki", "Sarkar", "Anniyan"],
  ["Which is a Lokesh Kanagaraj film?", "Maanagaram", "Kaithi", "Vikram", "Kaththi"],
  ["Which is an Atlee film?", "Raja Rani", "Theri", "Mersal", "Doctor"],
  ["Which is a Nelson film?", "Kolamaavu Kokila", "Doctor", "Beast", "Varisu"],
  ["Which is a Venkat Prabhu film?", "Saroja", "Mankatha", "Maanaadu", "Mahaan"],
  ["Which is a Pa. Ranjith film?", "Attakathi", "Madras", "Kabali", "Pariyerum Perumal"],
  ["Which is a Vetrimaaran film?", "Polladhavan", "Aadukalam", "Visaranai", "Maanagaram"],
  ["Which is a Bala film?", "Sethu", "Nandha", "Naan Kadavul", "Aadukalam"],
  ["Which is a Mysskin film?", "Chithiram Pesudhadi", "Anjathe", "Yuddham Sei", "Visaranai"],
  ["Which is a Selvaraghavan film?", "Kadhal Konden", "7G Rainbow Colony", "Pudhupettai", "Aadukalam"],
  ["Which is a Shankar film?", "Mudhalvan", "Boys", "Anniyan", "Aaru"],
  ["Which is a K. S. Ravikumar film?", "Muthu", "Padayappa", "Dasavathaaram", "Mankatha"],
  ["Which is a Cheran film?", "Autograph", "Pandavar Bhoomi", "Thavamai Thavamirundhu", "Pariyerum Perumal"],
  ["Which is a Lingusamy film?", "Run", "Sandakozhi", "Paiyaa", "Vaaranam Aayiram"],
  ["Which is an AR Rahman score?", "Roja", "Bombay", "Mersal", "Kaithi"],
  ["Which is an Anirudh score?", "3", "Vikram", "Master", "Pokkiri"],
  ["Which is a Yuvan score?", "Pudhupettai", "Paiyaa", "Mankatha", "Mersal"],
  ["Which is a Harris Jayaraj score?", "Minnale", "Kaakha Kaakha", "Thuppakki", "Master"],
  ["Which is a GV Prakash score?", "Aadukalam", "Asuran", "Theri", "Leo"],
  ["Which is a Santhosh Narayanan score?", "Pizza", "Madras", "Kabali", "Kaththi"],
  ["Which is a D. Imman score?", "Viswasam", "Kumki", "Mynaa", "Remo"],
  ["Which is a Dhanush film?", "Aadukalam", "Karnan", "Vada Chennai", "Madras"],
  ["Which is a Sivakarthikeyan film?", "Remo", "Don", "Maaveeran", "Aadukalam"],
  ["Which is a Suriya film?", "Ghajini", "Singam", "Jai Bhim", "Sivaji"],
  ["Which is an Ajith film?", "Vaali", "Mankatha", "Thunivu", "Theri"],
  ["Which is a Rajinikanth film?", "Muthu", "Kabali", "Kaala", "Karnan"],
  ["Which is a Kamal Haasan film?", "Nayakan", "Indian", "Dasavathaaram", "Kabali"],
  ["Which is a Vijay Sethupathi film?", "96", "Super Deluxe", "Maharaja", "Vada Chennai"],
  ["Which is a Vikram film?", "Anniyan", "I", "Thangalaan", "Aaru"],
  ["Who was a TN Chief Minister?", "O. Panneerselvam", "Edappadi K. Palaniswami", "V. R. Nedunchezhiyan", "Annamalai"],
  ["Who held the CM post?", "C. N. Annadurai", "M. Bhaktavatsalam", "Janaki Ramachandran", "Vaiko"],
  ["Which party is in TN politics?", "VCK", "MDMK", "PMK", "Shiromani Akali Dal"],
  ["Which party–symbol pair is RIGHT?", "DMK – Rising Sun", "AIADMK – Two Leaves", "PMK – Mango", "DMDK – Lotus"],
  ["Which symbol match is TRUE?", "Congress – Hand", "MNM – Battery Torch", "BJP – Lotus", "AIADMK – Rising Sun"],
  ["Which founder match is RIGHT?", "DMK – Annadurai", "PMK – Ramadoss", "DMDK – Vijayakanth", "MNM – Seeman"],
  ["Which leader–party pair is TRUE?", "Thirumavalavan – VCK", "Vaiko – MDMK", "TTV Dhinakaran – AMMK", "Anbumani – DMDK"],
  ["Which founding year is RIGHT?", "DMK – 1949", "AIADMK – 1972", "DMDK – 2005", "MNM – 2012"],
  ["Which TN number is RIGHT?", "Assembly seats: 234", "Lok Sabha seats: 39", "Rajya Sabha seats: 18", "Districts: 50"],
  ["Which is a TN district?", "Nilgiris", "Ariyalur", "Perambalur", "Thrissur"],
  ["Which is a TN river?", "Vaigai", "Bhavani", "Thamirabarani", "Krishna"],
  ["Which dam is in Tamil Nadu?", "Mettur", "Bhavanisagar", "Vaigai", "Idukki"],
  ["Which park is in Tamil Nadu?", "Mudumalai", "Guindy", "Anamalai", "Periyar"],
  ["Which temple is in Tamil Nadu?", "Brihadeeswarar", "Meenakshi Amman", "Ramanathaswamy", "Jagannath Puri"],
  ["Which UNESCO site is in TN?", "Mahabalipuram", "Great Living Chola Temples", "Nilgiri Mountain Railway", "Hampi"],
  ["Who is from Tamil Nadu?", "R. Ashwin", "Viswanathan Anand", "Washington Sundar", "Virat Kohli"],
  ["Who played for CSK?", "Suresh Raina", "Matthew Hayden", "Faf du Plessis", "Rohit Sharma"],
  ["Which is a CSK title year?", "2010", "2018", "2021", "2019"],
  ["Which film had Vadivelu?", "Winner", "Marudhamalai", "Giri", "Master"],
  ["Who is a Tamil comedian?", "Santhanam", "Soori", "Yogi Babu", "Mohanlal"],
  ["Who is a Tamil film heroine?", "Trisha", "Samantha", "Keerthy Suresh", "Katrina Kaif"],
  ["Who was a Vijay film villain?", "Sanjay Dutt", "Vijay Sethupathi", "Vidyut Jammwal", "Fahadh Faasil"],
  ["Which Rajini fact is TRUE?", "Born in Bengaluru", "Debut: Apoorva Raagangal", "Real name: Sivaji Rao Gaekwad", "Born in 1960"],
  ["Which Kamal fact is TRUE?", "Debut: Kalathur Kannamma", "Born in Paramakudi", "Padma Bhushan awardee", "Born in 1964"],
  ["Which Ajith fact is TRUE?", "Racing driver", "Born in Hyderabad", "Billa (2007) is a remake", "Born in 1985"],
  ["Which Thalapathy fact is TRUE?", "Born in Chennai", "Debut: Naalaya Theerpu", "Starred in Thuppakki", "Born in Madurai"],
  ["Which Dhanush fact is TRUE?", "Directed Pa Paandi", "Sang Rowdy Baby", "Father: Kasthuri Raja", "Born in Mumbai"],
  ["Which AR Rahman fact is TRUE?", "Born in Chennai", "Won Oscars for Slumdog Millionaire", "Original name: A. S. Dileep Kumar", "Won 10 Oscars"],
  ["Which Ilaiyaraaja fact is TRUE?", "From Theni district", "Scored 1000+ films", "Nickname: Isaignani", "Won an Oscar"],
  ["Which Anirudh fact is TRUE?", "Debut film: 3", "Composed Jailer", "Composed Master", "Composed Mersal"],
  ["Which release year is RIGHT?", "Kaithi – 2019", "Vikram – 2022", "Jailer – 2023", "Master – 2020"],
  ["Which year is TRUE?", "Asuran – 2019", "Karnan – 2021", "Maharaja – 2024", "96 – 2016"],
  ["Which year is CORRECT?", "Jai Bhim – 2021", "Soorarai Pottru – 2020", "Ponniyin Selvan 1 – 2022", "Vikram Vedha – 2019"],
  ["Which release year matches?", "Enthiran – 2010", "Sivaji – 2007", "Kabali – 2016", "Kaala – 2017"],
  ["Which year is accurate?", "Anniyan – 2005", "Ghajini – 2005", "Vaaranam Aayiram – 2008", "Singam – 2012"],
  ["Which old-film year is RIGHT?", "Baashha – 1995", "Muthu – 1995", "Padayappa – 1999", "Nayakan – 1985"],
  ["Which film fact is TRUE?", "Enthiran starred Rajinikanth", "Anniyan was directed by Shankar", "Ponniyin Selvan was directed by Mani Ratnam", "Leo was directed by Atlee"],
  ["Which is Tamil slang?", "Machi", "Mapla", "Thala", "Bonjour"],
  ["Which is a Tamil Nadu festival?", "Pongal", "Karthigai Deepam", "Aadi Perukku", "Baisakhi"],
  ["Which is a Chennai food?", "Filter coffee", "Sundal", "Idli", "Vada Pav"],
];

export const LEVELS = {
  1: build(1, L1),
  2: build(2, L2),
  3: build(3, L3),
  4: build(4, L4),
  5: build(5, L5),
};

export const LEVEL_CONFIG = {
  1: { questions: 5,  options: 2, secPerQ: 2.0, pool: 15 },
  2: { questions: 10, options: 3, secPerQ: 2.0, pool: 30 },
  3: { questions: 15, options: 3, secPerQ: 2.0, pool: 45 },
  4: { questions: 20, options: 3, secPerQ: 1.5, pool: 60 },
  5: { questions: 25, options: 4, secPerQ: 1.5, pool: 75 },
};

// Call once at startup. Logs errors if the bank is malformed.
export function validateBank() {
  let ok = true;
  Object.entries(LEVEL_CONFIG).forEach(([lvl, cfg]) => {
    const pool = LEVELS[lvl];
    if (pool.length !== cfg.pool) { console.error(`L${lvl}: pool ${pool.length} != ${cfg.pool}`); ok = false; }
    const texts = new Set();
    pool.forEach((q) => {
      if (texts.has(q.q)) { console.error(`Duplicate question text in L${lvl}:`, q.q); ok = false; }
      texts.add(q.q);
      if (q.options.length !== cfg.options) { console.error("Option count:", q.id); ok = false; }
      if (new Set(q.options.map((o) => o.t)).size !== q.options.length) { console.error("Repeated option text:", q.id); ok = false; }
      if (!q.options.some((o) => o.id === q.wrong)) { console.error("No wrong id:", q.id); ok = false; }
    });
  });
  return ok;
}