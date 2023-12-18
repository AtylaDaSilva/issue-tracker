import type { ProjectParams } from "@/utils/types";
import Link from "next/link";

export default function ProjectIcon({ projectId, projectName}: projectParams) {
    return (
        <Link
            href={`/projects/${projectId}`}
            style={{ width: "50px", height: "50px" }}
            className="rounded-5 bg-primary my-2"
        >
            {projectName}
        </Link>
    )
}