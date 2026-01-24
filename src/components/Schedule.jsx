import React from 'react';

function Schedule(data) {
    let d = data.data.sort((a, b) => a.start - b.start).slice(0, data.count);

    return (
        <div>
            {d.map((e) => (
                <div class="card card-interactable">
                    <div class="card-content">
                        {e.data.title}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Schedule;
