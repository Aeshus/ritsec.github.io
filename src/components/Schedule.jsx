import React from 'react';
import { formatDates } from "@/utils.js";

function Schedule(data) {
    let d = data.data.sort((a, b) => a.data.start - b.data.start);

    if (!data.showOld)
        d = d.filter((a) => a.data.end > new Date());

    // Don't show events too far into the future (mainly for general meetings)
    d = d.filter((a) => a.data.start < new Date(new Date().getTime() + 7 * 86400000));

    if (!data.ascending)
        d.reverse();

    d = d.slice(0, data.count);

    return (
        <div class="list col">
            {d.map((e) => (
                <a href={"/schedule/" + e.slug} class="card card-interactable">
                    <div className={(e.data.featured ? "card-header" : "card-content") + " list schedule"}>
                        <div class="schedule-left">
                            {formatDates(e.data.start, e.data.end, "\n")}                            
                        </div>
                        <div class="schedule-middle">
                            <strong>
                            {e.data.title}
                            </strong>
                            <strong class="accent">
                            {e.data.group.id.toUpperCase()}
                            </strong>
                        </div>
                        <div class="schedule-right">
                            <div>
                            {e.data.location}
                            </div>
                            <div>
                            {e.data.hosts.join(", ")}
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Schedule;
