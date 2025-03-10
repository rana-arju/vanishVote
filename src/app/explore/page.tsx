"use client"
import React, { useState, useEffect } from "react";

import { Poll } from "@/types/poll";
import { Flame, Clock } from "lucide-react";
import { getPolls, isPollExpired } from "@/utils/pollUtils";
import PollCard from "@/components/PollCard";

const ExplorePage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "trending" | "newest">("all");

  useEffect(() => {
    // Get all public polls that haven't expired
    const allPolls = getPolls();
    const publicPolls = allPolls.filter(
      (poll) => !poll.isPrivate && !isPollExpired(poll.expiresAt)
    );

    setPolls(publicPolls);
    setLoading(false);
  }, []);

  const handleUpdatePoll = (updatedPoll: Poll) => {
    setPolls(polls.map((p) => (p._id === updatedPoll._id ? updatedPoll : p)));
  };

  const filteredPolls = () => {
    switch (filter) {
      case "trending":
        return [...polls].sort((a, b) => b.trendingCount - a.trendingCount);
      case "newest":
        return [...polls].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return polls;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 py-10 px-2 md:px-4 sm:px-6 w-full mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Explore Public Polls</h1>
          <p className="text-muted-foreground">
            Discover and vote on public polls created by other users.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                filter === "all"
                  ? "bg-purple text-primary border-purple"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              All Polls
            </button>
            <button
              onClick={() => setFilter("trending")}
              className={`px-4 py-2 text-sm font-medium border-y border-r ${
                filter === "trending"
                  ? "bg-purple text-primary border-purple"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              <Flame size={14} className="inline mr-1" />
              Trending
            </button>
            <button
              onClick={() => setFilter("newest")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border-y border-r ${
                filter === "newest"
                  ? "bg-purple text-primary border-purple"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              <Clock size={14} className="inline mr-1" />
              Newest
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex space-x-2 items-center">
              <Clock className="h-5 w-5 text-purple" />
              <span>Loading polls...</span>
            </div>
          </div>
        ) : filteredPolls().length === 0 ? (
          <div className="bg-card rounded-xl vanish-shadow p-8 max-w-md mx-auto text-center">
            <h2 className="text-xl font-semibold mb-3">
              No public polls available
            </h2>
            <p className="text-muted-foreground mb-4">
              There are no active public polls at the moment. Be the first to
              create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPolls().map((poll) => (
              <PollCard
                key={poll._id}
                poll={poll}
                updatePoll={handleUpdatePoll}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExplorePage;
