import Link from "next/link"

export default function Brand() {
    return (
        <Link href='/' className="text-white">
            <div
                style={{ height: "50px", width: "50px" }}
                className="bg-success rounded-5"
            >
                Brand
            </div>
        </Link>
    )
}