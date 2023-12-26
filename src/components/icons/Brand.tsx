import Link from "next/link"

export default function Brand({ href, logo, styles }: {href: string, logo: any, styles?: string}) {
    return (
        <Link href={href} className={styles}>
            {logo}
        </Link>
    )
}