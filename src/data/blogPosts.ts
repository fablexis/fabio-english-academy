export type BlogVariant = 'teal' | 'lime' | 'dark' | 'plain';

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: BlogVariant;
  hasBanner: boolean;
  // Article body — placeholder sections rendered on the detail page
  body: {
    intro: string;
    sections: { heading: string; paragraphs: string[] }[];
    tip: string;
    closing: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'explain-symptoms-in-english',
    category: 'Healthcare',
    title: 'How to Explain Symptoms Clearly in English',
    excerpt:
      'Useful vocabulary and polite sentence patterns for doctor appointments, emergencies, and telehealth calls. Knowing the right words can make a real difference when it matters most.',
    readTime: '6 min read',
    level: 'Intermediate',
    variant: 'teal',
    hasBanner: true,
    body: {
      intro:
        'Visiting a doctor in another language can be stressful, but with the right vocabulary you can describe your symptoms with clarity and confidence. This article walks you through the most useful phrases and sentence structures for healthcare settings.',
      sections: [
        {
          heading: 'Describing pain and discomfort',
          paragraphs: [
            'When asked "What brings you in today?" or "How can I help you?", start with a simple, direct sentence. For example: "I have been having a sharp pain in my lower back for three days" or "I feel a burning sensation when I swallow."',
            'Doctors often ask about intensity, duration, and location. Practise answering with adjectives like sharp, dull, throbbing, aching, or intermittent, combined with time expressions like since yesterday, for a week, or on and off.',
          ],
        },
        {
          heading: 'Asking questions without hesitation',
          paragraphs: [
            'It is perfectly acceptable — and encouraged — to ask for clarification. "Could you explain that in simpler terms?" and "What does that medication do?" are questions any professional will welcome.',
            'If you do not understand a diagnosis, say: "I want to make sure I understood correctly — you are saying that…" and repeat back what you heard. This closes misunderstanding gaps immediately.',
          ],
        },
        {
          heading: 'Telehealth and written communication',
          paragraphs: [
            'Online consultations require extra precision because the doctor cannot see your expression. Be specific: "I noticed this started on Monday after exercising" rather than "It started recently."',
            'When filling in online forms or sending follow-up messages, use formal but plain English: "I am writing to report that the symptoms have not improved" rather than informal shorthand.',
          ],
        },
      ],
      tip: 'Before your appointment, write down three things: when it started, where it hurts or what feels wrong, and what makes it better or worse. This simple list covers 80% of what a doctor will ask.',
      closing:
        'Confidence in healthcare English comes from repetition. Practise these phrases out loud at home, and you will find the words come naturally when you need them most.',
    },
  },
  {
    id: 2,
    slug: 'b1-to-c1-ana-transformation',
    category: 'Cases',
    title: "From B1 to C1: Ana's 8-Week Speaking Transformation",
    excerpt:
      'Habits, weekly goals, and conversation drills that made a real difference.',
    readTime: '7 min read',
    level: 'All levels',
    variant: 'lime',
    hasBanner: false,
    body: {
      intro:
        "Ana came to us as a confident B1 speaker — good grammar, limited fluency. Eight weeks later she passed her C1 speaking assessment. Here is exactly what changed, and how you can replicate it.",
      sections: [
        {
          heading: 'Week 1–2: Eliminating the pause reflex',
          paragraphs: [
            'Ana\'s biggest blocker was freezing mid-sentence while searching for a word. We introduced filler strategies: phrases like "What I mean is…", "In other words…", and "That reminds me of…" gave her mental breathing room without going silent.',
            'She practised these fillers in ten-minute daily recordings, listening back to spot hesitations and replace them with smooth bridges.',
          ],
        },
        {
          heading: 'Week 3–5: Structured opinion drills',
          paragraphs: [
            'Using a simple framework — Position → Reason → Example → Restate — Ana learned to give full, coherent answers to abstract questions like "Do you think remote work benefits society?" in under 90 seconds.',
            'We used current news headlines as prompts, rotating topics daily. By week five she was generating opinions on unfamiliar topics without pausing to plan.',
          ],
        },
        {
          heading: 'Week 6–8: Real conversations and correction',
          paragraphs: [
            'Ana joined two weekly conversation exchange sessions with native speakers. After each session she sent a voice memo reflecting on one thing she wanted to improve.',
            'The final two weeks focused on formal register: interviews, presentations, and academic discussions. The jump from informal to formal English is often underestimated at B2 level.',
          ],
        },
      ],
      tip: 'Record yourself for five minutes every day — just talking freely about your day. After one week, listen back to the recordings. You will immediately hear your own patterns and know exactly what to work on.',
      closing:
        "Ana's story is not unique. The pattern — targeted daily practice, structured speaking frameworks, and real feedback — works at every level. The only variable is consistency.",
    },
  },
  {
    id: 3,
    slug: 'daily-english-practice-stack',
    category: 'Development',
    title: 'Build a 15-Minute Daily English Practice Stack',
    excerpt:
      'Mix shadowing, quick journaling, and one speaking prompt to stay consistent without feeling overwhelmed. Small daily wins compound faster than any single long study session.',
    readTime: '5 min read',
    level: 'Beginner',
    variant: 'dark',
    hasBanner: true,
    body: {
      intro:
        'The biggest myth in language learning is that you need long study sessions. Research consistently shows that shorter, daily exposure beats occasional marathon sessions. Here is a three-part routine you can complete in 15 minutes.',
      sections: [
        {
          heading: 'Minutes 1–5: Shadow a short audio clip',
          paragraphs: [
            'Find a 60–90 second clip of natural English speech — a podcast excerpt, a news intro, or a YouTube video. Listen once, then play it again and speak along, mimicking the rhythm, stress, and pace exactly.',
            'Shadowing rewires your mouth muscles and trains your ear simultaneously. It is the single fastest technique for improving both pronunciation and listening comprehension.',
          ],
        },
        {
          heading: 'Minutes 6–10: Write three sentences in your journal',
          paragraphs: [
            'Pick one prompt from a rotating list: "Something I observed today", "An opinion I hold", or "A word I learned this week in a sentence." Keep it to three sentences maximum.',
            'Short writing practice forces you to finish a thought in English rather than trail off. Over time it builds the habit of thinking directly in the language.',
          ],
        },
        {
          heading: 'Minutes 11–15: Answer one speaking prompt aloud',
          paragraphs: [
            'Use a simple question like "What is the best advice you have ever received?" or "Describe a place you would like to visit." Set a timer for 90 seconds and speak until it rings.',
            'Do not stop if you make an error — keep going. Fluency is built by pushing through uncertainty, not by achieving perfection.',
          ],
        },
      ],
      tip: 'Attach your practice stack to an existing habit — morning coffee, lunch break, or the commute home. You will not forget to do it if it lives next to something you already do every day.',
      closing:
        'Fifteen minutes sounds almost too small to matter. Do it every day for 30 days and see how dramatically your confidence shifts.',
    },
  },
  {
    id: 4,
    slug: 'english-for-insurance-claims',
    category: 'Insurance',
    title: 'English You Need for Insurance and Claims',
    excerpt:
      'Understand key terms, ask better questions, and avoid costly misunderstandings when filing a claim abroad.',
    readTime: '8 min read',
    level: 'Intermediate',
    variant: 'plain',
    hasBanner: false,
    body: {
      intro:
        'Insurance documents are dense with specialised vocabulary that can confuse even proficient English speakers. This guide breaks down the terms you will encounter most often and shows you how to communicate clearly in claims situations.',
      sections: [
        {
          heading: 'Core vocabulary every policyholder needs',
          paragraphs: [
            '"Premium" is what you pay regularly. "Deductible" (US) or "excess" (UK) is the amount you pay out-of-pocket before insurance covers the rest. "Coverage" refers to what is protected; "exclusions" are what is not.',
            'Understanding the difference between "claim" (a formal request for payment) and "quote" (an estimate of costs) will help you initiate the right kind of conversation with your insurer.',
          ],
        },
        {
          heading: 'Filing a claim: step-by-step English',
          paragraphs: [
            'Begin with a clear statement of fact: "I am calling to report an incident that occurred on [date] at [location]." Avoid emotional language at this stage — insurers are looking for facts.',
            'When asked for a description, organise your account chronologically. Use linking words: "First… then… as a result… finally…" This makes the sequence easy to follow and reduces the chance of misinterpretation.',
          ],
        },
        {
          heading: 'Challenging a decision politely',
          paragraphs: [
            'If a claim is denied, you have the right to appeal. In writing, use formal register: "I am writing to formally dispute the decision dated [date] and respectfully request a review."',
            'Always ask for the specific clause that was used to deny your claim. "Could you please reference the exact policy section that applies here?" is a question every adjuster can and should answer.',
          ],
        },
      ],
      tip: 'Keep a written record of every phone call with your insurer: the date, time, the name of the person you spoke to, and a summary of what was said. This record is invaluable if a dispute escalates.',
      closing:
        'Insurance English is a small vocabulary to master with a large practical payoff. Invest one hour learning these terms and you will handle any policy conversation with confidence.',
    },
  },
  {
    id: 5,
    slug: 'travel-english-toolkit',
    category: 'Tourism',
    title: 'Travel English Toolkit: Hotels, Airports & Tours',
    excerpt:
      'Natural, polite phrases to navigate check-ins, flight delays, and guided tours with confidence. Whether you are a first-time traveller or a seasoned explorer, these phrases will make every trip smoother.',
    readTime: '5 min read',
    level: 'Beginner',
    variant: 'lime',
    hasBanner: true,
    body: {
      intro:
        'Travel English does not require a large vocabulary — it requires the right vocabulary. A handful of polite, clear phrases will get you through almost every situation you will encounter on the road.',
      sections: [
        {
          heading: 'At the airport',
          paragraphs: [
            'Check-in: "I have a booking under the name…" / "I would like a window seat if possible." / "Is there any chance of an upgrade?" Security: "Should I remove my laptop?" / "I have a medical device — is there an alternative screening option?"',
            'For delays or disruptions: "My connecting flight departs in 45 minutes — can you advise?" is far more effective than expressing frustration. Staff respond better to clarity and calm.',
          ],
        },
        {
          heading: 'At the hotel',
          paragraphs: [
            'Check-in: "I have a reservation for three nights." / "Could I request a quiet room away from the lift?" Reporting an issue: "The air conditioning does not seem to be working — could someone take a look?"',
            'Checking out: "Could I have a printed receipt for my stay?" / "Is there a luggage storage service?" — simple requests that often go unasked.',
          ],
        },
        {
          heading: 'On tours and excursions',
          paragraphs: [
            'Engaging a guide: "Could you speak a little more slowly?" is not rude — it is respectful and will improve your experience. Most guides genuinely want you to understand.',
            'Asking for recommendations: "Is there somewhere nearby that locals tend to eat?" almost always leads to a better meal than anything listed in a guidebook.',
          ],
        },
      ],
      tip: 'Save five key phrases offline on your phone before every trip: a greeting in the local language, "I need a doctor", "Where is the nearest pharmacy?", your hotel name and address, and "Can you help me?" These five cover most emergencies.',
      closing:
        'Confident travel English is about preparation, not perfection. Memorise ten well-chosen phrases and you will move through any destination with ease.',
    },
  },
  {
    id: 6,
    slug: 'creative-english-describe-visual-ideas',
    category: 'Design',
    title: 'Creative English: Describe Visual Ideas Better',
    excerpt:
      'Upgrade your design feedback with precise adjectives and collaborative phrases.',
    readTime: '6 min read',
    level: 'Intermediate',
    variant: 'teal',
    hasBanner: false,
    body: {
      intro:
        'Design feedback sessions can stall when words fail. "It feels off" or "I want it to pop more" are frustrating to receive and difficult to act on. This article builds the vocabulary you need to give and receive precise, constructive visual feedback in English.',
      sections: [
        {
          heading: 'Describing visual qualities precisely',
          paragraphs: [
            'Instead of "clean", try "minimal whitespace with strong typographic hierarchy." Instead of "modern", try "flat design with a muted palette and generous line spacing." Specificity removes guesswork.',
            'Useful adjective clusters: balance (asymmetric / centred / weighted), texture (flat / textured / layered), rhythm (repetitive / varied / dynamic), and tone (warm / cool / neutral / vibrant).',
          ],
        },
        {
          heading: 'Giving feedback that people act on',
          paragraphs: [
            'The best feedback follows an observation-impact-suggestion structure. "The heading sits too close to the image [observation], which makes the layout feel cramped [impact]. Moving it down by 16px might give it more room to breathe [suggestion]."',
            'Avoid "I don\'t like it" — always anchor feedback to the brief or the user. "This colour contrast may not meet accessibility standards for our target age group" is actionable; personal taste is not.',
          ],
        },
        {
          heading: 'Presenting your own work',
          paragraphs: [
            'Frame decisions, not just outcomes. "I chose a sans-serif typeface here because the tone of the content is conversational, not formal" tells collaborators you thought it through.',
            'End presentations with an open invitation: "I would love to hear your instinctive reaction before we discuss the details." This creates psychological safety and surfaces honest responses.',
          ],
        },
      ],
      tip: '"Evocative" beats "nice". Build a personal vocabulary bank of ten adjectives that describe the visual qualities you work with most. Revise it every month as your taste evolves.',
      closing:
        'Language is a design tool. The clearer your English in creative sessions, the faster your team reaches the right solution.',
    },
  },
  {
    id: 7,
    slug: 'stay-motivated-online-english',
    category: 'E-learning',
    title: 'How to Stay Motivated in Online English Courses',
    excerpt:
      'Set mini-milestones, remove friction, and use accountability methods that actually stick. Combined with the right environment, these strategies will keep you progressing week after week.',
    readTime: '4 min read',
    level: 'All levels',
    variant: 'plain',
    hasBanner: true,
    body: {
      intro:
        "Online learning gives you freedom — and freedom can become an obstacle. Without a set schedule or social pressure, it is easy to postpone sessions indefinitely. These strategies are designed specifically for the self-directed learner who wants to build unstoppable momentum.",
      sections: [
        {
          heading: 'Design your environment before you start',
          paragraphs: [
            'Open your course platform tab every morning alongside your email. Visibility creates opportunity. If you have to navigate to the site consciously, you have already created a hurdle.',
            'Remove notifications during study windows. A 25-minute focus session with zero interruptions is worth more than an hour of fragmented attention.',
          ],
        },
        {
          heading: 'Mini-milestones over end goals',
          paragraphs: [
            '"Complete the course" is too distant a goal to motivate daily action. Replace it with: "Finish Unit 3 by Friday", "Record myself speaking for five minutes today", or "Learn and use three new phrasal verbs this week."',
            'Celebrate small completions deliberately. Tell someone about your progress, mark it on a calendar, or reward yourself with something you enjoy. The brain does not distinguish between small and large victories — it responds to recognition.',
          ],
        },
        {
          heading: 'Accountability that actually works',
          paragraphs: [
            'Find one learning partner — someone at a similar level who agrees to check in weekly. A brief voice message saying "I completed lessons 4 and 5 this week" is enough to create genuine accountability.',
            'Alternatively, post a short English update on social media once a week. Public commitment is one of the strongest behavioural motivators known.',
          ],
        },
      ],
      tip: 'Write your "why" on a sticky note and put it next to your screen: "I am learning English because…" On hard days, this single sentence does more than any motivational video.',
      closing:
        'Motivation follows action, not the other way around. Start small, stay visible, and let the results pull you forward.',
    },
  },
  {
    id: 8,
    slug: 'professional-phrases-meetings',
    category: 'Business',
    title: 'Professional Phrases for Meetings and Follow-Ups',
    excerpt:
      'High-impact expressions for agreeing, clarifying, and closing meetings with clear next steps.',
    readTime: '7 min read',
    level: 'Advanced',
    variant: 'dark',
    hasBanner: false,
    body: {
      intro:
        'Your grammar can be perfect while your meetings still feel awkward. Professional English is not about correctness — it is about register, timing, and knowing which phrase to reach for in each moment. This guide covers the expressions that separate effective communicators from hesitant ones.',
      sections: [
        {
          heading: 'Opening and setting the agenda',
          paragraphs: [
            '"Thanks for joining — let\'s get started. Today we have three items to cover: [list]. We should have about fifteen minutes for each." A clear opening earns immediate credibility and helps everyone prepare mentally.',
            'For virtual meetings, add: "If you can\'t hear me clearly, please drop a note in the chat." This small gesture signals attentiveness and prevents technical issues from disrupting the session.',
          ],
        },
        {
          heading: 'Managing discussion diplomatically',
          paragraphs: [
            'Agreeing: "That aligns with what we discussed last time" / "That\'s a strong point — I\'d build on that by saying…" These phrases affirm others before contributing, which keeps dialogue collaborative.',
            'Redirecting: "That\'s an important point — let\'s park it here and return to it after we cover item two." This acknowledges value without derailing the agenda.',
          ],
        },
        {
          heading: 'Closing with clarity',
          paragraphs: [
            '"Before we wrap up, let\'s confirm next steps." Then state each action item, the owner, and the deadline clearly. "You are going to send the revised proposal by Thursday — is that correct?" Repeating back creates shared understanding.',
            'Follow-up email subject lines matter: "Action items from the [Project Name] meeting — 13 March" is scannable and specific. Open with a two-sentence summary, then bullet the action items.',
          ],
        },
      ],
      tip: '"I\'ll circle back on that" and "Let\'s take this offline" are widely understood, but try to replace them with specific language: "I\'ll send you my thoughts by end of day" and "Let\'s schedule 20 minutes separately for this." Specific language builds trust.',
      closing:
        'Every strong meeting follows the same arc: clear opening, managed discussion, specific close. Master these three phases and your professional English will feel effortless.',
    },
  },
];
