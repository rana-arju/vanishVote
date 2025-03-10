"use client"
import React, { useState, useEffect } from "react";
import { Clock, Flame, Share2, ThumbsUp, Eye, EyeOff } from "lucide-react";
import { Poll as PollType } from "@/types/poll";
import {
  formatTimeRemaining,
  getPollShareLink,
  isPollExpired,
  votePoll,
  addReaction,
} from "@/utils/pollUtils";
import { toast } from "sonner";
import PollOption from "./PollOptions";

interface PollCardProps {
  poll: PollType;
  updatePoll: (updatedPoll: PollType) => void;
}

const PollCard = ({ poll, updatePoll }: PollCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState(
    formatTimeRemaining(poll.expiresAt)
  );
  const [expired, setExpired] = useState(isPollExpired(poll.expiresAt));
  const [hasVoted, setHasVoted] = useState(!!poll.selectedOptionId);
  const [showResults, setShowResults] = useState(
    !poll.hideResults || expired || hasVoted
  );

  // Update timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(poll.expiresAt));
      const isExpired = isPollExpired(poll.expiresAt);
      setExpired(isExpired);
      if (isExpired && !showResults) setShowResults(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [poll.expiresAt, showResults]);

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const handleVote = (optionId: string) => {
    if (expired || hasVoted) return;

    const updatedPoll = votePoll(poll._id, optionId);
    if (updatedPoll) {
      setHasVoted(true);
      if (poll.hideResults && !expired) {
        setShowResults(false);
      } else {
        setShowResults(true);
      }
      updatePoll(updatedPoll);
      toast.success("Your vote has been submitted successfully.");
    }
  };

  const handleReaction = (type: "trending" | "like") => {
    const updatedPoll = addReaction(poll._id, type);
    if (updatedPoll) {
      updatePoll(updatedPoll);
      toast.success(type === "trending" ? "🔥 Trending" : "👍 Liked");
    }
  };

  const handleShare = () => {
    const link = getPollShareLink(poll._id);
    navigator.clipboard.writeText(link);
    toast.success( "Poll link copied to clipboard.",
    );
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const isDisabled = expired || hasVoted;

  return (
    <div className="bg-card rounded-xl vanish-shadow p-2 md:p-6 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
          <Clock size={16} />
          <span
            className={
              expired ? "text-destructive" : "text-muted-foreground"
            }
          >
            {timeRemaining}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={toggleResults}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label={showResults ? "Hide results" : "Show results"}
          >
            {showResults ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Share poll"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">{poll.question}</h2>

      <div className="mb-6">
        { poll.options.map((option) => (
          <PollOption
            key={option._id}
            option={option}
            isSelected={option._id === poll.selectedOptionId}
            isDisabled={isDisabled}
            totalVotes={totalVotes}
            showResults={showResults}
            onSelect={handleVote}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleReaction("trending")}
            className="flex items-center space-x-1 text-sm hover:text-orange hover:scale-105 transition-all"
            aria-label="Mark as trending"
          >
            <Flame size={16} />
            <span>{poll.trendingCount}</span>
          </button>
          <button
            onClick={() => handleReaction("like")}
            className="flex items-center space-x-1 text-sm hover:text-purple hover:scale-105 transition-all"
            aria-label="Like this poll"
          >
            <ThumbsUp size={16} />
            <span>{poll.likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
