Documento di Analisi Funzionale

MVP – Software per Comunità Energetiche Rinnovabili (CER)

Obiettivo del Documento

Questo documento definisce le funzionalità essenziali di un MVP (Minimum Viable Product) per una piattaforma software dedicata alla gestione delle Comunità Energetiche Rinnovabili (CER) in Italia.

⸻

1. Introduzione

Il prodotto consiste in una piattaforma web/cloud rivolta principalmente a Pubbliche Amministrazioni, PMI e cooperative locali che intendono costituire e gestire CER in conformità alla normativa italiana vigente.

Obiettivi principali dell’MVP:
	•	Validare il mercato con funzioni essenziali e differenzianti.
	•	Garantire compliance normativa e integrazione iniziale con sistemi GSE.
	•	Semplificare le attività amministrative e il monitoraggio energetico.

⸻

2. Target Utenti
	•	Amministratori di CER (es. rappresentanti PA, PMI, associazioni locali)
	•	Membri della CER (es. cittadini, imprese, utenti finali)

⸻

3. Funzionalità Principali MVP

3.1 Dashboard real-time energetica
	•	Visualizzazione in tempo reale:
	•	Energia prodotta
	•	Energia consumata
	•	Energia condivisa
	•	Dashboard intuitiva e responsive

3.2 Gestione amministrativa
	•	Gestione anagrafica membri:
	•	Inserimento e modifica dati membri
	•	Onboarding digitale (raccolta documenti e KYC di base)
	•	Gestione documentale essenziale:
	•	Repository documenti (contratti, statuti, autorizzazioni)
	•	Organizzazione per categorie e ricerca semplice

3.3 Gestione pratiche e incentivi GSE
	•	Calcolo automatico incentivi (base):
	•	Implementazione dell’algoritmo base di ripartizione incentivi
	•	Export automatico report per invio a portali GSE
	•	Gestione documenti per la compliance normativa minima

3.4 Simulazione economica di base
	•	Strumento di simulazione per configurazioni standard:
	•	Calcolo rapido benefici economici stimati
	•	Inserimento dati base (potenza impianti, consumi stimati, membri)

3.5 App Web per Membri (base)
	•	Area riservata per membri CER:
	•	Consultazione consumo personale e collettivo
	•	Visualizzazione benefici economici stimati
	•	Download documentazione essenziale della comunità

⸻

4. Integrazioni

4.1 Integrazione di base con GSE
	•	API di base per:
	•	Caricamento dati essenziali (energia prodotta, consumata)
	•	Export rendicontazione mensile/annuale

4.2 Smart Meter e dispositivi IoT
	•	Connessione tramite protocolli standard (es. MQTT)
	•	Supporto a dispositivi principali già in commercio (es. smart meter 2G)

⸻

5. Requisiti Tecnici Essenziali
	•	Accessibilità web/cloud
	•	Compliance GDPR e sicurezza minima dei dati personali
	•	Registrazione attività (audit trail base)
	•	Scalabilità minima per gestione fino a 5 comunità in MVP
	•	Architettura aperta per espansione futura

⸻

6. Non-Incluso nell’MVP (per chiarezza futura):
	•	Funzioni avanzate di AI e ottimizzazione energetica
	•	Gestione avanzata di storage e Virtual Power Plant (VPP)
	•	Marketplace e servizi ancillari
	•	Simulazione avanzata tecnico-ambientale e modelli ESG

⸻

7. Interfacce Utente
	•	Interfaccia amministratore semplice e intuitiva, dashboard centrale con dati essenziali
	•	Interfaccia membri minimale (Web App responsive)

⸻

8. Vincoli e Assunzioni
	•	Disponibilità dati da smart meter preinstallati presso utenti
	•	Disponibilità API base GSE per MVP limitata a funzioni essenziali
	•	Supporto compliance minima per normative NIS2/DORA rimandata a iterazioni successive
