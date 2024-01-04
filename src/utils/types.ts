import { ObjectId, MongoClient } from 'mongodb';

export type MongoDBConnection = {
    client: MongoClient | null,
    db: any
}

export type Card = {
    _id: string | ObjectId,
    project_id: string | ObjectId,
    name: string,
    status: "open" | "resolved" | "wontdo",
    priority: number | string,
    severity: number | string,
    list: string,
    labels: string[]
    members: string[]
    due_date: string
}

export type Project = {
    _id: string | ObjectId,
    name: string,
    user_id: string | ObjectId
}

export type TooltipType = {
    id?: string,
    placement: "top" | "bottom" | "left" | "right",
    title: string,
    children?: any
}

export type PopoverType = {
    trigger: JSX.Element,
    header?: JSX.Element | string | null,
    body: JSX.Element,
    options: {
        triggerBehaviour: 'hover' | 'click',
        placement: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
    }
}

export type FormModal = {
    trigger: JSX.Element,
    fields: JSX.Element[],
    handleSubmit: (formData: any) => Promise<any>,
    triggerOptions?: {
        styles?: string,
        tooltip?: TooltipType
    }
    modalOptions?: {
        size?: "sm" | "lg" | "xl"
        centered?: boolean,
        headerText?: string,
        footerButttonText?: string
    }
}

export type ConfirmModal = {
    trigger: JSX.Element,
    message: string,
    params?: any,
    handleSubmit: (params: any | undefined) => Promise<void>,
    triggerOptions?: {
        styles?: string,
        tooltip?: TooltipType
    },
    modalOptions?: {
        size?: "sm" | "lg" | "xl",
        centered?: boolean,
        modalTitle?: string
    }
}

export type ProjectIcon = {
    projectId: string,
    styles: string,
    icon: JSX.Element,
    tooltipOptions?: TooltipType
}

export type Avatar = {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    },
    styles?: string
}