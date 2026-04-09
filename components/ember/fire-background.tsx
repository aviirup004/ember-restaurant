"use client";

export function FireBackground() {
  const embers = Array.from({ length: 15 });

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(var(--drift)) scale(0.5);
            opacity: 0;
          }
        }
        .ember-particle {
          animation: floatUp var(--duration) ease-in var(--delay) infinite;
        }
      `}</style>
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-transparent">
        {/* Primary: bottom center */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 100%, #8B1A00 0%, #3D0A00 40%, #080808 100%)'
          }}
        />
        {/* Secondary: bottom left 30% */}
        <div 
          className="absolute inset-x-0 bottom-0 h-full mix-blend-screen opacity-80"
          style={{
            background: 'radial-gradient(circle at 30% 100%, #FF4D00 0%, transparent 40%)'
          }}
        />
        {/* Tertiary: bottom right 70% */}
        <div 
          className="absolute inset-x-0 bottom-0 h-full mix-blend-screen opacity-80"
          style={{
            background: 'radial-gradient(circle at 70% 100%, #CC2200 0%, transparent 35%)'
          }}
        />

        {/* Embers */}
        {embers.map((_, i) => {
          const sizes = [3, 2, 4, 3, 2, 4, 2, 3, 2, 4, 3, 2, 4, 3, 2];
          const lefts = [10, 25, 40, 55, 70, 85, 15, 35, 60, 80, 5, 45, 65, 95, 50];
          const drifts = [50, -30, 20, -50, 40, -20, 60, -40, 30, -60, 10, -10, 70, -70, 25];
          const delays = [0, 2, 4, 1, 3, 5, 0.5, 2.5, 4.5, 1.5, 3.5, 0.2, 2.2, 4.2, 1.2];
          const durations = [7, 6, 8, 5, 9, 7, 6, 8, 5, 9, 7, 6, 8, 5, 9];
          const colors = ['#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00', '#CC2200', '#FF4D00'];

          const size = sizes[i];
          const color = colors[i];

          return (
            <div
              key={i}
              className="ember-particle absolute bottom-[-10px] rounded-full"
              style={{
                left: `${lefts[i]}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
                ['--drift' as string]: `${drifts[i]}px`,
                ['--duration' as string]: `${durations[i]}s`,
                ['--delay' as string]: `${delays[i]}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
