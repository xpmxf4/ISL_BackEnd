const app = require("./app");
const port = provess.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port} on Local Environment`));