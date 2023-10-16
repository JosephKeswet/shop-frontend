"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

type Props = {};

const ProductContent = (props: Props) => {
	const [open, setOpen] = useState(false);

	const product = {
		name: "Basic Tee 6-Pack ",
		price: "$192",
		rating: 3.9,
		reviewCount: 117,
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
		imageAlt: "Two each of gray, white, and black shirts arranged on table.",
		colors: [
			{ name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
			{ name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
			{ name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
		],
		sizes: [
			{ name: "XXS", inStock: true },
			{ name: "XS", inStock: true },
			{ name: "S", inStock: true },
			{ name: "M", inStock: true },
			{ name: "L", inStock: true },
			{ name: "XL", inStock: true },
			{ name: "XXL", inStock: true },
			{ name: "XXXL", inStock: false },
		],
	};
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}
	const products = [
		{
			id: 1,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: "$35",
			color: "Black",
		},
        {
			id: 2,
			name: "Basic Shirt",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: "$35",
			color: "Black",
		},
		// More products...
	];
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Customers also purchased
				</h2>

				<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product,index:number) => (
						<div
							key={product.id}
							className="group relative"
							onClick={() => {
                                setOpen(true)
                                setSelectedIndex(index)
                            }}
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={product.imageSrc}
									alt={product.imageAlt}
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
											{product.name}
										</a>
									</h3>
									<p className="mt-1 text-sm text-gray-500">{product.color}</p>
								</div>
								<p className="text-sm font-medium text-gray-900">
									{product.price}
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
													src={products[selectedIndex].imageSrc}
													alt={products[selectedIndex].imageAlt}
													className="object-cover object-center"
												/>
											</div>
											<div className="sm:col-span-8 lg:col-span-7">
												<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
													{products[selectedIndex].name}
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
														{products[selectedIndex].price}
													</p>

													{/* Reviews */}
													<div className="mt-6">
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
																{product.rating} out of 5 stars
															</p>
															<a
																href="#"
																className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
															>
																{product.reviewCount} reviews
															</a>
														</div>
													</div>
												</section>

												<section
													aria-labelledby="options-heading"
													className="mt-10"
												>
													<h3
														id="options-heading"
														className="sr-only"
													>
														Product Description
													</h3>
                                                    <h4  className="font-semibold">Description</h4>
                                                    <p>Some weird Description</p>
													<form>
													

														<button
															type="submit"
															className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														>
															Add to bag
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
