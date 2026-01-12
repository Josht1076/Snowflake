# Copy all project files
$workspaceRoot = "C:\Users\josht"  # Adjust if your workspace is elsewhere
$dest = "C:\Users\josht\Snowflake"

# Function to copy directory recursively
function Copy-Directory {
    param($Source, $Dest)
    if (Test-Path $Source) {
        if (-not (Test-Path $Dest)) {
            New-Item -ItemType Directory -Path $Dest -Force | Out-Null
        }
        Get-ChildItem -Path $Source -Recurse | ForEach-Object {
            $destPath = $_.FullName.Replace($Source, $Dest)
            $destDir = Split-Path $destPath -Parent
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            Copy-Item $_.FullName -Destination $destPath -Force
        }
        Write-Host "Copied $Source to $Dest"
    }
}

Write-Host "Please manually copy the 'app' and 'src' directories from your Cursor workspace to C:\Users\josht\Snowflake"
