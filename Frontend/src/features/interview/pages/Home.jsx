import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center p-6 gap-8">
            <header className="text-center max-w-3xl">
                <h1 className="text-4xl font-bold">Create Your Custom <span className="text-pink-600">Interview Plan</span></h1>
                <p className="mt-2 text-slate-400">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            <div className="w-full max-w-5xl bg-[#161b22] border border-[#2a3348] rounded-xl overflow-hidden">
                <div className="p-6 flex gap-6 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-pink-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className="text-lg font-semibold flex-1">Target Job Description</h2>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded border border-pink-500/30 text-pink-500 bg-pink-500/10 uppercase">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className="w-full h-60 bg-[#1e2535] border border-[#2a3348] rounded-lg p-3 text-sm outline-none"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className="absolute bottom-3 right-4 text-xs text-slate-400">0 / 5000 chars</div>
                    </div>

                    <div className="w-px bg-[#2a3348] hidden md:block" />

                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-pink-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className="text-lg font-semibold">Your Profile</h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                Upload Resume
                                <span className="text-xs font-semibold px-2 py-0.5 rounded border border-pink-500/30 text-pink-500 bg-pink-500/10 uppercase">Best Results</span>
                            </label>
                            <label className="flex items-center justify-center gap-2 p-6 bg-[#1e2535] border-2 border-dashed border-[#2a3348] rounded-lg cursor-pointer hover:border-pink-600 hover:bg-pink-600/5 transition" htmlFor="resume">
                                <span className="text-pink-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <div>
                                    <p className="text-sm font-medium">Click to upload or drag &amp; drop</p>
                                    <p className="text-xs text-slate-400">PDF only (Max 5MB)</p>
                                </div>
                                <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf" />
                            </label>
                        </div>

                        <div className="flex items-center gap-3 text-slate-400 text-xs">
                            <span className="flex-1 h-px bg-[#2a3348]" />
                            <span>OR</span>
                            <span className="flex-1 h-px bg-[#2a3348]" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="selfDescription" className="text-sm font-medium">Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id="selfDescription"
                                name="selfDescription"
                                className="w-full h-24 bg-[#1e2535] border border-[#2a3348] rounded-lg p-3 text-sm outline-none"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-[#1b2a4a] border border-[#2d4a7a] rounded-lg text-sm">
                            <span className="text-pink-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-[#2a3348] flex items-center justify-between">
                    <span className="text-xs text-slate-400">AI-Powered Strategy Generation • Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 text-white transition active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {reports.length > 0 && (
                <section className="w-full max-w-5xl flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">My Recent Interview Plans</h2>
                    <ul className="flex gap-3 flex-wrap">
                        {reports.map(report => (
                            <li key={report._id} className="bg-[#161b22] border border-[#2a3348] rounded-lg p-4 flex flex-col gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className="font-semibold">{report.title || 'Untitled Position'}</h3>
                                <p className="text-xs text-slate-400">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-sm font-semibold ${report.matchScore >= 80 ? 'text-green-500' : report.matchScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className="flex gap-6 text-sm text-slate-400">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>
        </div>
    )
}

export default Home
