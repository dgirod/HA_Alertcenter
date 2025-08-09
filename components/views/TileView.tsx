
import React from 'react';

interface AlertItem {
    icon: React.ReactNode;
    title: string;
    message: string;
}

interface TileViewProps {
    alerts: AlertItem[];
}

const TileView: React.FC<TileViewProps> = ({ alerts }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alerts.map((alert, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
                    <div className="mb-3 text-red-500">
                        {React.cloneElement(alert.icon as React.ReactElement, { className: 'h-8 w-8' })}
                    </div>
                    <p className="font-semibold text-slate-800 leading-tight">{alert.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                </div>
            ))}
        </div>
    );
};

export default TileView;
