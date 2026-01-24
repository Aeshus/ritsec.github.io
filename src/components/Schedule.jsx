import React from 'react';
import { formatDates } from "@/utils.js";

function Schedule(data) {
    let d = data.data.sort((a, b) => a.data.start - b.data.start).slice(0, data.count);

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
                            {e.data.location}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Schedule;
