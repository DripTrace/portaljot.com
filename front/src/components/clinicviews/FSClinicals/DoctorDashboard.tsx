// components/FSClinicals/DoctorDashboard.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

interface Appointment {
  id: string;
  subject: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: Array<{
    emailAddress: {
      name: string;
      address: string;
    };
  }>;
}

interface PatientRegistration {
  id: string;
  displayName: string;
  emailAddresses: Array<{
    address: string;
  }>;
  mobilePhone: string;
}

const DoctorDashboard: React.FC = () => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recentRegistrations, setRecentRegistrations] = useState<PatientRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/doctor-dashboard/route');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setAppointments(data.appointments);
        setRecentRegistrations(data.recentRegistrations);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-[#0C3C60] text-[#D1E0EB]' : 'bg-[#D1E0EB] text-[#0C3C60]'}`}>
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} className="mb-4 p-4 rounded-lg bg-opacity-20 bg-white">
                <h4 className="font-semibold">{appointment.subject}</h4>
                <p>Start: {new Date(appointment.start.dateTime).toLocaleString()}</p>
                <p>End: {new Date(appointment.end.dateTime).toLocaleString()}</p>
                <p>Patient: {appointment.attendees[0]?.emailAddress.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Patient Registrations</h3>
        {recentRegistrations.length === 0 ? (
          <p>No recent registrations.</p>
        ) : (
          <ul>
            {recentRegistrations.map((registration) => (
              <li key={registration.id} className="mb-4 p-4 rounded-lg bg-opacity-20 bg-white">
                <h4 className="font-semibold">{registration.displayName}</h4>
                <p>Email: {registration.emailAddresses[0]?.address}</p>
                <p>Phone: {registration.mobilePhone}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;