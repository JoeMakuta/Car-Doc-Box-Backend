import App from "./app";

const app: App = new App();

app.init();

app.server.listen(process.env.PORT, () => {
  console.log("Server started at : http://localhost:" + process.env.PORT);
});

export default app;
