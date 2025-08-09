
import React from 'react';

interface ConfigSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 mb-6">{description}</p>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default ConfigSection;
