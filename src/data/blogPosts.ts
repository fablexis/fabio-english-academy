import presentPerfectImg from '../assets/blog/present-perfect.jpg';
import makeVsDoImg from '../assets/blog/make-vs-do.jpg';
import conditionalsImg from '../assets/blog/conditionals.jpg';
import prepositionsImg from '../assets/blog/prepositions.jpg';
import orderingFoodImg from '../assets/blog/ordering-food.jpg';
import smallTalkImg from '../assets/blog/small-talk.jpg';
import phrasalVerbsImg from '../assets/blog/phrasal-verbs.jpg';
import reportedSpeechImg from '../assets/blog/reported-speech.jpg';
import jobInterviewImg from '../assets/blog/job-interview.jpg';
import articlesImg from '../assets/blog/articles.jpg';
import sayTellImg from '../assets/blog/say-tell-speak-talk.jpg';
import directionsImg from '../assets/blog/directions.jpg';

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
  image: string;
  body: {
    intro: string;
    sections: { heading: string; paragraphs: string[]; examples?: string[] }[];
    tip: string;
    closing: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'present-perfect-vs-past-simple',
    category: 'Grammar',
    title: 'Present Perfect vs. Past Simple: Finally Explained',
    excerpt:
      'One of the most confusing grammar points for English learners. Learn when to use "I have done" versus "I did" with clear rules and plenty of examples.',
    readTime: '2 min read',
    level: 'Intermediate',
    variant: 'teal',
    image: presentPerfectImg,
    body: {
      intro:
        '"I have lived here for five years" or "I lived here for five years" — both are grammatically correct, but they mean very different things. The present perfect and the past simple are two of the most commonly confused tenses in English. This article breaks down the difference once and for all with clear rules you can apply immediately.',
      sections: [
        {
          heading: 'When to use the past simple',
          paragraphs: [
            'The past simple describes actions that started and finished at a specific time in the past. The key word here is "finished." When you say "I visited London last summer," the trip is over, and you are placing it at a definite point in time.',
            'Time markers are your best friends with the past simple: yesterday, last week, in 2019, three days ago, when I was a child. If the sentence includes or implies a finished time, you almost certainly need the past simple.',
          ],
        },
        {
          heading: 'When to use the present perfect',
          paragraphs: [
            'The present perfect connects the past to the present. Use it when the exact time does not matter, or when the action has a result that is still relevant now. "I have lost my keys" means you still do not have them — the situation is ongoing.',
            'It also expresses life experiences up to now: "I have been to Japan twice" (at some point in my life, no specific date). And it works for actions that started in the past and continue: "She has worked here since 2020" (she still works here).',
          ],
        },
        {
          heading: 'The most common mistakes',
          paragraphs: [
            'Mistake 1: "I have seen that movie yesterday." This is wrong because "yesterday" is a finished time — use past simple: "I saw that movie yesterday." If you remove the time reference, both work: "I have seen that movie" (at some point) or "I saw that movie" (implying a specific occasion).',
            'Mistake 2: "I lived here since 2018." Since the action continues to now, you need the present perfect: "I have lived here since 2018." The word "since" almost always signals present perfect because it connects a past starting point to the present moment.',
          ],
        },
      ],
      tip: 'Ask yourself two questions: (1) Is the action finished and placed at a specific time? Use past simple. (2) Does the action connect to now or is the time unimportant? Use present perfect. These two questions solve 90% of cases.',
      closing:
        'This distinction does not exist in many languages, which is why it feels unnatural at first. But with practice, choosing between these two tenses will become instinctive. Start by paying attention to the time words in every sentence you read or hear — they almost always reveal which tense is correct.',
    },
  },
  {
    id: 2,
    slug: 'make-vs-do-explained',
    category: 'Vocabulary',
    title: 'Make vs. Do: The Definitive Guide',
    excerpt:
      'Why do we "make a decision" but "do homework"? There is a logic behind it. Learn the patterns that will help you choose correctly every time.',
    readTime: '2 min read',
    level: 'Beginner',
    variant: 'lime',
    image: makeVsDoImg,
    body: {
      intro:
        'Every English learner has asked this question at some point: why is it "make a mistake" but "do the dishes"? Both words translate to a single verb in many languages, making this one of the trickiest vocabulary points to master. The good news is that there are patterns, and once you learn them, most of the confusion disappears.',
      sections: [
        {
          heading: 'The general rule',
          paragraphs: [
            '"Make" is generally used when you create, produce, or construct something — something that did not exist before. "Do" is used for actions, tasks, and activities — especially routine ones where nothing new is physically produced.',
            'Think of it this way: "make" focuses on the result (make a cake = a cake now exists), while "do" focuses on the process or activity itself (do exercise = the activity of exercising).',
          ],
        },
        {
          heading: 'Common collocations with "make"',
          paragraphs: [
            'Creating something: make breakfast, make coffee, make a sandwich. Producing a result: make a decision, make a choice, make progress, make an effort. Communication: make a phone call, make a suggestion, make a complaint, make a promise.',
            'Other essential ones: make money, make friends, make a plan, make an appointment, make a reservation, make a mistake, make an excuse, make noise, make sense. Notice that many of these involve producing something — a result, a sound, a connection.',
          ],
        },
        {
          heading: 'Common collocations with "do"',
          paragraphs: [
            'Tasks and work: do homework, do housework, do the laundry, do the dishes, do a job, do business. General activities: do exercise, do yoga, do sports, do research, do an experiment.',
            'Other essential ones: do well, do badly, do your best, do someone a favour, do damage, do harm, do good. Notice the pattern — "do" tends to pair with general or routine actions rather than creative or productive ones.',
          ],
        },
      ],
      tip: 'When in doubt, remember this shortcut: if the combination involves creating or building something new, it is probably "make." If it is a routine task, obligation, or general activity, it is probably "do." And when neither rule fits, the answer is usually a fixed collocation you just need to memorize.',
      closing:
        'The make/do distinction is one of those things that gets easier with exposure. Read widely, notice which word native speakers use, and within a few weeks you will start choosing the right one without thinking about it.',
    },
  },
  {
    id: 3,
    slug: 'mastering-conditional-sentences',
    category: 'Grammar',
    title: 'Mastering Conditional Sentences (If Clauses)',
    excerpt:
      'Zero, first, second, third — conditional sentences have clear rules once you understand the logic behind each type. A complete guide with examples for every level.',
    readTime: '2 min read',
    level: 'Intermediate',
    variant: 'dark',
    image: conditionalsImg,
    body: {
      intro:
        'Conditional sentences are the backbone of expressing possibilities, hypothetical situations, and consequences in English. Many learners memorize the four types mechanically, but understanding why each type uses a specific tense combination makes them much easier to remember and use naturally.',
      sections: [
        {
          heading: 'Zero and first conditionals: real situations',
          paragraphs: [
            'The zero conditional (if + present simple, present simple) describes things that are always true — facts and general truths: "If you heat water to 100°C, it boils." There is no uncertainty here; the result always happens.',
            'The first conditional (if + present simple, will + infinitive) describes real, possible future situations: "If it rains tomorrow, I will take an umbrella." You believe the rain is genuinely possible. This is the conditional you will use most often in daily conversation.',
          ],
        },
        {
          heading: 'Second conditional: imaginary present or future',
          paragraphs: [
            'The second conditional (if + past simple, would + infinitive) describes hypothetical or unlikely situations: "If I won the lottery, I would travel the world." You are imagining something that is not real or is very unlikely.',
            'A common confusion: the past simple tense here does NOT refer to the past. It signals unreality. "If I had more time, I would learn Japanese" is about a present or future situation, not a past one. This is why we say "If I were you" (not "If I was you" in formal English) — "were" here marks the situation as hypothetical.',
          ],
        },
        {
          heading: 'Third conditional: imaginary past',
          paragraphs: [
            'The third conditional (if + past perfect, would have + past participle) describes imaginary situations in the past — things that did not happen: "If I had studied harder, I would have passed the exam." The exam is over, you did not pass, and you are imagining an alternative reality.',
            'This is the conditional that expresses regret, missed opportunities, and "what if" scenarios. "If she had taken that job offer, she would have moved to Berlin." She did not take it, and she did not move — but you are imagining what would have been different.',
          ],
        },
      ],
      tip: 'Match the conditional type to the time and reality: Zero = always true. First = possible future. Second = imaginary now. Third = imaginary past. If you can classify the situation into one of these four boxes, the grammar follows automatically.',
      closing:
        'Conditionals are everywhere in English — in conversations, songs, movies, and books. Once you understand the logic, you will start noticing them constantly, and using them will feel completely natural.',
    },
  },
  {
    id: 4,
    slug: 'common-preposition-mistakes',
    category: 'Grammar',
    title: 'Common Preposition Mistakes and How to Fix Them',
    excerpt:
      'Prepositions are small words that cause big problems. Learn the most frequent mistakes learners make with in, on, at, to, and for — and how to avoid them.',
    readTime: '2 min read',
    level: 'Beginner',
    variant: 'plain',
    image: prepositionsImg,
    body: {
      intro:
        'Prepositions are among the hardest parts of English to master because they often do not translate directly from other languages. "I am good at English" but "I am interested in English" — there is no logical reason why one uses "at" and the other "in." But there are patterns and rules that can dramatically reduce your mistakes.',
      sections: [
        {
          heading: 'Time prepositions: in, on, at',
          paragraphs: [
            'Use "at" for specific times: at 3 p.m., at noon, at midnight, at night. Use "on" for days and dates: on Monday, on July 4th, on my birthday, on the weekend (American English). Use "in" for longer periods: in January, in 2024, in the morning, in the summer.',
            'The trick is to think from specific to general: "at" is the most precise, "on" is for a specific day, and "in" wraps around larger chunks of time. One major exception: we say "at night" even though night is a long period — this is simply a fixed expression you need to memorize.',
          ],
        },
        {
          heading: 'Place prepositions: in, on, at',
          paragraphs: [
            'Use "at" for specific points or locations: at the bus stop, at the airport, at home. Use "on" for surfaces: on the table, on the wall, on the second floor. Use "in" for enclosed spaces: in the room, in the car, in the city.',
            'Common mistakes: "I am in home" should be "I am at home." "She is at the kitchen" should be "She is in the kitchen" (because a kitchen is an enclosed space). "The picture is in the wall" should be "The picture is on the wall" (it sits on the surface).',
          ],
        },
        {
          heading: 'Prepositions after verbs and adjectives',
          paragraphs: [
            'Many verbs and adjectives are followed by fixed prepositions that you simply need to learn: depend on, listen to, wait for, arrive at (a specific place) or arrive in (a city/country), look at, agree with, apologize for.',
            'Common adjective combinations: afraid of, good at, interested in, tired of, proud of, responsible for, different from, similar to, famous for. When you learn a new adjective, always learn which preposition follows it — treat them as a unit.',
          ],
        },
      ],
      tip: 'Start a "preposition notebook" where you write down verb + preposition and adjective + preposition combinations as you encounter them. Review ten entries every morning. Within a month, the most common combinations will feel automatic.',
      closing:
        'Prepositions are a patience game. No single rule covers all cases, so consistent exposure and deliberate practice are your best tools. Focus on the most common combinations first, and the rest will follow.',
    },
  },
  {
    id: 5,
    slug: 'ordering-food-in-english',
    category: 'Situations',
    title: 'Ordering Food at a Restaurant in English',
    excerpt:
      'From making a reservation to asking for the bill — all the phrases you need to feel confident at any English-speaking restaurant.',
    readTime: '2 min read',
    level: 'Beginner',
    variant: 'lime',
    image: orderingFoodImg,
    body: {
      intro:
        'Eating out is one of the most common situations where you need to speak English, and it is also one of the easiest to prepare for. Restaurant interactions follow a predictable pattern, so a handful of well-practised phrases will cover almost every scenario.',
      sections: [
        {
          heading: 'Making a reservation and arriving',
          paragraphs: [
            'To reserve by phone: "Hi, I would like to make a reservation for two people for Friday at 7 p.m., please." When you arrive: "Good evening. We have a reservation under the name García." If you do not have one: "Hi, table for two, please. Do you have anything available?"',
            'If there is a wait: "How long is the wait?" and "Could we sit at the bar while we wait?" are perfectly natural questions. Do not be afraid to ask — restaurant staff expect these questions.',
          ],
        },
        {
          heading: 'Ordering food and drinks',
          paragraphs: [
            'When the server comes: "Could I have the grilled salmon, please?" or "I would like the pasta with tomato sauce." For drinks: "Can I get a glass of red wine?" or "Just water for me, please." To ask about the menu: "What do you recommend?" or "Is the chicken dish spicy?"',
            'For dietary needs: "I am allergic to nuts — does this dish contain any?" or "Do you have any vegetarian options?" or "Is it possible to make this without dairy?" Restaurants are accustomed to these questions, so never feel awkward asking.',
          ],
        },
        {
          heading: 'During the meal and paying',
          paragraphs: [
            'If you need something: "Excuse me, could we get some more bread, please?" or "Sorry, I think this is not what I ordered." To ask for the bill: "Could we have the bill, please?" (British English) or "Can we get the check, please?" (American English).',
            'For payment: "Do you accept credit cards?" or "Could we split the bill?" or "I will pay for everything — it is on me." Tipping varies by country, but if you are unsure, asking "Is service included?" is perfectly acceptable.',
          ],
        },
      ],
      tip: 'The magic word in restaurants is "please." Adding it to any request instantly makes you sound polite and natural: "The salmon, please" is friendlier than "I want the salmon." Combine it with "could" or "can" for an even softer tone.',
      closing:
        'Restaurant English is repetitive by nature — the same phrases work whether you are in London, New York, or Sydney. Practise these patterns a few times, and you will order with confidence anywhere in the English-speaking world.',
    },
  },
  {
    id: 6,
    slug: 'how-to-make-small-talk',
    category: 'Conversation',
    title: 'How to Make Small Talk Like a Native Speaker',
    excerpt:
      'Small talk is not meaningless — it builds trust and opens doors. Learn the topics, phrases, and unwritten rules that make casual conversation flow naturally.',
    readTime: '2 min read',
    level: 'Intermediate',
    variant: 'teal',
    image: smallTalkImg,
    body: {
      intro:
        'Small talk can feel pointless if your language does not have a strong tradition of it, but in English-speaking cultures, it serves an essential social function. It is how people establish rapport, show friendliness, and transition into deeper conversations. Learning to do it well is one of the most practical English skills you can develop.',
      sections: [
        {
          heading: 'Safe topics and conversation starters',
          paragraphs: [
            'The classic safe topics are weather, weekend plans, travel, food, and shared surroundings. "Lovely weather today, isn\'t it?" may sound like a cliché, but it works because it is low-stakes and invites a response. Other reliable starters: "Have you been anywhere nice recently?" or "How are you finding this event?"',
            'At work, good openers include: "How was your weekend?" (on Monday), "Any plans for the weekend?" (on Friday), and "Have you tried that new coffee place around the corner?" The key is to ask open-ended questions that invite more than a yes or no.',
          ],
        },
        {
          heading: 'Topics to avoid',
          paragraphs: [
            'In most English-speaking cultures, avoid discussing money (salary, cost of personal items), age, weight, religion, or controversial politics in casual settings. These topics can make people uncomfortable and are considered too personal for small talk.',
            'Also avoid complaining at length. A brief "This weather is terrible!" is fine and even bonding, but a long monologue about your problems kills the light energy that small talk depends on. Keep it positive or neutral.',
          ],
        },
        {
          heading: 'How to keep the conversation going',
          paragraphs: [
            'The secret to good small talk is showing genuine interest. Use follow-up questions: if someone says "I went hiking last weekend," respond with "Oh, where did you go?" or "That sounds amazing — do you go often?" People love talking about their experiences when you show curiosity.',
            'Useful phrases for keeping the flow: "That reminds me of…" (to connect their story to yours), "I have always wanted to try that" (to show interest), and "Really? Tell me more about that" (to encourage them to continue). Small talk is a tennis match — keep the ball going back and forth.',
          ],
        },
      ],
      tip: 'Prepare three small-talk topics before any social event or work meeting. Having something ready to say eliminates the panic of "What do I talk about?" and lets you focus on the other person instead of your own anxiety.',
      closing:
        'Small talk is a skill, not a talent. The more you practise it, the more natural it becomes. Start small — a comment to a colleague, a question to a stranger in a queue — and build from there.',
    },
  },
  {
    id: 7,
    slug: 'understanding-phrasal-verbs',
    category: 'Vocabulary',
    title: 'The Tricky World of Phrasal Verbs',
    excerpt:
      'Why does "give up" mean to quit and "give in" mean to surrender? Phrasal verbs follow patterns that make them easier to learn than you think.',
    readTime: '2 min read',
    level: 'Intermediate',
    variant: 'dark',
    image: phrasalVerbsImg,
    body: {
      intro:
        'Phrasal verbs are one of the defining features of natural English. Native speakers use them constantly, often without realizing it, while learners tend to avoid them in favour of more formal alternatives. Understanding how they work — and why — will make your English sound significantly more fluent and natural.',
      sections: [
        {
          heading: 'What makes phrasal verbs tricky',
          paragraphs: [
            'A phrasal verb is a verb combined with a preposition or adverb (called a particle) that changes the original meaning of the verb. "Look" means to see, but "look up" means to search for information, "look after" means to take care of, and "look forward to" means to anticipate with pleasure.',
            'The same verb can pair with different particles to create completely different meanings. "Turn on" (start a device), "turn off" (stop it), "turn up" (arrive or increase volume), "turn down" (reject or decrease volume). This is why memorizing them one by one can feel overwhelming.',
          ],
        },
        {
          heading: 'Patterns that help you learn faster',
          paragraphs: [
            'Many particles carry a consistent meaning across different verbs. "Up" often suggests completion or increase: eat up (finish eating), drink up (finish drinking), speed up (go faster), turn up (increase). "Down" often suggests decrease or stopping: slow down, calm down, break down, turn down.',
            '"Out" frequently means to the end or completely: figure out, work out, find out, run out (of something), fill out (a form). "Off" often signals departure or disconnection: take off, set off, log off, put off (postpone). Recognizing these particle patterns lets you guess the meaning of new phrasal verbs you have never seen before.',
          ],
        },
        {
          heading: 'The most essential phrasal verbs to learn first',
          paragraphs: [
            'Start with these high-frequency ones that appear in everyday conversation: pick up (collect/learn), drop off (deliver), come up with (invent/think of), look into (investigate), go through (experience/examine), put off (postpone), get along with (have a good relationship), end up (finally be/do).',
            'For work and study: set up (arrange/install), carry out (perform/execute), bring up (mention a topic), go over (review), hand in (submit), point out (highlight), take on (accept responsibility), follow up (continue contact about something).',
          ],
        },
      ],
      tip: 'Learn phrasal verbs in context, not in isolation. When you find a new one, write down the full sentence where you found it. This gives your memory a hook — you will remember "She turned down the job offer" better than "turn down = reject."',
      closing:
        'Phrasal verbs might feel like an infinite list, but the truth is that about 100 of them cover the vast majority of everyday English. Learn those first, and the rest will come naturally as you read and listen more.',
    },
  },
  {
    id: 8,
    slug: 'reported-speech-explained',
    category: 'Grammar',
    title: 'Reported Speech: Telling Someone What Others Said',
    excerpt:
      'Learn how to accurately report what someone else said without quoting them directly. Master the tense shifts, pronoun changes, and time expressions.',
    readTime: '2 min read',
    level: 'Intermediate',
    variant: 'plain',
    image: reportedSpeechImg,
    body: {
      intro:
        '"She said she was tired" — not "She said she is tired." Reported speech (also called indirect speech) requires specific changes to tenses, pronouns, and time expressions. It sounds complicated, but the rules are consistent and logical once you understand the underlying principle: you are shifting everything one step back in time.',
      sections: [
        {
          heading: 'The tense shift rule',
          paragraphs: [
            'When you report what someone said, each tense moves one step into the past. Present simple becomes past simple: "I like coffee" → She said she liked coffee. Present continuous becomes past continuous: "I am working" → He said he was working. Present perfect becomes past perfect: "I have finished" → She said she had finished.',
            'Past simple becomes past perfect: "I saw the movie" → He said he had seen the movie. "Will" becomes "would": "I will call you" → She said she would call me. "Can" becomes "could": "I can swim" → He said he could swim. The pattern is always one step back.',
          ],
        },
        {
          heading: 'Pronoun and time expression changes',
          paragraphs: [
            'Pronouns change to reflect the reporter\'s perspective: "I" often becomes "he" or "she," "my" becomes "his" or "her," "we" becomes "they." For example: "I lost my phone" → She said she had lost her phone.',
            'Time and place expressions also shift: "today" becomes "that day," "yesterday" becomes "the day before," "tomorrow" becomes "the next day" or "the following day," "here" becomes "there," "this" becomes "that." "I will see you tomorrow" → He said he would see me the following day.',
          ],
        },
        {
          heading: 'Reporting questions and requests',
          paragraphs: [
            'For yes/no questions, use "if" or "whether": "Do you like pizza?" → She asked me if I liked pizza. For wh-questions, keep the question word but use statement word order (no inversion): "Where do you live?" → He asked me where I lived — NOT "where did I live."',
            'For commands and requests, use "told" + object + infinitive: "Close the door" → She told me to close the door. For negative commands: "Don\'t be late" → He told me not to be late. For polite requests: "Could you help me?" → She asked me to help her.',
          ],
        },
      ],
      tip: 'The tense shift is sometimes optional when the reported information is still true: "She said she works in a bank" is acceptable if she still works there. However, applying the shift consistently ("She said she worked in a bank") is always grammatically correct, so when in doubt, shift the tense back.',
      closing:
        'Reported speech is a skill you use every day without thinking about it in your native language. In English, the mechanical rules (tense shift, pronoun change) need practice, but once they become automatic, you will report conversations fluently and accurately.',
    },
  },
  {
    id: 9,
    slug: 'job-interview-english',
    category: 'Situations',
    title: 'Job Interview English: Questions, Answers, and Tips',
    excerpt:
      'Prepare for your next English-language job interview with the most common questions, strong answer frameworks, and phrases that leave a professional impression.',
    readTime: '2 min read',
    level: 'Advanced',
    variant: 'teal',
    image: jobInterviewImg,
    body: {
      intro:
        'A job interview in a second language adds an extra layer of pressure to an already stressful situation. The good news is that interviews follow predictable patterns, and preparing your answers in advance lets you focus on being confident and personable rather than searching for words in the moment.',
      sections: [
        {
          heading: 'The most common questions and how to approach them',
          paragraphs: [
            '"Tell me about yourself" is not an invitation to share your life story. Structure your answer in three parts: present (your current role and main responsibility), past (relevant experience that led you here), and future (why this position excites you). Keep it under two minutes.',
            '"What is your greatest weakness?" requires honesty combined with self-awareness. Avoid clichés like "I am a perfectionist." Instead, name a real skill you have improved: "I used to struggle with delegating tasks, so I started using project management tools and weekly check-ins to share the workload more effectively."',
          ],
        },
        {
          heading: 'Talking about experience with the STAR method',
          paragraphs: [
            'For behavioural questions like "Tell me about a time you dealt with a difficult situation," use the STAR method: Situation (set the scene briefly), Task (your specific responsibility), Action (what you did), Result (the outcome). This structure keeps your answer focused and compelling.',
            'Example: "In my previous role (situation), I was responsible for onboarding new clients (task). One client was very dissatisfied with the initial setup, so I scheduled a call to understand their specific concerns and created a customized implementation plan (action). Within two weeks, they were fully operational and later became one of our top referrals (result)."',
          ],
        },
        {
          heading: 'Professional phrases that make a difference',
          paragraphs: [
            'To show enthusiasm: "I am particularly drawn to this role because…" or "What excites me about your company is…" To ask smart questions: "Could you tell me more about the team I would be working with?" or "What does success look like in this position after six months?"',
            'To close strongly: "Thank you for your time. I am very enthusiastic about this opportunity and confident I can contribute to your team." Follow up with an email within 24 hours: "Dear [name], thank you for the opportunity to discuss the [position] role. I enjoyed learning about [specific topic mentioned] and look forward to hearing from you."',
          ],
        },
      ],
      tip: 'Practise your answers out loud, not just in your head. The difference between thinking an answer and speaking it smoothly is enormous. Record yourself, listen back, and refine until your answers sound natural — not memorized, but well-prepared.',
      closing:
        'Interview success in English comes from preparation, not perfection. You do not need to sound like a native speaker — you need to communicate your value clearly and confidently. Prepare your key answers, practise them aloud, and trust that your skills speak for themselves.',
    },
  },
  {
    id: 10,
    slug: 'articles-a-an-the',
    category: 'Grammar',
    title: 'Articles in English: When to Use A, An, and The',
    excerpt:
      'Articles are tiny words with big impact. Learn the rules behind "a," "an," and "the" — including when to use no article at all.',
    readTime: '3 min read',
    level: 'Beginner',
    variant: 'lime',
    image: articlesImg,
    body: {
      intro:
        'Many languages do not have articles, and even those that do use them differently from English. That is why "a," "an," and "the" cause so many headaches for learners. The rules are not as random as they seem — there is a clear logic based on whether something is specific, general, countable, or uncountable.',
      sections: [
        {
          heading: '"A" and "an": the indefinite articles',
          paragraphs: [
            'Use "a" or "an" when you are talking about something for the first time, or when it is one of many — not a specific one. "I saw a dog in the park" means any dog, not a particular one. "She is a teacher" means she belongs to the group of teachers.',
            'The difference between "a" and "an" is purely about sound, not spelling. Use "an" before a vowel sound: an apple, an hour (the "h" is silent), an MBA (pronounced "em"). Use "a" before a consonant sound: a university (starts with a "y" sound), a European (starts with a "y" sound), a one-way street (starts with a "w" sound).',
          ],
        },
        {
          heading: '"The": the definite article',
          paragraphs: [
            'Use "the" when both the speaker and listener know exactly which thing is being discussed. "I saw a dog in the park. The dog was very friendly." By the second sentence, both people know which dog — the one just mentioned. This is the most common reason to use "the."',
            'Also use "the" for unique things (the sun, the president, the internet), superlatives (the best, the tallest), ordinals (the first, the last), and when a phrase makes it specific (the book on the table, the woman in the red dress). Essentially, if there is only one possible thing you could be referring to, use "the."',
          ],
        },
        {
          heading: 'When to use no article (zero article)',
          paragraphs: [
            'Use no article with uncountable nouns and plural nouns when speaking in general: "Water is essential for life" (water in general), "Dogs are loyal animals" (dogs in general). If you add "the," it becomes specific: "The water in this bottle" or "The dogs next door."',
            'Other zero-article situations: most proper nouns (London, Mount Everest, Lake Michigan), meals in general (I had breakfast), sports (She plays tennis), languages (He speaks French), and academic subjects (I study biology). However, there are exceptions — "the United States," "the Netherlands," "the Nile" — which simply need to be memorized.',
          ],
        },
      ],
      tip: 'When choosing an article, ask: (1) Am I talking about something specific that my listener already knows about? → Use "the." (2) Am I introducing something new or talking about one of many? → Use "a/an." (3) Am I making a general statement about a category? → Use no article.',
      closing:
        'Articles are one of those grammar points where perfection takes time, but clear communication is achievable quickly. Native speakers will understand you even with occasional article mistakes, so do not let the fear of getting them wrong stop you from speaking. Focus on the main rules, and accuracy will improve naturally with practice.',
    },
  },
  {
    id: 11,
    slug: 'say-tell-speak-talk',
    category: 'Vocabulary',
    title: 'Say, Tell, Speak, Talk: What Is the Difference?',
    excerpt:
      'These four verbs all relate to communication, but they are not interchangeable. Learn exactly when to use each one with simple rules and real examples.',
    readTime: '3 min read',
    level: 'Beginner',
    variant: 'dark',
    image: sayTellImg,
    body: {
      intro:
        '"She said me that…" or "She told me that…"? "Can you speak English?" or "Can you talk English?" These four verbs — say, tell, speak, and talk — trip up learners constantly because they all involve communication. But each one has a specific use, and once you see the pattern, choosing the right one becomes easy.',
      sections: [
        {
          heading: 'Say: focus on the words themselves',
          paragraphs: [
            '"Say" is about the words or message. You say something, you say a sentence, you say hello. The focus is on what was communicated, not on who received it. That is why "say" does NOT take a person directly after it — you cannot write "She said me." You need "to": "She said to me."',
            'Examples that show the pattern:\n\n• "He said that he was tired." (correct — what he communicated)\n• "She said goodbye and left." (correct — the words she used)\n• "They said it would rain tomorrow." (correct — the information)\n• "He said me the answer." (WRONG — use "told" instead)\n\nA helpful shortcut: if you can replace the verb with "stated" or "expressed," then "say" is the right choice.',
          ],
        },
        {
          heading: 'Tell: you always tell someone',
          paragraphs: [
            '"Tell" requires a person — you always tell somebody something. This is the biggest difference from "say." You tell your friend a story. You tell your boss the truth. You tell someone what happened. If there is no person receiving the message, "tell" does not work.',
            'Compare these pairs to see the difference clearly:\n\n• "She said that the meeting was cancelled." → focus on the message\n• "She told us that the meeting was cancelled." → she directed it to us\n\n• "He said, \'I will be late.\'" → quoting his exact words\n• "He told me he would be late." → reporting to a specific person\n\nThere are also fixed expressions with "tell" that you should memorize: tell the truth, tell a lie, tell a story, tell a joke, tell the difference, tell the time. These always use "tell," never "say."',
          ],
        },
        {
          heading: 'Speak and talk: the activity of communicating',
          paragraphs: [
            '"Speak" and "talk" both refer to the act of producing speech, but they differ in formality. "Speak" is slightly more formal and is used for one-directional or official communication. "Talk" is more casual and implies a two-way conversation.\n\n• "She speaks three languages." (ability — always "speak," never "talk")\n• "He spoke at the conference yesterday." (formal, one-to-many)\n• "Can I speak to the manager, please?" (formal/polite request)\n\n• "We talked for hours about our trip." (casual, two-way)\n• "Let\'s talk about this over coffee." (informal discussion)\n• "Stop talking in class!" (casual conversation/chatter)',
            'The easiest way to choose between them: if it feels official, public, or one-way, use "speak." If it feels casual, personal, or back-and-forth, use "talk." And for languages, it is always "speak" — "I speak Spanish," not "I talk Spanish."',
          ],
        },
      ],
      tip: 'Here is a one-line cheat sheet you can memorize: SAY the words, TELL a person, SPEAK a language, TALK to a friend. That single sentence covers the most common use of each verb.',
      closing:
        'These four verbs are used dozens of times every day in English, so getting them right has an immediate impact on how natural you sound. Start by paying attention to which one native speakers use in podcasts, shows, or conversations — you will quickly notice the patterns described here.',
    },
  },
  {
    id: 12,
    slug: 'asking-giving-directions',
    category: 'Situations',
    title: 'Asking for and Giving Directions in English',
    excerpt:
      'Lost in an English-speaking city? This guide gives you the exact phrases to ask where things are, understand the answer, and help others find their way too.',
    readTime: '4 min read',
    level: 'Beginner',
    variant: 'plain',
    image: directionsImg,
    body: {
      intro:
        'You are standing on a street corner in London, Dublin, or Toronto, and you have no idea where your hotel is. Your phone is dead. You need to ask someone. This is one of those situations where having the right phrases ready makes all the difference. The good news: direction conversations follow a very predictable pattern, and a small set of phrases covers almost every case.',
      sections: [
        {
          heading: 'How to ask: polite phrases that work every time',
          paragraphs: [
            'Always start with a polite opener — do not jump straight to "Where is the bank?" Instead, get the person\'s attention first and show respect for their time:\n\n• "Excuse me, could you tell me how to get to the train station?"\n• "Sorry to bother you — do you know where the nearest pharmacy is?"\n• "Hi, I\'m a bit lost. Is there a supermarket near here?"\n\nAll three follow the same structure: polite opener + your question. This approach works in any English-speaking country.',
            'If you need something more specific:\n\n• "How far is it from here?" (to find out the distance)\n• "Is it within walking distance?" (to know if you need transport)\n• "Which way do I go when I leave this building?" (when inside a mall, hotel, etc.)\n• "Can you show me on the map?" (if you have a map open on paper or screen)\n\nDo not worry about sounding too formal — politeness is never awkward when you are asking a stranger for help.',
          ],
        },
        {
          heading: 'Understanding the answer: key vocabulary',
          paragraphs: [
            'When someone gives you directions, they will use a small set of words over and over. Here are the ones you must know:\n\n• "Go straight" / "Keep going straight" — continue forward without turning\n• "Turn left / right" — change direction\n• "Take the first / second / third left / right" — count the streets\n• "It\'s on your left / right" — the destination is on that side of the street\n• "Go past the church / park / traffic lights" — walk beyond that landmark\n• "It\'s at the corner of Oak Street and Main Street" — where two streets meet\n• "It\'s opposite the bank" / "It\'s next to the café" — location relative to something you can see',
            'Here is an example of a real answer you might hear and what it means:\n\n"Go straight down this road for about two blocks. You\'ll see a big red church on your left — go past it. Then take the next right. The hotel is halfway down that street, on your right, next to a coffee shop."\n\nBreaking it down: straight → two blocks → pass church → turn right → halfway down → right side. Practise listening for these key words and ignore everything else — you do not need to understand every single word to follow the directions.',
          ],
        },
        {
          heading: 'How to give directions to someone else',
          paragraphs: [
            'When someone asks you for help, keep your answer simple and visual. Use landmarks instead of street names when possible, because landmarks are easier to spot than street signs:\n\n• "Sure! Go straight for about five minutes. You\'ll see a park on your right. Turn left there, and it\'s the second building on the left."\n• "It\'s really close. Just cross the street, turn right, and you\'ll see it next to the bakery."\n• "Honestly, it\'s a bit far to walk. I\'d recommend taking the bus — there\'s a stop right over there."',
            'If you do not know the way, it is perfectly fine to say so:\n\n• "I\'m sorry, I\'m not from around here."\n• "I\'m afraid I don\'t know this area very well."\n• "I\'m not sure, but there\'s an information centre around the corner — they could help you."\n\nHonesty is always better than guessing and sending someone in the wrong direction.',
          ],
        },
      ],
      tip: 'When you receive directions, repeat the key steps back to the person: "So I go straight, turn right at the church, and it\'s on the left?" This confirms you understood correctly and gives the other person a chance to correct any misunderstanding before you walk away.',
      closing:
        'Asking for directions is one of the first real-world interactions you will have in an English-speaking place, and it is easier than you think. Memorize two or three polite openers and learn the core vocabulary — straight, turn, past, corner, opposite, next to — and you will never feel truly lost.',
    },
  },
];
