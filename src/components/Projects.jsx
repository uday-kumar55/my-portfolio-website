import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Compass, ShoppingCart, BookOpen, Star, Check } from 'lucide-react';
import { projectsData } from '../data';

// Custom modern dashboard simulators to showcase application interactions
function ProjectMockup({ id }) {
  // Simulator 1: Book Hub State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);
  
  const booksList = [
    { title: "Architectural Patterns", category: "Dev", rate: 4.8, pages: 320 },
    { title: "Client Security Audits", category: "Sec", rate: 4.9, pages: 275 },
    { title: "State Management", category: "Dev", rate: 4.7, pages: 410 },
    { title: "Network Cryptography", category: "Sec", rate: 4.6, pages: 190 }
  ];

  const filteredBooks = booksList.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Simulator 2: Luxury Clothing Cart State
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Classic Black');
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Simulator 3: Foodhub Reservation State
  const [selectedDishIdx, setSelectedDishIdx] = useState(0);
  const [guestCount, setGuestCount] = useState(2);
  const [resDate, setResDate] = useState('2026-05-29');
  const [resSuccess, setResSuccess] = useState(false);

  const dishes = [
    { name: "Smoked Sage Burger", price: 18, cal: 640 },
    { name: "Saffron Truffle Penne", price: 24, cal: 510 },
    { name: "Spicy Cilantro Cod", price: 29, cal: 420 }
  ];

  // Book Hub Simulator Render
  if (id === 'book-hub') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 font-mono text-[10px] flex flex-col justify-between select-none text-left relative border border-paper-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3 text-[8.5px] text-ink-500 font-bold">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>book-hub-session.log</span>
            </span>
            <span className="text-[7.5px] bg-gold-600/15 py-0.5 px-2 text-gold-700 rounded font-bold">ROUTING: PROTECTED</span>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center justify-between gap-1.5 mb-2.5">
            <div className="flex space-x-1">
              {['All', 'Dev', 'Sec'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedBookDetail(null);
                  }}
                  className={`px-2 py-0.5 text-[8px] border transition-all cursor-pointer rounded ${
                    selectedCategory === cat 
                      ? 'bg-gold-600 text-white border-gold-600 font-bold' 
                      : 'border-slate-200 bg-white text-ink-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedBookDetail(null);
              }}
              className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-ink-950 text-[8px] w-24 outline-none focus:border-gold-600"
            />
          </div>

          {/* Results Shelf */}
          <div className="space-y-1 max-h-[85px] overflow-y-auto pr-1">
            {filteredBooks.map((book) => (
              <div
                key={book.title}
                onClick={() => setSelectedBookDetail(book)}
                className={`flex items-center justify-between p-1.5 border rounded cursor-pointer transition-all ${
                  selectedBookDetail?.title === book.title 
                    ? 'bg-gold-500/10 border-gold-500/40' 
                    : 'bg-white border-slate-150 hover:border-slate-300'
                }`}
              >
                <span className="text-ink-950 font-sans font-medium truncate max-w-[120px]">{book.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[7.5px] px-1 bg-slate-100 rounded text-ink-500">{book.category}</span>
                  <span className="text-gold-700 font-bold flex items-center"><Star size={7} className="fill-gold-500 text-gold-500 mr-0.5" />{book.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display Book details if selected */}
        <div className="mt-2.5 pt-2 border-t border-slate-200 min-h-[45px] flex flex-col justify-center bg-white px-2 rounded-md">
          {selectedBookDetail ? (
            <div className="text-[9px] font-sans text-ink-700">
              <div className="font-mono text-[8px] text-gold-700 font-bold mb-0.5">METADATA STATUS:</div>
              <p className="text-ink-950 font-semibold leading-tight truncate">{selectedBookDetail.title}</p>
              <div className="flex items-center space-x-4 mt-1 font-mono text-[8px] text-ink-500">
                <span>PAGES: {selectedBookDetail.pages}p</span>
                <span>JWT ACCESS APPROVED</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-[8px] font-mono text-ink-550 py-1.5 flex items-center justify-center space-x-1.5 font-semibold">
              <BookOpen size={9} className="text-gold-600 animate-pulse" />
              <span>Click items to simulate secure JWT routes</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Luxury Clothing Website Simulator
  if (id === 'luxury-fashion') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 font-mono text-[10px] flex flex-col justify-between select-none border border-slate-200 text-left relative">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3 text-[8.5px] text-ink-500 font-bold">
            <span className="font-bold tracking-wider text-ink-950 uppercase">Shopping App Dashboard</span>
            <button
              onClick={() => setShowCartDrawer(!showCartDrawer)}
              className="text-gold-700 font-bold uppercase text-[7.5px] bg-gold-600/10 py-0.5 px-2 hover:bg-gold-600/20 rounded cursor-pointer flex items-center space-x-1"
            >
              <ShoppingCart size={8} className="text-gold-600" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!showCartDrawer ? (
              <motion.div
                key="product-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-[10px] font-bold text-ink-950 tracking-wide font-sans">CONTEMPO URBAN COAT</h4>
                    <span className="text-gold-700 font-bold block mt-0.5">$210.00 USD</span>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1 font-sans text-[9px] text-ink-700">
                    <Star size={9} className="fill-gold-600 text-gold-600" />
                    <span className="font-bold">5.0</span>
                  </div>
                </div>

                {/* Color swatch selection */}
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] text-ink-500">COLOR:</span>
                  <div className="flex space-x-1">
                    {['Classic Black', 'Classic Sand'].map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-1.5 py-0.5 text-[7.5px] border cursor-pointer rounded ${
                          selectedColor === col ? 'bg-gold-600 text-white border-gold-600' : 'border-slate-200 bg-white text-ink-600'
                        }`}
                      >
                        {col.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes selections */}
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] text-ink-500">SIZE:</span>
                  <div className="flex space-x-1">
                    {['S', 'M', 'L'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-5 h-5 text-[8.1px] border flex items-center justify-center cursor-pointer transition-colors rounded ${
                          selectedSize === sz ? 'bg-gold-600 text-white border-gold-600 font-bold' : 'border-slate-200 bg-white text-ink-500 hover:border-slate-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to checkout trigger */}
                <button
                  onClick={() => {
                    setCartCount(prev => prev + 1);
                    setCartTotal(prev => prev + 210);
                  }}
                  className="w-full mt-1.5 py-1.5 bg-ink-950 hover:bg-gold-600 text-white text-[8px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded flex items-center justify-center space-x-1.5"
                >
                  <ShoppingCart size={9} />
                  <span>Add To Shopping Cart</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="cart-drawer-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 text-[9px]"
              >
                <div className="flex justify-between items-center bg-white p-1.5 border border-slate-200 rounded">
                  <span className="text-ink-950 font-bold">1x Contempo Coat ({selectedSize})</span>
                  <span className="text-ink-700">$210.00</span>
                </div>

                {/* Promo application */}
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="ENTER CODE: UDAY55"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow px-1.5 py-0.5 bg-white border border-slate-250 text-ink-950 text-[8px] outline-none rounded"
                  />
                  <button
                    onClick={() => {
                      if (promoCode.toUpperCase() === 'UDAY55') {
                        setPromoApplied(true);
                      }
                    }}
                    className="px-2.5 py-0.5 bg-gold-600 text-white font-bold uppercase text-[7.5px] cursor-pointer rounded"
                  >
                    Apply
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-200 space-y-1 font-mono text-[9px] text-right">
                  <div>Subtotal: <span className="text-ink-950 font-bold">${cartTotal}.00</span></div>
                  {promoApplied && <div className="text-gold-700 font-bold">Discount (55%): <span className="font-bold font-mono">-${(cartTotal * 0.55).toFixed(0)}.00</span></div>}
                  <div className="text-ink-950 font-bold border-t border-slate-300 pt-1 mt-1 text-[10px]">
                    Total Amount: ${promoApplied ? (cartTotal * 0.45).toFixed(0) : cartTotal}.00
                  </div>
                </div>

                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="w-full mt-1.5 py-1 text-center font-bold text-[8px] text-slate-600 uppercase border border-slate-200 hover:bg-slate-100 rounded cursor-pointer"
                >
                  Return to Storefront
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Simulator info line */}
        <div className="pt-2 border-t border-slate-230 mt-2 flex justify-between text-[7px] text-ink-500 uppercase font-bold tracking-wider leading-none">
          <span>Responsive Flexible Grid</span>
          <span>DOM State Rerender Active</span>
        </div>
      </div>
    );
  }

  // Foodhub Munch Simulator
  return (
    <div className="w-full h-full bg-slate-50 p-4 font-mono text-[10px] flex flex-col justify-between select-none border border-slate-200 text-left relative">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3 text-[8px] text-ink-500 font-bold">
          <span className="flex items-center space-x-1">
            <Compass size={10} className="text-gold-600 animate-spin-slow" />
            <span>foodhub_routing_grid</span>
          </span>
          <span className="text-[7.5px] text-gold-700 uppercase rounded bg-gold-500/10 px-1 font-bold">Table Reservations</span>
        </div>

        {/* Carousel slide select item */}
        <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-ink-950 font-sans font-bold text-[10px]">{dishes[selectedDishIdx].name}</span>
            <span className="text-gold-700 font-bold">${dishes[selectedDishIdx].price}</span>
          </div>
          <p className="text-[8px] text-ink-700 font-sans leading-relaxed">
            Premium recipe layout showcasing flexible CSS grids for handheld smartphone screens.
          </p>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[7.5px] text-ink-500">ENERGY: {dishes[selectedDishIdx].cal} kCal</span>
            
            {/* Switch slides */}
            <div className="flex space-x-1">
              {dishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDishIdx(idx);
                    setResSuccess(false);
                  }}
                  className={`w-4 h-4 text-[8px] border flex items-center justify-center transition-colors cursor-pointer rounded ${
                    selectedDishIdx === idx ? 'bg-gold-600 text-white border-gold-600 font-bold' : 'border-slate-250 text-ink-500 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Reservation Form */}
        <div className="bg-white p-2 border border-slate-200 rounded-lg space-y-1.5">
          {!resSuccess ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[7px] text-ink-500 uppercase font-bold">
                <span>DINE DATE</span>
                <span>GUEST COUNT ({guestCount})</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-ink-950 text-[8px] p-1 select-none outline-none focus:border-gold-600 rounded"
                />
                
                <div className="flex border border-slate-200 rounded overflow-hidden">
                  <button
                    onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                    className="flex-1 bg-slate-50 text-ink-950 font-bold flex items-center justify-center active:bg-slate-200 cursor-pointer"
                    aria-label="Decrease Guest Count"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center flex items-center justify-center text-ink-950 text-[8px] font-bold">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(prev => Math.min(8, prev + 1))}
                    className="flex-1 bg-slate-50 text-ink-950 font-bold flex items-center justify-center active:bg-slate-200 cursor-pointer"
                    aria-label="Increase Guest Count"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setResSuccess(true)}
                className="w-full py-1 bg-ink-950 hover:bg-gold-600 text-white text-[8px] font-bold uppercase tracking-wider text-center cursor-pointer rounded"
              >
                Reserve Dining Table
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-1 text-center space-y-0.5 text-[8px]"
            >
              <div className="font-bold flex items-center justify-center gap-1 uppercase text-emerald-650">
                <Check size={9} />
                <span>Table Reserved!</span>
              </div>
              <p className="text-ink-950 text-[7.5px] font-sans font-medium">
                Date: {resDate} &bull; Guests: {guestCount} &bull; Time: 7:30 PM
              </p>
              <button
                onClick={() => setResSuccess(false)}
                className="text-gold-700 hover:text-gold-600 underline uppercase text-[7px] mt-1 text-center cursor-pointer block w-full"
              >
                Register New Table
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer status */}
      <div className="pt-2 border-t border-slate-200 mt-2 flex justify-between text-[7px] text-ink-500 uppercase font-bold tracking-wider leading-none">
        <span>CSS GRID breakpoints</span>
        <span>Status Ready</span>
      </div>
    </div>
  );
}

const projectScreenshots = {
  'book-hub': 'https://vitreous-rose-1oi92cikhd.edgeone.app/image_2026-05-28_231631668.png',
  'luxury-fashion': 'https://delicate-lavender-yslgubxt49.edgeone.app/image_2026-05-28_231755996.png',
  'foodhub-munch': 'https://reliable-copper-m5ooza4zqa.edgeone.app/image_2026-05-28_231933118.png',
};

function ProjectItem({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      }`}
      id={`project-${project.id}`}
    >
      {/* Product Mock Frame (Col Span 5) */}
      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
        <motion.a 
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          whileHover={{ 
            scale: 1.015, 
            y: -2,
          }}
          className="block relative aspect-video bg-paper-100 border border-paper-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 shadow-sm group"
        >
          <img
            src={projectScreenshots[project.id]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Symmetrical Elegant Link Badge Overlay */}
          <div className="absolute inset-0 bg-ink-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/95 backdrop-blur-sm text-ink-950 text-[8px] font-mono font-bold uppercase tracking-widest py-2 px-3.5 rounded-lg border border-paper-200 shadow-sm flex items-center space-x-1">
              <span>Launch Live Site</span>
              <ExternalLink size={9} className="text-gold-600 font-bold" />
            </span>
          </div>
        </motion.a>
      </div>

      {/* Core Descriptions Details (Col Span 7) */}
      <div className="lg:col-span-7 space-y-5">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-widest flex items-center space-x-1.5 animate-none">
            <span>APPLICATION MODULE 0{index + 1}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink-950 tracking-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans font-light">
          {project.description}
        </p>

        {/* Bullets detailing work highlights */}
        <ul className="space-y-2.5 pl-4 border-l border-slate-200 text-xs text-ink-700 list-disc list-outside leading-relaxed font-light">
          {project.detailedPoints.map((pt, i) => (
            <motion.li 
              key={i}
              whileHover={{ x: 2, color: "var(--color-ink-950)" }}
              className="cursor-pointer transition-colors"
            >
              {pt}
            </motion.li>
          ))}
        </ul>

        {/* Technical badge index listing */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono font-bold tracking-tight px-3 py-1 bg-paper-100 text-ink-700 border border-paper-200 select-none uppercase rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Practical links */}
        <div className="pt-4 flex items-center space-x-6 border-t border-paper-200">
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            id={`project-action-demo-${project.id}`}
            whileHover={{ x: 2 }}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-gold-700 hover:text-gold-600 transition-colors cursor-pointer"
          >
            <span>Launch Live Web Application</span>
            <ExternalLink size={12} className="text-gold-700 font-bold" />
          </motion.a>
          <motion.a
            href="https://github.com/uday-kumar55"
            target="_blank"
            rel="noreferrer"
            id={`project-action-github-${project.id}`}
            whileHover={{ x: 2 }}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-ink-500 hover:text-ink-950 transition-colors cursor-pointer"
          >
            <span>View Repository</span>
            <Github size={12} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-paper-50 px-6 sm:px-8 lg:px-12 border-b border-paper-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Showcase Header */}
        <div className="text-center mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-2 font-mono font-bold flex items-center justify-center gap-2">
            05 / EXPERIMENTAL WORKS
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            id="projects-title"
            className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2"
          >
            My Projects.
          </motion.h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ink-700 max-w-lg mx-auto leading-relaxed font-light">
            Realized web applications focusing on robust React state engines, modular client-side assets management, and fluid responsive styling.
          </p>
        </div>

        {/* Project Lists */}
        <div className="space-y-24">
          {projectsData.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
