"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import MapSkeleton from "./MapSkeleton";

const locations = [
    {
        city: "Apple Valley",
        address: "18522 Highway 18 Ste. 206, Apple Valley, CA 92307",
        phone: "(760) 946-4664",
        email: "av@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.300956039574!2d-117.24590812333226!3d34.47262639850118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c36d37f8bd9ed9%3A0x14b6713b00f1b416!2s18522%20CA-18%20%23260%2C%20Apple%20Valley%2C%20CA%2092307!5e0!3m2!1sen!2sus!4v1685393124990!5m2!1sen!2sus",
    },
    {
        city: "Colton",
        address: "1007 E Cooley Dr, Ste 109, Colton, CA 92324",
        phone: "(909) 370-4700",
        email: "colton@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.2559241133934!2d-117.3214612233426!3d34.05060392569352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcae1e85e6c59d%3A0x87ed79b2f04362de!2s1007%20E%20Cooley%20Dr%20%23109%2C%20Colton%2C%20CA%2092324!5e0!3m2!1sen!2sus!4v1685393220527!5m2!1sen!2sus",
    },
    {
        city: "Redlands (patients)",
        address: "1200 California St., Redlands, CA 92374",
        phone: "(909) 880-4200",
        email: "llpmg@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0298844045515!2d-117.2280156234117!3d34.068748173150844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcabaa1170bb19%3A0x9219662daa6aec3a!2s1200%20California%20St%2C%20Redlands%2C%20CA%2092374!5e0!3m2!1sen!2sus!4v1726759584659!5m2!1sen!2sus",
    },
    {
        city: "Redlands (admin office)",
        address: "515 New Jersey Streen, Redlands, CA 92374",
        phone: "(909) 792-6262",
        email: "llpmg@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.352870886062!2d-117.22494352341207!3d34.060467473154006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcabad60c3e74b%3A0xfcad2bf5c3e78032!2s515%20New%20Jersey%20St%2C%20Redlands%2C%20CA%2092373!5e0!3m2!1sen!2sus!4v1729795977206!5m2!1sen!2sus",
    },
    {
        city: "Blythe",
        address: "153 S Broadway, Blythe, CA 92225",
        phone: "(760) 922-7322",
        email: "indioblythe@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.8295664557244!2d-114.59847412336166!3d33.61106834747305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d460e05c9bb7f1%3A0x8765cb8b9f1f6eba!2s153%20S%20Broadway%2C%20Blythe%2C%20CA%2092225!5e0!3m2!1sen!2sus!4v1685393323633!5m2!1sen!2sus",
    },
    {
        city: "Indio",
        address: "81880 Doctor Carreon Blvd, Ste C202, Indio, CA 92201",
        phone: "(760) 922-7322",
        email: "indioblythe@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.4059728804644!2d-116.22079972334737!3d33.8218185442915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daf4efa0c74f5b%3A0x70a3a4a91a7d2c44!2s81880%20Dr%20Carreon%20Blvd%20c202%2C%20Indio%2C%20CA%2092201!5e0!3m2!1sen!2sus!4v1685393369978!5m2!1sen!2sus",
    },
    {
        city: "Riverside",
        address: "6000 Camino Real, Riverside, CA 92509",
        phone: "(909) 370-4703",
        email: "colton@lomalindapsych.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.530508059663!2d-117.45367122341459!3d33.97890487318463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb3feb829ea73%3A0x9b7df47ca2d60144!2s6000%20Camino%20Real%2C%20Riverside%2C%20CA%2092509!5e0!3m2!1sen!2sus!4v1727241579582!5m2!1sen!2sus",
    },
];

const Locations: React.FC = () => {
    const [loadedMaps, setLoadedMaps] = useState<boolean[]>(
        new Array(locations.length).fill(false)
    );

    const handleMapLoad = (index: number) => {
        setLoadedMaps((prev) => {
            const newLoadedMaps = [...prev];
            newLoadedMaps[index] = true;
            return newLoadedMaps;
        });
    };

    useEffect(() => {
        const timeouts = locations.map((_, index) =>
            setTimeout(() => handleMapLoad(index), (index + 1) * 1000)
        );

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="relative overflow-x-hidden w-full">
            <div className="fixed top-0 left-0 w-full h-screen z-0">
                <video
                    autoPlay
                    muted
                    loop
                    className="object-cover w-full h-full"
                    src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/9010899-uhd_3840_2160_30fps.mp4?alt=media&token=a87c4f52-1841-4d89-89ed-f27d74228d52"
                >
                    {/* <source
                        src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/9010899-uhd_3840_2160_30fps.mp4?alt=media&token=a87c4f52-1841-4d89-89ed-f27d74228d52"
                        type="video/mp4"
                    /> */}
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-black/50 z-20"></div>
            <div className="relative z-20 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-4 py-8 size-full text-[0.5rem] sm:text-[1.5rem] z-10"
                >
                    <h2 className="text-3xl font-bold dark:text-blue-100 text-blue-800 mb-4 z-10">
                        Our Locations
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10">
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-white/70 dark:bg-gray-700/50 p-6 rounded-lg shadow-md size-full z-10"
                            >
                                <h3 className="text-xl font-semibold mb-2 dark:text-blue-100 text-blue-700 z-10">
                                    {location.city}
                                </h3>
                                <div className="mb-4 w-full h-[200px] relative z-10">
                                    {!loadedMaps[index] && <MapSkeleton />}
                                    <iframe
                                        src={location.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{
                                            border: 0,
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                        }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${location.city} location`}
                                        className={`rounded-md size-full ${loadedMaps[index] ? "opacity-100" : "opacity-0"}`}
                                        onLoad={() => handleMapLoad(index)}
                                    ></iframe>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        location.address
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sm:text-[1rem] text-[0.9rem] flex items-center mb-2 dark:text-blue-100 text-blue-600 dark:hover:text-blue-300 hover:text-blue-800 transition-colors duration-300 z-10"
                                >
                                    <FaMapMarkerAlt className="mr-2 z-10" />
                                    <span className="underline z-10">
                                        {location.address}
                                    </span>
                                </a>
                                <a
                                    href={`tel:${location.phone}`}
                                    className=" sm:text-[1rem] text-[0.9rem] flex items-center mb-2 dark:text-blue-100 text-blue-600 dark:hover:text-blue-300 hover:text-blue-800 transition-colors duration-300 z-10"
                                >
                                    <FaPhone className="mr-2 z-10" />
                                    <span className="underline z-10">
                                        {location.phone}
                                    </span>
                                </a>
                                <a
                                    href={`mailto:${location.email}`}
                                    className=" sm:text-[1rem] text-[0.9rem] flex items-center dark:text-blue-100 text-blue-600 dark:hover:text-blue-300 hover:text-blue-800 transition-colors duration-300 z-10"
                                >
                                    <FaEnvelope className="mr-2 z-10" />
                                    <span className="underline z-10">
                                        {location.email}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Locations;
