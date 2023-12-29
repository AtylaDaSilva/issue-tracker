import type { Avatar } from "@/utils/types"

export default function Avatar({ styles } : Avatar) {
    return (
        <div
            className={styles}
        >
            <i className="bi bi-person-fill"></i>
        </div>
    )
}