import { useEffect, useState } from 'react';



const ARViewer = ({ url }) => {
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    // Ensure A-Frame and MindAR scripts are loaded in proper order
    useEffect(() => {
        const loadScripts = async () => {
            try {
                console.log('Starting script loading process...');
                
                // Check if A-Frame is already loaded
                if (window.AFRAME) {
                    console.log('A-Frame already loaded');
                } else {
                    console.log('Loading A-Frame...');
                    const aframeSources = [
                        'https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js',
                        'https://unpkg.com/aframe@1.4.2/dist/aframe.min.js'
                    ];
                    
                    let aframeLoaded = false;
                    for (const src of aframeSources) {
                        try {
                            await new Promise((resolve, reject) => {
                                const script = document.createElement('script');
                                script.src = src;
                                script.onload = () => {
                                    console.log(`A-Frame script loaded from: ${src}`);
                                    aframeLoaded = true;
                                    resolve();
                                };
                                script.onerror = (error) => {
                                    console.error(`Failed to load A-Frame from ${src}:`, error);
                                    reject(error);
                                };
                                document.head.appendChild(script);
                            });
                            break; // Success, exit loop
                        } catch (error) {
                            console.log(`Trying next A-Frame source...`);
                        }
                    }
                    
                    if (!aframeLoaded) {
                        throw new Error('Failed to load A-Frame from all sources');
                    }
                }

                // Wait for A-Frame to be available and fully initialized
                console.log('Waiting for A-Frame to initialize...');
                let attempts = 0;
                const maxAttempts = 100;
                while (!window.AFRAME && attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                    if (attempts % 10 === 0) {
                        console.log(`Waiting for A-Frame... attempt ${attempts}/${maxAttempts}`);
                    }
                }

                if (!window.AFRAME) {
                    throw new Error('A-Frame failed to initialize after maximum attempts');
                }

                console.log('A-Frame is available, waiting for full initialization...');
                // Wait for A-Frame to be fully ready
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Check if MindAR is already loaded
                if (window.MINDAR) {
                    console.log('MindAR already loaded');
                } else {
                    console.log('Loading MindAR...');
                    const mindarSources = [
                        'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js',
                        'https://unpkg.com/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js',
                        'https://cdn.jsdelivr.net/npm/mind-ar@1.2.0/dist/mindar-image-aframe.prod.js'
                    ];
                    
                    let mindarLoaded = false;
                    for (const src of mindarSources) {
                        try {
                            console.log(`Trying to load MindAR from: ${src}`);
                            await new Promise((resolve, reject) => {
                                const mindarScript = document.createElement('script');
                                mindarScript.src = src;
                                mindarScript.onload = () => {
                                    console.log(`MindAR script loaded from: ${src}`);
                                    mindarLoaded = true;
                                    resolve();
                                };
                                mindarScript.onerror = (error) => {
                                    console.error(`Failed to load MindAR from ${src}:`, error);
                                    reject(error);
                                };
                                document.head.appendChild(mindarScript);
                            });
                            break; // Success, exit loop
                        } catch (error) {
                            console.log(`Trying next MindAR source...`);
                        }
                    }
                    
                    if (!mindarLoaded) {
                        console.warn('Failed to load MindAR from all sources, will proceed with A-Frame only');
                    }
                }

                // Wait for MindAR to initialize
                console.log('Waiting for MindAR to initialize...');
                attempts = 0;
                while (!window.MINDAR && attempts < 50) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }

                // Final validation
                console.log('Checking final library states...');
                console.log('A-Frame available:', !!window.AFRAME);
                console.log('MindAR available:', !!window.MINDAR);

                if (window.AFRAME && window.MINDAR) {
                    console.log('Both A-Frame and MindAR are ready');
                    setScriptsLoaded(true);
                } else {
                    console.error('Failed to load required libraries');
                    console.error('A-Frame:', !!window.AFRAME);
                    console.error('MindAR:', !!window.MINDAR);
                    // Still set to true to allow partial functionality
                    if (window.AFRAME) {
                        console.log('Proceeding with A-Frame only...');
                        setScriptsLoaded(true);
                    }
                }
            } catch (error) {
                console.error('Error in script loading process:', error);
                // Try to proceed if A-Frame is available
                if (window.AFRAME) {
                    console.log('Proceeding with A-Frame despite errors...');
                    setScriptsLoaded(true);
                }
            }
        };

        loadScripts();
    }, []);
    const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    // Only set scene ready after scripts are loaded
    if (scriptsLoaded) {
      const timeout = setTimeout(() => {
        setSceneReady(true);
      }, 500); // 0.5 seconds delay

      return () => clearTimeout(timeout);
    }
  }, [scriptsLoaded]);

  useEffect(() => {
    if (!sceneReady) return;

    const iframe = document.getElementById('youtube-frame');
    if (!iframe) return;

    if (window.MINDAR) {
      // MindAR event handling
      const target = document.querySelector('[mindar-image-target]');
      if (!target) return;

      target.addEventListener('targetFound', () => {
        console.log('Marker found');
        iframe.style.display = 'block';
      });

      target.addEventListener('targetLost', () => {
        console.log('Marker lost');
        iframe.style.display = 'none';
        iframe.src = iframe.src; // reset video
      });
    } else {
      // Fallback mode - show video after a delay
      console.log('MindAR not available, showing video in fallback mode');
      setTimeout(() => {
        iframe.style.display = 'block';
      }, 2000);
    }
  }, [sceneReady]);

  const embedUrl = url?.replace("watch?v=", "embed/") + "?autoplay=1&mute=1";

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {scriptsLoaded && sceneReady && (
        <>
          {window.MINDAR ? (
            // Full AR Scene with MindAR
            <a-scene
              mindar-image="imageTargetSrc: ./targets.mind; autoStart: true;"
              embedded
              color-space="sRGB"
              renderer="colorManagement: true; physicallyCorrectLights"
              vr-mode-ui="enabled: false"
              device-orientation-permission-ui="enabled: true"
            >
              <a-assets></a-assets>
              <a-camera position="0 0 0" look-controls="enabled: true"></a-camera>
              <a-entity mindar-image-target="targetIndex: 0">
                <a-plane
                  position="0 0 0"
                  width="1"
                  height="0.6"
                  color="#ffffff"
                  opacity="0.001"
                ></a-plane>
              </a-entity>
            </a-scene>
          ) : (
            // Fallback A-Frame only scene
            <a-scene
              embedded
              color-space="sRGB"
              renderer="colorManagement: true; physicallyCorrectLights"
              vr-mode-ui="enabled: false"
            >
              <a-assets></a-assets>
              <a-camera position="0 0 0" look-controls="enabled: true"></a-camera>
              <a-box 
                position="0 0 -3" 
                rotation="0 45 0" 
                color="#4CC3D9"
                animation="property: rotation; to: 0 405 0; loop: true; dur: 10000"
              ></a-box>
              <a-plane 
                position="0 -1 -4" 
                rotation="-90 0 0" 
                width="4" 
                height="4" 
                color="#7BC8A4"
              ></a-plane>
              <a-sky color="#ECECEC"></a-sky>
              <a-text 
                value="MindAR not available - A-Frame fallback mode" 
                position="0 2 -3" 
                color="#333"
                align="center"
              ></a-text>
            </a-scene>
          )}

          <iframe
            id="youtube-frame"
            src={embedUrl}
            allow="autoplay; encrypted-media;"
            allowFullScreen
            frameBorder="0"
            style={{
              display: window.MINDAR ? 'none' : 'block',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '320px',
              height: '180px',
              transform: 'translate(-50%, -50%)',
              zIndex: 999,
            }}
          ></iframe>
        </>
      )}
      {!scriptsLoaded && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          Loading AR viewer...
        </div>
      )}
    </div>
  );
};

export default ARViewer;
