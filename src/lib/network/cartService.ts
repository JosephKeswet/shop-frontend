import { TAddToCart } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

export const addToCart = async (payload: TAddToCart) => {
	const accessToken = Cookies.get("accessToken");
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/add`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return data;
	} catch (err) {
		console.error(err);
	}
};
