import 'dotenv/config';
import { drizzle_db } from '../lib/db';
import { contentPlaylists } from '../lib/schema';

const existingPlaylists = [
    {
        title: "Learn Web Basics (HTML CSS JAVASCRIPT)",
        playlistId: "PLJyFRzU1s7WMjVtgf_2l_GqdOmtDMILpD",
        descriptionId: "basics",
        category: "language"
    },
    {
        title: "Learn React For Front End",
        playlistId: "PLJyFRzU1s7WNTrNnKqZDRE6e0ADx8z13B",
        descriptionId: "react",
        category: "framework"
    },
    {
        title: "Learn NodeJS For Back End",
        playlistId: "PLJyFRzU1s7WMgNdCvOZOl_Or81989FM8b",
        descriptionId: "node",
        category: "framework"
    },
    {
        title: "Learn NextJS Fullstack Framework",
        playlistId: "PLJyFRzU1s7WPeCHzbnoA40ippYih4e-Dk",
        descriptionId: "nextjs",
        category: "framework"
    },
    {
        title: "Learn MySQL Database",
        playlistId: "PLJyFRzU1s7WMiZCC52Luup-QrU6biwe8N",
        descriptionId: "mysql",
        category: "tool"
    },
    {
        title: "Learn Devvit For Reddit Apps",
        playlistId: "PLJyFRzU1s7WPnSkOftykpVXeRSf2qH80x",
        descriptionId: "devvit",
        category: "tool"
    },
];

async function seed() {
    try {
        console.log("Seeding content playlists...");

        for (const playlist of existingPlaylists) {
            await drizzle_db.insert(contentPlaylists).values(playlist).onConflictDoNothing();
            console.log(`Inserted: ${playlist.title}`);
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding playlists:", err);
        process.exit(1);
    }
}

seed();
