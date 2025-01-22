export interface Brief {
    type: 'GameDesign' | 'VisualCreator' | 'Filmmaking' | 'LogoDesign' | 'BookTuber';
    keyPoints: string[];
    requirements: {
      mandatory: string[];
      optional: string[];
    };
    guidelines: string[];
  }
  
  export interface Submission {
    content: string;
    type: 'topic' | 'script' | 'video';
    briefType: Brief['type'];
  }
  
  export interface FeedbackResult {
    status: 'approved' | 'needs_revision';
    feedback: string;
    matchedPoints: string[];
    missingPoints: string[];
    suggestions: string[];
  }
  
  export interface ValidationResult {
    passed: string[];
    failed: string[];
    warnings: string[];
  }