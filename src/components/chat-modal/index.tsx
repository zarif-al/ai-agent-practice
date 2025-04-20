"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
	const handleSendMessage = () => {
		if (!inputValue.trim()) return;

		// Add user message
		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			content: inputValue,
			sender: "user",
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");

		// Simulate assistant response after a short delay
		setTimeout(() => {
			const assistantMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				content: getSimulatedResponse(inputValue),
				sender: "assistant",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 1000);
	};

	// Handle key press (Enter to send)
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	// Simple function to simulate responses
	const getSimulatedResponse = (query: string): string => {
		const lowerQuery = query.toLowerCase();

		if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
			return "Hello! How can I assist you with HR matters today?";
		} else if (
			lowerQuery.includes("leave") ||
			lowerQuery.includes("vacation")
		) {
			return "To request leave, please go to the Leave Management section. You can submit a new request there.";
		} else if (lowerQuery.includes("salary") || lowerQuery.includes("pay")) {
			return "Payroll information can be found in the Payroll & Compensation section. If you have specific questions about your salary, please contact the HR department directly.";
		} else if (lowerQuery.includes("job") || lowerQuery.includes("position")) {
			return "You can view all open positions in the Job Openings section. If you're interested in applying, please submit your application through the careers portal.";
		} else {
			return "I'm not sure I understand your question. Could you please provide more details or rephrase your query?";
		}
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
				<ScrollArea className="flex-1 p-4">
					<div className="space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.sender === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`flex items-start gap-2 max-w-[80%] ${
										message.sender === "user" ? "flex-row-reverse" : ""
									}`}
								>
									<div
										className={`size-8 rounded-full flex items-center justify-center ${
											message.sender === "user"
												? "bg-primary text-primary-foreground"
												: "bg-muted"
										}`}
									>
										{message.sender === "user" ? (
											<User className="size-4" />
										) : (
											<Bot className="size-4" />
										)}
									</div>
									<div
										className={`rounded-lg px-4 py-2 ${
											message.sender === "user"
												? "bg-primary text-primary-foreground"
												: "bg-muted text-foreground"
										}`}
									>
										<p>{message.content}</p>
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
						<div ref={messagesEndRef} />
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
