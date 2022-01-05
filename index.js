const app = require("./app");

const port = process.env.PORT || 7500;

app.listen(port, () => console.log(`Server running in port: ${port}`));
