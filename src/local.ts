import { createApp } from "app";

const app = await createApp()

const port = 3000

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});  
