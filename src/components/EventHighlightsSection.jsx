import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- UPDATED EVENT DATA (Focused on Logical Team Events from Frolic 2024) ---
// Note: Please update the imagePath values with your actual images for Frolic 2024.
const EVENT_DATA = [
    { title: "", imagePath: "../../eventphotos/1.jpeg", category: "Academic" },
    { title: " ", imagePath: "../../eventphotos/2.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/3.jpeg", category: "Academic" },
    { title: " ", imagePath: "../../eventphotos/4.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/5.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/6.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/7.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/8.jpeg", category: "Academic" },
    { title: "", imagePath:  "../../eventphotos/9.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/10.jpeg", category: "Academic" },
    { title: "", imagePath:  "../../eventphotos/11.jpeg", category: "Academic" },
    { title: "", imagePath:  "../../eventphotos/12.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/13.jpeg", category: "Academic" },
    { title: " ", imagePath:  "../../eventphotos/14.jpeg", category: "Academic" },
];

const SLIDE_INTERVAL = 4000; // 4 seconds auto-slide

// Category color is now only for the main section title styling
const getCategoryColor = (category) => {
    switch (category) {
        case "Academic": return "bg-sky-500";
        default: return "bg-gray-500";
    }
};

export default function EventHighlightsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null); // Ref for scrolling container

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % EVENT_DATA.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    // Scroll the container when currentIndex changes
    useEffect(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            // Ensure element exists before accessing offsetWidth
            const firstChild = containerRef.current.children[0];
            const cardWidth = firstChild.offsetWidth + 24; // Card width (w-80) + gap (space-x-6 -> 24px)
            
            // Calculate the scroll position to center the current item
            const centerOffset = (containerRef.current.offsetWidth / 2) - (cardWidth / 2);
            const scrollLeft = (currentIndex * cardWidth) - centerOffset;
            
            containerRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);


    return (
        <section className="w-full py-16 bg-[#071028] text-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                    🏆 LOGICAL Highlights from Frolic 2024
                </h2>
                
                {/* Event Slider Container */}
                <div 
                    ref={containerRef}
                    className="flex overflow-x-scroll snap-x snap-mandatory space-x-6 pb-4 scrollbar-hide" 
                    style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} // Hides scrollbar
                >
                    {EVENT_DATA.map((event, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-80 h-96 snap-center relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition duration-500 ease-in-out hover:scale-[1.02] cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: index === currentIndex ? 1.05 : 1 }} // Current item has a slight emphasis
                            transition={{ duration: 0.5 }}
                            style={{ transformOrigin: 'center center' }}
                        >
                            {/* Image (Made fully opaque and cover the entire card) */}
                            <img 
                                src={event.imagePath} 
                                alt={event.title} 
                                className="w-full h-full object-cover absolute inset-0 opacity-100" 
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            {/* Content (Only Title is shown prominently) */}
                            <div className="relative p-6 flex flex-col justify-end h-full">
                                <h3 className="text-2xl font-extrabold text-sky-300 leading-tight mb-1">
                                    {event.title}
                                </h3>
                                {/* The description and button elements are REMOVED as requested */}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    {EVENT_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-sky-400 w-6' : 'bg-white/30 hover:bg-white/50'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Custom CSS for hiding scrollbar only on the slider */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </section>
    );
}