// components/FSClinicals/AppointmentStatusUpdate.tsx
"use client"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

interface AppointmentStatusUpdateProps {
  appointmentId: string;
  currentStatus: string;
  onStatusUpdate: (newStatus: string) => void;
}

const AppointmentStatusUpdate: React.FC<AppointmentStatusUpdateProps> = ({ appointmentId, currentStatus, onStatusUpdate }) => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/update-appointment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }

      onStatusUpdate(status);
    } catch (err) {
      setError('An error occurred while updating the appointment status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-[#0C3C60] text-[#D1E0EB]' : 'bg-[#D1E0EB] text-[#0C3C60]'}`}>
      <h3 className="text-xl font-semibold mb-2">Update Appointment Status</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <select
        title="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={`mb-4 p-2 rounded ${isDarkMode ? 'bg-[#1FABC7] text-white' : 'bg-white text-[#0C3C60]'}`}
      >
        <option value="scheduled">Scheduled</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={handleStatusUpdate}
        disabled={isLoading}
        className={`py-2 px-4 ${isDarkMode ? 'bg-[#1FABC7] hover:bg-[#6EA4CE]' : 'bg-[#6EA4CE] hover:bg-[#1FABC7]'} text-white rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Updating...' : 'Update Status'}
      </button>
    </div>
  );
};

export default AppointmentStatusUpdate;