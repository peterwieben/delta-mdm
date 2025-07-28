'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';

const workflowsData = [
  {
    id: 1,
    workflowName: 'Device Setup',
    description: 'Complete onboarding workflow for new corporate devices',
    actions: 8,
    status: 'Active',
    lastModified: '2025-07-25',
  },
  {
    id: 2,
    workflowName: 'Security Compliance',
    description: 'Enforce security policies and compliance checks',
    actions: 12,
    status: 'Active',
    lastModified: '2025-07-24',
  },
  {
    id: 3,
    workflowName: 'App Deployment',
    description: 'Batch installation of corporate applications',
    actions: 6,
    status: 'Draft',
    lastModified: '2025-07-23',
  },
  {
    id: 4,
    workflowName: 'Device Wipe',
    description: 'Complete device data wipe and factory reset',
    actions: 4,
    status: 'Active',
    lastModified: '2025-07-22',
  },
  {
    id: 5,
    workflowName: 'User Offboarding',
    description: 'Remove corporate data and revoke access',
    actions: 10,
    status: 'Active',
    lastModified: '2025-07-21',
  },
];

export default function WorkflowsPage() {
  const router = useRouter();

  const handleWorkflowClick = (workflowId) => {
    router.push(`/workflows/${workflowId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">WORKFLOWS</h1>
          <button className="bg-black text-white px-4 py-2 rounded text-xs font-medium flex items-center space-x-1 hover:bg-gray-800 transition-colors cursor-pointer">
            <span className="text-sm">+</span>
            <span>Add Workflow</span>
          </button>
        </div>

        {/* Workflows Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Workflow Name
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Description
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Actions
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Last Modified
                  </th>
                </tr>
              </thead>
              <tbody>
                {workflowsData.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-white hover:font-medium cursor-pointer" onClick={() => handleWorkflowClick(workflow.id)}>
                    <td className="py-4 text-sm text-gray-900">
                      {workflow.workflowName}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {workflow.description}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {workflow.actions}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        workflow.status === 'Active' 
                          ? 'bg-green-200 text-green-800'
                          : workflow.status === 'Draft'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {workflow.lastModified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}