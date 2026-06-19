export function validateDescription(description) {

    const regex = /^\S(?:.*\S)?$/;

    return regex.test(description);
}

export function validateAmount(amount) {

    const regex =
        /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    return regex.test(amount);
}

export function validateDate(date) {

    const regex =
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    return regex.test(date);
}

export function validateCategory(category) {

    const regex =
        /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    return regex.test(category);
}

export function hasDuplicateWords(text) {

    const regex =
        /\b(\w+)\s+\1\b/i;

    return regex.test(text);
}

export function normalizeDescription(text) {

    return text
        .trim()
        .replace(/\s+/g, " ");
}

export function validateRecord(record) {

    return (
        record.id &&
        validateDescription(record.description) &&
        validateAmount(String(record.amount)) &&
        validateCategory(record.category) &&
        validateDate(record.date)
    );
}