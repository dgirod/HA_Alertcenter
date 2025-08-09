class AlertCenterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!this.shadowRoot) {
      return;
    }

    // Clean previous content
    this.shadowRoot.innerHTML = '';

    const card = document.createElement('ha-card');
    const content = document.createElement('div');
    content.style.padding = '16px';

    if (!config) {
      card.header = 'Alert Center Fehler';
      content.innerHTML = 'Error: Bitte geben Sie eine Konfiguration an.';
      card.appendChild(content);
      this.shadowRoot.appendChild(card);
      return;
    }

    card.header = config.title || 'Alert Center';
    content.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; margin-right: 8px; color: var(--primary-color);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p style="margin: 0;"><strong>Alert Center Card erfolgreich installiert!</strong></p>
      </div>
      <p>Dies ist eine Platzhalter-Karte. Die volle Funktionalität basierend auf dem Konfigurator ist noch nicht implementiert.</p>
      <p>Ihre aktuelle Konfiguration:</p>
      <pre style="background-color: var(--secondary-background-color); padding: 8px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(config, null, 2)}</pre>
    `;
    card.appendChild(content);
    this.shadowRoot.appendChild(card);
  }

  getCardSize() {
    return 3;
  }
}

// Register the custom element with Home Assistant
customElements.define('alert-center-card', AlertCenterCard);

// Add to the list of available cards in the UI
window.customCards = window.customCards || [];
window.customCards.push({
  type: "alert-center-card",
  name: "Alert Center Card",
  preview: true,
  description: "Eine Karte zur Anzeige von Batterie-, Problem- und benutzerdefinierten Warnungen."
});
