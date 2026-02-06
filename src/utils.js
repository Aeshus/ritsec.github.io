function isSameDay(a, b) {
    return(
        a.getUTCFullYear() === b.getUTCFullYear() &&
        a.getUTCMonth() === b.getUTCMonth() &&
        a.getUTCDate() === b.getUTCDate()
    );
}

function isMidnight(a) {
    return a.getUTCHours() === 0 && a.getUTCMinutes() === 0;
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
        const s = new Intl.DateTimeFormat("en-US", dateOpts).format(start);
        const e = new Intl.DateTimeFormat("en-US", dateOpts).format(end);
        return formatTime(s, e);
    }
};

export function formatTime(start, end) {
    return `${start} - ${end}`;
}
