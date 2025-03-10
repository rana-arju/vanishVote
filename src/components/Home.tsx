import React from "react";
import { ArrowRight, Clock, Check, Share2, EyeOff } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 bg-gradient-to-r from-purple-dark via-purple to-purple-light bg-clip-text">
              Create polls that vanish after you&apos;re done
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
              Quick, anonymous, and ephemeral polls - perfect for making
              decisions, gathering feedback, or just having fun without leaving
              a trace.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create-poll"
                className="bg-primary w-full sm:w-52  text-white px-5 py-2 rounded-lg shadow-md hover:bg-primary/90 transition cursor-pointer flex justify-center items-center"
              >
                <span>Create a Poll</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/explore"
                className="px-5 py-2 w-full sm:w-52 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-lg transition-colors"
              >
                Explore Public Polls
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-2 md:px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-primary/30 rounded-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How VanishVote Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-xl p-6 vanish-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create & Share</h3>
              <p className="text-muted-foreground">
                Create multiple-choice or yes/no polls in seconds and share with
                a unique link.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 vanish-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vote Anonymously</h3>
              <p className="text-muted-foreground">
                No login required. Anyone with the link can vote anonymously.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 vanish-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-Expiration</h3>
              <p className="text-muted-foreground">
                Polls automatically disappear after 1, 12, or 24 hours - you
                decide.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 vanish-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                <EyeOff className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy Options</h3>
              <p className="text-muted-foreground">
                Hide results until expiration, create private link-only polls.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
