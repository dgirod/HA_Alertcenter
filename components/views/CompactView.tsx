
import React from 'react';
import { AlertItem } from '../../types';

interface CompactViewProps {
    alerts: AlertItem[];
}

const CompactView: React.FC<CompactViewProps> = ({ alerts }) => {
    if (alerts.length === 0) {
        return (
             <div className="flex items-center justify-center p-6 text-center bg-white rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-md font-semibold text-slate-700">Keine Alerts</h4>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow p-3">
            <ul className="divide-y divide-slate-200">
                {alerts.map((alert, index) => (
                    <li key={index} className="flex items-center py-2">
                        <div className="mr-3 text-red-500 flex-shrink-0">
                             {React.isValidElement(alert.icon) ? React.cloneElement(alert.icon, { className: 'h-5 w-5' }) : alert.icon}
                        </div>
                        <p className="text-sm text-slate-700 truncate" title={`${alert.title}: ${alert.message}`}>
                            <span className="font-semibold">{alert.title}:</span> {alert.message}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompactView;
