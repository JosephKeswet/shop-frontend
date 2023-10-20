import { TSignIn, TSignUp } from "@/types";
import axios from "axios";

export const signUp = async (payload: TSignUp) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
		payload
	);
	return data;
};

export const signIn = async (payload: TSignIn) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
		payload
	);
	return data;
};

