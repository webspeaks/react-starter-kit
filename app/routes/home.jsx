export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
      <p className="mt-2 text-gray-600">This is a demo placeholder page.</p>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900">Dummy content</h2>
        <p className="mt-2 text-sm text-gray-600">
          Replace this section with your real homepage content. For now it
          includes a couple of blocks to show spacing and typography.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">Card A</div>
            <div className="mt-1 text-sm text-gray-600">
              Some example text to fill space.
            </div>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">Card B</div>
            <div className="mt-1 text-sm text-gray-600">
              Another block of placeholder content.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
