// Global variables
let budgetChart = null;
let compareChart = null;
let impactChart = null;
let taxChart = null;
let currencyChart = null;
let currentGoal = null;
let quizData = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizStreak = 0;

// Comprehensive global city data for cost of living comparison
const cityData = {
    // United States
    newyork: { name: "New York, NY", housing: 3500, food: 800, transport: 150, utilities: 200, entertainment: 400 },
    losangeles: { name: "Los Angeles, CA", housing: 2800, food: 700, transport: 200, utilities: 180, entertainment: 350 },
    chicago: { name: "Chicago, IL", housing: 2000, food: 600, transport: 120, utilities: 160, entertainment: 300 },
    houston: { name: "Houston, TX", housing: 1500, food: 550, transport: 180, utilities: 140, entertainment: 250 },
    miami: { name: "Miami, FL", housing: 2200, food: 650, transport: 160, utilities: 170, entertainment: 320 },
    sanfrancisco: { name: "San Francisco, CA", housing: 4200, food: 900, transport: 180, utilities: 220, entertainment: 500 },
    seattle: { name: "Seattle, WA", housing: 2600, food: 750, transport: 140, utilities: 190, entertainment: 380 },
    boston: { name: "Boston, MA", housing: 3000, food: 720, transport: 130, utilities: 180, entertainment: 360 },
    washington: { name: "Washington, DC", housing: 2800, food: 680, transport: 150, utilities: 170, entertainment: 340 },
    atlanta: { name: "Atlanta, GA", housing: 1800, food: 580, transport: 160, utilities: 150, entertainment: 280 },

    // United Kingdom
    london: { name: "London", housing: 2800, food: 650, transport: 180, utilities: 200, entertainment: 400 },
    manchester: { name: "Manchester", housing: 1200, food: 450, transport: 120, utilities: 150, entertainment: 250 },
    birmingham: { name: "Birmingham", housing: 1000, food: 420, transport: 110, utilities: 140, entertainment: 230 },
    edinburgh: { name: "Edinburgh", housing: 1400, food: 480, transport: 100, utilities: 160, entertainment: 280 },
    glasgow: { name: "Glasgow", housing: 900, food: 400, transport: 90, utilities: 130, entertainment: 220 },
    liverpool: { name: "Liverpool", housing: 800, food: 380, transport: 85, utilities: 125, entertainment: 200 },
    bristol: { name: "Bristol", housing: 1300, food: 460, transport: 105, utilities: 155, entertainment: 270 },

    // Canada
    toronto: { name: "Toronto", housing: 2200, food: 600, transport: 140, utilities: 180, entertainment: 320 },
    vancouver: { name: "Vancouver", housing: 2500, food: 650, transport: 150, utilities: 190, entertainment: 350 },
    montreal: { name: "Montreal", housing: 1400, food: 500, transport: 100, utilities: 160, entertainment: 280 },
    calgary: { name: "Calgary", housing: 1600, food: 550, transport: 120, utilities: 170, entertainment: 300 },
    ottawa: { name: "Ottawa", housing: 1800, food: 580, transport: 130, utilities: 175, entertainment: 310 },
    edmonton: { name: "Edmonton", housing: 1300, food: 520, transport: 115, utilities: 165, entertainment: 270 },

    // Australia
    sydney: { name: "Sydney", housing: 2800, food: 700, transport: 160, utilities: 200, entertainment: 380 },
    melbourne: { name: "Melbourne", housing: 2200, food: 650, transport: 140, utilities: 180, entertainment: 350 },
    brisbane: { name: "Brisbane", housing: 1800, food: 580, transport: 130, utilities: 170, entertainment: 300 },
    perth: { name: "Perth", housing: 1900, food: 600, transport: 135, utilities: 175, entertainment: 310 },
    adelaide: { name: "Adelaide", housing: 1500, food: 520, transport: 120, utilities: 160, entertainment: 280 },
    canberra: { name: "Canberra", housing: 2000, food: 620, transport: 125, utilities: 165, entertainment: 320 },

    // Germany
    berlin: { name: "Berlin", housing: 1400, food: 500, transport: 90, utilities: 180, entertainment: 300 },
    munich: { name: "Munich", housing: 1800, food: 600, transport: 110, utilities: 200, entertainment: 350 },
    hamburg: { name: "Hamburg", housing: 1500, food: 550, transport: 100, utilities: 190, entertainment: 320 },
    cologne: { name: "Cologne", housing: 1300, food: 520, transport: 95, utilities: 185, entertainment: 310 },
    frankfurt: { name: "Frankfurt", housing: 1700, food: 580, transport: 105, utilities: 195, entertainment: 340 },
    stuttgart: { name: "Stuttgart", housing: 1600, food: 570, transport: 100, utilities: 190, entertainment: 330 },

    // France
    paris: { name: "Paris", housing: 2000, food: 650, transport: 80, utilities: 170, entertainment: 400 },
    marseille: { name: "Marseille", housing: 1200, food: 480, transport: 60, utilities: 150, entertainment: 280 },
    lyon: { name: "Lyon", housing: 1400, food: 520, transport: 70, utilities: 160, entertainment: 320 },
    toulouse: { name: "Toulouse", housing: 1100, food: 460, transport: 65, utilities: 145, entertainment: 270 },
    nice: { name: "Nice", housing: 1600, food: 550, transport: 75, utilities: 165, entertainment: 350 },
    nantes: { name: "Nantes", housing: 1000, food: 440, transport: 60, utilities: 140, entertainment: 250 },

    // Italy
    rome: { name: "Rome", housing: 1500, food: 500, transport: 40, utilities: 160, entertainment: 300 },
    milan: { name: "Milan", housing: 1800, food: 580, transport: 45, utilities: 180, entertainment: 350 },
    naples: { name: "Naples", housing: 900, food: 380, transport: 35, utilities: 130, entertainment: 220 },
    turin: { name: "Turin", housing: 1200, food: 450, transport: 40, utilities: 150, entertainment: 270 },
    florence: { name: "Florence", housing: 1400, food: 480, transport: 38, utilities: 155, entertainment: 290 },
    venice: { name: "Venice", housing: 1600, food: 520, transport: 42, utilities: 165, entertainment: 320 },

    // Spain
    madrid: { name: "Madrid", housing: 1300, food: 450, transport: 60, utilities: 140, entertainment: 280 },
    barcelona: { name: "Barcelona", housing: 1500, food: 500, transport: 65, utilities: 150, entertainment: 320 },
    valencia: { name: "Valencia", housing: 1000, food: 400, transport: 50, utilities: 130, entertainment: 240 },
    seville: { name: "Seville", housing: 800, food: 350, transport: 45, utilities: 120, entertainment: 200 },
    bilbao: { name: "Bilbao", housing: 1200, food: 420, transport: 55, utilities: 135, entertainment: 260 },
    malaga: { name: "Malaga", housing: 900, food: 380, transport: 48, utilities: 125, entertainment: 220 },

    // Netherlands
    amsterdam: { name: "Amsterdam", housing: 2200, food: 600, transport: 110, utilities: 180, entertainment: 380 },
    rotterdam: { name: "Rotterdam", housing: 1600, food: 520, transport: 90, utilities: 160, entertainment: 320 },
    thehague: { name: "The Hague", housing: 1800, food: 550, transport: 95, utilities: 170, entertainment: 340 },
    utrecht: { name: "Utrecht", housing: 1700, food: 540, transport: 85, utilities: 165, entertainment: 330 },
    eindhoven: { name: "Eindhoven", housing: 1400, food: 480, transport: 80, utilities: 155, entertainment: 290 },

    // Switzerland
    zurich: { name: "Zurich", housing: 3500, food: 900, transport: 150, utilities: 220, entertainment: 500 },
    geneva: { name: "Geneva", housing: 3200, food: 850, transport: 140, utilities: 210, entertainment: 480 },
    basel: { name: "Basel", housing: 2800, food: 750, transport: 130, utilities: 200, entertainment: 420 },
    bern: { name: "Bern", housing: 2600, food: 720, transport: 125, utilities: 195, entertainment: 400 },
    lausanne: { name: "Lausanne", housing: 2400, food: 680, transport: 120, utilities: 185, entertainment: 380 },

    // Sweden
    stockholm: { name: "Stockholm", housing: 1800, food: 600, transport: 120, utilities: 180, entertainment: 350 },
    gothenburg: { name: "Gothenburg", housing: 1400, food: 520, transport: 100, utilities: 160, entertainment: 300 },
    malmo: { name: "Malmö", housing: 1200, food: 480, transport: 90, utilities: 150, entertainment: 280 },
    uppsala: { name: "Uppsala", housing: 1300, food: 500, transport: 95, utilities: 155, entertainment: 290 },

    // Norway
    oslo: { name: "Oslo", housing: 2500, food: 750, transport: 140, utilities: 200, entertainment: 450 },
    bergen: { name: "Bergen", housing: 2000, food: 650, transport: 120, utilities: 180, entertainment: 380 },
    trondheim: { name: "Trondheim", housing: 1800, food: 600, transport: 110, utilities: 170, entertainment: 350 },
    stavanger: { name: "Stavanger", housing: 2200, food: 700, transport: 130, utilities: 190, entertainment: 400 },

    // Denmark
    copenhagen: { name: "Copenhagen", housing: 2000, food: 650, transport: 130, utilities: 180, entertainment: 400 },
    aarhus: { name: "Aarhus", housing: 1500, food: 520, transport: 100, utilities: 160, entertainment: 320 },
    odense: { name: "Odense", housing: 1300, food: 480, transport: 90, utilities: 150, entertainment: 290 },
    aalborg: { name: "Aalborg", housing: 1200, food: 460, transport: 85, utilities: 145, entertainment: 280 },

    // Japan
    tokyo: { name: "Tokyo", housing: 2200, food: 600, transport: 120, utilities: 180, entertainment: 400 },
    osaka: { name: "Osaka", housing: 1600, food: 500, transport: 100, utilities: 160, entertainment: 320 },
    kyoto: { name: "Kyoto", housing: 1400, food: 480, transport: 90, utilities: 150, entertainment: 300 },
    yokohama: { name: "Yokohama", housing: 1800, food: 550, transport: 110, utilities: 170, entertainment: 350 },
    nagoya: { name: "Nagoya", housing: 1500, food: 520, transport: 95, utilities: 155, entertainment: 310 },
    sapporo: { name: "Sapporo", housing: 1200, food: 450, transport: 85, utilities: 140, entertainment: 280 },

    // South Korea
    seoul: { name: "Seoul", housing: 1800, food: 500, transport: 80, utilities: 150, entertainment: 350 },
    busan: { name: "Busan", housing: 1200, food: 400, transport: 60, utilities: 130, entertainment: 280 },
    incheon: { name: "Incheon", housing: 1400, food: 450, transport: 70, utilities: 140, entertainment: 300 },
    daegu: { name: "Daegu", housing: 1000, food: 380, transport: 55, utilities: 125, entertainment: 260 },
    daejeon: { name: "Daejeon", housing: 1100, food: 400, transport: 58, utilities: 128, entertainment: 270 },

    // China
    beijing: { name: "Beijing", housing: 1500, food: 400, transport: 50, utilities: 120, entertainment: 300 },
    shanghai: { name: "Shanghai", housing: 1800, food: 450, transport: 60, utilities: 140, entertainment: 350 },
    guangzhou: { name: "Guangzhou", housing: 1200, food: 380, transport: 45, utilities: 110, entertainment: 280 },
    shenzhen: { name: "Shenzhen", housing: 1600, food: 420, transport: 55, utilities: 130, entertainment: 320 },
    chengdu: { name: "Chengdu", housing: 800, food: 300, transport: 35, utilities: 90, entertainment: 220 },
    hangzhou: { name: "Hangzhou", housing: 1300, food: 380, transport: 48, utilities: 115, entertainment: 290 },

    // India
    mumbai: { name: "Mumbai", housing: 800, food: 200, transport: 30, utilities: 80, entertainment: 150 },
    delhi: { name: "Delhi", housing: 600, food: 180, transport: 25, utilities: 70, entertainment: 130 },
    bangalore: { name: "Bangalore", housing: 700, food: 190, transport: 28, utilities: 75, entertainment: 140 },
    hyderabad: { name: "Hyderabad", housing: 500, food: 160, transport: 22, utilities: 65, entertainment: 120 },
    chennai: { name: "Chennai", housing: 550, food: 170, transport: 24, utilities: 68, entertainment: 125 },
    kolkata: { name: "Kolkata", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 110 },

    // Singapore
    singapore: { name: "Singapore", housing: 2500, food: 600, transport: 120, utilities: 180, entertainment: 400 },

    // Hong Kong
    hongkong: { name: "Hong Kong", housing: 3000, food: 650, transport: 100, utilities: 200, entertainment: 450 },

    // Thailand
    bangkok: { name: "Bangkok", housing: 600, food: 200, transport: 30, utilities: 80, entertainment: 180 },
    chiangmai: { name: "Chiang Mai", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 120 },
    phuket: { name: "Phuket", housing: 800, food: 250, transport: 40, utilities: 100, entertainment: 220 },
    pattaya: { name: "Pattaya", housing: 500, food: 180, transport: 25, utilities: 70, entertainment: 150 },

    // Malaysia
    kualalumpur: { name: "Kuala Lumpur", housing: 500, food: 180, transport: 25, utilities: 70, entertainment: 150 },
    penang: { name: "Penang", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 120 },
    johor: { name: "Johor Bahru", housing: 350, food: 130, transport: 18, utilities: 55, entertainment: 100 },

    // Indonesia
    jakarta: { name: "Jakarta", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 120 },
    bali: { name: "Bali", housing: 500, food: 180, transport: 25, utilities: 70, entertainment: 150 },
    surabaya: { name: "Surabaya", housing: 300, food: 120, transport: 15, utilities: 50, entertainment: 100 },
    bandung: { name: "Bandung", housing: 280, food: 110, transport: 14, utilities: 45, entertainment: 90 },

    // Philippines
    manila: { name: "Manila", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 120 },
    cebu: { name: "Cebu", housing: 300, food: 120, transport: 15, utilities: 50, entertainment: 100 },
    davao: { name: "Davao", housing: 250, food: 100, transport: 12, utilities: 45, entertainment: 85 },

    // Vietnam
    hochiminh: { name: "Ho Chi Minh City", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 120 },
    hanoi: { name: "Hanoi", housing: 350, food: 130, transport: 18, utilities: 55, entertainment: 110 },
    danang: { name: "Da Nang", housing: 300, food: 120, transport: 15, utilities: 50, entertainment: 100 },

    // Brazil
    saopaulo: { name: "São Paulo", housing: 800, food: 300, transport: 80, utilities: 120, entertainment: 200 },
    riodejaneiro: { name: "Rio de Janeiro", housing: 900, food: 320, transport: 85, utilities: 130, entertainment: 220 },
    brasilia: { name: "Brasília", housing: 700, food: 280, transport: 70, utilities: 110, entertainment: 180 },
    salvador: { name: "Salvador", housing: 500, food: 200, transport: 50, utilities: 80, entertainment: 140 },
    fortaleza: { name: "Fortaleza", housing: 450, food: 180, transport: 45, utilities: 75, entertainment: 130 },

    // Argentina
    buenosaires: { name: "Buenos Aires", housing: 600, food: 250, transport: 40, utilities: 100, entertainment: 180 },
    cordoba: { name: "Córdoba", housing: 400, food: 180, transport: 30, utilities: 80, entertainment: 140 },
    rosario: { name: "Rosario", housing: 350, food: 160, transport: 25, utilities: 70, entertainment: 120 },
    mendoza: { name: "Mendoza", housing: 380, food: 170, transport: 28, utilities: 75, entertainment: 130 },

    // Mexico
    mexicocity: { name: "Mexico City", housing: 600, food: 200, transport: 30, utilities: 80, entertainment: 150 },
    guadalajara: { name: "Guadalajara", housing: 500, food: 180, transport: 25, utilities: 70, entertainment: 130 },
    monterrey: { name: "Monterrey", housing: 550, food: 190, transport: 28, utilities: 75, entertainment: 140 },
    cancun: { name: "Cancún", housing: 700, food: 220, transport: 35, utilities: 90, entertainment: 170 },
    tijuana: { name: "Tijuana", housing: 650, food: 210, transport: 32, utilities: 85, entertainment: 160 },

    // Chile
    santiago: { name: "Santiago", housing: 800, food: 280, transport: 50, utilities: 100, entertainment: 180 },
    valparaiso: { name: "Valparaíso", housing: 600, food: 220, transport: 40, utilities: 80, entertainment: 150 },
    concepcion: { name: "Concepción", housing: 500, food: 200, transport: 35, utilities: 70, entertainment: 130 },

    // Colombia
    bogota: { name: "Bogotá", housing: 500, food: 180, transport: 25, utilities: 70, entertainment: 130 },
    medellin: { name: "Medellín", housing: 450, food: 160, transport: 22, utilities: 65, entertainment: 120 },
    cali: { name: "Cali", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 110 },
    cartagena: { name: "Cartagena", housing: 550, food: 190, transport: 28, utilities: 75, entertainment: 140 },

    // South Africa
    capetown: { name: "Cape Town", housing: 600, food: 200, transport: 40, utilities: 80, entertainment: 150 },
    johannesburg: { name: "Johannesburg", housing: 500, food: 180, transport: 35, utilities: 70, entertainment: 130 },
    durban: { name: "Durban", housing: 450, food: 160, transport: 30, utilities: 65, entertainment: 120 },
    pretoria: { name: "Pretoria", housing: 480, food: 170, transport: 32, utilities: 68, entertainment: 125 },

    // Egypt
    cairo: { name: "Cairo", housing: 300, food: 120, transport: 15, utilities: 50, entertainment: 80 },
    alexandria: { name: "Alexandria", housing: 250, food: 100, transport: 12, utilities: 45, entertainment: 70 },
    giza: { name: "Giza", housing: 280, food: 110, transport: 14, utilities: 48, entertainment: 75 },

    // UAE
    dubai: { name: "Dubai", housing: 2000, food: 500, transport: 80, utilities: 150, entertainment: 350 },
    abudhabi: { name: "Abu Dhabi", housing: 1800, food: 450, transport: 70, utilities: 140, entertainment: 320 },
    sharjah: { name: "Sharjah", housing: 1200, food: 350, transport: 50, utilities: 100, entertainment: 250 },

    // Saudi Arabia
    riyadh: { name: "Riyadh", housing: 1000, food: 300, transport: 50, utilities: 100, entertainment: 200 },
    jeddah: { name: "Jeddah", housing: 900, food: 280, transport: 45, utilities: 90, entertainment: 180 },
    dammam: { name: "Dammam", housing: 800, food: 250, transport: 40, utilities: 80, entertainment: 160 },

    // Turkey
    istanbul: { name: "Istanbul", housing: 600, food: 200, transport: 30, utilities: 80, entertainment: 150 },
    ankara: { name: "Ankara", housing: 450, food: 160, transport: 25, utilities: 65, entertainment: 120 },
    izmir: { name: "Izmir", housing: 500, food: 180, transport: 28, utilities: 70, entertainment: 130 },
    antalya: { name: "Antalya", housing: 550, food: 190, transport: 30, utilities: 75, entertainment: 140 },

    // Russia
    moscow: { name: "Moscow", housing: 1200, food: 400, transport: 50, utilities: 120, entertainment: 250 },
    stpetersburg: { name: "St. Petersburg", housing: 800, food: 300, transport: 40, utilities: 100, entertainment: 200 },
    novosibirsk: { name: "Novosibirsk", housing: 500, food: 200, transport: 25, utilities: 70, entertainment: 130 },
    yekaterinburg: { name: "Yekaterinburg", housing: 600, food: 220, transport: 30, utilities: 80, entertainment: 150 },

    // Ukraine
    kyiv: { name: "Kyiv", housing: 400, food: 150, transport: 20, utilities: 60, entertainment: 100 },
    kharkiv: { name: "Kharkiv", housing: 300, food: 120, transport: 15, utilities: 50, entertainment: 80 },
    odesa: { name: "Odesa", housing: 350, food: 130, transport: 18, utilities: 55, entertainment: 90 },
    lviv: { name: "Lviv", housing: 320, food: 125, transport: 16, utilities: 52, entertainment: 85 },

    // Poland
    warsaw: { name: "Warsaw", housing: 800, food: 300, transport: 60, utilities: 120, entertainment: 200 },
    krakow: { name: "Kraków", housing: 600, food: 250, transport: 50, utilities: 100, entertainment: 170 },
    gdansk: { name: "Gdańsk", housing: 550, food: 220, transport: 45, utilities: 90, entertainment: 150 },
    wroclaw: { name: "Wrocław", housing: 580, food: 230, transport: 48, utilities: 95, entertainment: 160 },

    // Czech Republic
    prague: { name: "Prague", housing: 900, food: 350, transport: 70, utilities: 140, entertainment: 250 },
    brno: { name: "Brno", housing: 600, food: 250, transport: 50, utilities: 100, entertainment: 180 },
    ostrava: { name: "Ostrava", housing: 500, food: 200, transport: 40, utilities: 80, entertainment: 150 },

    // Hungary
    budapest: { name: "Budapest", housing: 600, food: 250, transport: 50, utilities: 100, entertainment: 180 },
    debrecen: { name: "Debrecen", housing: 400, food: 180, transport: 35, utilities: 70, entertainment: 130 },
    szeged: { name: "Szeged", housing: 380, food: 170, transport: 32, utilities: 65, entertainment: 120 },

    // Romania
    bucharest: { name: "Bucharest", housing: 500, food: 200, transport: 30, utilities: 80, entertainment: 150 },
    cluj: { name: "Cluj-Napoca", housing: 400, food: 170, transport: 25, utilities: 70, entertainment: 130 },
    timisoara: { name: "Timișoara", housing: 380, food: 160, transport: 23, utilities: 65, entertainment: 120 },

    // Greece
    athens: { name: "Athens", housing: 600, food: 250, transport: 40, utilities: 100, entertainment: 180 },
    thessaloniki: { name: "Thessaloniki", housing: 450, food: 200, transport: 30, utilities: 80, entertainment: 150 },
    patras: { name: "Patras", housing: 400, food: 180, transport: 25, utilities: 70, entertainment: 130 },

    // Portugal
    lisbon: { name: "Lisbon", housing: 900, food: 350, transport: 50, utilities: 120, entertainment: 220 },
    porto: { name: "Porto", housing: 650, food: 280, transport: 40, utilities: 100, entertainment: 180 },
    braga: { name: "Braga", housing: 500, food: 220, transport: 30, utilities: 80, entertainment: 150 },

    // Ireland
    dublin: { name: "Dublin", housing: 2000, food: 600, transport: 120, utilities: 180, entertainment: 350 },
    cork: { name: "Cork", housing: 1200, food: 450, transport: 80, utilities: 140, entertainment: 250 },
    galway: { name: "Galway", housing: 1000, food: 400, transport: 70, utilities: 120, entertainment: 220 },

    // Belgium
    brussels: { name: "Brussels", housing: 1200, food: 450, transport: 80, utilities: 150, entertainment: 280 },
    antwerp: { name: "Antwerp", housing: 1000, food: 400, transport: 70, utilities: 130, entertainment: 250 },
    ghent: { name: "Ghent", housing: 900, food: 380, transport: 65, utilities: 120, entertainment: 230 },

    // Austria
    vienna: { name: "Vienna", housing: 1200, food: 450, transport: 80, utilities: 150, entertainment: 280 },
    salzburg: { name: "Salzburg", housing: 1000, food: 400, transport: 70, utilities: 130, entertainment: 250 },
    innsbruck: { name: "Innsbruck", housing: 1100, food: 420, transport: 75, utilities: 140, entertainment: 260 },

    // Finland
    helsinki: { name: "Helsinki", housing: 1400, food: 500, transport: 90, utilities: 160, entertainment: 300 },
    tampere: { name: "Tampere", housing: 1000, food: 400, transport: 70, utilities: 130, entertainment: 250 },
    turku: { name: "Turku", housing: 900, food: 380, transport: 65, utilities: 120, entertainment: 230 },

    // Israel
    telaviv: { name: "Tel Aviv", housing: 1800, food: 550, transport: 100, utilities: 170, entertainment: 350 },
    jerusalem: { name: "Jerusalem", housing: 1400, food: 450, transport: 80, utilities: 140, entertainment: 280 },
    haifa: { name: "Haifa", housing: 1200, food: 400, transport: 70, utilities: 130, entertainment: 250 },

    // New Zealand
    auckland: { name: "Auckland", housing: 1800, food: 550, transport: 120, utilities: 170, entertainment: 320 },
    wellington: { name: "Wellington", housing: 1600, food: 500, transport: 100, utilities: 150, entertainment: 290 },
    christchurch: { name: "Christchurch", housing: 1200, food: 420, transport: 80, utilities: 130, entertainment: 250 }
};

