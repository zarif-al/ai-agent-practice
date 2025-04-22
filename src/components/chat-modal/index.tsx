"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { X, Send, User, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
	const { messages, input, handleInputChange, handleSubmit, status } = useChat({
		initialMessages: [
			{
				id: "1",
				role: "assistant",
				content: "Hello! How can I help you with HR-related questions today?",
			},
		],
		api: "/api/graph-ai", // This would be your endpoint for chat functionality
		onResponse: () => {
			// Scroll to bottom when we get a response
			scrollToBottom();
		},
		onError: () => {
			toast.error("An error occurred while processing your request.");
		},
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [isOpen]);

	// Scroll to bottom function
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Scroll to bottom when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Handle form submission
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit(e);
	};

	// Typing indicator component
	const TypingIndicator = () => {
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
	};

	// If modal is not open, don't render anything
	if (!isOpen) return null;

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
				<ScrollArea className="flex-1 p-4 h-[200px]">
					<div className="space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								// Align user messages to the right, assistant messages to the left
								className={`flex ${
									message.role === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									// Container for avatar and message bubble
									// For user messages, reverse the order (avatar on right)
									className={`flex items-start gap-2 max-w-[80%] ${
										message.role === "user" ? "flex-row-reverse" : ""
									}`}
								>
									{/* Avatar circle with icon based on sender */}
									<div
										className={`size-8 rounded-full flex items-center justify-center ${
											message.role === "user"
												? "bg-primary text-primary-foreground" // Blue background for user
												: "bg-muted" // Gray background for assistant
										}`}
									>
										{message.role === "user" ? (
											<User className="size-4" />
										) : (
											<Bot className="size-4" />
										)}
									</div>

									{/* Message bubble with content */}
									<div
										className={`rounded-lg px-4 py-2 ${
											message.role === "user"
												? "bg-primary text-primary-foreground" // Blue bubble for user
												: "bg-muted text-foreground" // Gray bubble for assistant
										}`}
									>
										{/* Message content */}
										<p>{message.content}</p>
									</div>
								</div>
							</div>
						))}
						{status == "submitted" && <TypingIndicator />}
						<div ref={messagesEndRef} />
					</div>
				</ScrollArea>

				{/* Input area */}
				<div className="border-t p-4">
					<form onSubmit={onSubmit} className="flex gap-2">
						<Input
							ref={inputRef}
							value={input}
							onChange={handleInputChange}
							placeholder="Type your message..."
							className="flex-1"
							disabled={status !== "ready"}
						/>
						<Button
							type="submit"
							disabled={!input.trim() || status !== "ready"}
						>
							<Send className="size-4 mr-2" />
							Send
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
