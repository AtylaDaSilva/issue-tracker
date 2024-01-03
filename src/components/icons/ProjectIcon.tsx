import Link from "next/link";
import BSTooltip from "../tooltips/BSTooltip";
import type { ProjectIcon } from "@/utils/types";

import { nanoid } from "nanoid";

export default function ProjectIcon({ projectId, styles, icon, tooltipOptions }: ProjectIcon) {
    
    return (
        <>
            {
                tooltipOptions !== undefined
                    ? <BSTooltip
                        id={nanoid()}
                        placement={tooltipOptions.placement}
                        title={tooltipOptions.title}
                    >
                        <Link
                            href={`/projects/${projectId}`}
                            className={styles}
                        >
                            {icon}
                        </Link>
                    </BSTooltip>
                    : <Link
                        href={`/projects/${projectId}`}
                        className={styles}
                    > {icon} </Link>
            }
        </>
    );
}