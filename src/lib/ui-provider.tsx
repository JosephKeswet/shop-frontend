"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

const LayoutProvider = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			{children}
		</QueryClientProvider>
	);
};

export default LayoutProvider;
