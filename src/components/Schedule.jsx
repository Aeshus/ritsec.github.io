import React from 'react';

function Schedule(data) {
    return (
        <div>
            {data.data.map((e) => (
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
