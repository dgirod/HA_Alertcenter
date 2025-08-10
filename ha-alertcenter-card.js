const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

// --- ICONS ---
const ICONS = {
  battery_alert: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-1.28-1.28A9 9 0 004.28 17.72L3 19" /></svg>`,
  battery_low: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364M9 12a3 3 0 116 0 3 3 0 01-6 0z" /></svg>`,
  warning: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  info: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  lightbulb: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`,
  bell: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
};
const ICON_KEYS = Object.keys(ICONS);
const MDI_DELETE_PATH = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4Z";

class AlertCenterCard extends LitElement {

  // --- INTERNAL PROPERTIES ---
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
      _alerts: { type: Array, state: true },
    };
  }

  // --- TRANSLATIONS ---
  static get translations() {
    return {
      'en': {
        'card.title_default': 'Alert Center',
        'card.description': 'A card to display battery, problem, and custom alerts.',
        'no_alerts.normal.title': 'All Clear',
        'no_alerts.normal.message': 'No active alerts.',
        'no_alerts.compact.title': 'No Alerts',
        'battery_alert.message': 'Battery level low ({level}%)',
        'problem_alert.message': 'Problem: Unavailable',
        'editor.title': 'Title (Optional)',
        'editor.view_mode': 'View Mode',
        'editor.view_mode.normal': 'Normal',
        'editor.view_mode.compact': 'Compact',
        'editor.view_mode.tile': 'Tile',
        'editor.alert_types_title': 'Alert Types',
        'editor.alert_types.battery': 'Battery Warnings',
        'editor.alert_types.problem': 'Entity Problems',
        'editor.alert_types.custom': 'Custom Alerts',
        'editor.battery_threshold': 'Warning Threshold: {value}%',
        'editor.icon': 'Icon',
        'editor.custom_alerts_title': 'Custom Alerts',
        'editor.custom_alerts.title': 'Title',
        'editor.custom_alerts.message': 'Message',
        'editor.custom_alerts.add': 'Add Alert',
        'editor.entity_filters_title': 'Entity Filters',
        'editor.entity_filters.filter': 'Filter',
        'editor.entity_filters.include': 'Include',
        'editor.entity_filters.exclude': 'Exclude',
        'editor.entity_filters.add': 'Add Filter',
      },
      'de': {
        'card.title_default': 'Alert Center',
        'card.description': 'Eine Karte zur Anzeige von Batterie-, Problem- und benutzerdefinierten Alerts.',
        'no_alerts.normal.title': 'Alles in Ordnung',
        'no_alerts.normal.message': 'Keine aktiven Alerts vorhanden.',
        'no_alerts.compact.title': 'Keine Alerts',
        'battery_alert.message': 'Batteriestand niedrig ({level}%)',
        'problem_alert.message': 'Problem: Nicht erreichbar',
        'editor.title': 'Titel (Optional)',
        'editor.view_mode': 'Ansichtsmodus',
        'editor.view_mode.normal': 'Normal',
        'editor.view_mode.compact': 'Kompakt',
        'editor.view_mode.tile': 'Kachel',
        'editor.alert_types_title': 'Alert-Typen',
        'editor.alert_types.battery': 'Batterie-Warnungen',
        'editor.alert_types.problem': 'Entitäten-Probleme',
        'editor.alert_types.custom': 'Benutzerdefinierte Alerts',
        'editor.battery_threshold': 'Warnschwelle: {value}%',
        'editor.icon': 'Icon',
        'editor.custom_alerts_title': 'Benutzerdefinierte Alerts',
        'editor.custom_alerts.title': 'Titel',
        'editor.custom_alerts.message': 'Nachricht',
        'editor.custom_alerts.add': 'Alert hinzufügen',
        'editor.entity_filters_title': 'Entitäten-Filter',
        'editor.entity_filters.filter': 'Filter',
        'editor.entity_filters.include': 'Einschließen',
        'editor.entity_filters.exclude': 'Ausschließen',
        'editor.entity_filters.add': 'Filter hinzufügen',
      }
    }
  }

  localize(stringKey, search = '', replace = '') {
      const lang = this.hass?.locale?.language || 'en';
      const translations = AlertCenterCard.translations;
      let translated = translations[lang]?.[stringKey] || translations['en']?.[stringKey] || stringKey;

      if (search && replace) {
          translated = translated.replace(search, replace);
      }
      return translated;
  }
  
  // --- CORE LIFECYCLE ---
  static async getConfigElement() {
    return document.createElement("alert-center-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Alert Center",
      view_mode: "normal",
      battery_threshold: 20,
      alerts: {
        battery: { enabled: true, icon: "battery_low" },
        problem: { enabled: true, icon: "warning" },
        custom: { enabled: false, icon: "info" },
      },
      entity_filters: [],
      custom_alerts: [],
    };
  }

  constructor() {
    super();
    this._alerts = [];
  }
  
  _deepMerge(target, source) {
    const output = { ...target };
    if (this._isObject(target) && this._isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this._isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this._deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  _isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    
    const defaultConfig = AlertCenterCard.getStubConfig();
    this._config = this._deepMerge(defaultConfig, config);
    
    if (this.hass) {
        this.generateAlerts();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('hass') || changedProperties.has('_config')) {
      this.generateAlerts();
    }
  }

  // --- ALERT GENERATION LOGIC ---
  generateAlerts() {
    if (!this.hass || !this._config) {
      this._alerts = [];
      return;
    }

    const newAlerts = [];
    
    // --- This is the new, robust filtering logic ---
    const allEntities = Object.values(this.hass.states);
    const validFilters = this._config.entity_filters?.filter(f => f.entity && f.filter) || [];
    
    // 1. Get lists of entities to specifically include or exclude.
    const includedEntityIds = validFilters
        .filter(f => f.filter === 'include')
        .map(f => f.entity);
        
    const excludedEntityIds = new Set(
        validFilters
            .filter(f => f.filter === 'exclude')
            .map(f => f.entity)
    );

    let baseEntities;

    // 2. Determine the base list of entities to check.
    // If an 'include' list exists, we ONLY check entities on that list.
    if (includedEntityIds.length > 0) {
        baseEntities = allEntities.filter(entity => includedEntityIds.includes(entity.entity_id));
    } else {
        // Otherwise, we start with all entities in Home Assistant.
        baseEntities = allEntities;
    }

    // 3. From this base list, remove any excluded entities.
    const filteredEntities = baseEntities.filter(entity => !excludedEntityIds.has(entity.entity_id));
    
    // --- Generate alerts from the correctly filtered list ---
    
    // Battery Alerts
    if (this._config.alerts.battery.enabled) {
      filteredEntities.forEach(entity => {
        const batteryLevel = entity.attributes.battery_level ?? entity.attributes.battery;
        if (batteryLevel !== undefined && batteryLevel <= this._config.battery_threshold) {
          newAlerts.push({
            icon: this._config.alerts.battery.icon,
            title: entity.attributes.friendly_name || entity.entity_id,
            message: this.localize('battery_alert.message', '{level}', batteryLevel)
          });
        }
      });
    }

    // Problem Alerts
    if (this._config.alerts.problem.enabled) {
      filteredEntities.forEach(entity => {
        if (entity.state === 'unavailable' || entity.state === 'unknown') {
          newAlerts.push({
            icon: this._config.alerts.problem.icon,
            title: entity.attributes.friendly_name || entity.entity_id,
            message: this.localize('problem_alert.message')
          });
        }
      });
    }

    // Custom alerts from config
    if (this._config.alerts.custom.enabled && Array.isArray(this._config.custom_alerts)) {
        this._config.custom_alerts.forEach(alert => {
            if (alert.title && alert.message) {
                newAlerts.push({
                    icon: this._config.alerts.custom.icon,
                    title: alert.title,
                    message: alert.message,
                });
            }
        });
    }

    this._alerts = newAlerts;
  }
  
  // --- RENDER METHODS ---
  _renderNoAlerts() {
    const messages = {
      normal: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: this.localize('no_alerts.normal.title'),
        message: this.localize('no_alerts.normal.message'),
      },
      compact: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: this.localize('no_alerts.compact.title'),
        message: ""
      },
      tile: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: this.localize('no_alerts.normal.title'),
        message: this.localize('no_alerts.normal.message'),
      }
    }
    const view = this._config.view_mode;
    const msg = messages[view];
    
    return html`
      <div class="no-alerts ${view}">
        <div class="icon-wrapper green">${msg.icon}</div>
        <h4>${msg.title}</h4>
        ${msg.message ? html`<p>${msg.message}</p>`: ''}
      </div>
    `;
  }

  _renderNormalView() {
    return html`
      <div class="view-wrapper normal-view">
        ${this._alerts.map(alert => html`
          <div class="alert-item">
            <div class="icon-wrapper red">${ICONS[alert.icon]}</div>
            <div class="text-wrapper">
              <p class="title">${alert.title}</p>
              <p class="message">${alert.message}</p>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _renderCompactView() {
    return html`
      <div class="view-wrapper compact-view">
        <ul>
          ${this._alerts.map(alert => html`
            <li>
              <div class="icon-wrapper red compact">${ICONS[alert.icon]}</div>
              <p class="message" title="${alert.title}: ${alert.message}">
                <span class="title">${alert.title}:</span> ${alert.message}
              </p>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

  _renderTileView() {
    return html`
      <div class="view-wrapper tile-view">
        ${this._alerts.map(alert => html`
          <div class="alert-item">
            <div class="icon-wrapper red tile">${ICONS[alert.icon]}</div>
            <p class="title">${alert.title}</p>
            <p class="message">${alert.message}</p>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    let content;
    if (this._alerts.length === 0) {
        content = this._renderNoAlerts();
    } else {
        switch (this._config.view_mode) {
            case 'compact':
                content = this._renderCompactView();
                break;
            case 'tile':
                content = this._renderTileView();
                break;
            default:
                content = this._renderNormalView();
        }
    }

    return html`
      <ha-card .header=${this._config.title || this.localize('card.title_default')}>
        <div class="card-content">
          ${content}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    if (this._alerts.length === 0) return 2;
    switch (this._config.view_mode) {
      case 'compact':
        return Math.ceil(this._alerts.length / 3) + 1;
      case 'tile':
         return Math.ceil(this._alerts.length / 2) * 2 + 1;
      default:
        return this._alerts.length + 1;
    }
  }

  // --- STYLES ---
  static get styles() {
    return css`
      .card-content {
        padding: 16px;
      }
      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-wrapper.red svg {
        color: var(--red-color, #f44336);
      }
      .icon-wrapper.green svg {
        color: var(--green-color, #4caf50);
      }
      .icon-wrapper svg {
        width: 24px;
        height: 24px;
      }

      /* No Alerts View */
      .no-alerts {
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
        color: var(--primary-text-color);
      }
      .no-alerts .icon-wrapper svg {
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
      }
      .no-alerts h4 {
        font-size: 1.1em;
        font-weight: 500;
        margin: 0;
      }
      .no-alerts p {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin: 4px 0 0;
      }
      .no-alerts.compact {
        flex-direction: row;
        justify-content: flex-start;
      }
      .no-alerts.compact .icon-wrapper svg {
        width: 32px;
        height: 32px;
        margin-right: 12px;
        margin-bottom: 0;
      }

      /* Normal View */
      .normal-view .alert-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background-color: var(--primary-background-color, #fafafa);
        border-radius: 6px;
      }
      .normal-view .alert-item:not(:last-child) {
        margin-bottom: 12px;
      }
      .normal-view .icon-wrapper {
        margin-right: 16px;
      }
      .normal-view .text-wrapper .title {
        font-weight: 500;
        margin: 0;
        color: var(--primary-text-color);
      }
      .normal-view .text-wrapper .message {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin: 2px 0 0;
      }

      /* Compact View */
      .compact-view ul {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .compact-view li {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .compact-view .icon-wrapper.compact svg {
        width: 20px;
        height: 20px;
      }
      .compact-view .icon-wrapper {
        margin-right: 12px;
        flex-shrink: 0;
      }
      .compact-view .message {
        font-size: 0.9em;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--primary-text-color);
      }
      .compact-view .title {
        font-weight: 500;
      }

      /* Tile View */
      .tile-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
      }
      .tile-view .alert-item {
        background-color: var(--card-background-color, #fff);
        border-radius: 8px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .tile-view .icon-wrapper.tile svg {
        width: 32px;
        height: 32px;
      }
      .tile-view .icon-wrapper {
        margin-bottom: 12px;
      }
      .tile-view .title {
        font-weight: 500;
        line-height: 1.2;
        margin: 0;
        color: var(--primary-text-color);
      }
      .tile-view .message {
        font-size: 0.9em;
        margin-top: 4px;
        color: var(--secondary-text-color);
      }
    `;
  }
}

class AlertCenterCardEditor extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            _config: { type: Object, state: true },
        };
    }
    
    // Use the main card's localization function
    get _localize() {
        return AlertCenterCard.prototype.localize.bind(this);
    }

    setConfig(config) {
        this._config = config;
    }

    // Helper to safely set nested values in the config object.
    _setValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((a, b) => a[b] = a[b] || {}, obj);
        lastObj[lastKey] = value;
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        
        const { target } = ev;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked;
        }

        if (target.configValue) {
           this._setValue(newConfig, target.configValue, value);
        }
        
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: newConfig } }));
    }

    _handleListChange(listName, index, key, value) {
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const newList = [...(newConfig[listName] || [])];
        newList[index] = { ...newList[index], [key]: value };
        newConfig[listName] = newList;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: newConfig } }));
    }

    _addListItem(listName, newItem) {
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const newList = [...(newConfig[listName] || []), newItem];
        newConfig[listName] = newList;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: newConfig } }));
    }

    _removeListItem(listName, index) {
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const newList = [...(newConfig[listName] || [])];
        newList.splice(index, 1);
        newConfig[listName] = newList;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: newConfig } }));
    }

    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const alertTypes = [
            { key: "battery", name: this._localize('editor.alert_types.battery') },
            { key: "problem", name: this._localize('editor.alert_types.problem') },
            { key: "custom", name: this._localize('editor.alert_types.custom') },
        ];
        
        return html`
            <div class="card-config">
                <ha-textfield
                    label=${this._localize('editor.title')}
                    .value=${this._config.title || ""}
                    .configValue=${"title"}
                    @change=${this._valueChanged}
                ></ha-textfield>

                <ha-select
                    label=${this._localize('editor.view_mode')}
                    .value=${this._config.view_mode || 'normal'}
                    .configValue=${'view_mode'}
                    @selected=${this._valueChanged}
                    @closed=${(ev) => ev.stopPropagation()}
                >
                    <mwc-list-item value="normal">${this._localize('editor.view_mode.normal')}</mwc-list-item>
                    <mwc-list-item value="compact">${this._localize('editor.view_mode.compact')}</mwc-list-item>
                    <mwc-list-item value="tile">${this._localize('editor.view_mode.tile')}</mwc-list-item>
                </ha-select>
                
                <div class="section-title">${this._localize('editor.alert_types_title')}</div>
                ${alertTypes.map(type => html`
                    <div class="alert-type-config">
                        <div class="alert-header">
                            <label>${type.name}</label>
                            <ha-switch
                                .checked=${this._config.alerts?.[type.key]?.enabled !== false}
                                .configValue=${`alerts.${type.key}.enabled`}
                                @change=${this._valueChanged}
                            ></ha-switch>
                        </div>
                        ${this._config.alerts?.[type.key]?.enabled !== false ? html`
                            <div class="alert-options">
                                ${type.key === 'battery' ? html`
                                    <div class="slider-container">
                                        <label>${this._localize('editor.battery_threshold', '{value}', this._config.battery_threshold || 20)}</label>
                                        <ha-slider
                                            min="0"
                                            max="100"
                                            step="1"
                                            pin
                                            .value=${this._config.battery_threshold || 20}
                                            .configValue=${'battery_threshold'}
                                            @change=${this._valueChanged}
                                        ></ha-slider>
                                    </div>
                                ` : ''}
                                <ha-select
                                    label=${this._localize('editor.icon')}
                                    .value=${this._config.alerts?.[type.key]?.icon}
                                    .configValue=${`alerts.${type.key}.icon`}
                                    @selected=${this._valueChanged}
                                    @closed=${(ev) => ev.stopPropagation()}
                                >
                                    ${ICON_KEYS.map(icon => html`<mwc-list-item value=${icon}>${icon}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        ` : ''}
                    </div>
                `)}
                
                <div class="section-title">${this._localize('editor.custom_alerts_title')}</div>
                ${(this._config.custom_alerts || []).map((alert, index) => html`
                    <div class="list-item">
                        <ha-textfield
                            label=${this._localize('editor.custom_alerts.title')}
                            .value=${alert.title}
                            @change=${e => this._handleListChange('custom_alerts', index, 'title', e.target.value)}
                        ></ha-textfield>
                        <ha-textfield
                            label=${this._localize('editor.custom_alerts.message')}
                            .value=${alert.message}
                            @change=${e => this._handleListChange('custom_alerts', index, 'message', e.target.value)}
                        ></ha-textfield>
                        <ha-icon-button .path=${MDI_DELETE_PATH} @click=${() => this._removeListItem('custom_alerts', index)}></ha-icon-button>
                    </div>
                `)}
                <mwc-button @click=${() => this._addListItem('custom_alerts', {title: '', message: ''})}>${this._localize('editor.custom_alerts.add')}</mwc-button>
                
                <div class="section-title">${this._localize('editor.entity_filters_title')}</div>
                ${(this._config.entity_filters || []).map((filter, index) => html`
                    <div class="list-item">
                         <ha-entity-picker
                            .hass=${this.hass}
                            .value=${filter.entity}
                            @value-changed=${e => this._handleListChange('entity_filters', index, 'entity', e.detail.value)}
                         ></ha-entity-picker>
                         <ha-select
                            label=${this._localize('editor.entity_filters.filter')}
                            .value=${filter.filter}
                            @selected=${e => this._handleListChange('entity_filters', index, 'filter', e.target.value)}
                            @closed=${(ev) => ev.stopPropagation()}
                         >
                            <mwc-list-item value="include">${this._localize('editor.entity_filters.include')}</mwc-list-item>
                            <mwc-list-item value="exclude">${this._localize('editor.entity_filters.exclude')}</mwc-list-item>
                         </ha-select>
                        <ha-icon-button .path=${MDI_DELETE_PATH} @click=${() => this._removeListItem('entity_filters', index)}></ha-icon-button>
                    </div>
                `)}
                 <mwc-button @click=${() => this._addListItem('entity_filters', {entity: '', filter: 'exclude'})}>${this._localize('editor.entity_filters.add')}</mwc-button>
            </div>
        `;
    }

    static get styles() {
        return css`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .section-title {
                margin-top: 8px;
                font-size: 1.2em;
                font-weight: 500;
                border-bottom: 1px solid var(--divider-color);
                padding-bottom: 8px;
            }
            .alert-type-config {
                border: 1px solid var(--divider-color);
                padding: 12px;
                border-radius: 8px;
            }
            .alert-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 500;
            }
            .alert-options {
                padding-top: 12px;
                margin-top: 12px;
                border-top: 1px solid var(--divider-color);
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .slider-container {
                display: flex;
                flex-direction: column;
            }
            .list-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .list-item ha-textfield, .list-item ha-entity-picker, .list-item ha-select {
                flex-grow: 1;
            }
        `;
    }
}

if (!customElements.get("alert-center-card-editor")) {
  customElements.define("alert-center-card-editor", AlertCenterCardEditor);
}

if (!customElements.get("alert-center-card")) {
  customElements.define("alert-center-card", AlertCenterCard);
  // This is for legacy support and card picker.
  const card = document.createElement('alert-center-card');
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "alert-center-card",
    name: card.localize('card.title_default'),
    description: card.localize('card.description'),
  });
}