// Currency exchange rates (simulated)
const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 151, CAD: 1.71 },
    JPY: { USD: 0.009, EUR: 0.008, GBP: 0.007, CAD: 0.011 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88 }
};

// Quiz questions
const quizQuestions = [
    {
        question: "What is inflation?",
        options: [
            "A decrease in the general price level",
            "An increase in the general price level",
            "A stable price level",
            "A measure of unemployment"
        ],
        correct: 1,
        explanation: "Inflation is the rate at which the general level of prices for goods and services rises."
    },
    {
        question: "What does GDP stand for?",
        options: [
            "Gross Domestic Product",
            "General Development Plan",
            "Global Distribution Process",
            "Government Debt Program"
        ],
        correct: 0,
        explanation: "GDP (Gross Domestic Product) measures the total value of goods and services produced in a country."
    },
    {
        question: "What is the recommended percentage of income to spend on housing?",
        options: ["20%", "30%", "40%", "50%"],
        correct: 1,
        explanation: "Financial experts typically recommend spending no more than 30% of your income on housing."
    },
    {
        question: "What is compound interest?",
        options: [
            "Interest paid only on the principal",
            "Interest paid on both principal and accumulated interest",
            "A type of loan",
            "A government tax"
        ],
        correct: 1,
        explanation: "Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods."
    },
    {
        question: "What is diversification in investing?",
        options: [
            "Putting all money in one investment",
            "Spreading investments across different assets",
            "Only investing in stocks",
            "Avoiding all investments"
        ],
        correct: 1,
        explanation: "Diversification means spreading investments across different types of assets to reduce risk."
    },
    {
        question: "What is the 50/30/20 budgeting rule?",
        options: [
            "50% savings, 30% needs, 20% wants",
            "50% needs, 30% wants, 20% savings",
            "50% wants, 30% savings, 20% needs",
            "50% taxes, 30% needs, 20% wants"
        ],
        correct: 1,
        explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings."
    },
    {
        question: "What is a credit score?",
        options: [
            "A measure of how much money you have",
            "A number representing your creditworthiness",
            "Your annual income",
            "The amount of debt you owe"
        ],
        correct: 1,
        explanation: "A credit score is a numerical representation of your creditworthiness based on your credit history."
    },
    {
        question: "What is the difference between a debit and credit card?",
        options: [
            "No difference, they work the same way",
            "Debit uses your money, credit borrows money",
            "Credit uses your money, debit borrows money",
            "Both always charge interest"
        ],
        correct: 1,
        explanation: "A debit card uses money from your bank account, while a credit card borrows money that you must pay back."
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeBudgetChart();
});

