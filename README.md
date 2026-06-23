# sales-tracker

### This app is a back-office app that keeps track of business' sales, customer base, etc.  It is written specifically for a home-based travel agency.

### Some of the functionlity includes:

- Fetching and displaying customer, transaction and commission data
- Parsing and uploading of accounting reports created in Excel to the DB
- CRUD operations on customers, commissions, transactions, etc. in the app

## Open as a desktop web app on Windows

Build and launch the app with:

```powershell
npm run desktop
```

The first launch creates the production web build, starts the API and web
server in the background, and opens it in your browser. It uses port 8080 when
available, or the next available port through 8089.
Run `npm run build:web` again after changing the frontend.

To open it from the Windows desktop, create a shortcut whose target is:

```text
powershell.exe -ExecutionPolicy Bypass -File "C:\Users\rjand\Documents\PersonalProjects\sales-tracker\scripts\start-desktop.ps1"
```
