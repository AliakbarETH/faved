// src/data/briefs.ts
import { Brief } from '../types';

export const briefs: Record<string, Brief> = {
 GameDesign: {
   type: 'GameDesign',
   keyPoints: [
     'Interactive board demonstrations',
     'Screen recording quality',
     'Clear feature explanations'
   ],
   requirements: {
     mandatory: [
       'Show animated logo on introduction',
       'Display Milanote boards in screen recording',
       'Demonstrate interactive features',
       'Include call-to-action with signup link'
     ],
     optional: [
       'Show template examples',
       'Demonstrate collaboration features',
       'Include workflow examples'
     ]
   },
   guidelines: [
     'Focus on visual demonstrations over verbal explanations',
     'Keep integration natural within content flow',
     'Maintain high quality screen recordings'
   ]
 },
 
 VisualCreator: {
   type: 'VisualCreator', 
   keyPoints: [
     'Creative project organization',
     'Visual inspiration collection',
     'Collaboration workflows'
   ],
   requirements: {
     mandatory: [
       'Show actual project boards',
       'Demonstrate web clipper tool',
       'Include clear CTA',
       'Show board nesting feature'
     ],
     optional: [
       'Show mobile usage',
       'Demonstrate real-time collaboration',
       'Show integration with other tools'
     ]
   },
   guidelines: [
     'Focus on visual creative process',
     'Show real project examples',
     'Demonstrate practical usage'
   ]
 }
};

export const getBriefByType = (type: Brief['type']): Brief => {
 const brief = briefs[type];
 if (!brief) {
   throw new Error(`Brief not found for type: ${type}`);
 }
 return brief;
};