
export enum ViewMode {
  NORMAL = 'normal',
  COMPACT = 'compact',
  TILE = 'tile',
}

export enum AlertType {
  BATTERY = 'battery',
  PROBLEM = 'problem',
  CUSTOM = 'custom',
}

export interface AlertConfig {
  enabled: boolean;
  icon: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'sensor' | 'light' | 'switch' | 'binary_sensor';
  battery?: number;
  problem?: string;
}

export enum EntityFilterType {
    DEFAULT = 'default',
    INCLUDE = 'include',
    EXCLUDE = 'exclude'
}

export interface EntityFilter {
    [entityId: string]: EntityFilterType;
}

export interface AppConfig {
  viewMode: ViewMode;
  batteryThreshold: number;
  alerts: {
    [AlertType.BATTERY]: AlertConfig;
    [AlertType.PROBLEM]: AlertConfig;
    [AlertType.CUSTOM]: AlertConfig;
  };
  entityFilters: EntityFilter;
}
