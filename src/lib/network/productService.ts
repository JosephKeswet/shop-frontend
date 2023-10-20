import axios from "axios";

export const getProducts = async () => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all`
		);
		return data?.products;
	} catch (err) {
		console.error(err);
	}
};
