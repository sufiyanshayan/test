import React from 'react';
import { 
  HelpCircle, 
  ExternalLink, 
  Code, 
  Settings, 
  AlertTriangle, 
  ShieldCheck, 
  Info,
  Server
} from 'lucide-react';

export default function HelpView() {
  return (
    <div id="help-view-container" className="max-w-4xl mx-auto space-y-6">
      
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-purple-500" />
          Setup & API configuration Guide
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Follow these structured instructions to configure your custom Meta Developer application keys, link official redirect URLs, define environment parameters, and operate your secure client-server unfollow batch auditing manager.
        </p>
      </div>

      {/* 1. CURRENT INSTAGRAM API LIMITATIONS */}
      <div id="current-instagram-api-limitations" className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-base text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-rose-500" />
          Current Instagram API Limitations
        </h3>
        
        <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Before integrating credentials, developers and operators must recognize the explicit boundaries of the official Instagram platform endpoints. Meta deprecates legacy endpoints to prevent spam and preserve privacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/80 dark:bg-slate-900/50 border border-rose-100 dark:border-rose-900/30 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b pb-1">
                ✓ Available Official Features
              </span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Secure Authorization (OAuth 2.0):</strong> Users can authorize application links via official popups.</li>
                <li><strong>Profile Metrics:</strong> Access to account username, category, post metrics, and basic developer profiles.</li>
                <li><strong>Content Delivery:</strong> Query and fetch media assets, counts, captions, and comments on user-created nodes.</li>
              </ul>
            </div>

            <div className="p-4 bg-white/80 dark:bg-slate-900/50 border border-rose-100 dark:border-rose-900/30 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b pb-1">
                ✕ Non-Supported / Deprecated Features
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                <li><strong>Retrieving Following Lists:</strong> Retrieving lists of users followed by the owner is deprecated (since 2018).</li>
                <li><strong>Automated Follow / Unfollow:</strong> Programmatic follow or unfollow operations have been entirely shut down in order to prevent bots.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Application Architecture Solution:</strong> This manager implements a safe Sandbox compliance emulation layer. It displays a highly realistic sandbox following audit list (50+ mock users), supporting the 50-batch limit selector, detailed history tracking logs, and a step-by-step interactive simulation progress engine.
            </span>
          </div>
        </div>
      </div>

      {/* 2. Step-by-Step Instructions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Settings className="h-5 w-5 text-purple-500" />
          End-to-End Application Setup Setup Instructions
        </h3>

        <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400">
          
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
              Create Meta Developer Application
            </h4>
            <p className="pl-6 leading-relaxed">
              Log in to the <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline inline-flex items-center gap-0.5">Meta Developers Dashboard <ExternalLink className="h-3 w-3" /></a>. Click "Create App", select "Other" or "Consumer", and choose "Instagram Basic Display API". Define your app name and set standard security parameters.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
              Configure Instagram Basic Display API
            </h4>
            <p className="pl-6 leading-relaxed">
              In your newly created app, navigate to "Instagram Basic Display" inside the left sidebar. Scroll down and click "Set Up". Click "Create New App" to generate your safe development sandboxed Instagram app reference.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
              Configure OAuth Redirect URIs
            </h4>
            <p className="pl-6 leading-relaxed">
              In the Instagram Basic Display settings page, configure the three required OAuth redirect parameters:
            </p>
            <ul className="list-disc pl-11 space-y-1.5 font-mono text-[11px] text-slate-500">
              <li><strong>Valid OAuth Redirect URIs:</strong> <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-purple-500">https://your-preview-url.run.app/auth/callback</code></li>
              <li><strong>Deauthorize Callback URL:</strong> <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-purple-500">https://your-preview-url.run.app/auth/deauthorize</code></li>
              <li><strong>Data Deletion Request URL:</strong> <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-purple-500">https://your-preview-url.run.app/privacy</code></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">4</span>
              Add Sandbox Test Users
            </h4>
            <p className="pl-6 leading-relaxed">
              Under Meta Settings, scroll to "User Roles" and add "Instagram Testers". Enter the real Instagram username of your test account. Go to the <a href="https://www.instagram.com/accounts/manage_access/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline inline-flex items-center gap-0.5">Instagram Apps Settings <ExternalLink className="h-3 w-3" /></a> page on your test account and click "Accept" under the pending Testers tab.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">5</span>
              Configure Environment Variables in AI Studio
            </h4>
            <p className="pl-6 leading-relaxed">
              Navigate to the secrets config inside AI Studio or update your local <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded">.env</code> file with the App ID and Secret from the Meta Dashboard:
            </p>
            <pre className="ml-6 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-[10px] text-slate-500 whitespace-pre">
{`INSTAGRAM_APP_ID="your_instagram_app_id_here"
INSTAGRAM_APP_SECRET="your_instagram_app_secret_here"
INSTAGRAM_REDIRECT_URI="https://your-app-run.app/auth/callback"
DATABASE_URL="postgresql://username:password@host/db_name"`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">6</span>
              Install Dependencies & Launch
            </h4>
            <p className="pl-6 leading-relaxed">
              Run <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono">npm install</code> to configure node modules. Spin up the Express development server utilizing <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono">npm run dev</code>. The server mounts the secure backend and proxies client assets.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-[10px] font-bold">7</span>
              Connect and Test Execution
            </h4>
            <p className="pl-6 leading-relaxed">
              Click the "Connect Instagram API" button on the dashboard. Complete the safe authorization popup. After authorization is verified, the dashboard fetches the user profiles. Audit lists, select batches, confirm safety, and inspect real-time progress.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
