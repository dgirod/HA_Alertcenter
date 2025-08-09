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
    - **Benutzerdefinierte Alerts**: Definieren Sie eigene, statische Warnungen direkt in der Karten-Konfiguration.
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

### Schritt 1: Konfigurator verwenden (Optional)

1.  Öffnen Sie die `index.html` des Konfigurators in Ihrem Browser.
2.  Nutzen Sie die Optionen auf der linken Seite, um Ihre Alert-Karte zu gestalten.
3.  Die **Live-Vorschau** auf der rechten Seite zeigt Ihnen sofort, wie Ihre Karte aussehen wird.
4.  Wenn Sie zufrieden sind, erstellen Sie basierend auf Ihren Einstellungen eine YAML-Konfiguration wie im Beispiel unten. *(Hinweis: Der "Konfiguration speichern"-Button ist in der Demo-Version ein Platzhalter.)*

### Schritt 2: Karte zu Lovelace hinzufügen

Sobald Sie Ihre Konfiguration haben, fügen Sie sie in Home Assistant ein:

1.  Öffnen Sie das gewünschte Dashboard in Home Assistant und klicken Sie auf "Bearbeiten".
2.  Klicken Sie auf "Karte hinzufügen" und wählen Sie die "Manuell"-Karte am Ende der Liste.
3.  Fügen Sie Ihre Konfiguration ein.

**Beispiel-Konfiguration:**

```yaml
type: custom:alert-center-card
title: Wichtige Meldungen
view_mode: normal # normal, compact, oder tile
battery_threshold: 15
alerts:
  battery:
    enabled: true
    icon: 'battery_low'
  problem:
    enabled: true
    icon: 'warning'
  custom:
    enabled: true
    icon: 'info'
entity_filters:
  - entity: light.schlafzimmer_nachttisch
    filter: exclude
  - entity: sensor.unwichtiger_sensor
    filter: exclude
custom_alerts:
  - title: Müll rausbringen
    message: Die Papiertonne muss heute geleert werden.
```

---

## ⚙️ Wie Alarme generiert werden

Die Karte ermittelt Alarme automatisch anhand der folgenden Regeln:

-   **Batterie-Warnungen**: Die Karte prüft jede Entität auf die Attribute `battery_level` oder `battery`. Wenn der Wert eines dieser Attribute unter den konfigurierten `battery_threshold` fällt, wird ein Alarm ausgelöst.

-   **Entitäten-Probleme**: Ein Alarm wird generiert, wenn der Zustand (`state`) einer Entität `unavailable` oder `unknown` ist. Dies deutet typischerweise auf Kommunikationsprobleme oder Fehlfunktionen hin.

-   **Benutzerdefinierte Alarme**: Sie können statische Alarme direkt in der Konfiguration unter dem Schlüssel `custom_alerts` definieren. Jeder Eintrag muss einen `title` und eine `message` haben.

-   **Filter**: Mit `entity_filters` können Sie Entitäten gezielt von der Alarmprüfung ausschließen (`exclude`) oder eine exklusive Liste von zu prüfenden Entitäten definieren (`include`).

---

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
