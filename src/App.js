import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [alertActive, setAlertActive] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  // Function to trigger alert
  const triggerAlert = () => {
    setAlertActive(true);

    // Vibrate pattern (if supported)
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500, 200, 1000]);
    }
  };

  // Auto-reset after 10 seconds
  useEffect(() => {
    let timer;
    if (alertActive) {
      timer = setTimeout(() => {
        setAlertActive(false);
        if (navigator.vibrate) {
          navigator.vibrate(0); // stop vibration
        }
      }, 10000); // reset after 10 sec
    }
    return () => clearTimeout(timer);
  }, [alertActive]);

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent default Chrome prompt
      setDeferredPrompt(e);
      setShowInstall(true); // show our custom button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle install button click
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show browser install prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      setDeferredPrompt(null);
      setShowInstall(false); // hide install button
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: alertActive ? "red" : "white",
        color: alertActive ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transition: "background-color 0.5s ease"
      }}
    >
      {!alertActive ? (
        <>
          <h1>🚨 My Alert PWA 🚨</h1>
          <button
            onClick={triggerAlert}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Trigger Alert
          </button>

          {showInstall && (
            <button
              onClick={handleInstallClick}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                cursor: "pointer",
                marginTop: "20px"
              }}
            >
              Install App
            </button>
          )}
        </>
      ) : (
        <h1>⚠️ Alert Triggered! Stay Safe! ⚠️</h1>
      )}
    </div>
  );
}

export default App;
