import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardNavigation } from '../components/dashboard/DashboardNavigation';
import { RepositoryList } from '../components/dashboard/RepositoryList';
import {GettingStartedGuide} from '../components/dashboard/StartedGuide';
import { ApiKeySettings } from '../components/dashboard/ApiKeySettings';
import { GitTokenSettings } from '../components/dashboard/GitTokenSettings';
import { AddRepositoryModal } from '../components/dashboard/AddRepositoryModal';
import { Footer } from '../components/layout/Footer';
import { NotificationContainer } from '../components/notifications/NotificationContainer';
import { useNotification } from '../hooks/useNotification';

export function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [repoRefreshTrigger, setRepoRefreshTrigger] = useState(0);
  const { notifications, removeNotification, showSuccess, showError } = useNotification();

   const handleRepositoryAdded = () => {

    setRepoRefreshTrigger(prev => prev + 1);

  };
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col">
          <DashboardHeader 
            onMenuClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
          <div className="flex-1 flex flex-col lg:flex-row">
            <DashboardNavigation 
              isOpen={isMobileNavOpen}
              onClose={() => setIsMobileNavOpen(false)}
            />
            <main className="flex-1 bg-white">
              <div className="container ">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                      <div className="mx-auto px-4 sm:px-6 py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
                          <h1 className="text-2xl font-bold text-gray-900">Repositories</h1>
                          <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                          >
                            <span>Add Repository</span>
                          </button>
                        </div>
                        <RepositoryList  refreshTrigger={repoRefreshTrigger} />
                          </div>
                      </>
                    }
                  />
                  <Route path="/git-token" element={<GitTokenSettings />} />
                  <Route path="/api-key" element={<ApiKeySettings />} />
                    <Route path="/getting-started" element={<GettingStartedGuide />} />
                </Routes>
              </div>
            </main>
          </div>
          <Footer isDark={true} />
          <AddRepositoryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            showSuccess={showSuccess}
            showError={showError}
            onRepositoryAdded={handleRepositoryAdded}
          />
          <NotificationContainer
            notifications={notifications}
            onClose={removeNotification}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}