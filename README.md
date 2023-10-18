# Extract domains from emails in CSV

Just a quick script I needed for work: it extracts domains from email addresses in a CSV file, removes duplicates, and creates a new CSV with just the domains. Helpful if you have a lot of data (I prefer this to MS Excel).

# Install

`npm i` after cloning, put the `input.csv` in the root folder, make sure the email column is the first column in the table (or edit this line: `const email = record[0]`).