function initializeApp() {
    // Set up tab navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Initialize budget inputs
    setupBudgetListeners();
    
    // Initialize quiz data
    quizData = [...quizQuestions];
}

function setupEventListeners() {
    // Budget planner listeners
    document.getElementById('monthly-income').addEventListener('input', updateBudgetChart);
    
    // Category input listeners
    document.querySelectorAll('.category-input').forEach(input => {
        input.addEventListener('input', updateBudgetChart);
    });
}

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Budget Planner Functions
function setupBudgetListeners() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.category);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    // Add visual feedback for drag and drop
    e.target.style.background = 'rgba(0, 212, 255, 0.2)';
    setTimeout(() => {
        e.target.style.background = '';
    }, 500);
}

function initializeBudgetChart() {
    const ctx = document.getElementById('budget-chart').getContext('2d');
    budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Savings', 'Other'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 2,
                borderColor: '#1a1a2e'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        padding: 20
                    }
                }
            }
        }
    });
}

function updateBudgetChart() {
    const income = parseFloat(document.getElementById('monthly-income').value) || 0;
    const categories = document.querySelectorAll('.category-input');
    const values = [];
    const alerts = document.getElementById('budget-alerts');
    let totalExpenses = 0;
    
    alerts.innerHTML = '';
    
    categories.forEach((input, index) => {
        const value = parseFloat(input.value) || 0;
        values.push(value);
        totalExpenses += value;
        
        // Check for budget alerts
        if (income > 0) {
            const percentage = (value / income) * 100;
            const categoryName = budgetChart.data.labels[index];
            
            if (categoryName === 'Housing' && percentage > 30) {
                showAlert(`Housing expenses (${percentage.toFixed(1)}%) exceed recommended 30%`, 'warning');
            } else if (categoryName === 'Food' && percentage > 15) {
                showAlert(`Food expenses (${percentage.toFixed(1)}%) exceed recommended 15%`, 'warning');
            }
        }
    });
    
    if (totalExpenses > income && income > 0) {
        showAlert(`Total expenses ($${totalExpenses}) exceed income ($${income})`, 'danger');
    }
    
    budgetChart.data.datasets[0].data = values;
    budgetChart.update();
    
    updateBudgetSummary(income, totalExpenses);
}

