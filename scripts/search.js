export function filterRecords(
    records,
    pattern,
    ignoreCase = true
) {

    // Empty search will show everything
    if (!pattern.trim()) {
        return records;
    }

    try {

        const flags =
            ignoreCase ? "i" : "";

        const regex =
            new RegExp(pattern, flags);

        return records.filter(record => {

            return (
                regex.test(record.description) ||
                regex.test(record.category) ||
                regex.test(String(record.amount))
            );

        });

    } catch (error) {

        console.error(
            "Invalid regex:",
            error
        );

        return records;
    }
}

/**
 * Highlight matching text using <mark>
 */
export function highlightText(
    text,
    pattern,
    ignoreCase = true
) {

    if (!pattern.trim()) {
        return text;
    }

    try {

        const flags =
            ignoreCase ? "gi" : "g";

        const regex =
            new RegExp(pattern, flags);

        return text.replace(
            regex,
            match => `<mark>${match}</mark>`
        );

    } catch (error) {

        return text;
    }
}

export function sortRecords(
    records,
    sortBy
) {

    const sorted = [...records];

    switch (sortBy) {

        case "description":

            sorted.sort((a, b) =>
                a.description.localeCompare(
                    b.description
                )
            );

            break;

        case "amount":

            sorted.sort(
                (a, b) =>
                    a.amount - b.amount
            );

            break;

        case "date":

            sorted.sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

            break;

        default:

            break;
    }

    return sorted;
}

export function sortAmountDescending(
    records
) {

    return [...records].sort(
        (a, b) => b.amount - a.amount
    );
}

export function sortDescriptionDescending(
    records
) {

    return [...records].sort(
        (a, b) =>
            b.description.localeCompare(
                a.description
            )
    );
}

export function sortNewestFirst(
    records
) {

    return [...records].sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );
}