// scripts/state.js

export const state = {
    records: [],

    settings: {
        budgetCap: 0,
        eurRate: 0.91,
        rwfRate: 1450
    }
};

/**
 * Generate a unique record ID
 */
export function generateId() {
    return `rec_${Date.now()}`;
}

/**
 * Add a new record
 */
export function addRecord(record) {
    state.records.push(record);
}

/**
 * Delete a record by ID
 */
export function deleteRecord(id) {
    state.records = state.records.filter(
        record => record.id !== id
    );
}

/**
 * Update an existing record
 */
export function updateRecord(id, updatedData) {

    const record = state.records.find(
        record => record.id === id
    );

    if (!record) return;

    Object.assign(record, updatedData);

    record.updatedAt = new Date().toISOString();
}

/**
 * Replace all records
 * Used during JSON import
 */
export function setRecords(records) {
    state.records = records;
}

/**
 * Update settings
 */
export function updateSettings(newSettings) {

    state.settings = {
        ...state.settings,
        ...newSettings
    };
}