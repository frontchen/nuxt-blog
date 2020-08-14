module.exports = {
  apps: [
    {
      name: "blogServices",
      script: "./bin/www",
      watch: true,
      env_development: {
        PORT: 5000,
        NODE_ENV: "development"
      },
      env_uat: {
        PORT: 3030,
        NODE_ENV: "uat"
      },
      env_production: {
        PORT: 80,
        NODE_ENV: "production"
      }
    }
  ]
};
