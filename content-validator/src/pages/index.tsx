// src/pages/index.tsx 
import { useState } from 'react';
import { Brief, Submission, FeedbackResult } from '../types';
import { getBriefByType } from '../data/briefs';

export default function Home() {
 const [content, setContent] = useState('');
 const [briefType, setBriefType] = useState<Brief['type']>('GameDesign');
 const [loading, setLoading] = useState(false);
 const [feedback, setFeedback] = useState<FeedbackResult | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
   try {
     const response = await fetch('/api/analyze', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ content, briefType }),
     });
     const data = await response.json();
     setFeedback(data);
   } catch (error) {
     console.error(error);
   }
   setLoading(false);
 };

 return (
   <div className="container mx-auto p-6">
     <h1 className="text-3xl font-bold mb-6">Content Validator</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="space-y-6">
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium mb-2">Brief Type</label>
             <select 
               value={briefType}
               onChange={(e) => setBriefType(e.target.value as Brief['type'])}
               className="w-full p-2 border rounded-md"
             >
               <option value="GameDesign">Game Design</option>
               <option value="VisualCreator">Visual Creator</option>
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium mb-2">Content</label>
             <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="w-full p-2 border rounded-md h-48"
               placeholder="Enter your content here..."
             />
           </div>

           <button 
             type="submit"
             disabled={loading}
             className={`w-full py-2 px-4 rounded-md text-white ${
               loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
             }`}
           >
             {loading ? 'Analyzing...' : 'Analyze Content'}
           </button>
         </form>

         {/* Brief Requirements Display */}
         <div className="border rounded-md p-4">
           <h2 className="font-semibold mb-3">Brief Requirements</h2>
           <div className="space-y-2">
             {getBriefByType(briefType).requirements.mandatory.map((req, i) => (
               <p key={i} className="text-sm">• {req}</p>
             ))}
           </div>
         </div>
       </div>

       {/* Feedback Display */}
       {feedback && (
         <div className="border rounded-md p-4">
           <h2 className="font-semibold mb-4">Analysis Results</h2>
           
           <div className="space-y-4">
             <div>
               <h3 className="font-medium text-sm">Status:</h3>
               <p className={`text-sm ${
                 feedback.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
               }`}>
                 {feedback.status === 'approved' ? 'Approved' : 'Needs Revision'}
               </p>
             </div>

             <div>
               <h3 className="font-medium text-sm">Matched Points:</h3>
               <ul className="list-disc pl-4 text-sm">
                 {feedback.matchedPoints.map((point, i) => (
                   <li key={i} className="text-green-600">{point}</li>
                 ))}
               </ul>
             </div>

             <div>
               <h3 className="font-medium text-sm">Missing Points:</h3>
               <ul className="list-disc pl-4 text-sm">
                 {feedback.missingPoints.map((point, i) => (
                   <li key={i} className="text-red-600">{point}</li>
                 ))}
               </ul>
             </div>

             <div>
               <h3 className="font-medium text-sm">Suggestions:</h3>
               <ul className="list-disc pl-4 text-sm">
                 {feedback.suggestions.map((suggestion, i) => (
                   <li key={i}>{suggestion}</li>
                 ))}
               </ul>
             </div>

             <div>
               <h3 className="font-medium text-sm">Detailed Feedback:</h3>
               <p className="text-sm whitespace-pre-wrap">{feedback.feedback}</p>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
}