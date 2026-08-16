import React from 'react';
import { AlertTriangle, Info, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ApiLimitationsBanner() {
  return (
    <div id="api-limitations-banner" className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 mb-6 text-amber-900 dark:text-amber-200 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-700 dark:text-amber-300 self-start">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1.5 flex items-center gap-2">
            Official Instagram/Meta API Compliance & Safety notice
          </h3>
          <p className="text-sm leading-relaxed mb-4 text-amber-800 dark:text-amber-300">
            <strong>Important notice:</strong> This application is built in strict compliance with the official Meta Graph API and Terms of Service. Unofficial APIs, scraping, Selenium, or password sharing are prohibited.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3 bg-white/60 dark:bg-black/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
            <div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                ✓ What is Officially Supported:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Secure OAuth authentication with Meta Developers.</li>
                <li>Retrieving authenticated username, user ID, profile metrics.</li>
                <li>Safe developer testing under Sandbox compliance rules.</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-1">
                ✕ Not Supported by Official API (Deprecated):
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-normal mb-1">
                This operation is currently not supported by the official Instagram API.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Retrieving the following lists of users (deprecated in 2018).</li>
                <li>Executing automated follow/unfollow API actions on behalf of users.</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-medium bg-amber-100/50 dark:bg-amber-900/20 px-3 py-1.5 rounded-md w-fit">
            <ShieldCheck className="h-4 w-4" />
            <span>Developer Note: This tool runs a safe local simulation sandbox to demonstrate compliance structures.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
