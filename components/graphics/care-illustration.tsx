"use client"

export function CareIllustration({ className = "w-full h-64" }: { className?: string }) {
  return (
    <div className={`${className} relative overflow-hidden`}>
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF8FF" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        <rect width="400" height="300" fill="url(#bgGradient)" />

        {/* Floating elements */}
        <circle cx="50" cy="50" r="3" fill="#3B82F6" opacity="0.3">
          <animate attributeName="cy" values="50;40;50" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="80" r="2" fill="#8B5CF6" opacity="0.4">
          <animate attributeName="cy" values="80;70;80" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="200" r="2.5" fill="#10B981" opacity="0.3">
          <animate attributeName="cy" values="200;190;200" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Main care figure */}
        <g transform="translate(150, 80)">
          {/* Person body */}
          <ellipse cx="50" cy="120" rx="25" ry="40" fill="url(#personGradient)" opacity="0.8" />

          {/* Person head */}
          <circle cx="50" cy="60" r="20" fill="url(#personGradient)" opacity="0.9" />

          {/* Arms */}
          <ellipse
            cx="25"
            cy="100"
            rx="8"
            ry="25"
            fill="url(#personGradient)"
            opacity="0.7"
            transform="rotate(-20 25 100)"
          />
          <ellipse
            cx="75"
            cy="100"
            rx="8"
            ry="25"
            fill="url(#personGradient)"
            opacity="0.7"
            transform="rotate(20 75 100)"
          />

          {/* Heart symbol */}
          <g transform="translate(35, 45)">
            <path
              d="M15,25 C15,17 8,10 0,10 C-8,10 -15,17 -15,25 C-15,35 0,50 0,50 C0,50 15,35 15,25 Z"
              fill="url(#heartGradient)"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.1;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>

        {/* Data visualization elements */}
        <g transform="translate(280, 120)">
          {/* Chart bars */}
          <rect x="0" y="40" width="8" height="30" fill="#3B82F6" opacity="0.6" rx="2" />
          <rect x="12" y="25" width="8" height="45" fill="#8B5CF6" opacity="0.6" rx="2" />
          <rect x="24" y="35" width="8" height="35" fill="#10B981" opacity="0.6" rx="2" />
          <rect x="36" y="20" width="8" height="50" fill="#F59E0B" opacity="0.6" rx="2" />

          {/* Chart animation */}
          <rect x="0" y="40" width="8" height="30" fill="#3B82F6" opacity="0.8" rx="2">
            <animate attributeName="height" values="30;35;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="40;35;40" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* AI brain icon */}
        <g transform="translate(80, 180)">
          <circle cx="0" cy="0" r="15" fill="#8B5CF6" opacity="0.2" />
          <circle cx="0" cy="0" r="10" fill="#8B5CF6" opacity="0.4" />
          <circle cx="0" cy="0" r="5" fill="#8B5CF6" opacity="0.8">
            <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Neural network lines */}
          <line x1="-8" y1="-8" x2="8" y2="8" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="8" y1="-8" x2="-8" y2="8" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Connection lines */}
        <path
          d="M200,150 Q240,130 280,140"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeDasharray="5,5"
        >
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
        </path>
        <path
          d="M150,200 Q180,180 200,160"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeDasharray="3,3"
        >
          <animate attributeName="stroke-dashoffset" values="0;6" dur="1.5s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  )
}
