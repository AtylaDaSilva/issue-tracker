import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TooltipType } from "@/utils/types";

export default function BSTooltip({ id, placement, title, children }: TooltipType) {
    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id={id}>{title}</Tooltip>}
        >
            {children}
        </OverlayTrigger>
    );
}