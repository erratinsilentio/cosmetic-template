import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Twitter,
  Menu,
  X,
  Star,
  ArrowRight,
} from "lucide-react";

export default function CosmeticSaloon() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 20px rgba(0,0,0,0.1)"]
  );

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (
        servicesRef.current &&
        scrollPosition >= servicesRef.current.offsetTop
      ) {
        setActiveSection("services");
      } else if (
        aboutRef.current &&
        scrollPosition >= aboutRef.current.offsetTop
      ) {
        setActiveSection("about");
      } else if (
        contactRef.current &&
        scrollPosition >= contactRef.current.offsetTop
      ) {
        setActiveSection("contact");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const services = [
    {
      title: "Luxe Facial",
      description: "Revitalize your skin with our premium facial treatments.",
      icon: "💆",
    },
    {
      title: "Hair Transformation",
      description: "Experience a complete makeover with our expert stylists.",
      icon: "💇",
    },
    {
      title: "Nail Artistry",
      description: "Express yourself with our creative nail designs.",
      icon: "💅",
    },
    {
      title: "Body Treatments",
      description: "Rejuvenate your body with our spa treatments.",
      icon: "🧖",
    },
    {
      title: "Makeup Artistry",
      description: "Get a stunning look for any occasion.",
      icon: "💄",
    },
    {
      title: "Wellness Therapies",
      description: "Holistic treatments for your mind and body.",
      icon: "🧘",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-colors"
        style={{ backgroundColor: headerBackground, boxShadow: headerShadow }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold text-pink-600">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Yuko
            </motion.span>
          </a>
          <nav className="hidden md:flex space-x-6">
            {["Home", "Services", "About", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`hover:text-pink-600 transition-colors ${activeSection === item.toLowerCase() ? "text-pink-600" : ""}`}
                >
                  {item}
                </a>
              </motion.div>
            ))}
          </nav>
          <Button
            className="md:hidden"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white px-4 py-2 flex flex-col space-y-2 overflow-hidden"
            >
              {["Home", "Services", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`hover:text-pink-600 transition-colors ${activeSection === item.toLowerCase() ? "text-pink-600" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        <section
          id="home"
          className="absolute top-0 z-10 h-screen bg-cover bg-center flex items-center overflow-hidden w-[40vw]"
          style={{
            backgroundImage: "/example-project.png",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 z-10 text-white">
            <motion.div {...fadeIn} className="max-w-2xl">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover Your <br />
                True Radiance
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 max-w-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience the art of beauty and relaxation at Yuko, where we
                blend tradition with innovation to unveil your inner glow.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Book Your Experience
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <ChevronDown className="text-white" size={32} />
          </motion.div>
        </section>

        <section id="services" ref={servicesRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Signature Services
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="overflow-hidden group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className="self-start group-hover:bg-pink-600 group-hover:text-white transition-colors"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="about" ref={aboutRef} className="py-20 bg-pink-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About Yuko
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src="/example-project.png"
                  alt="Yuko Salon"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
                <p className="text-gray-600 mb-6">
                  Founded in 2010, Yuko has been at the forefront of beauty
                  innovation, combining traditional techniques with cutting-edge
                  technology. Our team of expert stylists and therapists are
                  dedicated to helping you look and feel your absolute best.
                </p>
                <h3 className="text-2xl font-semibold mb-4">Our Philosophy</h3>
                <p className="text-gray-600 mb-6">
                  At Yuko, we believe that true beauty comes from within. Our
                  holistic approach to beauty and wellness is designed to
                  enhance your natural radiance and boost your confidence.
                </p>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  Learn More About Us
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Our Clients Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "Sarah L.",
                  quote:
                    "Yuko provides the most luxurious and effective treatments I've ever experienced!",
                },
                {
                  name: "Emily R.",
                  quote:
                    "The staff is incredibly professional, and the atmosphere is pure bliss. It's my go-to place for self-care.",
                },
                {
                  name: "Jessica T.",
                  quote:
                    "I always leave Yuko feeling refreshed, rejuvenated, and more confident. Highly recommended!",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-100 h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex-grow">
                        <p className="italic mb-4 text-lg">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                          {testimonial.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h3>
                <p className="mb-4 flex items-center">
                  <MapPin className="mr-2" size={18} /> 123 Elegance Avenue,
                  Beauty City, 12345
                </p>
                <p className="mb-4 flex items-center">
                  <Phone className="mr-2" size={18} /> +1 (555) 123-4567
                </p>
                <p className="mb-4">Monday - Friday: 9am - 8pm</p>
                <p className="mb-4">Saturday: 10am - 6pm</p>
                <p>Sunday: Closed</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <form className="space-y-4">
                  <Input type="text" placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input type="tel" placeholder="Your Phone" />
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Your Message"
                  ></textarea>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-pink-600 text-white text-center">
          <motion.div
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Look?
            </h2>
            <p className="mb-10 text-xl max-w-2xl mx-auto">
              Book your appointment today and experience the Yuko difference.
              Let us help you unveil your true beauty.
            </p>
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100"
            >
              Book Your Appointment <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Yuko Beauty Salon</h3>
              <p className="mb-2 flex items-center">
                <MapPin className="mr-2" size={18} /> 123 Elegance Avenue,
                Beauty City, 12345
              </p>
              <p className="mb-2 flex items-center">
                <Phone className="mr-2" size={18} /> +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-pink-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Yuko Beauty Salon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
