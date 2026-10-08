import { useParams } from "react-router-dom";

function ProjectDetails() {
    const { projectId } = useParams();

    return (
        <main>
            <h1>{projectId}</h1>

            <p>Project details coming soon.</p>
        </main>
    );
}

export default ProjectDetails;