function showAlert(message, type) {
    const alerts = document.getElementById('budget-alerts');
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    alerts.appendChild(alert);
}

function updateBudgetSummary(income, expenses) {
    const summary = document.getElementById('budget-summary');
    const remaining = income - expenses;
    
    summary.innerHTML = `
        <h4>Budget Summary</h4>
        <p>Monthly Income: $${income.toFixed(2)}</p>
        <p>Total Expenses: $${expenses.toFixed(2)}</p>
        <p>Remaining: <span style="color: ${remaining >= 0 ? '#28a745' : '#dc3545'}">$${remaining.toFixed(2)}</span></p>
    `;
}

// Cost of Living Comparator
function compareCities() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;
    
    const data1 = cityData[city1];
    const data2 = cityData[city2];
    
    if (!data1 || !data2) {
        alert('Please select valid cities');
        return;
    }
    
    const ctx = document.getElementById('compare-chart').getContext('2d');
    
    if (compareChart) {
        compareChart.destroy();
    }
    
    compareChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment'],
            datasets: [{
                label: data1.name,
                data: [data1.housing, data1.food, data1.transport, data1.utilities, data1.entertainment],
                backgroundColor: 'rgba(0, 212, 255, 0.7)',
                borderColor: '#00d4ff',
                borderWidth: 1
            }, {
                label: data2.name,
                data: [data2.housing, data2.food, data2.transport, data2.utilities, data2.entertainment],
                backgroundColor: 'rgba(255, 0, 255, 0.7)',
                borderColor: '#ff00ff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return '$' + value;
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    // Update comparison details
    const total1 = data1.housing + data1.food + data1.transport + data1.utilities + data1.entertainment;
    const total2 = data2.housing + data2.food + data2.transport + data2.utilities + data2.entertainment;
    const difference = Math.abs(total1 - total2);
    const cheaper = total1 < total2 ? data1.name : data2.name;
    const percentage = ((difference / Math.max(total1, total2)) * 100).toFixed(1);
    
    document.getElementById('compare-details').innerHTML = `
        <h4>🌍 Global Comparison Results</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
            <div style="padding: 1rem; background: rgba(0, 212, 255, 0.1); border-radius: 8px;">
                <h5>${data1.name}</h5>
                <p><strong>Total Monthly Cost:</strong> $${total1.toFixed(2)}</p>
                <p>Housing: $${data1.housing}</p>
                <p>Food: $${data1.food}</p>
                <p>Transport: $${data1.transport}</p>
                <p>Utilities: $${data1.utilities}</p>
                <p>Entertainment: $${data1.entertainment}</p>
            </div>
            <div style="padding: 1rem; background: rgba(255, 0, 255, 0.1); border-radius: 8px;">
                <h5>${data2.name}</h5>
                <p><strong>Total Monthly Cost:</strong> $${total2.toFixed(2)}</p>
                <p>Housing: $${data2.housing}</p>
                <p>Food: $${data2.food}</p>
                <p>Transport: $${data2.transport}</p>
                <p>Utilities: $${data2.utilities}</p>
                <p>Entertainment: $${data2.entertainment}</p>
            </div>
        </div>
        <div style="text-align: center; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
            <h5>💰 Cost Analysis</h5>
            <p><strong>${cheaper}</strong> is ${percentage}% cheaper</p>
            <p><strong>Monthly Difference:</strong> $${difference.toFixed(2)}</p>
            <p><strong>Annual Difference:</strong> $${(difference * 12).toFixed(2)}</p>
            <p style="font-size: 0.9rem; color: #00d4ff; margin-top: 1rem;">
                💡 This comparison can help you make informed decisions about relocation or travel budgeting!
            </p>
        </div>
    `;
}

// Savings Goal Tracker
function setGoal() {
    const name = document.getElementById('goal-name').value;
    const amount = parseFloat(document.getElementById('goal-amount').value);
    const monthlySaving = parseFloat(document.getElementById('monthly-saving').value);
    
    if (!name || !amount || !monthlySaving) {
        alert('Please fill in all fields');
        return;
    }
    
    currentGoal = {
        name: name,
        target: amount,
        monthly: monthlySaving,
        current: 0,
        months: Math.ceil(amount / monthlySaving)
    };
    
    updateGoalDisplay();
    generateSavingsTips();
}

function updateGoalDisplay() {
    if (!currentGoal) return;
    
    const progress = (currentGoal.current / currentGoal.target) * 100;
    
    document.getElementById('goal-info').innerHTML = `
        <h3>🎯 ${currentGoal.name}</h3>
        <p><strong>Target:</strong> $${currentGoal.target.toFixed(2)}</p>
        <p><strong>Monthly Saving:</strong> $${currentGoal.monthly.toFixed(2)}</p>
        <p><strong>Current Progress:</strong> $${currentGoal.current.toFixed(2)}</p>
        <p><strong>Time to Goal:</strong> ${Math.max(0, currentGoal.months - Math.floor(currentGoal.current / currentGoal.monthly))} months remaining</p>
    `;
    
    document.getElementById('progress-fill').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('progress-text').textContent = `${Math.min(progress, 100).toFixed(1)}%`;
    
    // Generate milestones
    const milestones = document.getElementById('milestones');
    milestones.innerHTML = '';
    
    for (let i = 25; i <= 100; i += 25) {
        const milestone = document.createElement('div');
        milestone.className = `milestone ${progress >= i ? 'achieved' : ''}`;
        milestone.textContent = `${i}%`;
        milestones.appendChild(milestone);
    }
    
    // Simulate progress (for demo purposes)
    if (currentGoal.current < currentGoal.target) {
        setTimeout(() => {
            currentGoal.current += currentGoal.monthly * 0.1; // Simulate gradual progress
            if (currentGoal.current < currentGoal.target) {
                updateGoalDisplay();
            } else {
                currentGoal.current = currentGoal.target;
                updateGoalDisplay();
                showGoalAchieved();
            }
        }, 1000);
    }
}

function showGoalAchieved() {
    const goalInfo = document.getElementById('goal-info');
    goalInfo.innerHTML += `
        <div style="text-align: center; padding: 1rem; background: linear-gradient(45deg, #00d4ff, #ff00ff); border-radius: 10px; margin-top: 1rem;">
            <h4>🎉 Congratulations!</h4>
            <p>You've achieved your savings goal!</p>
        </div>
    `;
}

function generateSavingsTips() {
    const tips = [
        "💡 Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
        "🍽️ Cook at home more often to save on food expenses",
        "🚗 Consider carpooling or public transport to reduce transportation costs",
        "💳 Review and cancel unused subscriptions",
        "🛍️ Wait 24 hours before making non-essential purchases",
        "📱 Use apps to find discounts and cashback offers",
        "💰 Automate your savings to make it effortless",
        "🏦 Look for high-yield savings accounts",
        "📊 Track your expenses to identify spending patterns",
        "🎯 Set specific, measurable financial goals"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('savings-tips').innerHTML = `
        <h4>💡 Savings Tip</h4>
        <p>${randomTip}</p>
    `;
}

// Quiz Functions
function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    quizStreak = 0;
    updateQuizDisplay();
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuizIndex >= quizData.length) {
        showQuizResults();
        return;
    }
    
    const question = quizData[currentQuizIndex];
    const quizContent = document.getElementById('quiz-content');
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${currentQuizIndex + 1} of ${quizData.length}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === question.correct) {
        quizScore++;
        quizStreak++;
    } else {
        quizStreak = 0;
    }
    
    updateQuizDisplay();
    
    // Show explanation
    setTimeout(() => {
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML += `
            <div class="quiz-explanation" style="margin-top: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h4>💡 Explanation:</h4>
                <p>${question.explanation}</p>
                <button onclick="nextQuestion()" class="btn-primary">Next Question</button>
            </div>
        `;
    }, 1500);
}

