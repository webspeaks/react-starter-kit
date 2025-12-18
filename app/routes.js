export default [
  {
    file: "./routes/root.jsx",
    children: [
      {
        file: "./routes/_index/home.jsx",
        index: true,
      },
      {
        path: "projects",
        file: "./routes/projects.jsx",
      },
      // Add more routes here as children to be wrapped with RootLayout
    ],
  },
];
