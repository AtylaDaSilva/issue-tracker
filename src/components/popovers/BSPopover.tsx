"use client";
import { Popover, OverlayTrigger } from "react-bootstrap";
import type { PopoverType } from "@/utils/types";
import { nanoid } from "nanoid";

export default function BSPopover({ trigger, header, body, options }: PopoverType) {
    const popover = (
        <Popover id={nanoid()}>
            {
                (header)
                    ? <Popover.Header as="div">
                        {header}
                      </Popover.Header>
                    : null
            }
            <Popover.Body>
                {body}
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger
            trigger={options.triggerBehaviour}
            placement={options.placement}
            overlay={popover}
        >
            {trigger}
        </OverlayTrigger>
    );
}