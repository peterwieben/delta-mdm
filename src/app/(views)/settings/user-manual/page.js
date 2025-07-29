'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';

export default function UserManualPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/settings')}
            className="text-gray-400 hover:text-black transition-colors"
          >
            ← SETTINGS
          </button>
        </div>

        <div>
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">USER MANUAL</h1>
          <p className="text-sm text-gray-600 mt-2">Complete guide to using Delta MDM</p>
        </div>

        {/* Manual Content */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-8 space-y-12">
            
            {/* Getting Started */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Getting Started</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Delta MDM</strong> provides full spectrum control over your mobile device fleet. 
                  This comprehensive platform allows administrators to manage devices, applications, 
                  security profiles, and user workflows from a single interface.
                </p>
                <p>
                  Upon login, you'll see the dashboard overview showing system health, device status, 
                  and recent activity across your managed fleet.
                </p>
              </div>
            </section>

            {/* Authentication */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Authentication</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Login Process:</strong> Delta MDM uses a two-step authentication process for enhanced security:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Enter your username and password credentials</li>
                  <li>Provide the 6-digit code from your authenticator app</li>
                  <li>Access is granted to the main dashboard</li>
                </ol>
                <p>
                  <strong>Session Management:</strong> Your session persists until you manually logout 
                  or the session expires. Use the profile menu at the bottom of the sidebar to access settings or logout.
                </p>
              </div>
            </section>

            {/* Navigation */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Navigation</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>The main navigation is located in the left sidebar and includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>HOME:</strong> Dashboard overview with system metrics and recent activity</li>
                  <li><strong>DEVICES:</strong> Complete device management with status monitoring and bulk actions</li>
                  <li><strong>APPS:</strong> Application deployment and management across your fleet</li>
                  <li><strong>PROFILES:</strong> Security and configuration profiles for device policies</li>
                  <li><strong>WORKFLOWS:</strong> Automated processes and task management</li>
                  <li><strong>USERS:</strong> User account management and administrator controls</li>
                </ul>
              </div>
            </section>

            {/* Device Management */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Device Management</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Device Overview:</strong> The devices page provides a comprehensive view of all managed devices 
                  with real-time status indicators, profile assignments, and last update timestamps.
                </p>
                
                <p><strong>Device Selection:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Click anywhere on a device row to select/deselect it</li>
                  <li>Use Shift+click to select ranges of devices</li>
                  <li>Use the header checkbox to select/deselect all devices</li>
                  <li>Click the arrow button in the Details column to view individual device information</li>
                </ul>

                <p><strong>Bulk Actions:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Assign Profile:</strong> Apply security or configuration profiles to selected devices</li>
                  <li><strong>Remove Profile:</strong> Remove existing profiles from selected devices</li>
                  <li><strong>Clear Selection:</strong> Deselect all currently selected devices</li>
                </ul>

                <p><strong>Device Details:</strong></p>
                <p>
                  Click the details arrow to view comprehensive device information including status, 
                  profile assignments, last update, and available actions like remote wipe.
                </p>
              </div>
            </section>

            {/* Application Management */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Application Management</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>App Deployment:</strong> Manage application installation and updates across your device fleet. 
                  The apps section shows current deployment status for each application.
                </p>
                
                <p><strong>Status Indicators:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Installed:</strong> App successfully deployed and running</li>
                  <li><strong>Pending:</strong> Installation in progress or queued</li>
                  <li><strong>Failed:</strong> Installation encountered errors - requires attention</li>
                </ul>

                <p><strong>Adding New Apps:</strong></p>
                <p>
                  Use the "Add New" button to deploy additional applications. You can upload custom APK files 
                  or select from the pre-configured app catalog including popular business applications.
                </p>
              </div>
            </section>

            {/* Profile Management */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Profile Management</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Security Profiles:</strong> Create and manage configuration profiles that define 
                  device behavior, security policies, and access controls.
                </p>
                
                <p><strong>Profile Types:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Security:</strong> Password policies, encryption, and access controls</li>
                  <li><strong>WiFi:</strong> Network configurations and access restrictions</li>
                  <li><strong>VPN:</strong> Secure tunnel configurations for remote access</li>
                  <li><strong>Email:</strong> Email account settings and security policies</li>
                </ul>

                <p><strong>Profile Assignment:</strong></p>
                <p>
                  Profiles can be assigned to individual devices or groups. Use the device management 
                  section to apply profiles via bulk actions or assign them during device enrollment.
                </p>
              </div>
            </section>

            {/* Workflow Management */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Workflow Management</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Automated Workflows:</strong> Create multi-step processes that automate common 
                  device management tasks such as device setup, security compliance, and user offboarding.
                </p>
                
                <p><strong>Workflow Types:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Device Setup:</strong> Complete onboarding for new corporate devices</li>
                  <li><strong>Security Compliance:</strong> Automated policy enforcement and compliance checks</li>
                  <li><strong>App Deployment:</strong> Batch installation of corporate applications</li>
                  <li><strong>Device Wipe:</strong> Secure data removal and factory reset procedures</li>
                  <li><strong>User Offboarding:</strong> Remove corporate data and revoke access</li>
                </ul>

                <p><strong>Workflow Status:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Active:</strong> Workflow is enabled and running</li>
                  <li><strong>Draft:</strong> Workflow is being developed or tested</li>
                </ul>
              </div>
            </section>

            {/* User Management */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">User Management</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Administrator Controls:</strong> Manage user accounts and administrative privileges 
                  for your Delta MDM instance.
                </p>
                
                <p><strong>User Roles:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Administrator:</strong> Full access to all features and settings</li>
                  <li><strong>User:</strong> Limited access based on assigned permissions</li>
                </ul>

                <p><strong>User Actions:</strong></p>
                <p>
                  Use the actions menu (⋮) for each user to edit their information or remove them from the system. 
                  The admin toggle switch can quickly enable or disable administrative privileges.
                </p>
              </div>
            </section>

            {/* Dashboard Overview */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Dashboard Overview</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>System Monitoring:</strong> The dashboard provides real-time insights into your 
                  mobile device fleet health and performance.
                </p>
                
                <p><strong>Key Metrics:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>System Health:</strong> Overall platform performance and uptime</li>
                  <li><strong>Network Status:</strong> Connectivity and communication status</li>
                  <li><strong>Popular Apps:</strong> Most deployed applications across your fleet</li>
                  <li><strong>Team Distribution:</strong> Device allocation across different teams/profiles</li>
                </ul>

                <p><strong>Activity Monitoring:</strong></p>
                <p>
                  The recent activity feed shows the latest actions and changes across your managed devices, 
                  including status changes, user additions, app updates, and profile modifications.
                </p>
              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Troubleshooting</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p><strong>Common Issues:</strong></p>
                
                <div className="space-y-3">
                  <div>
                    <p><strong>Device Not Responding:</strong></p>
                    <p className="ml-4 text-gray-600">
                      Check network connectivity and ensure the device has the latest MDM agent installed. 
                      Try refreshing the device status or initiating a remote sync.
                    </p>
                  </div>
                  
                  <div>
                    <p><strong>App Installation Failed:</strong></p>
                    <p className="ml-4 text-gray-600">
                      Verify device compatibility and available storage space. Check that the device 
                      profile allows app installations from your MDM system.
                    </p>
                  </div>
                  
                  <div>
                    <p><strong>Profile Assignment Issues:</strong></p>
                    <p className="ml-4 text-gray-600">
                      Ensure the device is online and can communicate with the MDM server. 
                      Check for conflicting profiles or policy restrictions.
                    </p>
                  </div>
                  
                  <div>
                    <p><strong>Authentication Problems:</strong></p>
                    <p className="ml-4 text-gray-600">
                      Verify your authenticator app is synchronized and generating current codes. 
                      Contact your system administrator if login issues persist.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Support */}
            <section>
              <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Support</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Getting Help:</strong> For additional support or questions not covered in this manual, 
                  contact your system administrator or Delta MDM support team.
                </p>
                
                <p><strong>Best Practices:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Regularly review device status and address any warnings promptly</li>
                  <li>Keep security profiles updated with current organizational policies</li>
                  <li>Monitor app deployment status and resolve failed installations</li>
                  <li>Use workflows to automate repetitive tasks and ensure consistency</li>
                  <li>Regularly review user permissions and administrative access</li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}