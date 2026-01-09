# Script to help identify which files still need to be copied
# Run this to see what's missing

$dest = "C:\Users\josht\Snowflake"
Write-Host "Checking files in: $dest"
Write-Host ""

# Check key directories
$dirs = @("app", "src\types", "src\utils", "src\components", "src\data", "src\hooks", "src\fixtures")

foreach ($dir in $dirs) {
    $path = Join-Path $dest $dir
    if (Test-Path $path) {
        $count = (Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
        Write-Host "✓ $dir exists ($count files)"
    } else {
        Write-Host "✗ $dir missing"
    }
}

Write-Host ""
Write-Host "To complete setup, you need to copy all files from the Cursor workspace"
Write-Host "to C:\Users\josht\Snowflake"
Write-Host ""
Write-Host "Key directories to copy:"
Write-Host "  - app/ (all files)"
Write-Host "  - src/ (all files and subdirectories)"

