import {
    state,
    addRecord,
    generateId,
    updateSettings
} from "./state.js";

import {
    saveToStorage,
    loadFromStorage,
    exportJSON,
    importJSON
} from "./storage.js";

import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWords
} from "./validators.js";

import {
    renderRecords,
    renderDashboard,
    showValidationError,
    clearValidationErrors
} from "./ui.js";

import {
    filterRecords,
    sortRecords
} from "./search.js";

const form = document.getElementById("expenseForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const categoryInput =
    document.getElementById("category");

const dateInput =
    document.getElementById("date");

const searchInput =
    document.getElementById("searchInput");

const ignoreCaseCheckbox =
    document.getElementById("ignoreCase");

const sortSelect =
    document.getElementById("sortSelect");

const budgetCapInput =
    document.getElementById("budgetCap");

const eurRateInput =
    document.getElementById("eurRate");

const rwfRateInput =
    document.getElementById("rwfRate");

const exportBtn =
    document.getElementById("exportBtn");

const importFile =
    document.getElementById("importFile");


loadFromStorage();

renderRecords(state.records);
renderDashboard(state.records);

form.addEventListener("submit", event => {

    event.preventDefault();

    clearValidationErrors();

    const description =
        descriptionInput.value.trim();

    const amount =
        amountInput.value.trim();

    const category =
        categoryInput.value.trim();

    const date =
        dateInput.value.trim();

    let valid = true;

    // Description

    if (!validateDescription(description)) {

        showValidationError(
            "descError",
            "Invalid description."
        );

        valid = false;
    }

    // Duplicate words

    if (hasDuplicateWords(description)) {

        showValidationError(
            "descError",
            "Duplicate words detected."
        );

        valid = false;
    }

    // Amount

    if (!validateAmount(amount)) {

        showValidationError(
            "amountError",
            "Invalid amount."
        );

        valid = false;
    }

    // Category

    if (!validateCategory(category)) {

        alert("Invalid category.");

        valid = false;
    }

    // Date

    if (!validateDate(date)) {

        showValidationError(
            "dateError",
            "Invalid date."
        );

        valid = false;
    }

    if (!valid) return;

    const now =
        new Date().toISOString();

    const record = {

        id: generateId(),

        description,

        amount: Number(amount),

        category,

        date,

        createdAt: now,

        updatedAt: now
    };

    addRecord(record);

    saveToStorage();

    renderRecords(state.records);
    renderDashboard(state.records);

    form.reset();
});



searchInput.addEventListener("input", () => {

    const pattern =
        searchInput.value;

    const ignoreCase =
        ignoreCaseCheckbox.checked;

    const filtered =
        filterRecords(
            state.records,
            pattern,
            ignoreCase
        );

    renderRecords(
        filtered,
        pattern,
        ignoreCase
    );
});

ignoreCaseCheckbox.addEventListener(
    "change",
    () => {

        const filtered =
            filterRecords(
                state.records,
                searchInput.value,
                ignoreCaseCheckbox.checked
            );

        renderRecords(
            filtered,
            searchInput.value,
            ignoreCaseCheckbox.checked
        );
    }
);

sortSelect.addEventListener(
    "change",
    () => {

        const sorted =
            sortRecords(
                [...state.records],
                sortSelect.value
            );

        renderRecords(sorted);
    }
);

budgetCapInput.addEventListener(
    "change",
    () => {

        updateSettings({
            budgetCap:
                Number(
                    budgetCapInput.value
                )
        });

        saveToStorage();

        renderDashboard(
            state.records
        );
    }
);

eurRateInput.addEventListener(
    "change",
    () => {

        updateSettings({
            eurRate:
                Number(
                    eurRateInput.value
                )
        });

        saveToStorage();
    }
);

rwfRateInput.addEventListener(
    "change",
    () => {

        updateSettings({
            rwfRate:
                Number(
                    rwfRateInput.value
                )
        });

        saveToStorage();
    }
);

exportBtn.addEventListener(
    "click",
    exportJSON
);

importFile.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (file) {
            importJSON(file);
        }
    }
);