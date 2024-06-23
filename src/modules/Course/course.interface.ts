import { boolean } from "joi";
import { Types } from "mongoose";

export type TPreRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted?: boolean;
    preRequisiteCourses : [TPreRequisiteCourse]
}

export type TCoursefaculties = {
    course : Types.ObjectId;
    faculties : [Types.ObjectId];
}