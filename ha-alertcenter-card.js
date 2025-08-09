
const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const ICONS = {
  battery_alert: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-1.28-1.28A9 9 0 004.28 17.72L3 19" /></svg>`,
  battery_low: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364M9 12a3 3 0 116 0 3 3 0 01-6 0z" /></svg>`,
  warning: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  info: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  lightbulb: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`,
  bell: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
};

class AlertCenterCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
      _alerts: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this._alerts = [];
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this._config = {
      title: 'Alerts',
      view_mode: 'normal',
      battery_threshold: 20,
      ...config,
      alerts: {
        battery: { enabled: true, icon: 'battery_low', ...config.alerts?.battery },
        problem: { enabled: true, icon: 'warning', ...config.alerts?.problem },
        custom: { enabled: true, icon: 'info', ...config.alerts?.custom },
      },
      entity_filters: config.entity_filters || [],
    };
    
    if (this.hass) {
        this.generateAlerts();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('hass') || changedProperties.has('_config')) {
      this.generateAlerts();
    }
  }

  generateAlerts() {
    if (!this.hass || !this._config) {
      this._alerts = [];
      return;
    }

    const newAlerts = [];
    const entities = Object.values(this.hass.states);

    const excludedEntities = new Set(
        this._config.entity_filters
            .filter(f => f.filter === 'exclude')
            .map(f => f.entity)
    );
    const includedEntities = this._config.entity_filters
        .filter(f => f.filter === 'include')
        .map(f => f.entity);
    
    const filteredEntities = entities.filter(entity => {
        if (excludedEntities.has(entity.entity_id)) {
            return false;
        }
        if (includedEntities.length > 0 && !includedEntities.includes(entity.entity_id)) {
            return false;
        }
        return true;
    });

    // Battery Alerts
    if (this._config.alerts.battery.enabled) {
      filteredEntities.forEach(entity => {
        const batteryLevel = entity.attributes.battery_level ?? entity.attributes.battery;
        if (batteryLevel !== undefined && batteryLevel <= this._config.battery_threshold) {
          newAlerts.push({
            icon: this._config.alerts.battery.icon,
            title: entity.attributes.friendly_name || entity.entity_id,
            message: `Batteriestand niedrig (${batteryLevel}%)`
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
            message: 'Problem: Nicht erreichbar'
          });
        }
      });
    }

    // Custom alerts from config
    if (this._config.alerts.custom.enabled && Array.isArray(this._config.custom_alerts)) {
        this._config.custom_alerts.forEach(alert => {
            newAlerts.push({
                icon: this._config.alerts.custom.icon,
                title: alert.title,
                message: alert.message,
            });
        });
    }


    this._alerts = newAlerts;
  }
  
  _renderNoAlerts() {
    const messages = {
      normal: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: "Alles in Ordnung",
        message: "Keine aktiven Alerts vorhanden."
      },
      compact: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: "Keine Alerts",
        message: ""
      },
      tile: {
        icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: "Alles in Ordnung",
        message: "Keine aktiven Alerts vorhanden."
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
      <ha-card .header=${this._config.title}>
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

customElements.define("alert-center-card", AlertCenterCard);
