"use client";
import React, { useState } from "react";
import { Github, ExternalLink, Calendar, Code, Star } from "lucide-react";
import {
  projects,
  categories,
  ProjectsT,
  CategoriesT,
} from "../constants/project";
import Image from "next/image";
import Navbar from "../components/Navbar";
import AboutContact from "../components/about/AboutContact";
import { useEffect } from "react";

const Projects = () => {
  const projectsData: ProjectsT[] = projects;
  const categoriesData: CategoriesT[] = categories;
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    });
    document
      .querySelectorAll(".fade-in-element")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-bebas-neue text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
              My Projects
            </h1>
            <p className="font-ibm-plex-sans text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A showcase of my latest work, featuring modern web applications,
              innovative solutions, and cutting-edge technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoriesData.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category.key
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar size={14} />
                    <span className="text-sm">{project.date}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {projects.length}
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-400">Technologies Used</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

        <AboutContact />
      </div>
    </div>
  );
};

export default Projects;
