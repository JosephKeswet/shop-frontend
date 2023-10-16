import NavBar from "@/components/navbar";
import QuickView from "@/components/quick-view";
import ProductContent from "@/features/products";
import Image from "next/image";

export default function Home() {
	return (
		<main>
			<NavBar />
			<ProductContent />
			{/* <QuickView /> */}
		</main>
	);
}
