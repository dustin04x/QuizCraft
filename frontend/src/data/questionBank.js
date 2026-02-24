import rawQuestions from './questions.js'
import extraQuestions from './questionsExtra.js'

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const mergedQuestions = Object.keys({
  ...rawQuestions,
  ...extraQuestions,
}).reduce((acc, topicName) => {
  acc[topicName] = [...(rawQuestions[topicName] ?? []), ...(extraQuestions[topicName] ?? [])]
  return acc
}, {})

const topicEntries = Object.entries(mergedQuestions)

const TOPIC_CONTEXT = {
  'Programming Fundamentals':
    'this concept is a core programming principle used in day-to-day coding',
  'Data Structures & Algorithms':
    'it matches the expected complexity/data-structure behavior for this scenario',
  'Computer Networks':
    'it is the standard networking concept/protocol behavior used in real systems',
  'Operating Systems':
    'it describes the correct OS-level mechanism for process/resource management',
  'Databases & SQL':
    'it follows relational database rules and query semantics',
  'Web Development':
    'it is the standard web behavior used in modern frontend/backend development',
  'Cybersecurity Basics':
    'it directly aligns with foundational security best practices',
  'Web Security':
    'it addresses the web attack vector and its correct mitigation',
  Cryptography:
    'it reflects how cryptographic primitives are correctly used in security workflows',
  'Cloud & DevOps':
    'it is a standard DevOps/cloud practice used for reliable delivery and operations',
}

function buildExplanation(prompt, correctAnswer, topicName) {
  const normalizedPrompt = prompt.trim().replace(/\?+$/, '')
  const topicHint = TOPIC_CONTEXT[topicName] ?? 'it is the correct technical concept'

  return `Why: "${correctAnswer}" is correct because ${topicHint} for "${normalizedPrompt}". How: map the key term in the question to its practical use in real projects and system design decisions.`
}

export const TOPICS = topicEntries.map(([name, list]) => ({
  id: slugify(name),
  name,
  count: list.length,
}))

const topicNameById = TOPICS.reduce((acc, topic) => {
  acc[topic.id] = topic.name
  return acc
}, {})

export const QUESTION_BANK = TOPICS.flatMap((topic) =>
  mergedQuestions[topic.name].map((item, index) => ({
    id: `${topic.id}-${index + 1}`,
    topicId: topic.id,
    topicName: topic.name,
    prompt: item.question,
    options: item.answers,
    correctAnswer: item.correctAnswer,
    explanation:
      item.explanation ??
      buildExplanation(item.question, item.correctAnswer, topic.name),
  })),
)

export const TOTAL_QUESTIONS = QUESTION_BANK.length

export function getQuestionsByTopic(topicId = 'all') {
  if (topicId === 'all') {
    return QUESTION_BANK
  }

  const topicName = topicNameById[topicId]
  if (!topicName) {
    return QUESTION_BANK
  }

  return QUESTION_BANK.filter((question) => question.topicId === topicId)
}
