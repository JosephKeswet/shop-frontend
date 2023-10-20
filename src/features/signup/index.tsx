"use client";
import { signUp } from "@/lib/network/authService";
import { TSignUp } from "@/types";
import Link from "next/link";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function SignUpContent() {
	const router = useRouter();
	const { mutate, isLoading } = useMutation(signUp, {
		onSuccess: ({ accessToken, msg, id }) => {
			if (accessToken) {
				Cookies.set("accessToken", accessToken);
				Cookies.set("userId", id);

				toast.success(msg);
				router.push("/");
			}
			// Invalidate and refetch
		},
		onError: ({ response, message }) => {
			if (typeof response?.data?.message === "string") {
				toast.error(response?.data?.message);
			} else {
				toast.error(response?.data?.message[0]);
			}
		},
	});

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const phoneNumber = formData.get("phoneNumber") as string;
		const password = formData.get("password") as string;

		// Call the mutation function with form data
		mutate({ username, email, phoneNumber, password });
	};

	return (
		<>
			{/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign Up
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={handleFormSubmit}
					>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									required
									className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Phone
							</label>
							<div className="mt-2">
								<input
									id="phoneNumber"
									name="phoneNumber"
									type="text"
									required
									className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="text-sm text-right mt-2">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								aria-disabled={isLoading}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{isLoading ? (
									<ReloadIcon className="animate-spin" />
								) : (
									"Sign in"
								)}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an acccount?{" "}
						<Link
							href="/signin"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
