// src/utils/indexedDB.ts
import { openDB, DBSchema } from 'idb';

interface FSClinicalsDB extends DBSchema {
  patients: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  };
  appointments: {
    key: string;
    value: {
      id: string;
      patientId: string;
      date: string;
      time: string;
      status: 'suggested' | 'confirmed' | 'cancelled';
    };
  };
}

const dbPromise = openDB<FSClinicalsDB>('fsclinicals-db', 1, {
  upgrade(db) {
    db.createObjectStore('patients', { keyPath: 'id' });
    db.createObjectStore('appointments', { keyPath: 'id' });
  },
});

export async function addPatient(patient: FSClinicalsDB['patients']['value']) {
  return (await dbPromise).add('patients', patient);
}

export async function getPatient(id: string) {
  return (await dbPromise).get('patients', id);
}

export async function addAppointment(appointment: FSClinicalsDB['appointments']['value']) {
  return (await dbPromise).add('appointments', appointment);
}

export async function getAppointment(id: string) {
  return (await dbPromise).get('appointments', id);
}