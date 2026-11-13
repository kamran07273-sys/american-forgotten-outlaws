import React from 'react';
import {
  AbsoluteFill,
  Composition,
  Sequence,
  registerRoot,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import scriptData from './script.json';

const SceneView: React.FC<{
  narration: string;
  visualPrompt: string;
  sceneId: number;
}> = ({ narration, visualPrompt, sceneId }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 225], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d0b09',
        color: '#f5e6c8',
        fontFamily: 'Georgia, serif',
        justifyContent: 'space-between',
        padding: '60px',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #5a4632',
          backgroundColor: '#1a1510',
          padding: '40px',
          transform: `scale(${scale})`,
        }}
      >
        <h2 style={{ color: '#c89d54', fontSize: '36px', marginBottom: '20px' }}>
          SCENE {sceneId} — 1870s HISTORICAL VISUAL
        </h2>
        <p style={{ fontSize: '24px', textAlign: 'center', maxWidth: '1200px', lineHeight: 1.5, color: '#bfb29c' }}>
          {visualPrompt}
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '28px 40px',
          borderRadius: '8px',
          borderLeft: '6px solid #c89d54',
          marginTop: '30px',
        }}
      >
        <p
          style={{
            fontSize: '40px',
            margin: 0,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px #000000',
          }}
        >
          "{narration}"
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const OutlawDocumentary: React.FC = () => {
  const framesPerScene = 225;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {scriptData.scenes.map((scene, index) => (
        <Sequence
          key={scene.scene_id}
          from={index * framesPerScene}
          durationInFrames={framesPerScene}
        >
          <SceneView
            sceneId={scene.scene_id}
            narration={scene.narration}
            visualPrompt={scene.visual_prompt}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OutlawDocumentary"
      component={OutlawDocumentary}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
