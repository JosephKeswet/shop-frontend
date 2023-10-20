"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "react-query";
import { getProducts } from "@/lib/network/productService";
import { addToCart } from "@/lib/network/cartService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {};

const ProductContent = (props: Props) => {
	const [open, setOpen] = useState(false);
	const { data: products } = useQuery(["products"], getProducts, {
		cacheTime: 20000,
		staleTime: 20000,
		retry:20000
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const { mutate: addItemToCart, isLoading: isAddingToCart,data } = useMutation(
		addToCart,
		{
			onSuccess: ({ msg, message }) => {
				toast.success(msg);
				console.log(message);
			},
			onError: ({ response }) => {
				console.log(response);
				toast.error(data?.message);
			},
		}
	);

	const handleAddToCart = (productId: string) => {
		const userId = Cookies.get("userId") as string;
		const convertedUserId = parseFloat(userId);
		const convertedProductId = productId.toString();

		addItemToCart({ userId: convertedUserId, productId: convertedProductId });
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Customers also purchased
				</h2>

				<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-[74px] sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products?.map((product: any, index: number) => (
						<div
							key={product.id}
							className="group relative cursor-pointer"
							onClick={() => {
								setOpen(true);
								setSelectedIndex(index);
							}}
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden h-52 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={product.thumbnail}
									alt={product.title}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<a href={product.href}>
											<span
												aria-hidden="true"
												className="absolute inset-0"
											/>
											{product.title}
										</a>
									</h3>
									{/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
								</div>
								<p className="text-sm font-medium text-gray-900">
									${product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
								enterTo="opacity-100 translate-y-0 md:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 md:scale-100"
								leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
							>
								<Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
									<div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
										<button
											type="button"
											className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
											onClick={() => setOpen(false)}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>

										<div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
											<div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
												<img
													src={products && products[selectedIndex].thumbnail}
													alt={products && products[selectedIndex].title}
													className="object-cover object-center"
												/>
											</div>
											<div className="sm:col-span-8 lg:col-span-7">
												<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
													{products && products[selectedIndex].title}
												</h2>

												<section
													aria-labelledby="information-heading"
													className="mt-2"
												>
													<h3
														id="information-heading"
														className="sr-only"
													>
														Product information
													</h3>

													<p className="text-2xl text-gray-900">
														${products && products[selectedIndex].price}
													</p>

													{/* Reviews */}
													{/* <div className="mt-6">
														<h4 className="sr-only">Reviews</h4>
														<div className="flex items-center">
															<div className="flex items-center">
																{[0, 1, 2, 3, 4].map((rating) => (
																	<StarIcon
																		key={rating}
																		className={classNames(
																			product.rating > rating
																				? "text-gray-900"
																				: "text-gray-200",
																			"h-5 w-5 flex-shrink-0"
																		)}
																		aria-hidden="true"
																	/>
																))}
															</div>
															<p className="sr-only">
																{products && products.rating} out of 5 stars
															</p>
															<a
																href="#"
																className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
															>
																{product.reviewCount} reviews
															</a>
														</div>
													</div> */}
												</section>

												<section
													aria-labelledby="options-heading"
													className="mt-3"
												>
													<h3
														id="options-heading"
														className="sr-only"
													>
														Product Description
													</h3>
													<h4 className="font-semibold">Description</h4>
													<p>
														{products && products[selectedIndex].description}
													</p>
													<form>
														<button
															type="submit"
															disabled={isAddingToCart}
															aria-disabled={isAddingToCart}
															onClick={() =>
																handleAddToCart(products[selectedIndex]?.id)
															}
															className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														>
															{isAddingToCart ? (
																<ReloadIcon className="animate-spin" />
															) : (
																"Add To Cart"
															)}
														</button>
													</form>
												</section>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

export default ProductContent;
