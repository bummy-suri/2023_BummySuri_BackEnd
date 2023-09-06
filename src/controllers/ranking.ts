import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { getTop10RankingsService, getUserRankingService } from "../services";

export const getTop10Ranking= async (req: Request, res: Response) => {
    try {
      const top10Rankings = await getTop10RankingsService();
      res.status(200).json(top10Rankings);
    } catch (error) {
      if (error instanceof ZodError) {
          res.status(400).send(error.message);
          return
      }
      if (error instanceof PrismaError) {
          res.status(503).send(error.message);
          return
      }
      if (error instanceof AxiosError) {
          res.status(502).send(error.message);
          return
      }
      if (error instanceof Error) {
          res.status(500).send(error.message);
          return
      }      
    }
  };
  
  export const getUserRanking = async (req: Request, res: Response) => {
    try {
      const userId = req.userid;
      const ranking = await getUserRankingService(userId);
      res.status(200).json({ ranking });
    } catch (error) {
      if (error instanceof ZodError) {
          res.status(400).send(error.message);
          return
      }
      if (error instanceof PrismaError) {
          res.status(503).send(error.message);
          return
      }
      if (error instanceof AxiosError) {
          res.status(502).send(error.message);
          return
      }
      if (error instanceof Error) {
          res.status(500).send(error.message);
          return
      }      
    }
  };

