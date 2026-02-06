import React, { useState, useMemo } from 'react';
import { formatDates } from "@/utils.js";

function Schedule({ data, group: lockedGroup, count, ascending, showOld }) {
    const getSemester = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth(); // 0 = Jan
        if (month >= 7) return `Fall ${year}`;
        if (month <= 4) return `Spring ${year}`;
        return `Summer ${year}`;
    };

    const semesters = useMemo(() => {
        const base = lockedGroup ? data.filter(e => e.data.group.id === lockedGroup) : data;
        const set = new Set(base.map(e => getSemester(e.data.start)));
        return [...Array.from(set).sort().reverse()];
    }, [data, lockedGroup]);

    const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
    const [selectedGroup, setSelectedGroup] = useState("All");

    const filteredData = useMemo(() => {
        let d = [...data].sort((a, b) => a.data.start - b.data.start);
        if (lockedGroup) {
            d = d.filter((a) => a.data.group.id === lockedGroup);
        }
        if (!showOld) d = d.filter((a) => a.data.end > new Date());
        const sevenDaysFromNow = new Date().getTime() + 7 * 86400000;
        d = d.filter((a) => a.data.start < new Date(sevenDaysFromNow));
        d = d.filter((a) => getSemester(a.data.start) === selectedSemester);
        if (!lockedGroup && selectedGroup !== "All") {
            d = d.filter((a) => a.data.group.id === selectedGroup);
        }
        if (!ascending) d.reverse();
        return count ? d.slice(0, count) : d;
    }, [data, selectedSemester, selectedGroup, lockedGroup, ascending, showOld, count]);

    const availableGroups = useMemo(() => {
        const currentSet = data.filter(e => getSemester(e.data.start) === selectedSemester);
        const set = new Set(currentSet.map(e => e.data.group.id));
        return ["All", ...Array.from(set).sort()];
    }, [data, selectedSemester]);

    return (
        <div className="schedule-wrapper">
            <div className="filter-controls" style={{ display: 'flex', gap: 'var(--padding)', flexWrap: 'wrap', marginBottom: 'var(--padding-lg)' }}>
                <label className="filter-label">
                    Term:
                    <select value={selectedSemester} style={{ marginLeft: 'var(--padding)' }} onChange={(e) => {
                        setSelectedSemester(e.target.value);
                        setSelectedGroup("All");
                    }}>
                        {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </label>

                {!lockedGroup && (
                    <label className="filter-label">
                        Group:
                        <select value={selectedGroup} style={{ marginLeft: 'var(--padding)' }} onChange={(e) => setSelectedGroup(e.target.value)}>
                            {availableGroups.map(g => (
                                <option key={g} value={g}>{g.toUpperCase()}</option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            <div className="list col">
                {filteredData.map((e) => (
                    <a key={e.slug} href={import.meta.env.BASE_URL + "/education/" + e.slug} className="card card-interactable">
                        <div className={(e.data.featured ? "card-header" : "card-content") + " list schedule"}>
                            <div className="schedule-left">
                                {formatDates(e.data.start, e.data.end, "\n")}
                            </div>
                            <div className="schedule-middle">
                                <strong>{e.data.title}</strong>
                                <strong className="accent">{e.data.group.id.toUpperCase()}</strong>
                            </div>
                            <div className="schedule-right">
                                <div>{e.data.location}</div>
                                <div>{e.data.hosts.join(", ")}</div>
                            </div>
                        </div>
                    </a>
                ))}
                {filteredData.length === 0 && <p>No events found for this selection.</p>}
            </div>
        </div>
    );
}

export default Schedule;
