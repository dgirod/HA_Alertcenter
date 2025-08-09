# Alert Center Card for Home Assistant

Eine flexible und hochgradig anpassbare Karte für Home Assistant, um wichtige Warnungen wie niedrige Batteriestände, Entitätenprobleme und benutzerdefinierte Benachrichtigungen an einem zentralen Ort anzuzeigen.

Das Herzstück dieses Projekts ist der **visuelle Konfigurator**, eine Web-Anwendung, die es Ihnen ermöglicht, das Erscheinungsbild und Verhalten Ihrer Alarmkarte ohne eine einzige Zeile YAML-Code zu gestalten.

---

## ✨ Features

- **Zentrales Alert-Dashboard**: Bündelt alle wichtigen Benachrichtigungen auf einer einzigen, übersichtlichen Karte.
- **Visueller Konfigurator**: Kein manuelles Schreiben von YAML mehr. Konfigurieren Sie alles in einer benutzerfreundlichen Oberfläche mit Live-Vorschau.
- **Drei Darstellungsmodi**: Wählen Sie zwischen einer `Normal`-Ansicht, einer `Kompakt`-Ansicht oder einer `Kachel`-Ansicht, passend zu Ihrem Dashboard-Design.
- **Flexible Alert-Typen**:
    - **Batterie-Warnungen**: Legen Sie einen globalen Schwellenwert fest, um über schwache Batterien informiert zu werden.
    - **Entitäten-Probleme**: Zeigt Entitäten an, die nicht erreichbar sind oder andere Probleme melden.
    - **Benutzerdefinierte Alerts**: Definieren Sie eigene, statische Warnungen.
- **Anpassbare Icons**: Weisen Sie jedem Alert-Typ ein eigenes Icon aus einer vordefinierten Liste zu.
- **Inklusions-/Exklusionsfilter**: Behalten Sie die volle Kontrolle darüber, welche Entitäten Warnungen auslösen dürfen.
- **Material Design**: Eine saubere, moderne Optik, die sich nahtlos in Home Assistant einfügt.

---

## 🚀 Installation (via HACS)

Dies ist der empfohlene Weg, um diese Karte zu installieren.

1.  **HACS installieren**: Falls Sie HACS (Home Assistant Community Store) noch nicht installiert haben, folgen Sie der [offiziellen Anleitung](https://hacs.xyz/docs/installation/prerequisites).
2.  **Benutzerdefiniertes Repository hinzufügen**:
    - Öffnen Sie HACS in Ihrer Home Assistant Instanz.
    - Gehen Sie zu "Frontend" und klicken Sie auf die drei Punkte oben rechts, um "Custom repositories" auszuwählen.
    - Fügen Sie die URL dieses Github-Repositorys in das Feld ein und wählen Sie als Kategorie "Lovelace".
3.  **Karte installieren**:
    - Suchen Sie nach "Alert Center Card" und klicken Sie auf "Install".
    - Home Assistant fügt die Ressource normalerweise automatisch zu Ihren Lovelace-Dashboards hinzu. Falls nicht, fügen Sie sie manuell unter `Einstellungen > Dashboards > Drei Punkte oben rechts > Ressourcen` hinzu.

---

## 🛠️ Konfiguration

Die Konfiguration besteht aus zwei Schritten:
1.  Die visuelle Gestaltung der Karte mit dem **Online-Konfigurator** (den `.tsx`-Dateien in diesem Repo).
2.  Das Hinzufügen einer "Manuell"-Karte zu Ihrem Lovelace-Dashboard mit der generierten Konfiguration.

### Schritt 1: Konfigurator verwenden

1.  Öffnen Sie die `index.html` des Konfigurators in Ihrem Browser.
2.  Nutzen Sie die Optionen auf der linken Seite, um Ihre Alert-Karte zu gestalten.
3.  Die **Live-Vorschau** auf der rechten Seite zeigt Ihnen sofort, wie Ihre Karte aussehen wird.
4.  Wenn Sie zufrieden sind, klicken Sie auf den **"Konfiguration speichern"**-Button. *(Hinweis: In der aktuellen Demo-Version ist dieser Button ein Platzhalter. In der finalen Version würde er den benötigten YAML-Code generieren.)* Erstellen Sie basierend auf Ihren Einstellungen eine Konfiguration wie im Beispiel unten.

### Schritt 2: Karte zu Lovelace hinzufügen

Sobald Sie Ihre Konfiguration haben, fügen Sie sie in Home Assistant ein:

1.  Öffnen Sie das gewünschte Dashboard in Home Assistant und klicken Sie auf "Bearbeiten".
2.  Klicken Sie auf "Karte hinzufügen" und wählen Sie die "Manuell"-Karte am Ende der Liste.
3.  Fügen Sie Ihre Konfiguration ein. Sie wird etwa so aussehen:

**Beispiel-Konfiguration:**

```yaml
type: custom:alert-center-card
view_mode: normal
battery_threshold: 15
alerts:
  battery:
    enabled: true
    icon: mdi:battery-low
  problem:
    enabled: true
    icon: mdi:alert-circle-outline
entity_filters:
  - entity: light.schlafzimmer_nachttisch
    filter: exclude
```

**Hinweis:** Die Datei `ha-alertcenter-card.js` in diesem Repository ist derzeit ein Platzhalter, um die HACS-Kompatibilität sicherzustellen. Sie implementiert noch nicht die volle visuelle Logik aus dem Konfigurator.

---

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
