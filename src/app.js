import express from "express";
import fs from 'node:fs/promises';
import { html2pdf } from "html2pdf-ts";

const app = express();
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const html = await fs.readFile("./src/templates/basic-invoice.html", "utf8");

    const options = {
        format: 'A4',
        filePath: './public/example.pdf',
        landscape: false,
        resolution: {
            height: 1920,
            width: 1080,
        },
    }

    try {
        await html2pdf.createPDF(html, options);
        res.send("Documento generado!");        
    } catch (error) {
        res.send(`Error: ${error.message}`);
    }
});

export default app;
