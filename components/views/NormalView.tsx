
import React from 'react';
import { AlertItem } from '../../types';

interface NormalViewProps {
    alerts: AlertItem[];
}

const NormalView: React.FC<NormalViewProps> = ({ alerts }) => {
    if (alerts.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-lg font-semibold text-slate-700">Alles in Ordnung</h4>
                <p className="text-sm text-slate-500">Keine aktiven Alerts vorhanden.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-3">
            {alerts.map((alert, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-50 rounded-md">
                    <div className="mr-4 text-red-500">
                        {alert.icon}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">{alert.title}</p>
                        <p className="text-sm text-slate-600">{alert.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NormalView;
