'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Zap,
  Smile,
} from 'lucide-react';
import {
  answerChapterQuery,
  getChapterGreeting,
  getChapterInputPlaceholder,
  cleanLatexForDisplay,
} from '@/lib/interactive/chapterAiKnowledgeEngine';
import { MathText } from '../common/MathRenderer';

interface ChapterAiTwinProps {
  chapterTitle: string;
  subject: string;
  grade: number;
}

export const ChapterAiTwin: React.FC<ChapterAiTwinProps> = ({
  chapterTitle,
  subject,
  grade,
}) => {
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; time?: string }[]
  >([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize messages dynamically based on subject & chapter
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: getChapterGreeting(chapterTitle, subject, grade),
        time: 'Just now',
      },
    ]);
  }, [chapterTitle, grade, subject]);

  const quickPrompts = [
    {
      label: '👶 Explain to a 5-Year-Old',
      prompt: 'Explain ' + chapterTitle + ' like I am 5 years old.',
    },
    {
      label: '🔥 Toughest CBSE Trick Question',
      prompt: 'What is the most brutal trick question examiners ask from ' + chapterTitle + '?',
    },
    {
      label: '🚀 Real-World & Career Impact',
      prompt: 'Why is ' + chapterTitle + ' essential in real life and high-paying careers?',
    },
    {
      label: '🎯 3 Secrets for 100% Marks',
      prompt: 'Give me the 3 golden rules to score full marks in tests for ' + chapterTitle + '.',
    },
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: promptText, time: 'Just now' },
    ]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = answerChapterQuery(promptText, chapterTitle, subject, grade);

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply, time: 'Just now' },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const dynamicPlaceholder = getChapterInputPlaceholder(chapterTitle, subject, grade);

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm text-slate-800 space-y-4">
      {/* AI Twin Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {chapterTitle} AI Twin
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                {subject} Specialist
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive 24/7 Chapter Mentor • 100% Direct Conceptual Answers (Zero Boilerplate)
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-sky-700 font-mono font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Cognitive AI Sync</span>
        </div>
      </div>

      {/* Quick Prompt Magnetic Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendPrompt(qp.prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-slate-700 hover:text-indigo-900 transition shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Conversation Stream */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 min-h-[220px] max-h-[300px] overflow-y-auto space-y-3 shadow-inner">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                m.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-tr-none shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-xs'
              }`}
            >
              <div className="whitespace-pre-line font-normal"><MathText text={m.text} /></div>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0 mt-0.5">
                <Smile className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pl-2">
            <Bot className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
            <span>AI Twin is formulating precise conceptual answer...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(inputText);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={dynamicPlaceholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-2xs"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </form>
    </div>
  );
};
