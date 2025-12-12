import React, { useState } from 'react';

const PluginConfigurationPanel = ({ configuration, save }) => {
  const [config, setConfig] = useState(configuration || {});
  const [initialConfig, setInitialConfig] = useState(configuration);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', message: '', callback: null });
  const [timeframeError, setTimeframeError] = useState('');

  const [currentLang, setCurrentLang] = useState(config.language === 'de' ? 'de' : 'en');

  const translations = {
    de: {
      title: 'VCAN Log Player Konfiguration',
      general: 'Allgemein',
      inputSettings: 'Eingabe-Einstellungen',
      processingOptions: 'Verarbeitungsoptionen',
      timeframeSettings: 'Zeitrahmen-Einstellungen',

      inputDirectory: 'Eingabe-Verzeichnis:',
      inputDirectoryHelp: 'Verzeichnis, in dem sich die input.log-Datei befindet',
      
      createLogfile: 'Log-Datei erstellen',
      createLogfileHelp: 'Erstellt vcan-logplayer.log mit Verarbeitungsstatistiken im Verzeichnis der Input-Log-Datei',
      
      realtime: 'Originale Zeitsteuerung beibehalten',
      realtimeHelp: 'Daten werden gemäß Zeitstempel aus Log-Datei verarbeitet (mit Wartezeiten)',
      
      originalTimestamp: 'Originale Zeitstempel verwenden',
      originalTimestampHelp: 'Zeitstempel aus Log-Datei verwenden statt aktuelle Zeit',
      
      timeframe: 'Spezifischer Zeitrahmen',
      timeframeHelp: 'Log-Datei nur für einen bestimmten Zeitraum verarbeiten',
      
      timeframeStart: 'Zeitrahmen-Start:',
      timeframeStartHelp: 'Startzeit für die Verarbeitung',
      
      timeframeEnd: 'Zeitrahmen-Ende:',
      timeframeEndHelp: 'Endzeit für die Verarbeitung',
      timeframeError: 'Endzeit muss größer oder gleich der Startzeit sein',

      save: 'Speichern',
      cancel: 'Abbruch',
      unsavedWarning: 'Es gibt ungespeicherte Änderungen. Wirklich abbrechen?',
      unsavedTitle: 'Ungespeicherte Änderungen',
      yes: 'Ja',
      no: 'Nein'
    },
    en: {
      title: 'VCAN Log Player Configuration',
      general: 'General',
      inputSettings: 'Input Settings',
      processingOptions: 'Processing Options',
      timeframeSettings: 'Timeframe Settings',

      inputDirectory: 'Input Directory:',
      inputDirectoryHelp: 'Directory containing the input.log file',
      
      createLogfile: 'Create log file',
      createLogfileHelp: 'Creates vcan-logplayer.log with processing statistics in the input log file directory',
      
      realtime: 'Keep original timing',
      realtimeHelp: 'Data is processed according to timestamp in log file (with waits)',
      
      originalTimestamp: 'Use original timestamps',
      originalTimestampHelp: 'Use timestamps from log file instead of current time',
      
      timeframe: 'Specific timeframe',
      timeframeHelp: 'Process log file only for a specific time period',
      
      timeframeStart: 'Timeframe start:',
      timeframeStartHelp: 'Start time for processing',
      
      timeframeEnd: 'Timeframe end:',
      timeframeEndHelp: 'End time for processing',
      timeframeError: 'End time must be greater than or equal to start time',

      save: 'Save',
      cancel: 'Cancel',
      unsavedWarning: 'There are unsaved changes. Really cancel?',
      unsavedTitle: 'Unsaved changes',
      yes: 'Yes',
      no: 'No'
    }
  };

  const t = translations[currentLang];

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    
    // Überprüfe Zeitrahmen, wenn Start oder Ende geändert wird
    if (key === 'timeframestart' || key === 'timeframeend') {
      const start = key === 'timeframestart' ? value : config.timeframestart || '00:00:00';
      const end = key === 'timeframeend' ? value : config.timeframeend || '23:59:59';
      
      if (start && end && start > end) {
        setTimeframeError(t.timeframeError);
      } else {
        setTimeframeError('');
      }
    }
  };

  const checkUnsavedChanges = () => {
    return JSON.stringify(config) !== JSON.stringify(initialConfig);
  };

  const handleSave = () => {
    setLoading(true);
    if (save) {
      try {
        const result = save(config);
        
        if (result && typeof result.then === 'function') {
          result
            .then(() => {
              setStatus('success');
              setInitialConfig(config);
              setTimeout(() => setStatus(''), 3000);
            })
            .catch(err => {
              setStatus('error');
              setTimeout(() => setStatus(''), 3000);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setStatus('success');
          setInitialConfig(config);
          setTimeout(() => setStatus(''), 3000);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in handleSave:', err);
        setStatus('error');
        setTimeout(() => setStatus(''), 3000);
        setLoading(false);
      }
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    handleConfigChange('language', lang === 'de');
  };

  const handleDirectorySelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.directory = true;
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        const firstFile = files[0];
        let directoryPath = '';
        
        if (firstFile.webkitRelativePath) {
          const parts = firstFile.webkitRelativePath.split('/');
          directoryPath = parts.slice(0, -1).join('/') || parts[0];
        } else if (firstFile.path) {
          const parts = firstFile.path.split(/[/\\]/);
          directoryPath = parts.slice(0, -1).join('/');
        }
        
        if (directoryPath) {
          handleConfigChange('inputDirectory', directoryPath);
        }
      }
    };
    
    input.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>VCAN Log Player</h2>
        <button 
          onClick={() => window.open('https://github.com/formifan2002/signalk-vcan-logplayer', '_blank')}
          style={styles.helpButton}
        >
          ℹ️ {currentLang === 'de' ? 'Hilfe' : 'Help'}
        </button>
      </div>

      <div style={styles.languageSelector}>
        <button 
          onClick={() => handleLanguageChange('de')}
          style={{...styles.langButton, ...(currentLang === 'de' ? styles.langButtonActive : {})}}
        >
          Deutsch
        </button>
        <button 
          onClick={() => handleLanguageChange('en')}
          style={{...styles.langButton, ...(currentLang === 'en' ? styles.langButtonActive : {})}}
        >
          English
        </button>
      </div>

      {/* Input Settings */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t.inputSettings}</h3>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.inputDirectory}</label>
          <div style={styles.inputWithButton}>
            <input
              type="text"
              value={config.inputDirectory || '/home/pi/vcan-logplayer'}
              onChange={(e) => handleConfigChange('inputDirectory', e.target.value)}
              style={styles.inputPath}
            />
            <button
              type="button"
              onClick={handleDirectorySelect}
              style={styles.fileButton}
            >
              📁
            </button>
          </div>
          <small style={styles.help}>{t.inputDirectoryHelp}</small>
        </div>
      </div>

      {/* Processing Options */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t.processingOptions}</h3>

        <div style={styles.formGroup}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={config.createLogfile || false}
              onChange={(e) => handleConfigChange('createLogfile', e.target.checked)}
            />
            {t.createLogfile}
          </label>
          <small style={styles.help}>{t.createLogfileHelp}</small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={config.realtime !== false}
              onChange={(e) => handleConfigChange('realtime', e.target.checked)}
            />
            {t.realtime}
          </label>
          <small style={styles.help}>{t.realtimeHelp}</small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={config.originaltimestamp !== false}
              onChange={(e) => handleConfigChange('originaltimestamp', e.target.checked)}
            />
            {t.originalTimestamp}
          </label>
          <small style={styles.help}>{t.originalTimestampHelp}</small>
        </div>
      </div>

      {/* Timeframe Settings */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t.timeframeSettings}</h3>

        <div style={styles.formGroup}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={config.timeframe || false}
              onChange={(e) => handleConfigChange('timeframe', e.target.checked)}
            />
            {t.timeframe}
          </label>
          <small style={styles.help}>{t.timeframeHelp}</small>
        </div>

        {config.timeframe && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>{t.timeframeStart}</label>
              <div style={styles.timeInputWrapper}>
                <span style={styles.clockIcon}>🕐</span>
                <input
                  type="time"
                  step="1"
                  value={config.timeframestart || '00:00:00'}
                  onChange={(e) => handleConfigChange('timeframestart', e.target.value)}
                  style={styles.timeInput}
                />
              </div>
              <small style={styles.help}>{t.timeframeStartHelp}</small>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>{t.timeframeEnd}</label>
              <div style={{...styles.timeInputWrapper, ...(timeframeError ? styles.timeInputError : {})}}>
                <span style={styles.clockIcon}>🕐</span>
                <input
                  type="time"
                  step="1"
                  value={config.timeframeend || '23:59:59'}
                  onChange={(e) => handleConfigChange('timeframeend', e.target.value)}
                  style={styles.timeInput}
                />
              </div>
              {timeframeError && (
                <small style={styles.errorText}>{timeframeError}</small>
              )}
              <small style={styles.help}>{t.timeframeEndHelp}</small>
            </div>
          </>
        )}
      </div>

      {status && (
        <div style={{...styles.statusMessage, ...(status === 'error' ? styles.error : styles.success)}}>
          {status === 'success' 
            ? (currentLang === 'de' ? 'Konfiguration gespeichert' : 'Configuration saved')
            : (currentLang === 'de' ? 'Fehler beim Speichern' : 'Error saving')}
        </div>
      )}

      <div style={styles.buttonGroup}>
        <button
          onClick={handleSave}
          disabled={loading}
          style={{...styles.button, ...styles.primaryButton}}
        >
          {t.save}
        </button>
        <button
          onClick={() => {
            if (checkUnsavedChanges()) {
              setDialogData({
                title: t.unsavedTitle,
                message: t.unsavedWarning,
                callback: () => setConfig(initialConfig)
              });
              setShowDialog(true);
            } else {
              setConfig(initialConfig);
            }
          }}
          style={{...styles.button, ...styles.secondaryButton}}
        >
          {t.cancel}
        </button>
      </div>

      {showDialog && (
        <div style={styles.dialog}>
          <div style={styles.dialogContent}>
            <h4 style={styles.dialogTitle}>{dialogData.title}</h4>
            <p>{dialogData.message}</p>
            <div style={styles.dialogButtons}>
              <button
                onClick={() => setShowDialog(false)}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                {t.no}
              </button>
              <button
                onClick={() => {
                  if (dialogData.callback) dialogData.callback();
                  setShowDialog(false);
                }}
                style={{...styles.button, ...styles.primaryButton}}
              >
                {t.yes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #667eea',
  },
  title: {
    margin: 0,
    fontSize: '1.5em',
    fontWeight: '600',
    color: '#333',
  },
  languageSelector: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  },
  langButton: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
  },
  langButtonActive: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.2em',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#333',
    borderBottom: '2px solid #667eea',
    paddingBottom: '10px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '5px',
    color: '#333',
  },
  inputPath: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    width: '400px',
  },
  inputWithButton: {
    display: 'flex',
    gap: '5px',
  },
  fileButton: {
    padding: '8px 12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  timeInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    width: 'fit-content',
  },
  timeInputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  clockIcon: {
    color: '#667eea',
    fontSize: '18px',
    flexShrink: 0,
  },
  timeInput: {
    border: 'none',
    outline: 'none',
    fontSize: '1em',
    fontFamily: 'monospace',
    padding: '0',
    width: '110px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    cursor: 'pointer',
    gap: '8px',
  },
  help: {
    display: 'block',
    fontSize: '0.85em',
    color: '#666',
    marginTop: '5px',
    fontStyle: 'italic',
  },
  errorText: {
    display: 'block',
    fontSize: '0.85em',
    color: '#dc3545',
    marginTop: '5px',
    fontWeight: '500',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1em',
  },
  primaryButton: {
    backgroundColor: '#667eea',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  statusMessage: {
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '0.95em',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  dialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialogContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  dialogTitle: {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '1.1em',
  },
  dialogButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  helpButton: {
    padding: '8px 16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95em',
    transition: 'background 0.3s',
  }
};

export default PluginConfigurationPanel;