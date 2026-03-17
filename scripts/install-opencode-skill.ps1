param(
    [string]$RepoOwner = "gswapex",
    [string]$RepoName = "ai-dev-guide",
    [string]$Branch = "SKILLS",
    [string]$SkillName = "ai-dev-guide",
    [string]$TargetRoot = (Join-Path $env:USERPROFILE ".config\opencode\skills")
)

$ErrorActionPreference = "Stop"

$zipUrl = "https://github.com/$RepoOwner/$RepoName/archive/refs/heads/$Branch.zip"
$tempRoot = Join-Path $env:TEMP "$RepoName-install-$([guid]::NewGuid().ToString('N'))"
$zipPath = Join-Path $tempRoot "$Branch.zip"
$extractPath = Join-Path $tempRoot "src"
$sourcePath = Join-Path $extractPath "$RepoName-$Branch"
$targetPath = Join-Path $TargetRoot $SkillName
$copyItems = @(
    "SKILL.md",
    "AGENTS.md",
    "README.md",
    "commands",
    "references",
    "examples",
    "projects"
)

try {
    New-Item -ItemType Directory -Force $tempRoot | Out-Null
    New-Item -ItemType Directory -Force $TargetRoot | Out-Null

    Write-Host "Downloading $RepoName ($Branch) from GitHub..."
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath

    Write-Host "Extracting package..."
    Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

    if (-not (Test-Path $sourcePath)) {
        throw "Cannot find extracted skill directory: $sourcePath"
    }

    New-Item -ItemType Directory -Force $targetPath | Out-Null

    foreach ($item in $copyItems) {
        $sourceItem = Join-Path $sourcePath $item
        if (-not (Test-Path $sourceItem)) {
            continue
        }

        $targetItem = Join-Path $targetPath $item
        if (Test-Path $targetItem) {
            Remove-Item -Recurse -Force $targetItem
        }

        Copy-Item -Path $sourceItem -Destination $targetPath -Recurse -Force
    }

    Write-Host ""
    Write-Host "Install complete."
    Write-Host "Target path: $targetPath"
    Write-Host "You can now use the ai-dev-guide skill in OpenCode."
}
finally {
    if (Test-Path $tempRoot) {
        Remove-Item -Recurse -Force $tempRoot
    }
}
