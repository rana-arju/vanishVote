"use client"
import React, { useState } from "react";
import { Plus, Trash2, Clock, Eye, Lock, PlusCircle } from "lucide-react";
import { CreatePollData, ExpirationTime, PollType } from "@/types/poll";
import { toast } from "sonner";
import { createPoll } from "@/services/poll";
import { useRouter } from "next/navigation";

const CreatePollForm = () => {
const router = useRouter()
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollType, setPollType] = useState<PollType>("multiple-choice");
  const [expirationTime, setExpirationTime] = useState<ExpirationTime>("1h");
  const [hideResults, setHideResults] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    } else {
      toast.error("You can add up to 10 options only.");
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      toast.error("A poll must have at least 2 options.");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreateYesNoPoll = () => {
    setPollType("yes-no");
    setOptions(["Yes", "No"]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!question.trim()) {
      toast.error("Please enter a question for your poll.");
      return;
    }

    if (options.some((option) => !option.trim())) {
      toast.error("Please fill in all options or remove empty ones.");
      return;
    }

    // Create poll data
    const pollData: CreatePollData = {
      question,
      options: options.map((opt) => opt.trim()),
      type: pollType,
      expirationTime,
      hideResults,
      isPrivate,
    };

    // Create the poll
    const newPoll = createPoll(pollData);

    toast.success("Your poll has been created successfully.");

    // Navigate to the poll view
    router.push(`/poll/${newPoll._id}`);
  };

  return (
    <div className="container px-2 md:px-16 mx-auto shadow-2xl p-5 rounded-2xl">

    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="question" className="block text-sm font-medium mb-2">
          Poll Question
        </label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What do you want to ask?"
          className="w-full p-3  border-2 rounded-lg bg-background border-primary"
          maxLength={140}
          required
        />
        <div className="mt-1 text-xs text-muted-foreground flex justify-end">
          {question.length}/140
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Poll Options</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCreateYesNoPoll}
              className={`
                "text-xs px-3 py-1 rounded border border-border bg-muted cursor-pointer",
               ${
                 pollType === "yes-no" &&
                 "bg-secondary text-secondary-foreground"
               }`}
            >
              Yes/No
            </button>
            <button
              type="button"
              onClick={() => setPollType("multiple-choice")}
              className={`
                "text-xs px-3 py-1 rounded border border-border bg-muted cursor-pointer",
${pollType === "multiple-choice" && "bg-secondary text-secondary-foreground"}`}
            >
              Multiple Choice
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 p-3 border-2 border-primary rounded-lg bg-background"
                maxLength={100}
                required
                disabled={pollType === "yes-no"}
              />
              {pollType !== "yes-no" && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="p-3 text-gray-400 hover:text-destructive transition-colors"
                  aria-label="Remove option"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}

          {pollType !== "yes-no" && options.length < 10 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="w-full p-3 border border-dashed border-border rounded-lg text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Option
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
        <div>
          <label className="block text-sm font-medium mb-2">
            <Clock size={16} className="inline mr-1" />
            Expiration Time
          </label>
          <select
            value={expirationTime}
            onChange={(e) =>
              setExpirationTime(e.target.value as ExpirationTime)
            }
            className="w-full p-3 border border-border rounded-lg bg-background"
          >
            <option value="1h">1 hour</option>
            <option value="12h">12 hours</option>
            <option value="24h">24 hours</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id="hideResults"
            checked={hideResults}
            onChange={() => setHideResults(!hideResults)}
            className="rounded border-gray-300"
          />
          <label
            htmlFor="hideResults"
            className="text-sm font-medium flex items-center"
          >
            <Eye size={16} className="mr-1" />
            Hide results until poll ends
          </label>
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="rounded border-gray-300"
          />
          <label
            htmlFor="isPrivate"
            className="text-sm font-medium flex items-center"
          >
            <Lock size={16} className="mr-1" />
            Private (link access only)
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button className="bg-primary  text-white px-5 py-2 rounded-lg shadow-md hover:bg-primary/90 transition cursor-pointer">
          
          Create Poll
        </button>
      </div>
    </form>
    </div>
  );
};

export default CreatePollForm;
