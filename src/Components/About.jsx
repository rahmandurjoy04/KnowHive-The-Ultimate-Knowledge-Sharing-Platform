import React from 'react';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { motion } from "framer-motion";
import {
  FaShareAlt,
  FaComments,
  FaUserCog,
  FaDownload,
  FaUsers,
  FaNewspaper,
  FaEye,
} from "react-icons/fa";
import Loading from './Loading';
import CountUp from 'react-countup';

const About = () => {

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen min-w-sm mt-0 mx-auto flex flex-col bg-base-100">

      {/* Hero Section */}
      <motion.div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50"></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[400px] px-4">
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            About <span className="text-white">KnowHive</span>
          </h1>
          <p className="text-xl mb-6 text-white leading-relaxed max-w-2xl">
            A vibrant platform where students connect, share knowledge, and inspire
            each other through articles, discussions, and ideas.
          </p>
          <Link to="/allArticles" className="btn btn-primary btn-lg shadow-lg">
            Explore Articles
          </Link>
        </div>
      </motion.div>

      {/* MISSION & VISION */}
      <div className="w-11/12 mx-auto py-16 px-4 min-w-sm">
        <div className="text-center min-w-sm mb-12">
          <h2 className="text-4xl font-semibold text-base-content">
            Our Mission & Vision
          </h2>
          <p className="text-lg mt-4 text-base-content/80 max-w-3xl mx-auto">
            We believe knowledge grows when shared. Our mission is to empower students
            to learn, create, and collaborate in a supportive environment.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition min-w-sm"
          >
            <div className="card-body">
              <h3 className="card-title text-2xl">Mission</h3>
              <p className="text-base-content/80">
                Provide a platform where students can freely share ideas, learn from peers, and grow together.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition min-w-sm"
          >
            <div className="card-body">
              <h3 className="card-title text-2xl">Vision</h3>
              <p className="text-base-content/80">
                Build a global community of students driving innovation through shared knowledge.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* WHY CHOOSE */}
      <div className="max-w-11/12 mx-auto py-16">
        <div className="text-center mb-12 ">
          <h2 className="text-4xl font-semibold text-base-content">
            Why Choose KnowHive?
          </h2>
          <p className="text-lg mt-4 text-base-content/80 max-w-3xl mx-auto">
            Discover features that make KnowHive the perfect place for students to learn and connect.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 "
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition min-w-sm"
          >
            <div className="card-body items-center text-center ">
              <FaShareAlt className="text-primary text-4xl mb-3" />
              <h3 className="card-title">Share Knowledge</h3>
              <p className="text-base-content/80">
                Post articles on diverse topics and contribute to a growing knowledge base.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition min-w-sm"
          >
            <div className="card-body items-center text-center">
              <FaComments className="text-secondary text-4xl mb-3" />
              <h3 className="card-title">Engage in Discussions</h3>
              <p className="text-base-content/80">
                Comment on articles and connect with other students to exchange ideas.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl min-w-sm transition"
          >
            <div className="card-body items-center text-center">
              <FaUserCog className="text-accent text-4xl mb-3" />
              <h3 className="card-title">Personalized Experience</h3>
              <p className="text-base-content/80">
                Manage your articles and profile tailored to your interests.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* USER STATISTICS */}
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-4xl text-center font-bold mb-8">User Statistics</h1>
        <motion.div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {/* Article Card */}
          <div className="stat card bg-white shadow-lg rounded-lg p-6 min-w-sm flex flex-col items-center">
            <div className="stat-title flex items-center gap-2 mb-2 text-base md:text-lg">
              <FaNewspaper className="text-blue-500 text-2xl md:text-3xl" />
              Articles
              <span className="badge badge-primary ml-2 text-xs md:text-sm">New</span>
            </div>
            <div className="stat-value text-3xl md:text-4xl font-bold mb-2">
              <CountUp end={1245} duration={2} separator="," />
            </div>
            <div className="stat-desc text-gray-500 text-sm md:text-base">
              And counting!
            </div>
          </div>

          {/* Active Users Card */}
          <div className="stat card bg-white shadow-lg rounded-lg p-6 min-w-sm flex flex-col items-center">
            <div className="stat-title flex items-center gap-2 mb-2 text-base md:text-lg">
              <FaUsers className="text-green-500 text-2xl md:text-3xl" />
              Active Users
              <span className="badge badge-secondary ml-2 text-xs md:text-sm">Hot</span>
            </div>
            <div className="stat-value text-3xl md:text-4xl font-bold mb-2">
              <CountUp end={356} duration={2} />
            </div>
            <div className="stat-desc text-gray-500 text-sm md:text-base">
              Last 24 hours
            </div>
          </div>

          {/* Visits Card */}
          <div className="stat card bg-white shadow-lg rounded-lg p-6 min-w-sm flex flex-col items-center">
            <div className="stat-title flex items-center gap-2 mb-2 text-base md:text-lg">
              <FaEye className="text-purple-500 text-2xl md:text-3xl" />
              Visits
              <span className="badge badge-accent ml-2 text-xs md:text-sm">Trending</span>
            </div>
            <div className="stat-value text-3xl md:text-4xl font-bold mb-2">
              <CountUp end={8921} duration={2} separator="," />
            </div>
            <div className="stat-desc text-gray-500 text-sm md:text-base">
              In the past week
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
