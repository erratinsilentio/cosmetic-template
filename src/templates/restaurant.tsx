import { useState, useEffect, useRef } from 'react'
import { Menu, X, MapPin, Phone, Clock, Facebook, Instagram, ChevronDown, Star, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const sectionsRef = useRef({})

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const current = Object.entries(sectionsRef.current).find(([key, ref]) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect()
          return top <= 100 && bottom > 100
        }
        return false
      })

      if (current) {
        setActiveSection(current[0])
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Pierogi', price: '22 zł', description: 'Traditional Polish dumplings with various fillings' },
    { name: 'Bigos', price: '25 zł', description: 'Hunter's stew with sauerkraut, meat, and spices' },
    { name: 'Kotlet Schabowy', price: '28 zł', description: 'Breaded pork cutlet served with potatoes and salad' },
    { name: 'Żurek', price: '18 zł', description: 'Sour rye soup with white sausage and boiled egg' },
    { name: 'Gołąbki', price: '24 zł', description: 'Cabbage rolls stuffed with meat and rice in tomato sauce' },
  ]

  const reviews = [
    { id: 1, author: 'Anna K.', rating: 5, text: 'Absolutely delicious! The pierogi were out of this world.' },
    { id: 2, author: 'Marek W.', rating: 4, text: 'Great atmosphere and friendly staff. The bigos was fantastic.' },
    { id: 3, author: 'Ewa S.', rating: 5, text: 'Best Polish food in Żoliborz! Will definitely come back.' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>SAM Żoliborz</h1>
          <nav className="hidden md:flex space-x-4">
            {['home', 'menu', 'about', 'reviews', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`${
                  activeSection === item ? 'text-yellow-500' : isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-yellow-500 transition duration-300`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>
          <button onClick={toggleMenu} className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white shadow-md"
            >
              {['home', 'menu', 'about', 'reviews', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          ref={(el) => (sectionsRef.current.home = el)}
          className="relative h-screen flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg?height=1080&width=1920"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-4"
            >
              Welcome to SAM Żoliborz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8"
            >
              Experience the authentic taste of Poland
            </motion.p>
            <motion.a
              href="#menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Explore Our Menu
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-white animate-bounce" size={32} />
          </motion.div>
        </section>

        <section
          id="menu"
          ref={(el) => (sectionsRef.current.menu = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Menu</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-100 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-yellow-500 font-bold">{item.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          ref={(el) => (sectionsRef.current.about = el)}
          className="py-20 bg-gray-200"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Restaurant staff"
                  className="rounded-lg shadow-md"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 md:pl-8"
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  SAM Żoliborz is a cozy restaurant located in the heart of Żoliborz, Warsaw. We specialize in traditional Polish cuisine, prepared with love and care using locally sourced ingredients. Our friendly staff and warm atmosphere make SAM Żoliborz the perfect place for a family dinner or a night out with friends.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our chef, with over 20 years of experience, brings authentic Polish flavors to life with a modern twist. We take pride in our homemade pierogi, slow-cooked bigos, and perfectly crispy kotlet schabowy.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="text-yellow-500 mr-2" />
                    <span className="font-semibold">50+ Seats</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-yellow-500 mr-2" />
                    <span className="font-semibold">Open Daily</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="reviews"
          ref={(el) => (sectionsRef.current.reviews = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Customer Reviews</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-100 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.author}`}
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{review.author}</h3>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-500 fill-current" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className="bg-gray-800 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin className="mr-2 text-yellow-500" size={18} />
                  <span>123 Mickiewicza St, Żoliborz, Warsaw</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 text-yellow-500" size={18} />
                  <span>+48 123 456 789</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 text-yellow-500" size={18} />
                  <span>Mon-Sat: 12:00 - 22:00, Sun: 12:00 - 20:00</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-yellow-500 transition duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-yellow-500 transition duration-300">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-md hover:bg-yellow-400 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            <p>&copy; 2023 SAM Żoliborz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}