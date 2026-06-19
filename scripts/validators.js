// scripts/validators.js

/**
 * Description Validation
 * No leading or trailing spaces
 * Must contain at least one visible character
 */
export function validateDescription(description) {

    const regex = /^\S(?:.*\S)?$/;

    return regex.test(description);
}

/**
 * Amount Validation
 * Whole numbers or decimals with up to 2 decimal places
 */
export function validateAmount(amount) {

    const regex =
        /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    return regex.test(amount);
}

/**
 * Date Validation
 * Format: YYYY-MM-DD
 */
export function validateDate(date) {

    const regex =
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    return regex.test(date);
}

/**
 * Category Validation
 * Letters, spaces, and hyphens only
 */
export function validateCategory(category) {

    const regex =
        /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    return regex.test(category);
}

/**
 * Advanced Regex Requirement
 * Detect duplicate consecutive words
 *
 * Example:
 * "coffee coffee"
 * "book book"
 */
export function hasDuplicateWords(text) {

    const regex =
        /\b(\w+)\s+\1\b/i;

    return regex.test(text);
}

/**
 * Clean Description
 * Removes extra spaces between words
 *
 * Example:
 * "Lunch    at    Cafeteria"
 *
 * becomes
 *
 * "Lunch at Cafeteria"
 */
export function normalizeDescription(text) {

    return text
        .trim()
        .replace(/\s+/g, " ");
}

/**
 * Validate Entire Record
 * Used for JSON import validation if needed
 */
export function validateRecord(record) {

    return (
        record.id &&
        validateDescription(record.description) &&
        validateAmount(String(record.amount)) &&
        validateCategory(record.category) &&
        validateDate(record.date)
    );
}