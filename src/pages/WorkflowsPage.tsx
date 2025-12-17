import React from 'react';
import { WorkflowsScreen } from '../features/workflows/ui/WorkflowsScreen';

/**
 * WorkflowsPage (Route Component)
 * 
 * Responsibility:
 * 1. Read route parameters (useParams, useSearchParams)
 * 2. Check route-level permissions
 * 3. Layout composition (if different from MainLayout)
 * 4. Render the specific Feature Screen
 */
export const WorkflowsPage: React.FC = () => {
  return <WorkflowsScreen />;
};