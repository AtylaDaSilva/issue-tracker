import { ObjectId } from 'mongodb';

export type ProjectParams = {
    projectId: string[],
    projectName: string
};

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
    project_id: number,
    name: string,
    cards: Card[]
}

export type Cards = Card[];