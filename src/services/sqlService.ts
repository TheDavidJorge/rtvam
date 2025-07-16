import { db } from '@/config/sql-database';
import { toast } from "@/hooks/use-toast";
import { Post, Comment } from './types';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
