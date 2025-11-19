import React, { useState } from "react";

const JobApplyModal = ({ job, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cover, setCover] = useState("");
    const [resumeName, setResumeName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setResumeName(file.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app you'd send this to your server. For now we log it.
        console.log("Applying for", job.title, { name, email, cover, resumeName });
        setSubmitted(true);
    };

    if (!job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 p-6 rounded-md w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Apply — {job.title}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>

                {submitted ? (
                    <div className="prose">
                        <h4>Application Submitted</h4>
                        <p>Thanks, {name || "applicant"}! We've received your application for <strong>{job.title}</strong>. We'll review it and be in touch.</p>
                        <div className="mt-4">
                            <button className="btn" onClick={onClose}>Close</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="label">Full name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} required className="input w-full" />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="input w-full" />
                        </div>
                        <div>
                            <label className="label">Cover note</label>
                            <textarea value={cover} onChange={(e) => setCover(e.target.value)} className="textarea w-full" rows={4} />
                        </div>
                        <div>
                            <label className="label">Resume (optional)</label>
                            <input type="file" onChange={handleFileChange} className="file-input w-full" />
                            {resumeName && <p className="text-sm text-gray-500 mt-1">Selected: {resumeName}</p>}
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Submit Application</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default JobApplyModal;
