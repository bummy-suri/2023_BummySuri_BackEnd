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
      handleError(error, res);
    }
  };
  
  export const getUserRanking = async (req: Request, res: Response) => {
    try {
      const userId = req.userid;
      const ranking = await getUserRankingService(userId);
      res.status(200).json({ ranking });
    } catch (error) {
      handleError(error, res);
    }
  };
  
  const handleError = (error: any, res: Response) => {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof PrismaError) {
      res.status(503).json({ message: error.message });
      return;
    }
    if (error instanceof AxiosError) {
      res.status(502).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  };

