'use client'

import PunjabEmblem from './PunjabEmblem'

export default function GovernmentFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left side - Punjab Government logo */}
          <div className="flex items-center space-x-3">
            <PunjabEmblem size="sm" />
            <span className="text-sm font-medium">
              Govt. of Punjab
            </span>
          </div>

          {/* Center - Project description */}
          <div className="text-center">
            <p className="text-sm font-medium mb-1">
              Surakshya Sarthi
            </p>
            <p className="text-xs text-indigo-200">
              An initiative of Govt. of Punjab, Department of Higher Education
            </p>
          </div>

          {/* Right side - Copyright */}
          <div className="text-right">
            <p className="text-xs text-indigo-200">
              © {currentYear} Govt. of Punjab
            </p>
            <p className="text-xs text-indigo-200">
              All Rights Reserved
            </p>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-6 pt-4 border-t border-indigo-400">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs text-indigo-200 mb-2">
              Developed for the students of Punjab to enhance disaster preparedness and safety awareness
            </p>
            <p className="text-xs text-indigo-300 font-medium">
              Developed by ResQTech
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