function nextQuestion() {
    currentQuizIndex++;
    showNextQuestion();
}

function updateQuizDisplay() {
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-streak').textContent = quizStreak;
}

function showQuizResults() {
    const percentage = (quizScore / quizData.length) * 100;
    const quizContent = document.getElementById('quiz-content');
    
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
        message = 'Outstanding! You\'re a financial expert!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Excellent! You have a great understanding of economics!';
        emoji = '🎉';
    } else if (percentage >= 70) {
        message = 'Great job! You have a solid foundation in economics.';
        emoji = '👍';
    } else if (percentage >= 60) {
        message = 'Good effort! Keep learning to improve your financial knowledge.';
        emoji = '📚';
    } else {
        message = 'Keep studying! Economics and finance take time to master.';
        emoji = '💪';
    }
    
    quizContent.innerHTML = `
        <div class="quiz-results" style="text-align: center;">
            <h3>${emoji} Quiz Complete!</h3>
            <div style="font-size: 2rem; margin: 1rem 0;">
                ${quizScore}/${quizData.length}
            </div>
            <p style="font-size: 1.2rem; margin: 1rem 0;">
                <strong>${percentage.toFixed(1)}%</strong>
            </p>
            <p style="margin: 1rem 0;">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="startQuiz()" class="btn-primary" style="width: auto; padding: 12px 24px;">
                    🔄 Retake Quiz
                </button>
            </div>
        </div>
    `;
}

