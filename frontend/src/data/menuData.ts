export interface MenuItem {
  name: string;
  nameAmharic: string;
  price: number | null;
  tags?: string[];
  image?: string;
  description?: string;
  isFavorite?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameAmharic: string;
  items: MenuItem[];
}

export interface RestaurantData {
  name: string;
  tagline: string;
  slug: string;
  logo: string | null;
  categories: MenuCategory[];
}

export const restaurantData: RestaurantData = {
  name: "Yummy Cafe & Restaurant",
  tagline: "Yum, Every Time!",
  slug: "yummy-cafe",
  logo: null,
  categories: [
    {
      id: "burgers",
      name: "Burgers",
      nameAmharic: "በርገር",
      items: [
        { 
          name: "Beef Burger", 
          nameAmharic: "በሬ በርገር", 
          price: 400,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
          description: "Juicy beef patty with fresh lettuce and tomatoes"
        },
        { 
          name: "Cheese Burger", 
          nameAmharic: "ቺዝ በርገር", 
          price: 420,
          image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
          description: "Classic cheeseburger with melted cheddar"
        },
        { 
          name: "Special Burger", 
          nameAmharic: "ስፔሻል በርገር", 
          price: 450, 
          tags: ["Chef's Choice"],
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
          description: "Our signature burger with special sauce"
        },
        { 
          name: "Double Cheese Burger", 
          nameAmharic: "ደብል ቺዝ በርገር", 
          price: 590,
          image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
          description: "Double patty with double cheese"
        },
        { 
          name: "Tuna Melt Burger", 
          nameAmharic: "ቱና መልት በርገር", 
          price: 440,
          image: "https://images.unsplash.com/photo-1619740455993-9e4e0d5d3b9f?w=800&q=80",
          description: "Grilled tuna with melted cheese"
        },
        { 
          name: "Tuna Burger", 
          nameAmharic: "ቱና በርገር", 
          price: 420,
          image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
          description: "Fresh tuna patty with special mayo"
        },
        { 
          name: "V. Table Burger", 
          nameAmharic: "አትክልት በርገር", 
          price: 350, 
          tags: ["Vegan"],
          image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80",
          description: "Plant-based patty with fresh veggies"
        },
        { 
          name: "French Fries", 
          nameAmharic: "ፍሬንች ፍሪስ", 
          price: 200,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
          description: "Crispy golden fries"
        },
        { 
          name: "King Burger", 
          nameAmharic: "ኪንግ በርገር", 
          price: 700, 
          tags: ["Popular"],
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
          description: "The ultimate burger experience"
        }
      ]
    },
    {
      id: "pizza",
      name: "Pizza",
      nameAmharic: "ፒዛ",
      items: [
        { 
          name: "V. Table Pizza", 
          nameAmharic: "አትክልት ፒዛ", 
          price: 430, 
          tags: ["Vegan"],
          image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800&q=80",
          description: "Loaded with fresh vegetables"
        },
        { 
          name: "Fasting Tuna Pizza", 
          nameAmharic: "የፆም ቱና ፒዛ", 
          price: 450,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
          description: "Tuna pizza for fasting days"
        },
        { 
          name: "Tuna Pizza", 
          nameAmharic: "ቱና ፒዛ", 
          price: 380,
          image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80",
          description: "Classic tuna with olives"
        },
        { 
          name: "V. Table with Cheese", 
          nameAmharic: "አትክልት ከቺዝ ፒዛ", 
          price: 450,
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
          description: "Veggie pizza with extra cheese"
        },
        { 
          name: "Beef Pizza", 
          nameAmharic: "በሬ ፒዛ", 
          price: 440,
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
          description: "Loaded with seasoned beef"
        },
        { 
          name: "Cheese Pizza", 
          nameAmharic: "ቺዝ ፒዛ", 
          price: 500,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
          description: "Four cheese blend perfection"
        },
        { 
          name: "Special Pizza", 
          nameAmharic: "ስፔሻል ፒዛ", 
          price: 430, 
          tags: ["Chef's Choice"],
          image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
          description: "Chef's special combination"
        },
        { 
          name: "Small Pizza", 
          nameAmharic: "ትንሽ ፒዛ", 
          price: null,
          image: "https://images.unsplash.com/photo-1590534047230-c8e4f0f5e0c1?w=800&q=80",
          description: "Personal size pizza"
        }
      ]
    },
    {
      id: "sandwich",
      name: "Sandwich",
      nameAmharic: "ሳንድዊች",
      items: [
        { 
          name: "Enkusal Sandwich", 
          nameAmharic: "እንቁሳል ሳንድዊች", 
          price: 250,
          image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
          description: "Traditional Ethiopian sandwich"
        },
        { 
          name: "Keseb Sandwich", 
          nameAmharic: "ከሰብ ሳንድዊች", 
          price: 450,
          image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
          description: "Grilled meat sandwich"
        },
        { 
          name: "Tuna Keseb Sandwich", 
          nameAmharic: "ቱና ከሰብ ሳንድዊች", 
          price: 480,
          image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80",
          description: "Grilled tuna delight"
        },
        { 
          name: "Atkilt Sandwich", 
          nameAmharic: "አትክልት ሳንድዊች", 
          price: 350,
          image: "https://images.unsplash.com/photo-1592415499556-f3b0b1c8f8e6?w=800&q=80",
          description: "Fresh vegetable sandwich"
        },
        { 
          name: "Yemi Sandwich", 
          nameAmharic: "የሚ ሳንድዊች", 
          price: 310,
          image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&q=80",
          description: "Special house sandwich"
        }
      ]
    },
    {
      id: "snacks",
      name: "Snacks",
      nameAmharic: "መክሰስ",
      items: [
        { 
          name: "Spring Rolls", 
          nameAmharic: "ስፕሪንግ ሮልስ", 
          price: 150,
          image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80",
          description: "Crispy vegetable spring rolls"
        },
        { 
          name: "Assanbusa", 
          nameAmharic: "ሳምቡሳ", 
          price: 150,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
          description: "Traditional Ethiopian samosas"
        },
        { 
          name: "Pan Cake", 
          nameAmharic: "ፓን ኬክ", 
          price: 200,
          image: "/hero.jpg",
          description: "Fluffy pancakes with syrup"
        },
        { 
          name: "French Toast", 
          nameAmharic: "ፍሬንች ቶስት", 
          price: 200,
          image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
          description: "Golden French toast"
        },
        { 
          name: "Normal Wrap", 
          nameAmharic: "ኖርማል ራፕ", 
          price: 400,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
          description: "Classic chicken wrap"
        },
        { 
          name: "Special Wrap", 
          nameAmharic: "ስፔሻል ራፕ", 
          price: 500,
          image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80",
          description: "Loaded special wrap"
        }
      ]
    },
    {
      id: "breakfast",
      name: "Breakfast",
      nameAmharic: "ቁርስ",
      items: [
        { 
          name: "Firfir Enqulal", 
          nameAmharic: "ፍርፍር እንቁላል", 
          price: 130,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
          description: "Traditional Ethiopian breakfast"
        },
        { 
          name: "Scrambled Eggs", 
          nameAmharic: "ስክራምብልድ እንቁላል", 
          price: 200,
          image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
          description: "Fluffy scrambled eggs"
        },
        { 
          name: "Kinche", 
          nameAmharic: "ቂንጬ", 
          price: 125,
          image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
          description: "Traditional Ethiopian porridge"
        },
        { 
          name: "Kinche with Butter", 
          nameAmharic: "ቂንጬ በቅቤ", 
          price: 250,
          image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80",
          description: "Kinche with Ethiopian butter"
        },
        { 
          name: "Kinche with Milk", 
          nameAmharic: "ቂንጬ በወተት", 
          price: 150,
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
          description: "Creamy milk kinche"
        },
        { 
          name: "Firfir Fasting", 
          nameAmharic: "ፍርፍር ፆም", 
          price: 120,
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          description: "Vegan firfir option"
        },
        { 
          name: "Scrambled Fasting", 
          nameAmharic: "ስክራምብልድ ፆም", 
          price: 150,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
          description: "Plant-based scramble"
        },
        { 
          name: "Omelette", 
          nameAmharic: "ኦምሌት", 
          price: null,
          image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80",
          description: "Classic French omelette"
        },
        { 
          name: "Kinche with Egg", 
          nameAmharic: "ቂንጬ ከእንቁላል", 
          price: 180,
          image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
          description: "Kinche topped with eggs"
        },
        { 
          name: "Scrambled with Egg", 
          nameAmharic: "ስክራምብልድ ከእንቁላል", 
          price: null,
          image: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=800&q=80",
          description: "Extra egg scramble"
        }
      ]
    },
    {
      id: "lunch",
      name: "Lunch",
      nameAmharic: "ምሳ",
      items: [
        { 
          name: "Beyaynet", 
          nameAmharic: "በያይነት", 
          price: 150,
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
          description: "Mixed vegetable platter"
        },
        { 
          name: "Shiro Wot", 
          nameAmharic: "ሽሮ ወጥ", 
          price: 195,
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
          description: "Traditional chickpea stew"
        },
        { 
          name: "Tibs", 
          nameAmharic: "ጥብስ", 
          price: 230,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          description: "Sautéed meat with vegetables"
        },
        { 
          name: "Scrambled Shiro", 
          nameAmharic: "ስክራምብልድ ሽሮ", 
          price: 210,
          image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
          description: "Scrambled shiro special"
        },
        { 
          name: "Roast Shiro", 
          nameAmharic: "ሮስት ሽሮ", 
          price: 140,
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
          description: "Roasted shiro delight"
        },
        { 
          name: "Misir Wot", 
          nameAmharic: "ምስር ወጥ", 
          price: 140,
          image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
          description: "Spicy red lentil stew"
        },
        { 
          name: "Gomen Besiga", 
          nameAmharic: "ጎመን በስጋ", 
          price: 230,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
          description: "Collard greens with meat"
        },
        { 
          name: "Gomen Kitfo", 
          nameAmharic: "ጎመን ክትፎ", 
          price: 250,
          image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
          description: "Gomen with minced meat"
        },
        { 
          name: "Gomen Besiga", 
          nameAmharic: "ጎመን በስጋ", 
          price: 250,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
          description: "Traditional gomen dish"
        },
        { 
          name: "Gomen Firfir", 
          nameAmharic: "ጎመን ፍርፍር", 
          price: 250,
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
          description: "Gomen with injera pieces"
        }
      ]
    },
    {
      id: "fish",
      name: "Fish",
      nameAmharic: "ዓሳ",
      items: [
        { 
          name: "Asa Gubash", 
          nameAmharic: "ዓሳ ጉባሽ", 
          price: 350,
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          description: "Grilled fish special"
        },
        { 
          name: "Asa Keteset", 
          nameAmharic: "ዓሳ ቀተሰት", 
          price: 380,
          image: "https://images.unsplash.com/photo-1580959375944-0b7b2e7e4f3f?w=800&q=80",
          description: "Fried fish delight"
        },
        { 
          name: "Asa Sebosebo", 
          nameAmharic: "ዓሳ ሰቦሰቦ", 
          price: 320,
          image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&q=80",
          description: "Fish in spicy sauce"
        },
        { 
          name: "Yetembose Asa", 
          nameAmharic: "የተመቦሰ ዓሳ", 
          price: 330,
          image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
          description: "Baked fish perfection"
        }
      ]
    },
    {
      id: "salad",
      name: "Salad",
      nameAmharic: "ሰላጣ",
      items: [
        { 
          name: "Tomato Salad", 
          nameAmharic: "ቲማቲም ሰላጣ", 
          price: 160,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
          description: "Fresh tomato salad"
        },
        { 
          name: "Mixed Salad", 
          nameAmharic: "ድብልቅ ሰላጣ", 
          price: 180,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
          description: "Garden fresh mix"
        },
        { 
          name: "Caesar Salad", 
          nameAmharic: "ሲዘር ሰላጣ", 
          price: 200,
          image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
          description: "Classic Caesar with croutons"
        },
        { 
          name: "Greek Salad", 
          nameAmharic: "ግሪክ ሰላጣ", 
          price: 230,
          image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
          description: "Mediterranean delight"
        },
        { 
          name: "Special Salad", 
          nameAmharic: "ስፔሻል ሰላጣ", 
          price: 250,
          image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80",
          description: "Chef's special salad"
        }
      ]
    },
    {
      id: "juice-shake",
      name: "Juice & Shake",
      nameAmharic: "ጁስ እና ሼክ",
      items: [
        { 
          name: "Orange Juice", 
          nameAmharic: "ብርቱካን ጁስ", 
          price: 100,
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
          description: "Freshly squeezed orange"
        },
        { 
          name: "Mango Juice", 
          nameAmharic: "ማንጎ ጁስ", 
          price: 120,
          image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80",
          description: "Tropical mango blend"
        },
        { 
          name: "Avocado Juice", 
          nameAmharic: "አቮካዶ ጁስ", 
          price: 120,
          image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80",
          description: "Creamy avocado smoothie"
        },
        { 
          name: "Papaya Juice", 
          nameAmharic: "ፓፓያ ጁስ", 
          price: 150,
          image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80",
          description: "Sweet papaya juice"
        },
        { 
          name: "Mixed Juice", 
          nameAmharic: "ድብልቅ ጁስ", 
          price: 160,
          image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80",
          description: "Tropical fruit mix"
        },
        { 
          name: "Banana Shake", 
          nameAmharic: "ሙዝ ሼክ", 
          price: 160,
          image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800&q=80",
          description: "Creamy banana shake"
        },
        { 
          name: "Strawberry Shake", 
          nameAmharic: "ስትሮቤሪ ሼክ", 
          price: 180,
          image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80",
          description: "Fresh strawberry shake"
        },
        { 
          name: "Energy Drink", 
          nameAmharic: "ኢነርጂ መጠጥ", 
          price: 150,
          image: "https://images.unsplash.com/photo-1622543925917-763c34f6a1a7?w=800&q=80",
          description: "Refreshing energy boost"
        }
      ]
    }
  ]
};
