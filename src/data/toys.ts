import { Toy } from '../types';

import heroEmporiumImg from '../assets/images/hero_toy_emporium_1791181842609.jpg';
import railwayImg from '../assets/images/product_wooden_railway_1791181856687.jpg';
import bearImg from '../assets/images/product_vintage_bear_1791181869597.jpg';
import robotImg from '../assets/images/product_stem_robot_1791181880995.jpg';

export const HERO_IMAGE = heroEmporiumImg;

export const INITIAL_TOYS: Toy[] = [
  {
    id: 'toy-railway-heritage',
    name: 'The Royal Heritage Railway Set',
    category: 'Wooden Heirlooms',
    ageGroup: '3-5',
    ageLabel: 'Ages 3–8',
    price: 88,
    originalPrice: 98,
    rating: 4.9,
    reviewCount: 38,
    image: railwayImg,
    tag: 'Heirloom Bestseller',
    description: 'Carved solid beechwood locomotive with 3 passenger carriages and magnetic brass couplings.',
    longDescription: 'Crafted from slow-grown Bavarian beechwood, this heirloom railway set introduces young conductors to physical mechanics and open-ended town building. Smooth-sanded tracks click effortlessly together, while magnetic couplings make assembling trains intuitive for small hands.',
    materials: ['FSC-Certified Solid Beechwood', 'Non-Toxic Waterborne Lacquer', 'Embedded Neodymium Magnets'],
    dimensions: 'Tracks form 110cm x 75cm loop',
    inStock: true,
    stockCount: 14,
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        rating: 5,
        date: 'October 2, 2026',
        comment: 'The craftsmanship is staggering. The wood is satiny smooth with no rough grain. My twins have played with it every single afternoon.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Marcus Sterling',
        rating: 5,
        date: 'September 24, 2026',
        comment: 'Truly an heirloom piece. Reminds me of toys from half a century ago. Worth every single penny.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-vintage-bear',
    name: 'Barnaby the Honeycomb Bear',
    category: 'Plush & Companions',
    ageGroup: '0-2',
    ageLabel: 'Ages 0–6',
    price: 46,
    rating: 5.0,
    reviewCount: 42,
    image: bearImg,
    tag: 'Organic Bouclé',
    description: 'Heirloom cuddle bear fashioned from certified organic honeycomb bouclé with embroidered features.',
    longDescription: 'Barnaby is lovingly stuffed with hypoallergenic recycled botanic fibers and encased in pure organic bouclé wool. Free from small plastic beads or plastic eyes, making him safe from the very first newborn cuddle through preschool bedtime stories.',
    materials: ['GOTS Certified Organic Bouclé Wool', 'Embroidered Cotton Eyes', 'Plant-based corn fiber batting'],
    dimensions: '32cm tall (sitting: 22cm)',
    inStock: true,
    stockCount: 9,
    reviews: [
      {
        id: 'rev-3',
        author: 'Clara Dubois',
        rating: 5,
        date: 'September 29, 2026',
        comment: 'So soft and beautifully weighted. He has become my one-year-old daughter’s inseparable sleepy companion.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-stem-robot',
    name: 'Cogsworth Articulated Wood Bot',
    category: 'STEM & Building',
    ageGroup: '6-8',
    ageLabel: 'Ages 5–10',
    price: 54,
    rating: 4.8,
    reviewCount: 29,
    image: robotImg,
    tag: 'STEM Certified',
    description: 'Transformative wooden robot with 16 articulating brass friction joints and interchangeable tool hands.',
    longDescription: 'Inspired by retro mid-century automata, Cogsworth can be posed in dozens of gravity-defying balance positions. Teaches kinetic balance, spatial geometry, and fine motor dexterity while sparking countless imaginative interplanetary rescues.',
    materials: ['Solid Maple Hardwood', 'Brushed Brass Pivot Rivets', 'Vegetable-oil finish'],
    dimensions: '24cm x 14cm x 6cm',
    inStock: true,
    stockCount: 19,
    reviews: [
      {
        id: 'rev-4',
        author: 'David Chen',
        rating: 5,
        date: 'October 1, 2026',
        comment: 'The friction joints stay in position surprisingly well. It sits proudly on my 7-year-old’s desk as his favorite creation.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-woodland-ark',
    name: 'Woodland Ark & Hand-Carved Animal Pairs',
    category: 'Wooden Heirlooms',
    ageGroup: '3-5',
    ageLabel: 'Ages 2–6',
    price: 74,
    originalPrice: 85,
    rating: 4.9,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    tag: 'Hand-Carved',
    description: 'Two-tier timber ark with removable gangway and 8 sculpted woodland animal pairs.',
    longDescription: 'Features deer, badgers, bears, foxes, and owls carved from sustainably managed linden wood. The roof lifts off cleanly for easy toy storage after imaginative play concludes.',
    materials: ['Linden Wood', 'Walnut Wood Accents', 'Non-toxic Beeswax Polish'],
    dimensions: '38cm x 20cm x 24cm',
    inStock: true,
    stockCount: 8,
    reviews: [
      {
        id: 'rev-5',
        author: 'Hannah M.',
        rating: 5,
        date: 'September 18, 2026',
        comment: 'The tactile feeling of each animal is extraordinary. You can smell the subtle beeswax polish.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-botanist-terrarium',
    name: 'Little Botanist Explorer Kit',
    category: 'STEM & Building',
    ageGroup: '6-8',
    ageLabel: 'Ages 4–9',
    price: 38,
    rating: 4.7,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    tag: 'Nature Play',
    description: 'Brass-rimmed wooden magnifying glass, flower press, and specimen tweezers in a canvas field roll.',
    longDescription: 'Inspire budding naturalists to observe leaves, seeds, and outdoor flora. Includes 10 archival botanical blotting sheets, wooden screw-tight flower press, and illustrated nature observation booklet.',
    materials: ['Birch Plywood', 'Optical Glass Lens 3x', 'Unbleached Cotton Canvas'],
    dimensions: '22cm x 15cm x 5cm',
    inStock: true,
    stockCount: 23,
    reviews: [
      {
        id: 'rev-6',
        author: 'Julian Thorne',
        rating: 5,
        date: 'September 12, 2026',
        comment: 'We took this on our mountain hike. My daughter pressed wild buttercups and labeled them with pure glee.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-pastel-stacker',
    name: 'Nordic Dawn Stacking Rainbow',
    category: 'Wooden Heirlooms',
    ageGroup: '0-2',
    ageLabel: 'Ages 1–4',
    price: 36,
    rating: 4.9,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
    tag: 'Montessori Classic',
    description: '10 concentric nesting wooden arches painted in earth pigments from terracotta to dusty eucalyptus.',
    longDescription: 'A cornerstone of Waldorf and Montessori nurseries. Arches transform seamlessly into bridges, tunnels, doll cribs, or abstract modernist sculptures as your toddler grows.',
    materials: ['Solid Alder Wood', 'Plant-Derived Matte Stains'],
    dimensions: '30cm x 15cm x 7cm',
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 'rev-7',
        author: 'Sophie L.',
        rating: 5,
        date: 'September 22, 2026',
        comment: 'The velvety matte texture ensures the arches do not slip when stacked high. Truly gorgeous on the shelf too.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-tea-set',
    name: 'Bespoke Patisserie Wooden Tea Service',
    category: 'Pretend Play & Music',
    ageGroup: '3-5',
    ageLabel: 'Ages 3–7',
    price: 49,
    rating: 4.8,
    reviewCount: 33,
    image: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&q=80',
    tag: 'Pretend Play',
    description: 'Turned beechwood teapot, two teacups, honey jar with dipper, and 4 tiered macarons with velcro halves.',
    longDescription: 'Encourages social warmth, hosting etiquette, and storytelling. Children love slicing the magnetic wooden macarons and pouring imaginary mint tea for family and stuffed friends.',
    materials: ['Turned Beechwood', 'Non-toxic Food-grade Mineral Oil Finish'],
    dimensions: 'Teapot height 12cm',
    inStock: true,
    stockCount: 11,
    reviews: [
      {
        id: 'rev-8',
        author: 'Rebecca King',
        rating: 5,
        date: 'September 15, 2026',
        comment: 'Every guest who comes into our kitchen gets served tea now! Durable, solid wood that withstands real drops.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-pip-bunny',
    name: 'Pip the Starlight Bunny with Linen Dungarees',
    category: 'Plush & Companions',
    ageGroup: '0-2',
    ageLabel: 'Ages 0–5',
    price: 42,
    rating: 4.9,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80',
    tag: 'Removable Wardrobe',
    description: 'Flaxen-linen dressed bunny with soft flopping velvet ears and hand-stitched snoozing whiskers.',
    longDescription: 'Pip loves cozy pockets and quiet nap times. Features removable linen dungarees with tiny wooden button closures to help toddlers practice dressing motor skills.',
    materials: ['Organic Cotton Muslin', 'Washed European Flax Linen', 'Kapok Fiber filling'],
    dimensions: '28cm long',
    inStock: true,
    stockCount: 15,
    reviews: [
      {
        id: 'rev-9',
        author: 'Audrey P.',
        rating: 5,
        date: 'October 3, 2026',
        comment: 'So whimsical and gentle. The linen dungarees are sewn with such meticulous care.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-melodic-glockenspiel',
    name: 'Artisan Tuned Pentatonic Glockenspiel',
    category: 'Pretend Play & Music',
    ageGroup: '3-5',
    ageLabel: 'Ages 2–8',
    price: 52,
    rating: 4.9,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    tag: 'Harmonic Tuning',
    description: 'Hand-tuned 7-note brass bars mounted on solid resonance maple base, with two birch mallets.',
    longDescription: 'Specially tuned in an open pentatonic scale (d-e-g-a-b-d-e) so every combination of strikes harmonizes effortlessly without dissonant clashes. Pure, gentle resonance designed to be pleasant to adult ears as well!',
    materials: ['Maple Soundboard', 'Acoustic Brass Tone Bars', 'Natural Felt Dampers'],
    dimensions: '32cm x 12cm x 6cm',
    inStock: true,
    stockCount: 7,
    reviews: [
      {
        id: 'rev-10',
        author: 'Liam O’Connor',
        rating: 5,
        date: 'September 10, 2026',
        comment: 'As a musician parent, this is the first toy instrument I actually enjoy hearing played all morning long. Celestial sound.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-architect-blocks',
    name: 'Architect’s 100-Piece Romanesque Town Blocks',
    category: 'STEM & Building',
    ageGroup: '6-8',
    ageLabel: 'Ages 4–12',
    price: 95,
    originalPrice: 110,
    rating: 5.0,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    tag: 'Architect Edition',
    description: 'Precision-milled geometric solid hardwood blocks with columns, archways, and cupolas in a wheeled tray.',
    longDescription: 'Milled to 0.1mm tolerance from sustainably harvested cherry, walnut, and ash wood. Creates architectural citadels, aqueducts, and bridges that balance with immense structural satisfaction.',
    materials: ['Tri-Wood Blend: Cherry, Walnut, Ash', 'Wheeled Pine Storage Cart'],
    dimensions: 'Storage cart: 45cm x 35cm x 10cm',
    inStock: true,
    stockCount: 6,
    reviews: [
      {
        id: 'rev-11',
        author: 'Evelyn Scott',
        rating: 5,
        date: 'September 26, 2026',
        comment: 'The natural contrasting woods make every completed castle look like a museum sculpture. Unmatched quality.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-cash-register',
    name: 'Old Village Wooden Cash Register & Mint Coins',
    category: 'Pretend Play & Music',
    ageGroup: '3-5',
    ageLabel: 'Ages 3–8',
    price: 58,
    rating: 4.8,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    tag: 'Working Bell',
    description: 'Pressable wooden keys, pop-out drawer with genuine brass chime bell, and wooden coins and paper slips.',
    longDescription: 'A delightful marketplace companion. When the register button is struck, a real cheerful brass bell rings and the cashier drawer glides open on smooth hidden rollers.',
    materials: ['Solid Beechwood', 'Solid Brass Chime', 'Printed wooden denominations'],
    dimensions: '20cm x 18cm x 16cm',
    inStock: true,
    stockCount: 12,
    reviews: [
      {
        id: 'rev-12',
        author: 'Tara Gomez',
        rating: 5,
        date: 'October 1, 2026',
        comment: 'The mechanical bell ding is so charming! My preschooler plays shopkeeper for hours.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-kaleidoscope-brass',
    name: 'Stargazer Solid Maple & Glass Kaleidoscope',
    category: 'STEM & Building',
    ageGroup: '9+',
    ageLabel: 'Ages 5–Adult',
    price: 32,
    rating: 4.9,
    reviewCount: 26,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    tag: 'Optical Wonder',
    description: 'Dual-mirror optical chamber filled with tumbling sea glass and raw mineral fragments.',
    longDescription: 'Turn the smooth lathe-turned maple barrel toward any light source to see endless kaleidoscopic mandalas formed by genuine sea glass, tumbled rose quartz, and brass bits.',
    materials: ['Lathe-Turned Maple', 'First-Surface Optical Mirrors', 'Tumbled Natural Minerals'],
    dimensions: '21cm length x 4.5cm diameter',
    inStock: true,
    stockCount: 17,
    reviews: [
      {
        id: 'rev-13',
        author: 'Nathaniel Cole',
        rating: 5,
        date: 'September 20, 2026',
        comment: 'Even as an adult, peering into this is instantly soothing and breathtaking. Beautiful gift piece.',
        verified: true
      }
    ]
  }
];

export const BOX_STYLES = [
  {
    id: 'pine-crate',
    name: 'Artisan Pine Toy Crate',
    price: 18,
    description: 'Hand-assembled natural pine box with sliding lid and rope carry handles. Reusable as a nursery keepsake chest.',
    accent: 'Warm Timber'
  },
  {
    id: 'storybook-tin',
    name: 'Illustrated Storybook Tin',
    price: 14,
    description: 'Embossed vintage tin illustrated with woodland animal vignettes. Moisture-proof heirloom storage.',
    accent: 'Forest Vignette'
  },
  {
    id: 'linen-sack',
    name: 'Organic Cotton Heirloom Sack',
    price: 9,
    description: 'Heavyweight organic herringbone cotton sack with hand-stamped monogram and cotton drawstring.',
    accent: 'Linen Cloth'
  }
];

export const RIBBON_STYLES = [
  { id: 'sage-velvet', name: 'Forest Sage Velvet', color: '#4A5B4E' },
  { id: 'golden-satin', name: 'Golden Honeycomb Satin', color: '#D49B3E' },
  { id: 'vintage-crimson', name: 'Warm Terracotta Grosgrain', color: '#B25D48' },
  { id: 'midnight-navy', name: 'Deep Indigo Twill', color: '#2B3848' }
];
