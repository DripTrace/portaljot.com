// components/FSClinicals/AppointmentSuggestion.tsx
"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

interface AppointmentData {
  date: string;
  time: string;
}

interface AppointmentSuggestionProps {
  appointmentData: AppointmentData;
  onAppointmentChange: (data: AppointmentData) => void;
}

const AppointmentSuggestion: React.FC<AppointmentSuggestionProps> = ({ appointmentData, onAppointmentChange }) => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onAppointmentChange({ ...appointmentData, [name]: value });
  };

  return (
    <div className={`mb-4 ${isDarkMode ? 'text-[#D1E0EB]' : 'text-[#494949]'}`}>
      <h3 className="text-xl font-semibold mb-2">Suggest an Appointment</h3>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={appointmentData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-[#494949]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-2">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={appointmentData.time}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-[#494949]"
        />
      </div>
    </div>
  );
};

export default AppointmentSuggestion;