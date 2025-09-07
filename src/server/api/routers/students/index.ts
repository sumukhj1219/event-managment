import { createTRPCRouter } from "../../trpc";
import { registerRouter } from "./register/register";
import { totalRegisteredStudents } from "./totalRegisteredStudents/totalRegisteredStudents";

export const studentsRouter = createTRPCRouter({
    registerRouter,
    totalRegisteredStudents
})