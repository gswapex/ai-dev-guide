param(
    [string]$RepoOwner = "gswapex",
    [string]$RepoName = "ai-dev-guide",
    [string]$Branch = "SKILLS",
    [string]$SkillName = "ai-dev-guide",
    [string]$TargetRoot = (Join-Path $env:USERPROFILE ".config\opencode\skills"),
    [string]$CommandRoot = (Join-Path $env:USERPROFILE ".config\opencode\commands")
)

$ErrorActionPreference = "Stop"

$zipUrl = "https://github.com/$RepoOwner/$RepoName/archive/refs/heads/$Branch.zip"
$tempRoot = Join-Path $env:TEMP "$RepoName-install-$([guid]::NewGuid().ToString('N'))"
$zipPath = Join-Path $tempRoot "$Branch.zip"
$extractPath = Join-Path $tempRoot "src"
$sourcePath = Join-Path $extractPath "$RepoName-$Branch"
$targetPath = Join-Path $TargetRoot $SkillName
$sourceCommandPath = Join-Path $sourcePath ".opencode\commands"
$copyItems = @(
    "SKILL.md",
    "AGENTS.md",
    "README.md",
    "references",
    "examples",
    "projects"
)

try {
    New-Item -ItemType Directory -Force $tempRoot | Out-Null
    New-Item -ItemType Directory -Force $TargetRoot | Out-Null
    New-Item -ItemType Directory -Force $CommandRoot | Out-Null

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

    if (Test-Path $sourceCommandPath) {
        Get-ChildItem -Path $sourceCommandPath -Filter *.md | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination $CommandRoot -Force
        }
    }

    Write-Host ""
    Write-Host "Install complete."
    Write-Host "Skill path: $targetPath"
    Write-Host "Command path: $CommandRoot"
    Write-Host "You can now use the ai-dev-guide skill and /ai-dev-* commands in OpenCode."
}
finally {
    if (Test-Path $tempRoot) {
        Remove-Item -Recurse -Force $tempRoot
    }
}

