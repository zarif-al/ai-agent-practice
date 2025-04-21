"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateGraph } from "./generate-graph";

interface ChatMessage {
	id: string;
	content: string;
	sender: "user" | "assistant";
	timestamp: Date;
}

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: "1",
			content: "Hello! How can I help you with HR-related questions today?",
			sender: "assistant",
			timestamp: new Date(),
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [isOpen]);

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Handle sending a message
	const handleSendMessage = async () => {
		if (!inputValue.trim()) {
			return;
		}

		// Add user message
		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			content: inputValue,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);

		setInputValue("");

		setIsLoading(true);

		const response = await generateGraph(inputValue);

		const assistantMessage: ChatMessage = {
			id: (Date.now() + 1).toString(),
			content: response,
			sender: "assistant",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, assistantMessage]);

		setIsLoading(false);
	};

	// Handle key press (Enter to send)
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	// If modal is not open, don't render anything
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
			<div className="fixed inset-4 z-50 bg-background border rounded-lg shadow-lg flex flex-col max-w-5xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between border-b p-4">
					<h2 className="text-xl font-semibold">HR Assistant</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="size-5" />
						<span className="sr-only">Close</span>
					</Button>
				</div>

				{/* Chat messages */}
				<ScrollArea className="flex-1 p-4">
					<div className="space-y-4">
						{messages.map((message, index) => (
							<div
								key={message.id}
								// Ref to scroll to the last message
								ref={index === messages.length - 1 ? messagesEndRef : null}
								// Align user messages to the right, assistant messages to the left
								className={`flex ${
									message.sender === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									// Container for avatar and message bubble
									// For user messages, reverse the order (avatar on right)
									className={`flex items-start gap-2 max-w-[80%] ${
										message.sender === "user" ? "flex-row-reverse" : ""
									}`}
								>
									{/* Avatar circle with icon based on sender */}
									<div
										className={`size-8 rounded-full flex items-center justify-center ${
											message.sender === "user"
												? "bg-primary text-primary-foreground" // Blue background for user
												: "bg-muted" // Gray background for assistant
										}`}
									>
										{message.sender === "user" ? (
											<User className="size-4" />
										) : (
											<Bot className="size-4" />
										)}
									</div>

									{/* Message bubble with content and timestamp */}
									<div
										className={`rounded-lg px-4 py-2 ${
											message.sender === "user"
												? "bg-primary text-primary-foreground" // Blue bubble for user
												: "bg-muted text-foreground" // Gray bubble for assistant
										}`}
									>
										{/* Message content */}
										<p>{message.content}</p>

										{/* Timestamp in smaller text */}
										<p className="text-xs opacity-70 mt-1">
											{message.timestamp.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
								</div>
							</div>
						))}

						{/* Loading indicator for BOT */}
						{isLoading && <TypingIndicator />}
					</div>
				</ScrollArea>

				{/* Input area */}
				<div className="border-t p-4">
					<div className="flex gap-2">
						<Input
							ref={inputRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyPress}
							placeholder="Type your message..."
							className="flex-1"
						/>
						<Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
							<Send className="size-4 mr-2" />
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * TypingIndicator component to show when the bot is typing.
 *
 */
function TypingIndicator() {
	return (
		<div className="flex justify-start">
			<div className="flex items-start gap-2 max-w-[80%]">
				<div className="size-8 rounded-full flex items-center justify-center bg-muted">
					<Bot className="size-4" />
				</div>
				<div className="rounded-lg px-4 py-2 bg-muted text-foreground">
					<div className="flex items-center gap-1">
						<span
							className="size-2 rounded-full bg-current animate-pulse"
							style={{ animationDelay: "0ms" }}
						></span>
						<span
							className="size-2 rounded-full bg-current animate-pulse"
							style={{ animationDelay: "300ms" }}
						></span>
						<span
							className="size-2 rounded-full bg-current animate-pulse"
							style={{ animationDelay: "600ms" }}
						></span>
					</div>
				</div>
			</div>
		</div>
	);
}
