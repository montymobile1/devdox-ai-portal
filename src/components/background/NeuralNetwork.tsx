import React from 'react';

interface NeuralPath {
  readonly id: string;
  readonly path: string;
}

export function NeuralNetwork() {
  const paths: NeuralPath[] = [
    { id: 'neural-path-1', path: "M100,100 C200,150 300,50 400,100" },
    { id: 'neural-path-2', path: "M150,200 C250,250 350,150 450,200" },
    { id: 'neural-path-3', path: "M200,300 C300,350 400,250 500,300" },
    { id: 'neural-path-4', path: "M250,400 C350,450 450,350 550,400" },
    { id: 'neural-path-5', path: "M300,500 C400,550 500,450 600,500" },
    { id: 'neural-path-6', path: "M100,100 C150,200 100,300 150,400" },
    { id: 'neural-path-7', path: "M400,100 C450,200 400,300 450,400" },
    { id: 'neural-path-8', path: "M150,200 C200,300 150,400 200,500" },
    { id: 'neural-path-9', path: "M450,200 C500,300 450,400 500,500" },
    { id: 'neural-path-10', path: "M600,100 C700,150 800,50 900,100" },
    { id: 'neural-path-11', path: "M650,200 C750,250 850,150 950,200" },
    { id: 'neural-path-12', path: "M600,300 C700,350 800,250 900,300" }
  ];

  return (
    <svg className="neural-network" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      {paths.map((pathData, index) => (
        <g key={pathData.id}>
          <path 
            id={pathData.id} 
            d={pathData.path} 
            style={{ animationDelay: `${index * 0.5}s` }} 
          />
          <circle 
            className="moving-dot" 
            r="4" 
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={pathData.path}
              rotate="auto"
              begin={`${index * 0.5}s`}
            />
          </circle>
          <circle 
            className="glowing-dot" 
            r="6" 
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={pathData.path}
              rotate="auto"
              begin={`${index * 0.5}s`}
            />
          </circle>
        </g>
      ))}
      
      {/* Static nodes */}
      <circle cx="100" cy="100" />
      <circle cx="400" cy="100" />
      <circle cx="150" cy="200" />
      <circle cx="450" cy="200" />
      <circle cx="200" cy="300" />
      <circle cx="500" cy="300" />
      <circle cx="250" cy="400" />
      <circle cx="550" cy="400" />
      <circle cx="300" cy="500" />
      <circle cx="600" cy="500" />
      <circle cx="600" cy="100" />
      <circle cx="900" cy="100" />
      <circle cx="650" cy="200" />
      <circle cx="950" cy="200" />
      <circle cx="600" cy="300" />
      <circle cx="900" cy="300" />
    </svg>
  );
}