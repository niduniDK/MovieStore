import { useEffect, useState } from 'react';

const ARViewer = ({ url }) => {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    // Delay rendering the scene to let Vite serve the .mind file properly
    const timeout = setTimeout(() => {
      setSceneReady(true);
    }, 500); // 0.5 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!sceneReady) return;

    const target = document.querySelector('[mindar-image-target]');
    const iframe = document.getElementById('youtube-frame');

    if (!target || !iframe) return;

    target.addEventListener('targetFound', () => {
      console.log('Marker found');
      iframe.style.display = 'block';
    });

    target.addEventListener('targetLost', () => {
      console.log('Marker lost');
      iframe.style.display = 'none';
      iframe.src = iframe.src; // reset video
    });
  }, [sceneReady]);

  const embedUrl = url?.replace("watch?v=", "embed/") + "?autoplay=1&mute=1";

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {sceneReady && (
        <>
          <a-scene
            mindar-image="imageTargetSrc: ./targets.mind; autoStart: true;"
            embedded
            color-space="sRGB"
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: true"
          >
            <a-assets></a-assets>
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
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

          <iframe
            id="youtube-frame"
            src={embedUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
            style={{
              display: 'none',
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
    </div>
  );
};

export default ARViewer;
