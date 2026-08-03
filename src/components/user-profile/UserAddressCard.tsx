"use client";

import React from "react";

export default function UserAddressCard() {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
            Address Information
          </h4>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Country
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                --
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                State
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                --
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                City
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                --
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Postal Code
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                --
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Address
              </p>

              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                Address information is not available.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}