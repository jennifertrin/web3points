"use client"

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Hero() {
    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="text-center pb-12 md:pb-1">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Welcome to the<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Points Demo</span></h1>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">This demo demonstrates how to build a web3 points rewards system.</p>
                            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                                <DynamicWidget />
                                <div>
                                    <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-24 ml-24">
                        <img src="/points.svg" className="artboard artboard-horizontal" />
                    </div>
                </div>

            </div>
        </section>
    )
}