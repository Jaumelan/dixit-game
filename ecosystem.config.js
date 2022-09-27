module.exports = {
  apps: [
    {
      name: "Backend",
      script: "index.js",
      cwd: "./server/dist",
    },
    {
      name: "Frontend",
      script: "main.js",
      cwd: "./web/build",
    },
  ],
};
