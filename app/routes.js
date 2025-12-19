export default [
  {
    file: "./routes/root.jsx",
    children: [
      {
        file: "./routes/home.jsx",
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
