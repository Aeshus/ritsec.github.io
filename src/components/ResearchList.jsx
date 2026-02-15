import React, { useState, useMemo } from "react";
import { formatDate } from "@/utils.js";

function ResearchList({ data, group: lockedGroup, count, ascending }) {
    const getYear = (date) => {
        const d = new Date(date);
        return d.getUTCFullYear().toString();
    };

    const years = useMemo(() => {
        const base = lockedGroup
            ? data.filter((e) => e.data.group?.id.toLowerCase() === lockedGroup.toLowerCase())
            : data;
        const set = new Set(base.map((e) => getYear(e.data.date)));
        return [...Array.from(set).sort().reverse()];
    }, [data, lockedGroup]);

    const [selectedYear, setSelectedYear] = useState(years[0] || "All");
    const [selectedGroup, setSelectedGroup] = useState("All");

    const filteredData = useMemo(() => {
        let d = [...data].sort((a, b) => new Date(a.data.date) - new Date(b.data.date));

        if (lockedGroup) {
            d = d.filter((a) => a.data.group?.id.toLowerCase() === lockedGroup.toLowerCase());
        }

        if (selectedYear !== "All") {
            d = d.filter((a) => getYear(a.data.date) === selectedYear);
        }

        if (!lockedGroup && selectedGroup !== "All") {
            d = d.filter((a) => a.data.group?.id === selectedGroup);
        }

        if (!ascending) d.reverse();
        return count ? d.slice(0, count) : d;
    }, [data, selectedYear, selectedGroup, lockedGroup, ascending, count]);

    const availableGroups = useMemo(() => {
        const currentSet = selectedYear === "All"
            ? data
            : data.filter((e) => getYear(e.data.date) === selectedYear);

        const set = new Set(
            currentSet
                .map((e) => e.data.group?.id)
                .filter(Boolean)
        );
        return ["All", ...Array.from(set).sort()];
    }, [data, selectedYear]);

    return (
        <div className="research-wrapper">
            <div className="filter-controls">
                <label className="filter-label">
                    <span className="filter-text">Year:</span>
                    <div className="select-wrapper">
                        <select
                            value={selectedYear}
                            onChange={(e) => { setSelectedYear(e.target.value); setSelectedGroup("All"); }}
                            className="filter-select"
                        >
                            <option value="All">All Years</option>
                            {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                        </select>
                    </div>
                </label>
                {!lockedGroup && (
                    <label className="filter-label">
                        <span className="filter-text">Group:</span>
                        <div className="select-wrapper">
                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="filter-select"
                            >
                                {availableGroups.map((g) => (<option key={g} value={g}>{g === "All" ? "All Groups" : g.toUpperCase()}</option>))}
                            </select>
                        </div>
                    </label>
                )}
            </div>

            <div className="list-stack">
                {filteredData.map((post) => (
                    <a
                        key={post.slug}
                        href={`${import.meta.env.BASE_URL}/research/${post.slug}`}
                        className="card card-row"
                    >
                        <div className="col-date">
                            <time dateTime={new Date(post.data.date).toISOString()}>
                                {formatDate(new Date(post.data.date))}
                            </time>
                        </div>

                        <article className="col-content">
                            <div className="card-header-row">
                                <strong className="card-title">{post.data.title}</strong>
                                {post.data.group && (
                                    <span className="badge">
                                        {post.data.group.id.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="meta-row">
                                <div className="meta-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-users"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    {post.data.authors.length > 0 ? (
                                        <span>
                                            {post.data.authors
                                                .map((a) => a.name)
                                                .join(", ")}
                                        </span>
                                    ) : (
                                        <span>RITSEC</span>
                                    )}
                                </div>
                            </div>
                        </article>

                        <div className="col-actions">
                            <div className="icon-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </a>
                ))}

                {filteredData.length === 0 && (
                    <div className="empty-state">
                        No research found, please check again later.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResearchList;
