'use client';

import { useState, useEffect } from 'react';
import { Smartphone, FileText } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

// Sample data for dashboard stats
const dashboardStats = {
  totalDevices: 242,
  activeDevices: 230,
  warningDevices: 8,
  alertDevices: 4,
  totalApps: 5,
  totalProfiles: 4,
  totalUsers: 8,
  adminUsers: 3
};





const recentActivity = [
  {
    id: 1,
    type: 'device',
    message: 'ALPHA-001 status changed to warning',
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'user',
    message: 'New user Jennifer Brown added',
    timestamp: '15 minutes ago'
  },
  {
    id: 3,
    type: 'app',
    message: 'Slack app updated to v4.29.0',
    timestamp: '1 hour ago'
  },
  {
    id: 4,
    type: 'profile',
    message: 'Gold profile modified',
    timestamp: '2 hours ago'
  },
  {
    id: 5,
    type: 'device',
    message: 'BETA-005 status changed to alert',
    timestamp: '3 hours ago'
  }
];

// Pie Chart Component for Team Distribution
function PieChart({ data, size = 160 }) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 10;
  
  let cumulativePercentage = 0;
  
  const slices = data.map((item) => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + item.percentage) * 3.6;
    cumulativePercentage += item.percentage;
    
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const largeArcFlag = item.percentage > 50 ? 1 : 0;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    return {
      ...item,
      pathData
    };
  });
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.pathData}
            fill={slice.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

// Ring Chart Component
function RingChart({ percentage, label, color = "#22c55e", gradientId, gradientColors, size = 120 }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Calculate the arc path for the progress
  const circumference = radius * 2 * Math.PI;
  const progressLength = (percentage / 100) * circumference;
  const angle = (percentage / 100) * 360;
  
  // Create path for progress arc
  const startAngle = -90; // Start from top
  const endAngle = startAngle + angle;
  
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;
  
  const outerRadius = radius + strokeWidth / 2;
  const innerRadius = radius - strokeWidth / 2;
  
  const x1 = centerX + innerRadius * Math.cos(startAngleRad);
  const y1 = centerY + innerRadius * Math.sin(startAngleRad);
  const x2 = centerX + outerRadius * Math.cos(startAngleRad);
  const y2 = centerY + outerRadius * Math.sin(startAngleRad);
  
  const x3 = centerX + outerRadius * Math.cos(endAngleRad);
  const y3 = centerY + outerRadius * Math.sin(endAngleRad);
  const x4 = centerX + innerRadius * Math.cos(endAngleRad);
  const y4 = centerY + innerRadius * Math.sin(endAngleRad);
  
  const largeArcFlag = angle > 180 ? 1 : 0;
  
  const pathData = [
    `M ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
    `L ${x4} ${y4}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
    'Z'
  ].join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Gradient Definition */}
          {gradientColors && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={gradientColors.start} />
                <stop offset="100%" stopColor={gradientColors.end} />
              </linearGradient>
            </defs>
          )}
          
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress arc */}
          {percentage > 0 && (
            <path
              d={pathData}
              fill={gradientColors ? `url(#${gradientId})` : color}
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-lighter text-gray-900">{Math.round(percentage)}%</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-8 text-center">{label}</p>
    </div>
  );
}

export default function Home() {
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);
  
  const currentDevices = 242;
  const allClear = 236;
  const pendingActions = 4;
  const warnings = 2;

  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log('Export report clicked');
  };

  // Team distribution data
  const teamData = [
    { name: 'Gold', percentage: 42, color: '#f59e0b' },
    { name: 'Blue', percentage: 28, color: '#3b82f6' },
    { name: 'Black', percentage: 18, color: '#6b7280' },
    { name: 'Red', percentage: 12, color: '#ef4444' }
  ];

  // Popular apps data (sorted by popularity)
  const appsData = [
    { name: 'Chrome', percentage: 94, color: '#4285f4' },
    { name: 'Slack', percentage: 89, color: '#4a154b' },
    { name: 'Outlook', percentage: 76, color: '#0078d4' },
    { name: 'Teams', percentage: 67, color: '#6264a7' },
    { name: 'Zoom', percentage: 58, color: '#2d8cff' },
    { name: 'WhatsApp', percentage: 45, color: '#25d366' },
    { name: 'Signal', percentage: 32, color: '#3a76f0' }
  ];

  return (
    <MainLayout>
      <div className="mt-32 space-y-32">
        {/* Hero Section */}
        <div className="text-left pt-16 pb-12">
          <h1 className="text-2xl font-light text-gray-900 mb-12 flex items-center space-x-3">
            <span>236 heartbeats</span>
            <div className="w-2 h-2 rounded-full bg-green-500 heartbeat-pulse"></div>
          </h1>
          <div className="space-y-6">
            <p className="text-lg font-medium text-gray-700">{currentDevices} devices</p>
            <div className="flex items-center text-base">
              <span className="text-green-700 text-sm font-medium">{allClear} all clear</span>
              <div className="w-5 h-px bg-gray-300 mx-4"></div>
              <span className="text-blue-700 text-sm font-medium">{pendingActions} pending actions</span>
              <div className="w-5 h-px bg-gray-300 mx-4"></div>
              <span className="text-yellow-700 text-sm font-medium">{warnings} warnings</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-left">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowOnboardDialog(true)}
              className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Onboard Device</span>
            </button>
            <button 
              onClick={() => handleExportReport()}
              className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* System Health */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">System Health</h3>
            <div className="flex justify-center">
              <RingChart
                percentage={97.5}
                label="OVERALL HEALTH"
                gradientId="systemHealthGradient"
                gradientColors={{ start: "#C1FFA4", end: "#00B54E" }}
                size={180}
              />
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Network Status</h3>
            <div className="flex justify-center">
              <RingChart
                percentage={94.2}
                label="CONNECTIVITY"
                gradientId="networkStatusGradient"
                gradientColors={{ start: "#C1FFA4", end: "#00B54E" }}
                size={180}
              />
            </div>
          </div>

          {/* Popular Apps */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Popular Apps</h3>
            <div className="space-y-3">
              {appsData.map((app, index) => (
                <div key={app.name} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: app.color }}></div>
                    <span className="text-xs text-gray-700">{app.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-gray-200 rounded-full h-1">
                      <div 
                        className="h-1 rounded-full" 
                        style={{ width: `${app.percentage}%`, backgroundColor: app.color }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-900 w-6 text-right">{app.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Team Distribution</h3>
            <div className="flex justify-center mb-4">
              <RingChart
                percentage={teamData[0].percentage}
                label={`${teamData[0].name} Leading`}
                gradientId="teamDistributionGradient"
                gradientColors={{ start: "#FFEEA4", end: "#F4C620" }}
                size={160}
              />
            </div>
            <div className="space-y-2">
              {teamData.map((team) => (
                <div key={team.name} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: team.color }}></div>
                    <span className="text-xs text-gray-700">{team.name}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-900">{team.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.type === 'device' ? 'bg-blue-500' :
                  activity.type === 'user' ? 'bg-green-500' :
                  activity.type === 'app' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboard Device Dialog */}
      {showOnboardDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
            </div>
            
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <img 
                src="/qr.png" 
                alt="Device onboarding QR code"
                className="w-64 h-64 rounded-lg"
              />
            </div>
            
            {/* Explanation Text */}
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-700 font-medium">
                Scan to add device to Delta MDM
              </p>
              <p className="text-xs text-gray-500">
                Once scanned, your device will be automatically added to the roster and configured with the appropriate security policies and applications.
              </p>

            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowOnboardDialog(false)}
                className="px-6 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}