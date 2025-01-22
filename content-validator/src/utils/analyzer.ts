// src/utils/analyzer.ts
import { Brief, Submission, FeedbackResult } from '../types';

export class ContentAnalyzer {
  private createAnalysisPrompt(content: string, brief: Brief): string {
    return `
      Analyze this content:
      "${content}"
      
      Against these requirements:
      ${JSON.stringify(brief.requirements)}
      
      Provide analysis in JSON:
      {
        "status": "approved" or "needs_revision",
        "matchedPoints": [],
        "missingPoints": [],
        "suggestions": [],
        "feedback": ""
      }
    `;
  }

// src/utils/analyzer.ts
async analyzeContent(submission: Submission, brief: Brief): Promise<FeedbackResult> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
          messages: [{ 
            role: 'user', 
            content: this.createAnalysisPrompt(submission.content, brief) 
          }]
        })
      });

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      // Parse the response content
      const analysisResult = JSON.parse(result.content);
      
      return {
        status: analysisResult.status || 'needs_revision',
        feedback: analysisResult.feedback || '',
        matchedPoints: analysisResult.matchedPoints || [],
        missingPoints: analysisResult.missingPoints || [],
        suggestions: analysisResult.suggestions || []
      };

    } catch (error) {
      console.error('Analysis error:', error);
      return {
        status: 'needs_revision',
        feedback: 'Analysis failed',
        matchedPoints: [],
        missingPoints: [],
        suggestions: []
      };
    }
  }
}