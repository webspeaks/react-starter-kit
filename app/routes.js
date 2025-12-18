export default [
  {
    file: "./routes/root.jsx",
    children: [
      {
        file: "./routes/_index/home.jsx",
        index: true,
      },
      // Add more routes here as children to be wrapped with RootLayout
    ],
  },
];
