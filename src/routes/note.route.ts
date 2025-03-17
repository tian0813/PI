import { Router } from 'express';
import NoteController from '../controllers/note.controller';
import NoteService from '../services/note.service';
import NoteRepository from '../repositories/note.repository';
import { PrismaClient } from '@prisma/client';

const router = Router();

export default router;
