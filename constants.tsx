
import React from 'react';
import { Entity } from './types';

export const ICONS: { [key: string]: React.ReactNode } = {
  'battery_alert': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-1.28-1.28A9 9 0 004.28 17.72L3 19" /></svg>,
  'battery_low': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364M9 12a3 3 0 116 0 3 3 0 01-6 0z" /></svg>,
  'warning': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  'info': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'lightbulb': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  'bell': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
};

export const MOCK_ENTITIES: Entity[] = [
  { id: 'sensor.wohnzimmer_thermostat_batterie', name: 'Wohnzimmer Thermostat', type: 'sensor', battery: 15 },
  { id: 'binary_sensor.eingangstur_kontakt', name: 'Eingangstür Kontakt', type: 'binary_sensor', battery: 88 },
  { id: 'light.kucheninsel', name: 'Kücheninsel Licht', type: 'light' },
  { id: 'sensor.buro_multisensor_luftqualitat', name: 'Büro Multisensor', type: 'sensor', problem: 'Kalibrierung erforderlich' },
  { id: 'switch.kaffeemaschine', name: 'Kaffeemaschine', type: 'switch' },
  { id: 'sensor.garten_bodenfeuchtigkeit', name: 'Garten Bodenfeuchtigkeit', type: 'sensor', battery: 5 },
  { id: 'light.schlafzimmer_nachttisch', name: 'Schlafzimmer Nachttisch', type: 'light', problem: 'Nicht erreichbar' },
  { id: 'binary_sensor.garagentor', name: 'Garagentor', type: 'binary_sensor', battery: 95 },
  { id: 'switch.tv_steckdose', name: 'TV Steckdose', type: 'switch', problem: 'Überlastung erkannt' },
];

export const MOCK_CUSTOM_ALERTS = [
    { id: 'custom.1', name: 'Wartung der Heizung fällig', message: 'Die jährliche Wartung ist in 2 Wochen fällig.' },
    { id: 'custom.2', name: 'Pflanzen gießen', message: 'Die Monstera im Wohnzimmer braucht Wasser.' }
];
