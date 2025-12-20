export function meta() {
  return [
    { title: "Projects | App Name" },
    { name: "description", content: "View and manage your projects" },
  ];
}

import { requireAuthToken } from "../server/auth";

export async function loader({ request }) {
  requireAuthToken(request);
  return null;
}

export default function Projects() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Projects</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          This is a placeholder for the Projects page. You can add your project
          content here.
        </p>
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
