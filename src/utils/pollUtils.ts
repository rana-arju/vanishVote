import { v4 as uuidv4 } from "uuid";
import { CreatePollData, ExpirationTime, Poll, PollOption } from "@/types/poll";

// Mock storage since we're not using a real backend yet
const STORAGE_KEY = "vanish-vote-polls";

// Dummy poll data for testing
const DUMMY_POLLS: Poll[] = [
  {
    _id: "poll-1",
    question: "What's your favorite programming language?",
    options: [
      { _id: "opt-1", text: "JavaScript", votes: 42 },
      { _id: "opt-2", text: "Python", votes: 38 },
      { _id: "opt-3", text: "TypeScript", votes: 27 },
      { _id: "opt-4", text: "Rust", votes: 15 },
    ],
    type: "multiple-choice",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    expiresAt: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    hideResults: false,
    isPrivate: false,
    trendingCount: 24,
    likeCount: 18,
  },
  {
    _id: "poll-2",
    question: "Should we adopt a 4-day work week?",
    options: [
      { _id: "opt-5", text: "Yes", votes: 87 },
      { _id: "opt-6", text: "No", votes: 13 },
    ],
    type: "yes-no",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    hideResults: true,
    isPrivate: false,
    trendingCount: 56,
    likeCount: 42,
  },
  {
    _id: "poll-3",
    question: "What platform do you use for remote team communication?",
    options: [
      { _id: "opt-7", text: "Slack", votes: 45 },
      { _id: "opt-8", text: "Microsoft Teams", votes: 32 },
      { _id: "opt-9", text: "Discord", votes: 18 },
      { _id: "opt-10", text: "Email", votes: 5 },
    ],
    type: "multiple-choice",
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    expiresAt: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
    hideResults: false,
    isPrivate: false,
    trendingCount: 12,
    likeCount: 8,
  },
  {
    _id: "poll-4",
    question: "Would you use AI tools in your daily workflow?",
    options: [
      { _id: "opt-11", text: "Yes", votes: 65 },
      { _id: "opt-12", text: "No", votes: 35 },
    ],
    type: "yes-no",
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    expiresAt: new Date(Date.now() + 72000000).toISOString(), // 20 hours from now
    hideResults: false,
    isPrivate: false,
    trendingCount: 32,
    likeCount: 24,
  },
  {
    _id: "poll-5",
    question: "What's your preferred code editor?",
    options: [
      { _id: "opt-13", text: "VS Code", votes: 58 },
      { _id: "opt-14", text: "IntelliJ IDEA", votes: 22 },
      { _id: "opt-15", text: "Sublime Text", votes: 12 },
      { _id: "opt-16", text: "Vim", votes: 8 },
    ],
    type: "multiple-choice",
    createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    expiresAt: new Date(Date.now() + 18000000).toISOString(), // 5 hours from now
    hideResults: false,
    isPrivate: false,
    trendingCount: 18,
    likeCount: 14,
  },
];

// Convert expiration time string to milliseconds
export const getExpirationMilliseconds = (
  expiration: ExpirationTime
): number => {
  switch (expiration) {
    case "1h":
      return 60 * 60 * 1000; // 1 hour
    case "12h":
      return 12 * 60 * 60 * 1000; // 12 hours
    case "24h":
      return 24 * 60 * 60 * 1000; // 24 hours
    default:
      return 60 * 60 * 1000; // Default to 1 hour
  }
};

// Format time remaining in a human-readable way
export const formatTimeRemaining = (expiresAt: string): string => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Expired";
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  return `${minutes}m remaining`;
};

// Check if a poll has expired
export const isPollExpired = (expiresAt: string): boolean => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  return now > expiry;
};

// Initialize local storage with dummy data if empty
const initializeStorage = () => {
  const existingPolls = localStorage.getItem(STORAGE_KEY);
  if (!existingPolls) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_POLLS));
  }
};

// Call initialization once
initializeStorage();

// Create a new poll
export const createPoll = (data: CreatePollData): Poll => {
  const now = new Date();
  const expiryMs = getExpirationMilliseconds(data.expirationTime);
  const expiresAt = new Date(now.getTime() + expiryMs);

  // Create options with IDs
  const options: PollOption[] = data.options.map((text) => ({
    _id: uuidv4(),
    text,
    votes: 0,
  }));

  // Create the poll
  const poll: Poll = {
    _id: uuidv4(),
    question: data.question,
    options,
    type: data.type,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    hideResults: data.hideResults,
    isPrivate: data.isPrivate,
    trendingCount: 0,
    likeCount: 0,
  };

  // Save to local storage
  const existingPolls = getPolls();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingPolls, poll]));

  return poll;
};

// Get all polls from storage
export const getPolls = (): Poll[] => {
  const polls = localStorage.getItem(STORAGE_KEY);
  return polls ? JSON.parse(polls) : [];
};

// Get a single poll by ID
export const getPoll = (id: string): Poll | undefined => {
  const polls = getPolls();
  return polls.find((poll) => poll._id === id);
};

// Vote on a poll
export const votePoll = (
  pollId: string,
  optionId: string
): Poll | undefined => {
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p._id === pollId);

  if (pollIndex === -1) return undefined;

  // Clone the poll to avoid direct state mutation
  const updatedPoll = { ...polls[pollIndex] };

  // Update the option votes
  updatedPoll.options = updatedPoll.options.map((option) => {
    if (option._id === optionId) {
      return { ...option, votes: option.votes + 1 };
    }
    return option;
  });

  // Set the selected option
  updatedPoll.selectedOptionId = optionId;

  // Update in storage
  polls[pollIndex] = updatedPoll;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));

  return updatedPoll;
};

// Add reaction to a poll
export const addReaction = (
  pollId: string,
  reaction: "trending" | "like"
): Poll | undefined => {
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p._id === pollId);

  if (pollIndex === -1) return undefined;

  // Clone the poll
  const updatedPoll = { ...polls[pollIndex] };

  // Update reaction count
  if (reaction === "trending") {
    updatedPoll.trendingCount += 1;
  } else {
    updatedPoll.likeCount += 1;
  }

  // Update in storage
  polls[pollIndex] = updatedPoll;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));

  return updatedPoll;
};

// Delete a poll (for cleanup, not exposed to users)
export const deletePoll = (pollId: string): void => {
  const polls = getPolls();
  const filteredPolls = polls.filter((p) => p._id !== pollId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPolls));
};

// Get shareable link for a poll
export const getPollShareLink = (pollId: string): string => {
  return `${window.location.origin}/poll/${pollId}`;
};
