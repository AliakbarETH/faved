// src/pages/api/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentAnalyzer } from '@/utils/analyzer';
import { getBriefByType } from '@/data/briefs';
import { FeedbackResult } from '@/types';

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<FeedbackResult | { error: string }>
) {
 if (req.method !== 'POST') {
   return res.status(405).json({ error: 'Method not allowed' });
 }

 try {
   const { content, briefType } = req.body;
   const brief = getBriefByType(briefType);
   
   const analyzer = new ContentAnalyzer();
   const feedback = await analyzer.analyzeContent({ content, type: 'script', briefType }, brief);
   
   res.status(200).json(feedback);
 } catch (error) {
   res.status(500).json({ error: 'Error analyzing content' });
 }
}