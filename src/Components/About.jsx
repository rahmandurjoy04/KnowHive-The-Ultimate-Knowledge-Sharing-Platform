import React from 'react';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { motion } from "framer-motion";
import Loading from './Loading';

const About = () => {
    const { user, authLoading } = useAuth();

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-100">

            <motion.div
                className="hero bg-base-200 py-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="hero-content text-center max-w-4xl mx-auto px-4">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">
                            About KnowHive
                        </h1>
                        <p className="text-lg sm:text-xl mb-6 text-base-content">
                            KnowHive is a vibrant platform where students connect, share knowledge,
                            and inspire each other through articles, discussions, and ideas. Our
                            mission is to foster a community of lifelong learners passionate about
                            exploring and exchanging insights.
                        </p>
                        <Link to="/allArticles" className="btn btn-primary btn-lg">
                            Explore Articles
                        </Link>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="py-12 px-4 max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-base-content">
                        Our Mission & Vision
                    </h2>
                    <p className="text-base sm:text-lg mt-4 text-base-content/80">
                        At KnowHive, we believe knowledge grows when shared. Our mission is to
                        empower students to learn, create, and collaborate in a supportive
                        environment. We envision a world where every student's curiosity fuels
                        innovation and discovery.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-2xl">Mission</h3>
                            <p className="text-base-content/80">
                                To provide a platform where students can freely share ideas, learn
                                from peers, and grow through collaboration.
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-2xl">Vision</h3>
                            <p className="text-base-content/80">
                                To build a global community of students driving innovation through
                                shared knowledge and open dialogue.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="py-12 px-4 bg-base-200"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-base-content">
                        Why Choose KnowHive?
                    </h2>
                    <p className="text-base sm:text-lg mt-4 text-base-content/80">
                        Discover the features that make KnowHive the perfect place for students to
                        learn and connect.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">Share Knowledge</h3>
                            <p className="text-base-content/80">
                                Post articles on diverse topics and contribute to a growing
                                knowledge base.
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">Engage in Discussions</h3>
                            <p className="text-base-content/80">
                                Comment on articles and connect with other students to exchange
                                ideas.
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">Personalized Experience</h3>
                            <p className="text-base-content/80">
                                Manage your articles and profile with ease, tailored to your
                                interests.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="py-12 px-4 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-base-content">
                    Join the KnowHive Community
                </h2>
                <p className="text-base sm:text-lg mb-6 text-base-content/80">
                    Become a part of our growing community of learners. Share your knowledge,
                    learn from others, and grow together!
                </p>
                {authLoading ? (
                    <Loading></Loading>
                ) : user ? (
                    <Link to="/postArticles" className="btn btn-primary btn-lg">
                        Post Your Article
                    </Link>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-lg">
                        Join Now
                    </Link>
                )}
            </motion.div>

        </div>
    );
};

export default About;