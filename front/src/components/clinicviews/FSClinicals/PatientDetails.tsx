// components/FSClinicals/PatientDetails.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FSClinicalsRootState } from '@/store/fsclinicalsStore';

interface Patient {
  id: string;
  displayName: string;
  emailAddresses: Array<{ address: string }>;
  mobilePhone: string;
  birthday?: string;
  addresses?: Array<{ street: string; city: string; state: string; countryOrRegion: string; postalCode: string }>;
}

interface Appointment {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`/api/patient-details?id=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }
        const data = await response.json();
        setPatient(data.patient);
        setAppointments(data.appointments);
      } catch (err) {
        setError('Failed to load patient details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient data found</div>;

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-[#0C3C60] text-[#D1E0EB]' : 'bg-[#D1E0EB] text-[#0C3C60]'}`}>
      <h2 className="text-2xl font-bold mb-4">{patient.displayName}</h2>
      <div className="mb-6">
        <p>Email: {patient.emailAddresses[0]?.address}</p>
        <p>Phone: {patient.mobilePhone}</p>
        {patient.birthday && <p>Birthday: {new Date(patient.birthday).toLocaleDateString()}</p>}
        {patient.addresses && patient.addresses[0] && (
          <p>Address: {`${patient.addresses[0].street}, ${patient.addresses[0].city}, ${patient.addresses[0].state} ${patient.addresses[0].postalCode}`}</p>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">Recent Appointments</h3>
      {appointments.length === 0 ? (
        <p>No recent appointments</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="mb-2">
              <p>{appointment.subject}</p>
              <p>{new Date(appointment.start.dateTime).toLocaleString()} - {new Date(appointment.end.dateTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetails;