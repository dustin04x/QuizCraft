import { AnimatePresence, motion as Motion } from 'framer-motion'
import {
  AlarmClock,
  ArrowRight,
  Binary,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Code2,
  Cpu,
  Database,
  Flame,
  Globe,
  KeyRound,
  Layers3,
  Network,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QUESTION_BANK, TOPICS, TOTAL_QUESTIONS, getQuestionsByTopic } from '../data/questionBank.js'
import {
  computeProgressSnapshot,
  readProgress,
  recordSession,
  writeProgress,
} from '../data/progressStore.js'

const QUESTION_COUNTS = [5, 10, 15, 20]
const TIMED_QUESTION_SECONDS = 20

const ICON_BY_TOPIC = {
  all: Layers3,
  'programming-fundamentals': Code2,
  'data-structures-algorithms': Binary,
  'computer-networks': Network,
  'operating-systems': Cpu,
  'databases-sql': Database,
  'web-development': Globe,
  'cybersecurity-basics': Shield,
  'web-security': ShieldCheck,
  cryptography: KeyRound,
  'cloud-devops': Cloud,
}

const MODE_OPTIONS = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Instant correction and explanation after every answer.',
    icon: Sparkles,
  },
  {
    id: 'timed',
    name: 'Timed Sprint',
    description: `${TIMED_QUESTION_SECONDS} seconds per question.`,
    icon: AlarmClock,
  },
  {
    id: 'exam',
    name: 'Exam Mode',
    description: 'No correction until final submission.',
    icon: ClipboardCheck,
  },
  {
    id: 'review',
    name: 'Review Mistakes',
    description: 'Train with questions you previously missed.',
    icon: Target,
  },
]

function shuffle(items) {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

function updateAt(list, index, value) {
  const next = [...list]
  next[index] = value
  return next
}

function prepareGameQuestions(source, count) {
  const picked = shuffle(source).slice(0, count)

  return picked.map((question) => {
    const randomizedOptions = shuffle(question.options)
    return {
      ...question,
      options: randomizedOptions,
      answerIndex: randomizedOptions.indexOf(question.correctAnswer),
    }
  })
}

function buildResults(questions, selections, timeoutFlags) {
  return questions.map((question, index) => {
    const selectedIndex = selections[index]
    const timedOut = Boolean(timeoutFlags[index])
    const hasSelectedAnswer = Number.isInteger(selectedIndex)
    const selectedAnswer = hasSelectedAnswer
      ? question.options[selectedIndex]
      : timedOut
        ? 'No answer (time expired)'
        : 'No answer'
    const correctAnswer = question.options[question.answerIndex]

    return {
      questionId: question.id,
      topicId: question.topicId,
      topicName: question.topicName,
      question: question.prompt,
      selected: selectedAnswer,
      correct: correctAnswer,
      explanation: question.explanation,
      isCorrect: hasSelectedAnswer && selectedIndex === question.answerIndex,
      timedOut,
    }
  })
}

function QuizPage() {
  const [topicId, setTopicId] = useState('all')
  const [topicView, setTopicView] = useState('all')
  const [modeId, setModeId] = useState('classic')
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState([])
  const [answerSelections, setAnswerSelections] = useState([])
  const [timedOutFlags, setTimedOutFlags] = useState([])
  const [timeLeft, setTimeLeft] = useState(TIMED_QUESTION_SECONDS)
  const [finished, setFinished] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const [progress, setProgress] = useState(() => readProgress())

  const currentQuestion = questions[currentIndex]
  const score = useMemo(() => results.filter((entry) => entry.isCorrect).length, [results])
  const wrongResults = useMemo(
    () => results.filter((entry) => !entry.isCorrect),
    [results],
  )
  const timedOutCount = useMemo(
    () => results.filter((entry) => entry.timedOut).length,
    [results],
  )
  const scorePercent = results.length ? Math.round((score / results.length) * 100) : 0
  const isQuestionFlowActive = questions.length > 0 && !finished
  const isExamMode = modeId === 'exam'
  const isTimedMode = modeId === 'timed'
  const progressSnapshot = useMemo(
    () => computeProgressSnapshot(progress, TOPICS),
    [progress],
  )

  const questionById = useMemo(
    () =>
      QUESTION_BANK.reduce((acc, question) => {
        acc[question.id] = question
        return acc
      }, {}),
    [],
  )

  const reviewPool = useMemo(
    () =>
      progressSnapshot.reviewQuestionIds
        .map((questionId) => questionById[questionId])
        .filter(Boolean),
    [progressSnapshot.reviewQuestionIds, questionById],
  )

  const reviewTopicCount = useMemo(
    () =>
      reviewPool.reduce((acc, question) => {
        acc[question.topicId] = (acc[question.topicId] ?? 0) + 1
        return acc
      }, {}),
    [reviewPool],
  )

  const securityTopics = useMemo(
    () =>
      TOPICS.filter(
        (topic) =>
          topic.id.includes('security') || topic.id.includes('cryptography'),
      ),
    [],
  )
  const coreTopics = useMemo(
    () =>
      TOPICS.filter(
        (topic) =>
          !topic.id.includes('security') && !topic.id.includes('cryptography'),
      ),
    [],
  )
  const topicName =
    topicId === 'all' ? 'Mixed (All IT + Cyber categories)' : TOPICS.find((topic) => topic.id === topicId)?.name ?? 'Mixed'
  const selectedTopicLabel = modeId === 'review' ? `Mistake Drill - ${topicName}` : topicName
  const visibleTopics = useMemo(() => {
    if (topicView === 'core') {
      return coreTopics
    }
    if (topicView === 'security') {
      return securityTopics
    }
    return TOPICS
  }, [topicView, coreTopics, securityTopics])

  const activeMode = MODE_OPTIONS.find((mode) => mode.id === modeId) ?? MODE_OPTIONS[0]
  const availablePool = useMemo(() => {
    if (modeId === 'review') {
      if (topicId === 'all') {
        return reviewPool
      }
      return reviewPool.filter((question) => question.topicId === topicId)
    }

    return getQuestionsByTopic(topicId)
  }, [modeId, topicId, reviewPool])
  const poolSize = availablePool.length
  const effectiveQuestionCount = Math.min(questionCount, poolSize)

  useEffect(() => {
    document.body.classList.toggle('quiz-focus-mode', isQuestionFlowActive)
    return () => {
      document.body.classList.remove('quiz-focus-mode')
    }
  }, [isQuestionFlowActive])

  useEffect(() => {
    if (!isQuestionFlowActive || !isTimedMode || revealed || timeLeft <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setTimedOutFlags((existing) => updateAt(existing, currentIndex, true))
          setAnswerSelections((existing) => updateAt(existing, currentIndex, null))
          setSelectedIndex(null)
          setRevealed(true)
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [currentIndex, isQuestionFlowActive, isTimedMode, revealed, timeLeft])

  const finishGame = (selections, timeoutFlags) => {
    const finalResults = buildResults(questions, selections, timeoutFlags)
    setResults(finalResults)
    setFinished(true)

    setProgress((previous) => {
      const next = recordSession(previous, {
        modeId,
        topicId,
        topicLabel: selectedTopicLabel,
        results: finalResults,
      })
      writeProgress(next)
      return next
    })
  }

  const startGame = () => {
    if (!poolSize) {
      return
    }

    const count = Math.min(questionCount, poolSize)
    setQuestions(prepareGameQuestions(availablePool, count))
    setCurrentIndex(0)
    setSelectedIndex(null)
    setRevealed(false)
    setResults([])
    setAnswerSelections(Array(count).fill(null))
    setTimedOutFlags(Array(count).fill(false))
    setTimeLeft(TIMED_QUESTION_SECONDS)
    setFinished(false)
    setTransitionKey((previous) => previous + 1)
  }

  const selectAnswer = (optionIndex) => {
    if (!currentQuestion) {
      return
    }

    if (!isExamMode && revealed) {
      return
    }

    setSelectedIndex(optionIndex)
    setAnswerSelections((previous) => updateAt(previous, currentIndex, optionIndex))

    if (!isExamMode) {
      setRevealed(true)
    }
  }

  const nextQuestion = () => {
    if (!currentQuestion) {
      return
    }

    if (isExamMode) {
      if (selectedIndex === null) {
        return
      }
    } else if (!revealed) {
      return
    }

    const isLast = currentIndex >= questions.length - 1
    if (isLast) {
      finishGame(answerSelections, timedOutFlags)
      return
    }

    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    setSelectedIndex(answerSelections[nextIndex] ?? null)
    setRevealed(false)
    if (isTimedMode) {
      setTimeLeft(TIMED_QUESTION_SECONDS)
    }
    setTransitionKey((previous) => previous + 1)
  }

  const reset = () => {
    setQuestions([])
    setCurrentIndex(0)
    setSelectedIndex(null)
    setRevealed(false)
    setResults([])
    setAnswerSelections([])
    setTimedOutFlags([])
    setTimeLeft(TIMED_QUESTION_SECONDS)
    setFinished(false)
  }

  const renderTopicButton = (topic) => {
    const TopicIcon = ICON_BY_TOPIC[topic.id] ?? Layers3
    const topicCount =
      modeId === 'review'
        ? topic.id === 'all'
          ? reviewPool.length
          : reviewTopicCount[topic.id] ?? 0
        : topic.count
    const disabled = modeId === 'review' && topicCount === 0

    return (
      <button
        className={`topic-chip ${topicId === topic.id ? 'active' : ''}`}
        disabled={disabled}
        key={topic.id}
        onClick={() => setTopicId(topic.id)}
        type="button"
      >
        <div className="topic-chip-main">
          <TopicIcon className="topic-chip-icon" size={18} />
          <div className="topic-chip-copy">
            <span>{topic.name}</span>
            <small>{topicCount} questions</small>
          </div>
        </div>
      </button>
    )
  }

  const progressDone = isExamMode
    ? currentIndex + Number(selectedIndex !== null)
    : currentIndex + Number(revealed)
  const progressPercent = questions.length ? (progressDone / questions.length) * 100 : 0

  return (
    <div className="quiz-stack">
      <section className="glass-panel quiz-header">
        <div className="battle-header">
          <div>
            <p className="kicker">Quiz Game</p>
            <h1>IT & Cybersecurity Questions</h1>
            <p className="muted-text">
              Category + answers are randomized every game. Question bank: {TOTAL_QUESTIONS}+.
            </p>
          </div>

          <div className="battle-hud">
            <span className="hud-chip">
              <Flame size={14} />
              {activeMode.name}
            </span>
            <span className="hud-chip">
              <Layers3 size={14} />
              Pool: {poolSize}
            </span>
          </div>
        </div>
      </section>

      {questions.length === 0 ? (
        <section className="glass-panel quiz-setup">
          <div className="setup-clean">
            <h2>Start a new game</h2>
            <p className="muted-text">
              Pick a mode, category, and question count. Your local progress is tracked on this
              device.
            </p>

            <div className="setup-topbar">
              <div className="selected-topic-line">
                <span>Selected category</span>
                <strong>{selectedTopicLabel}</strong>
              </div>

              <div className="count-picker">
                <p className="count-title">Questions per round</p>
                <div className="count-row">
                  {QUESTION_COUNTS.map((value) => (
                    <button
                      className={`count-pill ${questionCount === value ? 'active' : ''}`}
                      key={value}
                      onClick={() => setQuestionCount(value)}
                      type="button"
                    >
                      {value} Q
                    </button>
                  ))}
                </div>
                <p className="count-help">
                  {poolSize
                    ? effectiveQuestionCount < questionCount
                      ? `Only ${poolSize} question(s) available for this mode/category.`
                      : 'Round length for this game.'
                    : 'No question available in this selection yet.'}
                </p>
              </div>
            </div>

            <div className="mode-picker">
              <p className="count-title">Game mode</p>
              <div className="mode-grid">
                {MODE_OPTIONS.map((mode) => {
                  const ModeIcon = mode.icon
                  const disabled = mode.id === 'review' && reviewPool.length === 0
                  const description =
                    mode.id === 'review' && reviewPool.length > 0
                      ? `${reviewPool.length} mistakes ready to review.`
                      : mode.description

                  return (
                    <button
                      className={`mode-chip ${modeId === mode.id ? 'active' : ''}`}
                      disabled={disabled}
                      key={mode.id}
                      onClick={() => {
                        setModeId(mode.id)
                        if (mode.id === 'review' && topicId !== 'all' && !reviewTopicCount[topicId]) {
                          setTopicId('all')
                        }
                      }}
                      type="button"
                    >
                      <div className="mode-chip-top">
                        <ModeIcon size={15} />
                        <span>{mode.name}</span>
                      </div>
                      <small>{description}</small>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="category-panel">
              <div className="category-filter">
                <button
                  className={`filter-chip ${topicView === 'all' ? 'active' : ''}`}
                  onClick={() => setTopicView('all')}
                  type="button"
                >
                  <Layers3 size={14} />
                  All
                </button>
                <button
                  className={`filter-chip ${topicView === 'core' ? 'active' : ''}`}
                  onClick={() => setTopicView('core')}
                  type="button"
                >
                  <Cpu size={14} />
                  Core CS
                </button>
                <button
                  className={`filter-chip ${topicView === 'security' ? 'active' : ''}`}
                  onClick={() => setTopicView('security')}
                  type="button"
                >
                  <ShieldCheck size={14} />
                  Security
                </button>
              </div>

              <div className="topic-grid compact">
                {topicView === 'all' &&
                  renderTopicButton({
                    id: 'all',
                    name: 'Mixed',
                    count: TOTAL_QUESTIONS,
                  })}
                {visibleTopics.map(renderTopicButton)}
              </div>
            </div>

            <div className="progress-panel">
              <div className="progress-panel-row">
                <span>Sessions</span>
                <strong>{progressSnapshot.sessionsPlayed}</strong>
              </div>
              <div className="progress-panel-row">
                <span>Average</span>
                <strong>{progressSnapshot.averagePercent}%</strong>
              </div>
              <div className="progress-panel-row">
                <span>Best</span>
                <strong>{progressSnapshot.bestPercent}%</strong>
              </div>
              <div className="progress-panel-row">
                <span>Weak spot</span>
                <strong>{progressSnapshot.weakestTopicLabel ?? 'Not enough data'}</strong>
              </div>
            </div>

            <button
              className="button button-primary"
              disabled={poolSize === 0}
              onClick={startGame}
              type="button"
            >
              {isExamMode ? 'Start exam' : isTimedMode ? 'Start timed round' : 'Start quiz'}
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      ) : finished ? (
        <section className="glass-panel quiz-setup">
          <h2>Game finished</h2>
          <div className="final-score-panel">
            <p className="muted-text">
              Final score: <strong>{score}</strong> / {results.length} ({scorePercent}%)
            </p>
            <p className="muted-text">
              Mode: <strong>{activeMode.name}</strong> | Category: <strong>{selectedTopicLabel}</strong>
            </p>
            <div className="final-metrics">
              <span className="metric-chip good">Correct: {score}</span>
              <span className="metric-chip bad">Wrong: {wrongResults.length}</span>
              {timedOutCount > 0 && <span className="metric-chip bad">Timeouts: {timedOutCount}</span>}
            </div>
          </div>

          <div className="result-actions">
            <button className="button button-primary" onClick={startGame} type="button">
              <RotateCcw size={15} />
              Play again
            </button>
            <button className="button button-soft" onClick={reset} type="button">
              New setup
            </button>
            {progressSnapshot.reviewQuestionIds.length > 0 && modeId !== 'review' && (
              <button
                className="button button-soft"
                onClick={() => {
                  setModeId('review')
                  reset()
                }}
                type="button"
              >
                Review mistakes
              </button>
            )}
            <Link className="button button-soft" to="/">
              Home
            </Link>
          </div>

          {wrongResults.length > 0 ? (
            <div className="answer-summary">
              <p className="review-title">What to review</p>
              {wrongResults.map((entry, index) => (
                <div className="summary-item ko" key={entry.questionId}>
                  <p>
                    {index + 1}. {entry.question}
                  </p>
                  <small>
                    Your answer: {entry.selected} | Correct: {entry.correct}
                  </small>
                  <p className="summary-explain">{entry.explanation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="answer-summary">
              <div className="summary-item ok">
                <p>Perfect round. You answered every question correctly.</p>
                <small>You can increase the question count or try another category.</small>
              </div>
            </div>
          )}
        </section>
      ) : (
        <AnimatePresence mode="wait">
          <Motion.section
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel quiz-card"
            exit={{ opacity: 0, x: -110 }}
            initial={{ opacity: 0, x: 110 }}
            key={`${currentQuestion.id}-${transitionKey}`}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="quiz-meta">
              <span>
                Question {currentIndex + 1}/{questions.length}
              </span>
              <span>{currentQuestion.topicName}</span>
              {isTimedMode && (
                <span className={`timer-chip ${timeLeft <= 5 && !revealed ? 'danger' : ''}`}>
                  <AlarmClock size={12} />
                  {Math.max(0, timeLeft)}s
                </span>
              )}
            </div>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <h2>{currentQuestion.prompt}</h2>

            {isExamMode && (
              <p className="exam-note">
                Exam mode: no instant correction. Submit all questions to see explanations.
              </p>
            )}

            <div className="options-grid">
              {currentQuestion.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === currentQuestion.answerIndex
                const isSelected = optionIndex === selectedIndex
                const stateClass = revealed
                  ? isCorrect
                    ? 'is-correct'
                    : isSelected
                      ? 'is-wrong'
                      : ''
                  : isExamMode && isSelected
                    ? 'is-selected'
                    : ''

                return (
                  <button
                    className={`option-button ${stateClass}`}
                    key={option}
                    onClick={() => selectAnswer(optionIndex)}
                    type="button"
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {revealed && (
              <div
                className={`answer-feedback ${
                  selectedIndex === currentQuestion.answerIndex ? 'hit' : 'miss'
                }`}
              >
                <p className="feedback-row">
                  <CheckCircle2 size={15} />
                  {timedOutFlags[currentIndex]
                    ? `Time expired. Correct: ${currentQuestion.options[currentQuestion.answerIndex]}`
                    : selectedIndex === currentQuestion.answerIndex
                      ? 'Great choice.'
                      : `Not quite. Correct: ${currentQuestion.options[currentQuestion.answerIndex]}`}
                </p>
                <p className="feedback-explain">{currentQuestion.explanation}</p>
              </div>
            )}

            <button
              className="button button-primary"
              disabled={isExamMode ? selectedIndex === null : !revealed}
              onClick={nextQuestion}
              type="button"
            >
              {currentIndex >= questions.length - 1 ? (isExamMode ? 'Submit exam' : 'Finish') : 'Next'}
              <ArrowRight size={15} />
            </button>
          </Motion.section>
        </AnimatePresence>
      )}
    </div>
  )
}

export default QuizPage