// Local Impact Calculator
function calculateImpact() {
    const amount = parseFloat(document.getElementById('local-amount').value) || 100;
    const businessType = document.querySelector('input[name="business"]:checked').value;
    
    const localMultiplier = 3.5; // Local businesses recirculate money 3.5 times
    const chainMultiplier = 1.2; // Chain stores recirculate money 1.2 times
    
    const localImpact = amount * localMultiplier;
    const chainImpact = amount * chainMultiplier;
    
    const ctx = document.getElementById('impact-chart').getContext('2d');
    
    if (impactChart) {
        impactChart.destroy();
    }
    
    impactChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Local Business', 'Chain Store'],
            datasets: [{
                label: 'Economic Impact ($)',
                data: [localImpact, chainImpact],
                backgroundColor: ['rgba(0, 212, 255, 0.7)', 'rgba(255, 0, 255, 0.7)'],
                borderColor: ['#00d4ff', '#ff00ff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return '$' + value;
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    document.getElementById('impact-details').innerHTML = `
        <h4>🏪 Local Economic Impact Analysis</h4>
        <div style="margin: 1rem 0;">
            <p><strong>Amount Spent:</strong> $${amount.toFixed(2)}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                <div style="padding: 1rem; background: rgba(0, 212, 255, 0.1); border-radius: 8px;">
                    <h5>🏪 Local Business</h5>
                    <p><strong>Total Impact:</strong> $${localImpact.toFixed(2)}</p>
                    <p>Multiplier: ${localMultiplier}x</p>
                </div>
                <div style="padding: 1rem; background: rgba(255, 0, 255, 0.1); border-radius: 8px;">
                    <h5>🏬 Chain Store</h5>
                    <p><strong>Total Impact:</strong> $${chainImpact.toFixed(2)}</p>
                    <p>Multiplier: ${chainMultiplier}x</p>
                </div>
            </div>
            <div style="text-align: center; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                <p><strong>Additional Economic Activity:</strong> $${(localImpact - chainImpact).toFixed(2)}</p>
                <p>💡 Local businesses create <strong>${((localImpact / chainImpact - 1) * 100).toFixed(1)}%</strong> more economic impact!</p>
                <p style="font-size: 0.9rem; color: #00d4ff; margin-top: 0.5rem;">
                    Every dollar spent locally supports jobs, taxes, and community development.
                </p>
            </div>
        </div>
    `;
}

// Tax Estimator
function calculateTax() {
    const income = parseFloat(document.getElementById('annual-income').value);
    const filingStatus = document.getElementById('filing-status').value;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    
    if (!income) {
        alert('Please enter your annual income');
        return;
    }
    
    const taxableIncome = Math.max(0, income - deductions);
    
    // Simplified tax brackets for demonstration (2023 tax year)
    const taxBrackets = {
        single: [
            { min: 0, max: 11000, rate: 0.10 },
            { min: 11000, max: 44725, rate: 0.12 },
            { min: 44725, max: 95375, rate: 0.22 },
            { min: 95375, max: 182050, rate: 0.24 },
            { min: 182050, max: 231250, rate: 0.32 },
            { min: 231250, max: 578125, rate: 0.35 },
            { min: 578125, max: Infinity, rate: 0.37 }
        ],
        married: [
            { min: 0, max: 22000, rate: 0.10 },
            { min: 22000, max: 89450, rate: 0.12 },
            { min: 89450, max: 190750, rate: 0.22 },
            { min: 190750, max: 364200, rate: 0.24 },
            { min: 364200, max: 462500, rate: 0.32 },
            { min: 462500, max: 693750, rate: 0.35 },
            { min: 693750, max: Infinity, rate: 0.37 }
        ],
        head: [
            { min: 0, max: 15700, rate: 0.10 },
            { min: 15700, max: 59850, rate: 0.12 },
            { min: 59850, max: 95350, rate: 0.22 },
            { min: 95350, max: 182050, rate: 0.24 },
            { min: 182050, max: 231250, rate: 0.32 },
            { min: 231250, max: 578100, rate: 0.35 },
            { min: 578100, max: Infinity, rate: 0.37 }
        ]
    };
    
    const brackets = taxBrackets[filingStatus];
    let totalTax = 0;
    let remainingIncome = taxableIncome;
    const taxBreakdown = [];
    
    for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        
        const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        const taxAtThisBracket = taxableAtThisBracket * bracket.rate;
        
        if (taxableAtThisBracket > 0) {
            totalTax += taxAtThisBracket;
            taxBreakdown.push({
                rate: bracket.rate,
                income: taxableAtThisBracket,
                tax: taxAtThisBracket,
                range: `$${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : '$' + bracket.max.toLocaleString()}`
            });
        }
        
        remainingIncome -= taxableAtThisBracket;
    }
    
    const effectiveRate = (totalTax / income) * 100;
    const marginalRate = brackets.find(b => taxableIncome > b.min && taxableIncome <= b.max)?.rate * 100 || 0;
    const afterTaxIncome = income - totalTax;
    
    // Create tax chart
    const ctx = document.getElementById('tax-chart').getContext('2d');
    
    if (taxChart) {
        taxChart.destroy();
    }
    
    taxChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['After-Tax Income', 'Federal Tax'],
            datasets: [{
                data: [afterTaxIncome, totalTax],
                backgroundColor: ['rgba(0, 212, 255, 0.7)', 'rgba(255, 0, 255, 0.7)'],
                borderColor: ['#00d4ff', '#ff00ff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
    
    document.getElementById('tax-breakdown').innerHTML = `
        <h4>📊 Tax Calculation Results</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
            <div style="padding: 1rem; background: rgba(0, 212, 255, 0.1); border-radius: 8px;">
                <h5>💰 Income Summary</h5>
                <p><strong>Gross Income:</strong> $${income.toLocaleString()}</p>
                <p><strong>Deductions:</strong> $${deductions.toLocaleString()}</p>
                <p><strong>Taxable Income:</strong> $${taxableIncome.toLocaleString()}</p>
            </div>
            <div style="padding: 1rem; background: rgba(255, 0, 255, 0.1); border-radius: 8px;">
                <h5>🧮 Tax Summary</h5>
                <p><strong>Federal Tax:</strong> $${totalTax.toLocaleString()}</p>
                <p><strong>Effective Rate:</strong> ${effectiveRate.toFixed(2)}%</p>
                <p><strong>Marginal Rate:</strong> ${marginalRate.toFixed(0)}%</p>
            </div>
        </div>
        <div style="text-align: center; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin: 1rem 0;">
            <h5>💵 After-Tax Income</h5>
            <p style="font-size: 1.5rem; color: #00d4ff;"><strong>$${afterTaxIncome.toLocaleString()}</strong></p>
            <p>Monthly Take-Home: $${(afterTaxIncome / 12).toLocaleString()}</p>
        </div>
        
        <h5>📋 Tax by Bracket:</h5>
        <div style="margin-top: 1rem;">
            ${taxBreakdown.map(bracket => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem; margin: 0.25rem 0; background: rgba(255, 255, 255, 0.05); border-radius: 5px;">
                    <span>${(bracket.rate * 100).toFixed(0)}% on ${bracket.range}</span>
                    <span>$${bracket.tax.toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        <p style="font-size: 0.9rem; color: #00d4ff; margin-top: 1rem; text-align: center;">
            💡 This is a simplified federal tax calculation. Consult a tax professional for accurate planning.
        </p>
    `;
}

// Currency Exchange
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (!amount || fromCurrency === toCurrency) {
        document.getElementById('conversion-result').innerHTML = 'Please enter a valid amount and select different currencies';
        return;
    }
    
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    
    document.getElementById('conversion-result').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">
                <strong>${amount.toLocaleString()} ${fromCurrency} = ${convertedAmount.toLocaleString()} ${toCurrency}</strong>
            </div>
            <div style="font-size: 0.9rem; color: #00d4ff;">
                Exchange Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}
            </div>
            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">
                💡 Rates are simulated for demonstration purposes
            </div>
        </div>
    `;
    
    // Create currency trend chart (simulated data)
    const ctx = document.getElementById('currency-chart').getContext('2d');
    
    if (currencyChart) {
        currencyChart.destroy();
    }
    
    // Generate simulated historical data
    const days = 30;
    const baseRate = rate;
    const historicalRates = [];
    const labels = [];
    
    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString());
        
        // Simulate rate fluctuation (±5% of base rate)
        const fluctuation = (Math.random() - 0.5) * 0.1 * baseRate;
        historicalRates.push(Math.max(0, baseRate + fluctuation));
    }
    
    currencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${fromCurrency} to ${toCurrency} (30 days)`,
                data: historicalRates,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#ffffff',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return value.toFixed(4);
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff',
                        maxTicksLimit: 7
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize charts when switching tabs
function initializeChartsOnTabSwitch(tabName) {
    setTimeout(() => {
        switch(tabName) {
            case 'budget':
                if (!budgetChart) initializeBudgetChart();
                break;
            case 'compare':
                compareCities();
                break;
            case 'local':
                calculateImpact();
                break;
            case 'currency':
                convertCurrency();
                break;
        }
    }, 100);
}

// Enhanced tab switching with chart initialization
const originalSwitchTab = switchTab;
switchTab = function(tabName) {
    originalSwitchTab(tabName);
    initializeChartsOnTabSwitch(tabName);
};

// Auto-update budget chart on page load
setTimeout(() => {
    updateBudgetChart();
}, 500);

// Add some demo data for better initial experience
setTimeout(() => {
    document.getElementById('monthly-income').value = '5000';
    document.querySelectorAll('.category-input')[0].value = '1500'; // Housing
    document.querySelectorAll('.category-input')[1].value = '600';  // Food
    document.querySelectorAll('.category-input')[2].value = '300';  // Transport
    document.querySelectorAll('.category-input')[3].value = '400';  // Entertainment
    document.querySelectorAll('.category-input')[4].value = '1000'; // Savings
    document.querySelectorAll('.category-input')[5].value = '200';  // Other
    updateBudgetChart();
}, 1000);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for charts
function showChartLoading(chartId) {
    const canvas = document.getElementById(chartId);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
    }
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Allow default tab behavior
        return;
    }
    
    if (e.key >= '1' && e.key <= '7') {
        const tabIndex = parseInt(e.key) - 1;
        const tabs = ['budget', 'compare', 'savings', 'quiz', 'local', 'tax', 'currency'];
        if (tabs[tabIndex]) {
            switchTab(tabs[tabIndex]);
        }
    }
});

// Add touch support for mobile drag and drop
let touchItem = null;

document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('category-item')) {
        touchItem = e.target;
        e.target.style.opacity = '0.5';
    }
});

