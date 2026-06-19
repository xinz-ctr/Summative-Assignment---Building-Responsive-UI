// scripts/storage.js

import { state, setRecords, updateSettings } from "./state.js";

const STORAGE_KEY = "studentFinanceTracker";

/**
 * Save application data to localStorage
 */
export function saveToStorage() {

    const data = {
        records: state.records,
        settings: state.settings
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

/**
 * Load application data from localStorage
 */
export function loadFromStorage() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) return;

    try {

        const parsedData = JSON.parse(savedData);

        if (parsedData.records) {
            setRecords(parsedData.records);
        }

        if (parsedData.settings) {
            updateSettings(parsedData.settings);
        }

    } catch (error) {

        console.error(
            "Error loading localStorage:",
            error
        );

    }
}

/**
 * Export records as JSON
 */
export function exportJSON() {

    const jsonData = JSON.stringify(
        state.records,
        null,
        2
    );

    const blob = new Blob(
        [jsonData],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "finance-data.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Validate imported records
 */
function validateImportedData(data) {

    if (!Array.isArray(data)) {
        return false;
    }

    return data.every(record =>

        record.id &&
        record.description &&
        typeof record.amount === "number" &&
        record.category &&
        record.date &&
        record.createdAt &&
        record.updatedAt

    );
}

/**
 * Import JSON file
 */
export function importJSON(file) {

    const reader = new FileReader();

    reader.onload = event => {

        try {

            const data = JSON.parse(
                event.target.result
            );

            if (!validateImportedData(data)) {

                alert(
                    "Invalid JSON structure."
                );

                return;
            }

            setRecords(data);

            saveToStorage();

            alert(
                "Import successful."
            );

            location.reload();

        } catch (error) {

            alert(
                "Invalid JSON file."
            );

            console.error(error);

        }
    };

    reader.readAsText(file);
}