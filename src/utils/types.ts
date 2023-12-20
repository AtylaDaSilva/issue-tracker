import { ObjectId, MongoClient } from 'mongodb';
import { FunctionComponent } from 'react';

export type MongoDBConnection = {
    client: MongoClient | null,
    db: any
}

export type Card = {
    _id: ObjectId,
    name: string,
    priority: number | string,
    severity: number | string,
    list: string,
    labels: string[]
    members: string[]
    due_date: string
}

export type Project = {
    _id: ObjectId,
    name: string,
    cards: Card[]
}

export type Cards = Card[];

export type FormModal = {
    trigger: JSX.Element,
    fields: JSX.Element[],
    handleSubmit: (formData: any) => Promise<any>,
    modalOptions?: {
        size?: "sm" | "lg" | "xl"
        centered?: boolean,
        modalTitle?: string,
        headerText?: string,
        footerButttonText?: string
    }
}