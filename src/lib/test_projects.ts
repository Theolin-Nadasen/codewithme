import 'dotenv/config';
import { getAllProjects } from '../actions/projects';

async function main() {
    try {
        console.log("Fetching projects...");
        const projects = await getAllProjects();
        console.log("Projects fetched successfully:", JSON.stringify(projects, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error fetching projects:", err);
        process.exit(1);
    }
}

main();