document.addEventListener('touchend', function(e) {
    if (touchItem) {
        touchItem.style.opacity = '1';
        touchItem = null;
    }
});

// Performance optimization: Debounce input updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to budget updates
const debouncedBudgetUpdate = debounce(updateBudgetChart, 300);

// Replace immediate budget update listeners with debounced versions
document.getElementById('monthly-income').removeEventListener('input', updateBudgetChart);
document.getElementById('monthly-income').addEventListener('input', debouncedBudgetUpdate);

document.querySelectorAll('.category-input').forEach(input => {
    input.removeEventListener('input', updateBudgetChart);
    input.addEventListener('input', debouncedBudgetUpdate);
});

// Add data persistence using localStorage
function saveUserData() {
    const userData = {
        monthlyIncome: document.getElementById('monthly-income').value,
        categoryInputs: Array.from(document.querySelectorAll('.category-input')).map(input => input.value),
        currentGoal: currentGoal,
        quizScore: quizScore,
        lastCity1: document.getElementById('city1').value,
        lastCity2: document.getElementById('city2').value
    };
    localStorage.setItem('budgetBuddyData', JSON.stringify(userData));
}

function loadUserData() {
    const savedData = localStorage.getItem('budgetBuddyData');
    if (savedData) {
        try {
            const userData = JSON.parse(savedData);
            if (userData.monthlyIncome) {
                document.getElementById('monthly-income').value = userData.monthlyIncome;
            }
            if (userData.categoryInputs) {
                document.querySelectorAll('.category-input').forEach((input, index) => {
                    if (userData.categoryInputs[index]) {
                        input.value = userData.categoryInputs[index];
                    }
                });
            }
            if (userData.currentGoal) {
                currentGoal = userData.currentGoal;
            }
            if (userData.lastCity1) {
                document.getElementById('city1').value = userData.lastCity1;
            }
            if (userData.lastCity2) {
                document.getElementById('city2').value = userData.lastCity2;
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Save data when inputs change
document.addEventListener('input', debounce(saveUserData, 1000));

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
});

// Add export functionality
function exportBudgetData() {
    const income = parseFloat(document.getElementById('monthly-income').value) || 0;
    const categories = document.querySelectorAll('.category-input');
    const budgetData = {
        monthlyIncome: income,
        expenses: {
            housing: parseFloat(categories[0].value) || 0,
            food: parseFloat(categories[1].value) || 0,
            transportation: parseFloat(categories[2].value) || 0,
            entertainment: parseFloat(categories[3].value) || 0,
            savings: parseFloat(categories[4].value) || 0,
            other: parseFloat(categories[5].value) || 0
        },
        totalExpenses: Array.from(categories).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0),
        remaining: income - Array.from(categories).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(budgetData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'budget-buddy-export.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Add print functionality
function printBudgetSummary() {
    const printWindow = window.open('', '_blank');
    const income = parseFloat(document.getElementById('monthly-income').value) || 0;
    const categories = document.querySelectorAll('.category-input');
    const totalExpenses = Array.from(categories).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    const remaining = income - totalExpenses;
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Budget Buddy - Budget Summary</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .summary { margin: 20px 0; }
                .category { display: flex; justify-content: space-between; margin: 10px 0; }
                .total { font-weight: bold; border-top: 2px solid #000; padding-top: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Budget Buddy - Monthly Budget Summary</h1>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="summary">
                <h2>Income & Expenses</h2>
                <div class="category"><span>Monthly Income:</span><span>$${income.toFixed(2)}</span></div>
                <h3>Expenses:</h3>
                <div class="category"><span>Housing:</span><span>$${(parseFloat(categories[0].value) || 0).toFixed(2)}</span></div>
                <div class="category"><span>Food:</span><span>$${(parseFloat(categories[1].value) || 0).toFixed(2)}</span></div>
                <div class="category"><span>Transportation:</span><span>$${(parseFloat(categories[2].value) || 0).toFixed(2)}</span></div>
                <div class="category"><span>Entertainment:</span><span>$${(parseFloat(categories[3].value) || 0).toFixed(2)}</span></div>
                <div class="category"><span>Savings:</span><span>$${(parseFloat(categories[4].value) || 0).toFixed(2)}</span></div>
                <div class="category"><span>Other:</span><span>$${(parseFloat(categories[5].value) || 0).toFixed(2)}</span></div>
                <div class="category total"><span>Total Expenses:</span><span>$${totalExpenses.toFixed(2)}</span></div>
                <div class="category total"><span>Remaining:</span><span style="color: ${remaining >= 0 ? 'green' : 'red'}">$${remaining.toFixed(2)}</span></div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

console.log('🎉 Budget Buddy loaded successfully! Welcome to your comprehensive financial planning companion.');