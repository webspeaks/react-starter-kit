export default [
  {
    file: "./routes/Root.jsx",
    children: [
      {
        file: "./routes/Home.jsx",
        index: true,
      },
      {
        path: "projects",
        file: "./routes/Projects.jsx",
      },
      // Add more routes here as children to be wrapped with RootLayout
    ],
  },
];
