// scripts/ui.js

import { state, updateRecord, deleteRecord } from "./state.js";
import { saveToStorage } from "./storage.js";
import { highlightText } from "./search.js";

/**
 * Render Records Table
 */
export function renderRecords(
    records,
    pattern = "",
    ignoreCase = true
) {

    const tbody =
        document.getElementById("recordsBody");

    tbody.innerHTML = "";

    records.forEach(record => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${highlightText(
                    record.description,
                    pattern,
                    ignoreCase
                )}
            </td>

            <td>
                $${record.amount.toFixed(2)}
            </td>

            <td>
                ${highlightText(
                    record.category,
                    pattern,
                    ignoreCase
                )}
            </td>

            <td>
                ${record.date}
            </td>

            <td>

                <button
                    class="edit-btn"
                    data-id="${record.id}">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-id="${record.id}">
                    Delete
                </button>

            </td>
        `;

        tbody.appendChild(row);
    });

    attachActionListeners();
}

/**
 * Attach Edit/Delete Events
 */
function attachActionListeners() {

    const editButtons =
        document.querySelectorAll(".edit-btn");

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    editButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                editRecord(id);
            }
        );

    });

    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                removeRecord(id);
            }
        );

    });
}

/**
 * Edit Record
 */
function editRecord(id) {

    const record =
        state.records.find(
            record => record.id === id
        );

    if (!record) return;

    const description =
        prompt(
            "Edit description:",
            record.description
        );

    if (description === null) return;

    const amount =
        prompt(
            "Edit amount:",
            record.amount
        );

    if (amount === null) return;

    updateRecord(id, {
        description,
        amount: Number(amount)
    });

    saveToStorage();

    renderRecords(state.records);
    renderDashboard(state.records);
}

/**
 * Delete Record
 */
function removeRecord(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this expense?"
        );

    if (!confirmed) return;

    deleteRecord(id);

    saveToStorage();

    renderRecords(state.records);
    renderDashboard(state.records);
}

/**
 * Render Dashboard
 */
export function renderDashboard(records) {

    const totalRecords =
        records.length;

    const totalSpending =
        records.reduce(
            (sum, record) =>
                sum + record.amount,
            0
        );

    const categoryCounts = {};

    records.forEach(record => {

        categoryCounts[
            record.category
        ] =
            (categoryCounts[
                record.category
            ] || 0) + 1;

    });

    let topCategory = "None";

    let highestCount = 0;

    for (const category in categoryCounts) {

        if (
            categoryCounts[category] >
            highestCount
        ) {

            highestCount =
                categoryCounts[category];

            topCategory =
                category;
        }
    }

    document.getElementById(
        "totalRecords"
    ).textContent = totalRecords;

    document.getElementById(
        "totalSpending"
    ).textContent =
        "$" +
        totalSpending.toFixed(2);

    document.getElementById(
        "topCategory"
    ).textContent =
        topCategory;

    updateBudgetStatus(
        totalSpending
    );

    renderTrendChart(records);
}

/**
 * Budget Status
 */
function updateBudgetStatus(
    totalSpending
) {

    const status =
        document.getElementById(
            "budgetStatus"
        );

    const liveRegion =
        document.getElementById(
            "budgetMessage"
        );

    const cap =
        state.settings.budgetCap;

    if (!cap || cap <= 0) {

        status.textContent =
            "No budget set";

        liveRegion.textContent =
            "";

        return;
    }

    const remaining =
        cap - totalSpending;

    if (remaining >= 0) {

        status.textContent =
            "$" +
            remaining.toFixed(2);

        liveRegion.setAttribute(
            "aria-live",
            "polite"
        );

        liveRegion.textContent =
            `You have $${remaining.toFixed(
                2
            )} remaining.`;

    } else {

        status.textContent =
            "-$" +
            Math.abs(
                remaining
            ).toFixed(2);

        liveRegion.setAttribute(
            "aria-live",
            "assertive"
        );

        liveRegion.textContent =
            `Budget exceeded by $${Math.abs(
                remaining
            ).toFixed(2)}.`;
    }
}

/**
 * 7-Day Trend Chart
 */
function renderTrendChart(
    records
) {

    const chart =
        document.getElementById(
            "chart"
        );

    chart.innerHTML = "";

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {

        const day =
            new Date();

        day.setDate(
            day.getDate() - i
        );

        const dateString =
            day
                .toISOString()
                .split("T")[0];

        const total =
            records
                .filter(
                    record =>
                        record.date ===
                        dateString
                )
                .reduce(
                    (
                        sum,
                        record
                    ) =>
                        sum +
                        record.amount,
                    0
                );

        last7Days.push(total);
    }

    const max =
        Math.max(
            ...last7Days,
            1
        );

    last7Days.forEach(value => {

        const bar =
            document.createElement(
                "div"
            );

        bar.classList.add(
            "chart-bar"
        );

        bar.style.height =
            (value / max) *
                100 +
            "px";

        bar.title =
            "$" +
            value.toFixed(2);

        chart.appendChild(bar);
    });
}

/**
 * Show Validation Error
 */
export function showValidationError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) return;

    element.textContent =
        message;
}

/**
 * Clear Validation Errors
 */
export function clearValidationErrors() {

    const errors =
        document.querySelectorAll(
            ".error"
        );

    errors.forEach(error => {

        error.textContent = "";

    });
}