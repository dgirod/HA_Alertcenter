
import React from 'react';
import { AppConfig, ViewMode, AlertType, Entity, EntityFilterType } from '../types';
import { ICONS, MOCK_ENTITIES, MOCK_CUSTOM_ALERTS } from '../constants';
import NormalView from './views/NormalView';
import CompactView from './views/CompactView';
import TileView from './views/TileView';

interface PreviewProps {
  config: AppConfig;
}

interface AlertItem {
    icon: React.ReactNode;
    title: string;
    message: string;
}

const Preview: React.FC<PreviewProps> = ({ config }) => {
  const getFilteredEntities = () => {
    const included = MOCK_ENTITIES.filter(e => config.entityFilters[e.id] === EntityFilterType.INCLUDE);
    const notExplicitlyExcluded = MOCK_ENTITIES.filter(e => config.entityFilters[e.id] !== EntityFilterType.EXCLUDE);
    const defaultSet = notExplicitlyExcluded.filter(e => config.entityFilters[e.id] === EntityFilterType.DEFAULT || !config.entityFilters[e.id]);

    const finalSet = new Set([...included, ...defaultSet]);
    return Array.from(finalSet);
  };

  const generateAlerts = (): AlertItem[] => {
    const alerts: AlertItem[] = [];
    const entities = getFilteredEntities();
    
    // Battery Alerts
    if (config.alerts.battery.enabled) {
        entities.forEach(entity => {
            if (entity.battery !== undefined && entity.battery <= config.batteryThreshold) {
                alerts.push({
                    icon: ICONS[config.alerts.battery.icon],
                    title: entity.name,
                    message: `Batteriestand niedrig (${entity.battery}%)`
                });
            }
        });
    }

    // Problem Alerts
    if (config.alerts.problem.enabled) {
        entities.forEach(entity => {
            if (entity.problem) {
                alerts.push({
                    icon: ICONS[config.alerts.problem.icon],
                    title: entity.name,
                    message: `Problem: ${entity.problem}`
                });
            }
        });
    }

    // Custom Alerts (mocked)
    if (config.alerts.custom.enabled) {
        MOCK_CUSTOM_ALERTS.forEach(alert => {
            alerts.push({
                icon: ICONS[config.alerts.custom.icon],
                title: alert.name,
                message: alert.message
            });
        });
    }
    
    return alerts;
  };
  
  const alerts = generateAlerts();

  const renderView = () => {
    switch(config.viewMode) {
      case ViewMode.NORMAL:
        return <NormalView alerts={alerts} />;
      case ViewMode.COMPACT:
        return <CompactView alerts={alerts} />;
      case ViewMode.TILE:
        return <TileView alerts={alerts} />;
      default:
        return <NormalView alerts={alerts} />;
    }
  }

  return (
    <div className="sticky top-24">
       <h2 className="text-2xl font-bold text-slate-800 mb-4">Live-Vorschau</h2>
       <div className="bg-slate-200 p-4 sm:p-6 rounded-xl">
            {renderView()}
       </div>
    </div>
  );
};

export default Preview;
