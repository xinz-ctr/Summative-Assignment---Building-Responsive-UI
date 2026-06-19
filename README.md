# Student Finance Tracker

A responsive web application that helps students manage their finances by tracking expenses, setting budgets, viewing spending statistics, and searching records using regular expressions.

[GITHUB PAGES WEBSITE](https://xinz-ctr.github.io/Summative-Assignment---Building-Responsive-UI/)
[HERE IS A VIDEO EXPLAINING THE PROJECT](https://drive.google.com/file/d/1g7Dh-wfVjwwpT1FgH5GjpGQwTOBV9Moi/view?usp=sharing)

## Features

### Expense Management
- Add expenses
- Edit expenses
- Delete expenses
- Automatic ID generation
- Track creation and update dates

### Dashboard
- Total records
- Total spending
- Top spending category
- Budget cap tracking
- 7-day spending trend chart

### Search & Sort
- Live regex search
- Case-sensitive search option
- Highlight matching text
- Sort by:
  - Date
  - Description
  - Amount

### Validation
Uses regular expressions to validate:

- Description
- Amount
- Date
- Category

Advanced regex:
- Detect duplicate words

### Data Persistence
- Automatically saves data to localStorage
- Data remains after page refresh

### Import & Export
- Import records from JSON
- Export records to JSON

### Accessibility
- Semantic HTML structure
- Keyboard navigation
- Skip-to-content link
- ARIA live regions
- Visible focus indicators

### Responsive Design
Mobile-first layout with breakpoints:

- Mobile: 360px+
- Tablet: 768px+
- Desktop: 1024px+

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- LocalStorage API
- Regular Expressions (Regex)

No frameworks or libraries were used.

---

## How to run

1. Open `index.html` in your browser or use Live Server.

---

## Usage

### Adding an Expense

1. Enter a description.
2. Enter an amount.
3. Select a category.
4. Select a date.
5. Click **Add Expense**.

### Sorting

Sort records by:

- Date
- Description
- Amount

### Budget Tracking

1. Set a budget cap in Settings.
2. The dashboard will show:
   - Remaining budget
   - Budget exceeded amount

### Importing Data

Use:
seed.json

or any valid exported JSON file.

### Exporting Data

Export all records as a JSON file for backup.

---

## Testing

Open:

tests.html

This page tests:

- Description validation
- Amount validation
- Date validation
- Category validation
- Duplicate word detection

---

## Sample Categories

- Food
- Books
- Transport
- Entertainment
- Fees
- Other

