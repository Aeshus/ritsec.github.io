import React, { useState, useMemo } from "react";
import { formatDates } from "@/utils.js";

function Schedule({ data, group: lockedGroup, count, ascending, showOld, daysAhead }) {
    const getSemester = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth(); // 0 = Jan
        if (month >= 7) return `Fall ${year}`;
        if (month <= 4) return `Spring ${year}`;
        return `Summer ${year}`;
    };

    const semesters = useMemo(() => {
        const base = lockedGroup
            ? data.filter((e) => e.data.group.id.toLowerCase() === lockedGroup.toLowerCase())
            : data;
        const set = new Set(base.map((e) => getSemester(e.data.start)));
        return [...Array.from(set).sort().reverse()];
    }, [data, lockedGroup]);

    const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
    const [selectedGroup, setSelectedGroup] = useState("All");

    const filteredData = useMemo(() => {
        let d = [...data].sort((a, b) => a.data.start - b.data.start);
        
        if (lockedGroup) {
            d = d.filter((a) => a.data.group.id.toLowerCase() === lockedGroup.toLowerCase());
        }
        
        if (!showOld) d = d.filter((a) => a.data.end > new Date());
        
        const sevenDaysFromNow = new Date().getTime() + daysAhead * 86400000;
        d = d.filter((a) => a.data.start < new Date(sevenDaysFromNow));
        d = d.filter((a) => getSemester(a.data.start) === selectedSemester);
        
        if (!lockedGroup && selectedGroup !== "All") {
            d = d.filter((a) => a.data.group.id === selectedGroup);
        }
        
        if (!ascending) d.reverse();
        return count ? d.slice(0, count) : d;
    }, [data, selectedSemester, selectedGroup, lockedGroup, ascending, showOld, count]);

    const availableGroups = useMemo(() => {
        const currentSet = data.filter(
            (e) => getSemester(e.data.start) === selectedSemester,
        );
        const set = new Set(currentSet.map((e) => e.data.group.id));
        return ["All", ...Array.from(set).sort()];
    }, [data, selectedSemester]);

    const now = new Date();

    return (
        <div className="schedule-wrapper">
            {/* Filter controls remain the same */}
            <div className="filter-controls" style={{ display: "flex", gap: "var(--padding)", flexWrap: "wrap", marginBottom: "var(--padding-lg)" }}>
                <label className="filter-label">
                    Term:
                    <select value={selectedSemester} style={{ marginLeft: "var(--padding)" }} onChange={(e) => { setSelectedSemester(e.target.value); setSelectedGroup("All"); }}>
                        {semesters.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                </label>
                {!lockedGroup && (
                    <label className="filter-label">
                        Group:
                        <select value={selectedGroup} style={{ marginLeft: "var(--padding)" }} onChange={(e) => setSelectedGroup(e.target.value)}>
                            {availableGroups.map((g) => (<option key={g} value={g}>{g.toUpperCase()}</option>))}
                        </select>
                    </label>
                )}
            </div>
            {/* For icons, must include: */}
            <div style={{ display: 'none' }}>

                Lucide License


                ISC License


                Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.


                Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.


                THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


                The MIT License (MIT) (for portions derived from Feather)


                Copyright (c) 2013-2026 Cole Bemis


                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:


                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

            </div> 

            <div className="list col">
                {filteredData.map((e) => {
                    const isOngoing = now >= new Date(e.data.start) && now <= new Date(e.data.end);
                    const hasMedia = e.data.slide || e.data.video;

                    return (
                        <div key={e.slug} className={(isOngoing ? "card-header" : "card-content") + " card list schedule"}>
                            <div className="schedule-left">
                                {formatDates(e.data.start, e.data.end, "\n")}
                            </div>
                            <div className="schedule-middle">
                                <strong>{e.data.title}</strong>
                                <strong className="accent">{e.data.group.id.toUpperCase()}</strong>
                            </div>
                            <div className="schedule-end">
                                {hasMedia ? (
                                    <div className="schedule-icons">
                                        {e.data.slide && (
                                            <a className="link-button secondary" href={e.data.slide} target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-presentation"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg> 
                                            </a>
                                        )}
                                        {e.data.video && (
                                            <a className="link-button secondary" href={e.data.video} target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                                            </a>
                                        )}
                                    </div>
                                ) : null}
                                <div className="schedule-right">
                                    <div>{e.data.location}</div>
                                    <div>{e.data.hosts.join(", ")}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filteredData.length === 0 && <p>No events found for this selection.</p>}
            </div>
        </div>
    );
}

export default Schedule;
