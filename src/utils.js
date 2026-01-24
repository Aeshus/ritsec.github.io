function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isMidnight(a) {
    return !(a.getUTCHours() || a.getUTCMinutes());
}

export function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}

export const formatDates = (start, end, separator = " • ") => {
    /* We leave all the dates as UTC because that's what the
     * parsing defaults to, and is it NOT fun to deal with dates in JS... */
    const dateOpts = {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
    };

    const timeOpts = {
        timeZone: "UTC",
        hour: "numeric",
        minute: "2-digit",
    };

    const startTime = new Intl.DateTimeFormat("en-US", timeOpts).format(start);
    const endTime = new Intl.DateTimeFormat("en-US", timeOpts).format(end);

    if (isSameDay(start, end)) {
        const date = new Intl.DateTimeFormat("en-US", dateOpts).format(start);

        if (isMidnight(start) && isMidnight(end)) {
            return date;
        }

        return `${date}${separator}${formatTime(startTime, endTime)}`;
    } else {
        return formatTime(startTime, endTime);
    }
};

export function formatTime(start, end) {
    return `${start} - ${end}`;
}
