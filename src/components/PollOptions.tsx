"use client";
import React from "react";
import { Check } from "lucide-react";
import { PollOption as PollOptionType } from "@/types/poll";

interface PollOptionProps {
  option: PollOptionType;
  isSelected: boolean;
  isDisabled: boolean;
  totalVotes: number;
  showResults: boolean;
  onSelect: (optionId: string) => void;
}

const PollOption = ({
  option,
  isSelected,
  isDisabled,
  totalVotes,
  showResults,
  onSelect,
}: PollOptionProps) => {
  const percentage =
    totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

  return (
    <div className="relative mb-3">
      <button
        onClick={() => !isDisabled && onSelect(option._id)}
        disabled={isDisabled}
        className={`w-full p-4 rounded-lg flex items-center justify-between border-2 transition-all
          ${
            isSelected
              ? "border-primary bg-purple-100 font-medium"
              : "border-gray-300 bg-white"
          } 
          ${
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-primary"
          }`}
      >
        <div className="flex items-center">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3
              ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
          >
            {isSelected && <Check size={12} />}
          </div>
          <span className="text-gray-500 dark:text-white">{option.text}</span>
        </div>

        {showResults && (
          <span className="text-sm font-medium text-gray-700">
            {percentage}% ({option.votes})
          </span>
        )}
      </button>

      {showResults && (
        <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default PollOption;
