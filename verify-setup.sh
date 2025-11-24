#!/bin/bash

# 🚀 Precious List - Google Sheets Setup Verification
# This script checks if everything is properly set up

echo "🔍 Precious List - Google Sheets Integration Verification"
echo "========================================================"
echo ""

# Check for required files
echo "✓ Checking for required files..."
echo ""

files=(
    "google-sheets-config.js"
    "google-sheets-service.js"
    "google-sheets-adapter.js"
    "demo-app.html"
    "demo-app.js"
    "demo-app.css"
)

missing_files=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (MISSING)"
        missing_files=$((missing_files + 1))
    fi
done

echo ""

# Check configuration
echo "✓ Checking configuration..."
echo ""

if grep -q "SPREADSHEET_ID:" google-sheets-config.js 2>/dev/null; then
    spreadsheet_id=$(grep "SPREADSHEET_ID:" google-sheets-config.js | head -1)
    echo "  ✅ SPREADSHEET_ID found:"
    echo "     $spreadsheet_id"
    
    if grep -q "1Kx1Wwy32pEkjqroDPGu2pJNFI-Hxk9kbZ30MgXYKS5g" google-sheets-config.js; then
        echo "     ⚠️  Warning: Using default/demo ID. Please update with your own!"
    fi
else
    echo "  ❌ SPREADSHEET_ID not found"
fi

echo ""

# Check script references
echo "✓ Checking HTML script references..."
echo ""

if grep -q "google-sheets-config.js" demo-app.html; then
    echo "  ✅ google-sheets-config.js referenced"
else
    echo "  ❌ google-sheets-config.js NOT referenced"
fi

if grep -q "google-sheets-service.js" demo-app.html; then
    echo "  ✅ google-sheets-service.js referenced"
else
    echo "  ❌ google-sheets-service.js NOT referenced"
fi

if grep -q "google-sheets-adapter.js" demo-app.html; then
    echo "  ✅ google-sheets-adapter.js referenced"
else
    echo "  ❌ google-sheets-adapter.js NOT referenced"
fi

echo ""

# Check for sync buttons
echo "✓ Checking for sync buttons in HTML..."
echo ""

if grep -q "loadFromGoogleSheets" demo-app.html; then
    echo "  ✅ Load from Sheets button found"
else
    echo "  ❌ Load from Sheets button NOT found"
fi

if grep -q "saveToGoogleSheets" demo-app.html; then
    echo "  ✅ Save to Sheets button found"
else
    echo "  ❌ Save to Sheets button NOT found"
fi

echo ""

# Check for sync functions
echo "✓ Checking for sync functions in JavaScript..."
echo ""

if grep -q "function initializeGoogleSheets" demo-app.js; then
    echo "  ✅ initializeGoogleSheets function found"
else
    echo "  ❌ initializeGoogleSheets function NOT found"
fi

if grep -q "function saveToGoogleSheets" demo-app.js; then
    echo "  ✅ saveToGoogleSheets function found"
else
    echo "  ❌ saveToGoogleSheets function NOT found"
fi

if grep -q "function loadFromGoogleSheets" demo-app.js; then
    echo "  ✅ loadFromGoogleSheets function found"
else
    echo "  ❌ loadFromGoogleSheets function NOT found"
fi

if grep -q "function setupAutoSync" demo-app.js; then
    echo "  ✅ setupAutoSync function found"
else
    echo "  ❌ setupAutoSync function NOT found"
fi

echo ""

# Check documentation
echo "✓ Checking documentation files..."
echo ""

docs=(
    "QUICK_START.md"
    "GOOGLE_SHEETS_INTEGRATION.md"
    "README_GOOGLE_SHEETS.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        lines=$(wc -l < "$doc")
        echo "  ✅ $doc ($lines lines)"
    else
        echo "  ⚠️  $doc (optional)"
    fi
done

echo ""

# Summary
echo "========================================================"
if [ $missing_files -eq 0 ]; then
    echo "✅ Setup verification PASSED!"
    echo ""
    echo "Next steps:"
    echo "1. Create your Google Sheet"
    echo "2. Get your Spreadsheet ID"
    echo "3. Update SPREADSHEET_ID in google-sheets-config.js"
    echo "4. Open demo-app.html in browser"
    echo "5. Click 'Load from Sheets' or 'Save to Sheets' button"
    echo ""
    echo "📖 See QUICK_START.md for detailed instructions"
else
    echo "❌ Setup verification FAILED!"
    echo "Missing $missing_files file(s)"
    echo ""
    echo "Please ensure all required files are present:"
    echo "- google-sheets-config.js"
    echo "- google-sheets-service.js"
    echo "- google-sheets-adapter.js"
    echo "- demo-app.html (updated)"
    echo "- demo-app.js (updated)"
fi

echo "========================================================"
