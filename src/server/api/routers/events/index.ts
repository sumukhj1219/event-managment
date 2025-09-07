import { createTRPCRouter } from "../../trpc";
import { analyzeRouter } from "./analyze/analyze";
import { createRouter } from "./create/create";
import { getEventByIdRouter } from "./get-event-by-id/get-event-by-id";
import { getEventsRouter } from "./get-events/get-events";

export const eventsRouter = createTRPCRouter({
    createRouter,
    getEventsRouter,
    getEventByIdRouter,
    analyzeRouter
})