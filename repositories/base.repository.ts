import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository {
    constructor(protected prisma: PrismaClient) {}
}
