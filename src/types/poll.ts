export type PollOption = {
  _id: string;
  text: string;
  votes: number;
};

export type PollType = "multiple-choice" | "yes-no";

export type ExpirationTime = "1h" | "12h" | "24h";

export type Poll = {
  _id: string;
  question: string;
  options: PollOption[];
  type: PollType;
  createdAt: string;
  expiresAt: string;
  hideResults: boolean;
  isPrivate: boolean;
  trendingCount: number;
  likeCount: number;
  selectedOptionId?: string;
};

export type CreatePollData = {
  question: string;
  options: string[];
  type: PollType;
  expirationTime: ExpirationTime;
  hideResults: boolean;
  isPrivate: boolean;
};
