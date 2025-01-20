// components/FSClinicals/PatientSearch.tsx
"use client"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

interface Patient {
  id: string;
  displayName: string;
  emailAddresses: Array<{ address: string }>;
  mobilePhone: string;
}

const PatientSearch: React.FC = () => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/patient-search/route?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search patients');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('An error occurred while searching patients. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-[#0C3C60] text-[#D1E0EB]' : 'bg-[#D1E0EB] text-[#0C3C60]'}`}>
      <h2 className="text-2xl font-bold mb-4">Patient Search</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients..."
          className="flex-grow p-2 rounded-l text-[#0C3C60]"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`py-2 px-4 ${isDarkMode ? 'bg-[#1FABC7] hover:bg-[#6EA4CE]' : 'bg-[#6EA4CE] hover:bg-[#1FABC7]'} text-white rounded-r`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {searchResults.map((patient) => (
          <div key={patient.id} className="mb-4 p-4 rounded-lg bg-opacity-20 bg-white">
            <h3 className="font-semibold">{patient.displayName}</h3>
            <p>Email: {patient.emailAddresses[0]?.address}</p>
            <p>Phone: {patient.mobilePhone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientSearch;