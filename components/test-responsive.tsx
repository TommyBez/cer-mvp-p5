"use client"

export function TestResponsive() {
  return (
    <div className="p-4 space-y-4">
      <div className="block md:hidden bg-red-500 text-white p-4 rounded">
        Mobile View (visible only on screens &lt; 768px)
      </div>
      <div className="hidden md:block bg-blue-500 text-white p-4 rounded">
        Desktop View (visible only on screens &gt;= 768px)
      </div>
      <div className="bg-gray-500 text-white p-4 rounded">
        Current viewport width: Test by resizing browser
      </div>
    </div>
  )
}