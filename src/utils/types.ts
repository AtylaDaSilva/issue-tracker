import { ObjectId, MongoClient } from 'mongodb';
import { StyleHTMLAttributes } from 'react';

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
    list: string,
    labels: string,
    created_at: string,
    due_date: string
}

export type Project = {
    _id: string | ObjectId,
    name: string,
    user_id: string | ObjectId
}

export type TriggerOptions = {
    styles?: string,
    tooltip?: TooltipType
}

export type ModalHeaderButton = {
    trigger: JSX.Element
}

export type ModalOptions = {
    size?: "sm" | "lg" | "xl",
    centered?: boolean,
    modalTitle?: string,
    footerButttonText?: string,
    refreshRouterOnSubmit?: boolean,
    headerButtons?: ModalHeaderButton[]
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
    fields: ModalField[][],
    handleSubmit: (formData: any) => Promise<any>,
    triggerOptions?: TriggerOptions,
    modalOptions?: ModalOptions
}

export type ModalField = {
    accept?: string,
    alt?: string,
    autocapitalize?: string,
    autocomplete?: string,
    capture?: string,
    checked?: boolean,
    col?: number,
    dirname?: string,
    disabled?: boolean,
    form?: string,
    formaction?: string,
    formenctype?: string,
    formmethod?: string,
    formnovalidate?: boolean,
    formtarget?: string,
    group?: any,
    hidden?: boolean,
    id?: string,
    inline?: boolean,
    inputGroupSize?: "sm" | "lg",
    label?: string,
    list?: string,
    max?: number,
    maxlength?: string,
    min?: number,
    minlength?: string,
    multiple?: boolean,
    name?: string,
    pattern?: string,
    placeholder?: string,
    placement?: "right" | "left",
    popovertarget?: string,
    popovertargetaction?: string,
    options?: SelectOptions[],
    readonly?: boolean,
    required?: boolean,
    reverse?: boolean,
    selectSize?: "sm" | "lg",
    size?: number,
    step?: number,
    type: "text" | "email" | "password" | "number" | "date" | "time" | "datetime-local" | "textarea" | "select" | "radio" | "checkbox" | "inputgroup" | "range" | "switch",
    value?: string
    width?: number
}

export type SelectOptions = { label: string | number, value: string | number, selected?: boolean };

export type ConfirmModal = {
    trigger: JSX.Element,
    message: string,
    params?: any,
    handleSubmit: (params: any | undefined) => Promise<void>,
    triggerOptions?: TriggerOptions,
    modalOptions?: ModalOptions
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

export type List = {
    _id?: string | ObjectId,
    user_id?: string | ObjectId
    name?: string,
}

export type TableData = {
    data: any,
    styles?: any,
    colSpan?: number
}

export type TableModal = {
    trigger: JSX.Element,
    triggerOptions: TriggerOptions,
    modalOptions?: ModalOptions,
    tableData: {
        header: TableData[][]
        body: TableData[][]
    }
}

export type Label = {
    _id?: string | ObjectId,
    user_id?: string | ObjectId,
    name?: string
}