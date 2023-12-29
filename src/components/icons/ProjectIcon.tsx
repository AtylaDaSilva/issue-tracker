import Link from "next/link";
import BSTooltipOverlay from "../tooltips/BSTooltip";
import type { ProjectIcon } from "@/utils/types";

import { nanoid } from "nanoid";

export default function ProjectIcon({ projectId, styles, icon, tooltipOptions }: ProjectIcon) {
    
    return (
        <>
            {
                tooltipOptions !== undefined
                    ? <BSTooltipOverlay
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
                    </BSTooltipOverlay>
                    : <Link
                        href={`/projects/${projectId}`}
                        className={styles}
                    > {icon} </Link>
            }
        </>
    );
}