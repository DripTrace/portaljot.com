// components/CoverLetter.tsx
"use client";
import React from "react";

const CoverLetter: React.FC = () => {
	return (
		<div className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-8 px-4 font-roboto">
			<h1 className="text-5xl text-center text-pink-500 mb-6 animate-fadeIn">
				Russell Palma: My Tech Journey
			</h1>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# A Passion for Building & Innovating
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						I’ve always had this unrelenting urge to break things
						down and rebuild them, but better. From the moment I
						started tearing apart old PCs, I knew that tech was my
						playground. Fast forward to today, and I’m neck-deep in
						building server racks, creating multi-cloud platforms,
						and playing with bleeding-edge technologies.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# The Foundation: My Infrastructure Obsession
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						You could say infrastructure is my jam. I’ve built my
						own server rack out of repurposed machines, running
						Proxmox on an HP ProLiant, with a Kubernetes cluster
						humming away in the background. On the Supermicro side,
						I dove deep, custom-compiling a Gentoo kernel with ZFS,
						because why the hell not? It’s all about efficiency,
						resilience, and pushing the limits of what these systems
						can do.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# Projects that Get Me Fired Up
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						Sure, I’ve worked on a bunch of cool projects with
						others, but nothing gets me going like the stuff I’ve
						built from scratch. Take{" "}
						<span className="text-blue-400">Nexus Conjure</span> for
						example—a multi-cloud platform designed to help
						businesses and individuals manage their domains and
						build out their digital presence. I’m talking AI
						pipelines, marketing tools, a freakin’ website builder,
						and more—all running seamlessly across clouds.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# Living on the Bleeding Edge
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						But it’s not just about what I’m doing now; it’s about
						where I’m headed. I’m obsessed with AI, biohacking, and
						Quantum Machine Learning. Imagine this: brain-computer
						interfaces like Neuralink that push human potential to
						new heights, extending lifespans, enhancing
						cognition—hell, maybe even making us superhuman. I want
						to be right there, making that shit happen.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# Why I Do What I Do
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						At the end of the day, it’s all about being part of
						something bigger. Tech isn’t just a career for me; it’s
						a passion, a lifestyle, a goddamn calling. I’m here to
						build, to innovate, to push the envelope, and maybe,
						just maybe, to leave the world a little bit better (and
						more tech-savvy) than I found it.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# Ready to Build the Future?
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed">
						So that’s me—a tech junkie, an infrastructure geek, and
						someone who’s always looking ahead to the next big
						thing. Whether you’re an employer, a potential client,
						or just someone who shares the same passion, let’s
						connect. Let’s build something awesome.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-4xl text-center text-purple-500 mb-2 animate-fadeIn">
					# Contact Information
				</h2>
				<div className="bg-white bg-opacity-10 py-4 px-6 rounded-lg mb-4 backdrop-blur-lg border border-white border-opacity-20 max-w-screen-md mx-auto">
					<p className="text-lg leading-relaxed text-center">
						<a
							href="mailto:me@russellpalma.com"
							className="text-pink-400 hover:text-white"
						>
							me@russellpalma.com
						</a>{" "}
						|
						<a
							href="https://linkedin.com/in/russell-palma-6b9700b9/"
							className="text-blue-400 hover:text-white ml-2"
						>
							LinkedIn
						</a>{" "}
						|
						<a
							href="https://github.com/RussPalms"
							className="text-blue-400 hover:text-white ml-2"
						>
							GitHub
						</a>
					</p>
				</div>
			</section>

			{/* SVG Circuit Design
			<div className="circuit-shapes-container">
				<svg
					className="circuit-shape animate-rotate"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M32 0l12.9 23h-25.8L32 0zm0 64L19.1 41h25.8L32 64z"
						fill="#ff69b4"
					/>
				</svg>
				<svg
					className="circuit-shape animate-rotate"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="32" cy="32" r="32" fill="#42a5f5" />
				</svg>
			</div>

			<style jsx>{`
				.cover-letter-container {
					background: linear-gradient(135deg, #0a0f29, #1f2e5a);
					color: #e0e6ed;
					padding: 50px 20px;
					font-family: "Roboto", sans-serif;
				}

				h1 {
					font-size: 3rem;
					color: #ff69b4;
					text-align: center;
					margin-bottom: 20px;
					animation: fadeIn 2s ease-in-out;
				}

				h2 {
					font-size: 2.5rem;
					color: #9c27b0;
					text-align: center;
					margin-bottom: 8px;
					animation: fadeIn 2s ease-in-out;
				}

				p {
					font-size: 1.25rem;
					line-height: 1.6;
					margin: 8px auto;
					animation: fadeIn 2s ease-in-out;
				}

				.box {
					background: rgba(255, 255, 255, 0.1);
					padding: 16px;
					margin: 10px auto;
					border-radius: 15px;
					backdrop-filter: blur(10px);
					border: 1px solid rgba(255, 255, 255, 0.2);
				}

				.box span {
					color: #42a5f5;
				}

				.max-w-screen-md {
					max-width: 600px;
				}

				.circuit-shapes-container {
					display: flex;
					justify-content: center;
					margin-top: 40px;
				}

				.circuit-shape {
					width: 50px;
					height: 50px;
					margin: 0 10px;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-rotate {
					animation: rotate 4s infinite linear;
				}

				@keyframes rotate {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				a {
					transition: color 0.3s ease;
					text-decoration: none;
				}
			`}</style> */}
			{/* SVG Circuit Design */}
			<div className="circuit-shapes-container">
				<svg
					className="circuit-shape animate-rotate"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M32 0l12.9 23h-25.8L32 0zm0 64L19.1 41h25.8L32 64z"
						fill="#ff69b4"
					/>
				</svg>
				<svg
					className="circuit-shape animate-rotate"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="32" cy="32" r="32" fill="#42a5f5" />
				</svg>
			</div>

			<style jsx>{`
				.cover-letter-container {
					background: linear-gradient(135deg, #0a0f29, #1f2e5a);
					color: #e0e6ed;
					padding: 50px 20px;
					font-family: "Roboto", sans-serif;
				}

				h1 {
					font-size: 3rem;
					color: #ff69b4;
					text-align: center;
					margin-bottom: 20px;
					animation: fadeIn 2s ease-in-out;
				}

				h2 {
					font-size: 2.5rem;
					color: #9c27b0;
					text-align: center;
					margin-bottom: 10px;
					animation: fadeIn 2s ease-in-out;
				}

				p {
					font-size: 1.25rem;
					line-height: 1.6;
					max-width: 800px;
					margin: 15px auto;
					animation: fadeIn 2s ease-in-out;
				}

				.box {
					background: rgba(255, 255, 255, 0.1);
					padding: 20px;
					margin: 20px auto;
					max-width: 900px;
					border-radius: 15px;
					backdrop-filter: blur(10px);
					border: 1px solid rgba(255, 255, 255, 0.2);
				}

				.box span {
					color: #42a5f5;
				}

				.circuit-shapes-container {
					display: flex;
					justify-content: center;
					margin-top: 40px;
				}

				.circuit-shape {
					width: 50px;
					height: 50px;
					margin: 0 10px;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-rotate {
					animation: rotate 4s infinite linear;
				}

				@keyframes rotate {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				a {
					transition: color 0.3s ease;
					text-decoration: none;
				}
			`}</style>
		</div>
	);
};

export default CoverLetter;
