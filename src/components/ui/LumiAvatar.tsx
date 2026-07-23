import React from 'react';

export default function LumiAvatar({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Background Animated Glow */}
        <circle cx="256" cy="256" r="240" fill="url(#lumi-avatar-bg)" className="animate-pulse" />

        {/* Headset Band */}
        <path
          d="M140 220C140 150 190 100 256 100C322 100 372 150 372 220"
          stroke="#1E3A8A"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <rect
          x="110"
          y="200"
          width="45"
          height="75"
          rx="22"
          fill="#8B5CF6"
          stroke="#1E3A8A"
          strokeWidth="16"
        />
        <rect
          x="357"
          y="200"
          width="45"
          height="75"
          rx="22"
          fill="#8B5CF6"
          stroke="#1E3A8A"
          strokeWidth="16"
        />

        {/* Hair Back */}
        <path
          d="M130 240C100 300 120 370 170 380C220 390 220 320 220 320"
          fill="#F97316"
          stroke="#1E3A8A"
          strokeWidth="16"
        />
        <path
          d="M382 240C412 300 392 370 342 380C292 390 292 320 292 320"
          fill="#F97316"
          stroke="#1E3A8A"
          strokeWidth="16"
        />

        {/* Face */}
        <path
          d="M175 220C175 170 210 145 256 145C302 145 337 170 337 220V280C337 325 301 360 256 360C211 360 175 325 175 280V220Z"
          fill="#FDE68A"
          stroke="#1E3A8A"
          strokeWidth="16"
        />

        {/* Eyes (Blinking Animation) */}
        <g className="animate-pulse">
          <circle cx="215" cy="245" r="14" fill="#1E3A8A" />
          <circle cx="297" cy="245" r="14" fill="#1E3A8A" />
        </g>

        {/* Microphone Boom & Glowing Capsule */}
        <path
          d="M375 250C375 310 310 335 250 335"
          stroke="#1E3A8A"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="240"
          cy="335"
          r="22"
          fill="#A855F7"
          stroke="#1E3A8A"
          strokeWidth="12"
          className="animate-ping opacity-75"
        />
        <circle cx="240" cy="335" r="22" fill="#A855F7" stroke="#1E3A8A" strokeWidth="12" />

        {/* Hair Bangs */}
        <path
          d="M175 200C210 150 256 190 256 190C256 190 302 150 337 200C337 160 300 145 256 145C212 145 175 160 175 200Z"
          fill="#F97316"
          stroke="#1E3A8A"
          strokeWidth="14"
        />

        {/* Shoulders / Shirt */}
        <path
          d="M140 460C140 400 190 380 256 380C322 380 372 400 372 460V480H140V460Z"
          fill="#EC4899"
          stroke="#1E3A8A"
          strokeWidth="16"
        />

        {/* Name Tag */}
        <rect x="290" y="425" width="55" height="20" rx="10" fill="#FFFFFF" />

        {/* Top Right Animated Speech Bubble (Bouncing & Wiggling) */}
        <g className="animate-bounce origin-center" style={{ animationDuration: '2.5s' }}>
          <g transform="translate(270, 20)">
            <path
              d="M100 0C145 0 180 35 180 80C180 125 145 160 100 160C85 160 70 155 58 147L10 165L28 122C10 110 0 96 0 80C0 35 35 0 100 0Z"
              fill="#38BDF8"
              stroke="#1E3A8A"
              strokeWidth="16"
            />
            <text
              x="92"
              y="112"
              fill="#FFFFFF"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="95"
              textAnchor="middle"
            >
              i
            </text>
          </g>
        </g>

        <defs>
          <linearGradient
            id="lumi-avatar-bg"
            x1="0"
            y1="0"
            x2="512"
            y2="512"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
