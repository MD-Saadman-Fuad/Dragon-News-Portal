import React, { useState } from "react";
import JobApplyModal from "../components/JobApplyModal";

const jobs = [
    {
        id: 1,
        title: "Frontend Engineer (React)",
        location: "Remote",
        type: "Full-time",
        description:
            "Build and improve our web interface. Experience with React and modern JS required.",
    },
    {
        id: 2,
        title: "Content Editor",
        location: "Dhaka (Hybrid)",
        type: "Part-time",
        description:
            "Curate stories, edit submissions, and help maintain editorial standards.",
    },
    {
        id: 3,
        title: "Backend Developer (Node)",
        location: "Remote",
        type: "Full-time",
        description:
            "Own APIs and data infrastructure. Experience with Node.js and databases preferred.",
    },
];

const Career = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const openApply = (job) => setSelectedJob(job);
    const closeApply = () => setSelectedJob(null);

    return (
        <div>
            <h1 className="mb-4">Careers at Dragon News</h1>
            <p className="mb-4">
                We're a small, fast-moving team building a better news experience. Below
                are roles we're actively hiring for — if you don't see a perfect match,
                send a note anyway.
            </p>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div key={job.id} className="card p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                            </div>
                            <div>
                                <button onClick={() => openApply(job)} className="btn btn-outline btn-sm">Apply</button>
                            </div>
                        </div>
                        <p className="mt-2 text-sm">{job.description}</p>
                    </div>
                ))}
            </div>

            <section className="mt-6">
                <h2>How to apply</h2>
                <p>
                    Email your CV and a short note to <strong>careers@dragonnews.example</strong>.
                    Include links to relevant work (portfolio, GitHub, or writing samples).
                </p>
            </section>
            {selectedJob && (
                <JobApplyModal job={selectedJob} onClose={closeApply} />
            )}
        </div>
    );
};

export default Career;
