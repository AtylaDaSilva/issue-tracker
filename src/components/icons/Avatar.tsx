import type { Avatar } from "@/utils/types"
import { Button } from "react-bootstrap"
import BSPopover from "../popovers/BSPopover"
import BSTooltip from "../tooltips/BSTooltip"
import Link from "next/link"

export default async function Avatar({ styles, user }: Avatar) {
    return (
        <BSPopover
            trigger={
                <div className={styles}>
                    <i className="bi bi-person-fill"></i>
                </div>
            }
            header={<h6>{user?.name}</h6>}
            body={
                <BSTooltip
                    title="Sign Out"
                    placement="right"
                >
                    <Link href="/api/auth/signout">
                        <Button variant="danger">
                            <i className="bi bi-power"></i>
                        </Button>
                    </Link>
                </BSTooltip>
            }
            options={{
                triggerBehaviour: "click",
                placement: "right"
            }}
        />
    )
}