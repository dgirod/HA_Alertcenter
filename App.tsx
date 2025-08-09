
import React, { useState, useCallback } from 'react';
import { AppConfig, ViewMode, AlertType, EntityFilter, EntityFilterType } from './types';
import { ICONS } from './constants';
import Header from './components/Header';
import ConfigSection from './components/ConfigSection';
import Slider from './components/Slider';
import Preview from './components/Preview';
import EntityManagement from './components/EntityManagement';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>({
    viewMode: ViewMode.NORMAL,
    batteryThreshold: 20,
    alerts: {
      [AlertType.BATTERY]: { enabled: true, icon: 'battery_low' },
      [AlertType.PROBLEM]: { enabled: true, icon: 'warning' },
      [AlertType.CUSTOM]: { enabled: false, icon: 'info' },
    },
    entityFilters: {},
  });

  const handleUpdate = <T extends keyof AppConfig,>(key: T, value: AppConfig[T]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAlertConfigChange = <T extends keyof AppConfig['alerts'][AlertType],>(alertType: AlertType, key: T, value: AppConfig['alerts'][AlertType][T]) => {
      setConfig(prev => ({
          ...prev,
          alerts: {
              ...prev.alerts,
              [alertType]: {
                  ...prev.alerts[alertType],
                  [key]: value,
              }
          }
      }));
  };

  const handleEntityFilterChange = useCallback((entityId: string, filterType: EntityFilterType) => {
    setConfig(prev => {
        const newFilters = { ...prev.entityFilters };
        if (filterType === EntityFilterType.DEFAULT) {
            delete newFilters[entityId];
        } else {
            newFilters[entityId] = filterType;
        }
        return { ...prev, entityFilters: newFilters };
    });
  }, []);

  const IconPicker: React.FC<{ selected: string, onSelect: (icon: string) => void }> = ({ selected, onSelect }) => (
    <div className="flex flex-wrap gap-2">
      {Object.keys(ICONS).map(iconKey => (
        <button
          key={iconKey}
          onClick={() => onSelect(iconKey)}
          className={`p-2 rounded-lg border-2 transition-all ${selected === iconKey ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-500' : 'border-slate-300 bg-slate-50 hover:border-blue-400'}`}
        >
          <div className="h-6 w-6 text-slate-700">{ICONS[iconKey]}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Configuration Column */}
          <div>
            <ConfigSection
              title="Darstellungsoptionen"
              description="Wählen Sie aus, wie die Alerts in Home Assistant angezeigt werden sollen."
            >
              <div className="flex space-x-2 rounded-xl bg-slate-200 p-1">
                {(Object.values(ViewMode)).map(mode => (
                  <button
                    key={mode}
                    onClick={() => handleUpdate('viewMode', mode)}
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all ${config.viewMode === mode ? 'bg-white shadow text-blue-700' : 'text-slate-700 hover:bg-white/[0.5]'}`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </ConfigSection>

            <ConfigSection
              title="Alert-Typen"
              description="Konfigurieren Sie die verschiedenen Arten von Alerts, die angezeigt werden sollen."
            >
                {/* Battery Alert */}
                <div className="border-t border-slate-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-slate-800">Batterie-Warnungen</h4>
                        <input type="checkbox" className="toggle-checkbox h-6 w-6 rounded text-blue-600 focus:ring-blue-500" checked={config.alerts.battery.enabled} onChange={e => handleAlertConfigChange(AlertType.BATTERY, 'enabled', e.target.checked)} />
                    </div>
                    {config.alerts.battery.enabled && (
                        <div className="space-y-6 pl-2 border-l-2 border-slate-200 ml-1">
                            <div className="pl-5">
                                <Slider 
                                    label="Warnschwelle für Batteriestand"
                                    value={config.batteryThreshold}
                                    onChange={e => handleUpdate('batteryThreshold', parseInt(e.target.value, 10))}
                                />
                            </div>
                             <div className="pl-5">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Icon auswählen</label>
                                <IconPicker selected={config.alerts.battery.icon} onSelect={icon => handleAlertConfigChange(AlertType.BATTERY, 'icon', icon)} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Other Alerts */}
                {(Object.values(AlertType)).filter(t => t !== AlertType.BATTERY).map((type) => (
                    <div key={type} className="border-t border-slate-200 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-800 capitalize">{type === 'problem' ? 'Entitäten-Probleme' : 'Benutzerdefinierte Alerts'}</h4>
                            <input type="checkbox" className="toggle-checkbox h-6 w-6 rounded text-blue-600 focus:ring-blue-500" checked={config.alerts[type].enabled} onChange={e => handleAlertConfigChange(type, 'enabled', e.target.checked)} />
                        </div>
                        {config.alerts[type].enabled && (
                            <div className="pl-2 border-l-2 border-slate-200 ml-1">
                                <div className="pl-5">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Icon auswählen</label>
                                    <IconPicker selected={config.alerts[type].icon} onSelect={icon => handleAlertConfigChange(type, 'icon', icon)} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </ConfigSection>

            <ConfigSection
              title="Entitäten-Filter"
              description="Wählen Sie explizit Entitäten aus, die ein- oder ausgeschlossen werden sollen. 'Standard' berücksichtigt die globalen Einstellungen."
            >
                <EntityManagement filters={config.entityFilters} onFilterChange={handleEntityFilterChange} />
            </ConfigSection>
          </div>
          
          {/* Preview Column */}
          <div>
            <Preview config={config} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
