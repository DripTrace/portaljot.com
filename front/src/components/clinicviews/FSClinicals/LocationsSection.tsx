"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';
import dynamic from 'next/dynamic';
import { FSClinicalsMap } from './FSClinicalsMap';
// import FSClinicalsMap from '../FSClinicalsMap';

const MapPin = dynamic(() => import('lucide-react').then((mod) => mod.MapPin), { ssr: false });
const Phone = dynamic(() => import('lucide-react').then((mod) => mod.Phone), { ssr: false });
const Mail = dynamic(() => import('lucide-react').then((mod) => mod.Mail), { ssr: false });

const locations = [
  {
    city: "Placentia",
    address: "650 N Rose Drive #472, Placentia, CA 92870",
    phone: "(775) 238-3082",
    email: "info@fsclinicals.com",
    encoded: "3312.494856478956!2d-117.84453832366965!3d33.87690702696721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6a888549635%3A0xa78d75b370047cb5!2s650%20N%20Rose%20Dr%20%23472%2C%20Placentia%2C%20CA%2092870!5e0!3m2!1sen!2sus!4v1720074440707",
  },
  {
    city: "Reno",
    address: "100 N Arlington Ave, Suite 340A, Reno, NV 89501",
    phone: "(775) 238-3082",
    email: "info@fsclinicals.com",
    encoded: "3077.5209395169586!2d-119.81923322348412!3d39.525300709411155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809940cb25419537%3A0x60e85be369ace7e8!2s100%20N%20Arlington%20Ave%20%23340a%2C%20Reno%2C%20NV%2089501!5e0!3m2!1sen!2sus!4v1720074308138",
  },
];

const LocationsSection: React.FC = () => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div key={location.city} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-4">{location.city}</h3>
              <div className="flex-grow mb-4 h-64">
                <FSClinicalsMap
                  address={location.address}
                  encoded={location.encoded}
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {location.address}
                </p>
                <p className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <a href={`tel:${location.phone}`} className="cursor-pointer select-auto">
                    {location.phone}
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <a href={`mailto:${location.email}`} className="cursor-pointer select-auto">
                    {location.email}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;


// "use client"

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { FSClinicalsRootState } from '@/store/fsclinicalsStore';
// import dynamic from 'next/dynamic';
// import { FSClinicalsMap } from './FSClinicalsMap';

// const MapPin = dynamic(() => import('lucide-react').then((mod) => mod.MapPin), { ssr: false });
// const Phone = dynamic(() => import('lucide-react').then((mod) => mod.Phone), { ssr: false });
// const Mail = dynamic(() => import('lucide-react').then((mod) => mod.Mail), { ssr: false });

// // const locations = [
// //   {
// //     city: "Placentia",
// //     address: "650 N Rose Drive #472, Placentia, CA 92870",
// //     phone: "(775) 238-3082",
// //     email: "info@fsclinicals.com",
// //     mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-117.85453796386719%2C33.86690703618836%2C-117.83454895019533%2C33.88690703618836&layer=mapnik&marker=33.87690703618836%2C-117.84454345703125",
// //   },
// //   {
// //     city: "Reno",
// //     address: "100 N Arlington Ave, Suite 340A, Reno, NV 89501",
// //     phone: "(775) 238-3082",
// //     email: "info@fsclinicals.com",
// //     mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-119.82923507690431%2C39.51530070941114%2C-119.80924606323242%2C39.53530070941114&layer=mapnik&marker=39.52530070941114%2C-119.81924057006836",
// //   },
// // ];

// const locations = [
//   {
//     city: "Placentia",
//     address: "650 N Rose Drive #472, Placentia, CA 92870",
//     phone: "(775) 238-3082",
//     email: "info@fsclinicals.com",
//     encoded: "3312.494856478956!2d-117.84453832366965!3d33.87690702696721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6a888549635%3A0xa78d75b370047cb5!2s650%20N%20Rose%20Dr%20%23472%2C%20Placentia%2C%20CA%2092870!5e0!3m2!1sen!2sus!4v1720074440707",
//   },
//   {
//     city: "Reno",
//     address: "100 N Arlington Ave, Suite 340A, Reno, NV 89501",
//     phone: "(775) 238-3082",
//     email: "info@fsclinicals.com",
//     encoded: "3077.5209395169586!2d-119.81923322348412!3d39.525300709411155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809940cb25419537%3A0x60e85be369ace7e8!2s100%20N%20Arlington%20Ave%20%23340a%2C%20Reno%2C%20NV%2089501!5e0!3m2!1sen!2sus!4v1720074308138",
//   },
// ];

// const LocationsSection: React.FC = () => {
//   const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

//   return (
//     <section className="py-16 bg-[#D1E0EB]">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12 text-[#0C3C60]">Our Locations</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {locations.map((location) => (
//             <div key={location.city} className={`flex flex-col ${isDarkMode ? 'bg-[#0C3C60] text-[#D1E0EB]' : 'bg-white text-[#494949]'} rounded-lg shadow-lg p-6`}>
//               <h3 className="text-xl font-semibold mb-4">{location.city}</h3>
//               <div className="flex-grow mb-4 h-64">
//                 {/* <FSClinicalsMap
//                   mapUrl={location.mapUrl}
//                   isDarkMode={isDarkMode}
//                 /> */}
//                  <FSClinicalsMap
//                   address={location.address}
//                   encoded={location.encoded}
//                   isDarkMode={isDarkMode}
//                 />
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <p className="flex items-center">
//                   <MapPin size={16} className="mr-2 text-[#1FABC7]" />
//                   {/* <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#1FABC7] transition-colors">
//                     {location.address}
//                   </a> */}
//                    <a href={``} target="_blank" rel="noopener noreferrer" className="hover:text-[#1FABC7] transition-colors">
//                     {location.address}
//                   </a>
//                 </p>
//                 <p className="flex items-center">
//                   <Phone size={16} className="mr-2 text-[#1FABC7]" />
//                   <a href={`tel:${location.phone}`} className="hover:text-[#1FABC7] transition-colors">
//                     {location.phone}
//                   </a>
//                 </p>
//                 <p className="flex items-center">
//                   <Mail size={16} className="mr-2 text-[#1FABC7]" />
//                   <a href={`mailto:${location.email}`} className="hover:text-[#1FABC7] transition-colors">
//                     {location.email}
//                   </a>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LocationsSection;