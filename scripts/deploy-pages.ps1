param([string]$DeploymentDirectory = "")
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$targetRepository = 'ManuDiasCruz/BuzzQuizzBeeh'
$branch = 'gh-pages'

function Invoke-Checked {
    param([string]$Program, [string[]]$Arguments)
    & $Program @Arguments
    if ($LASTEXITCODE -ne 0) { throw "$Program failed with exit code $LASTEXITCODE" }
}

Push-Location $projectRoot
try {
    Invoke-Checked 'node' @('--test', 'tests/core.test.cjs', 'tests/flows.test.cjs')
    Invoke-Checked 'node' @('scripts/build.cjs')
    Invoke-Checked 'gh' @('auth', 'status')
    # Uses the user's configured credential helper. No credentials are read or saved by this script.
    Invoke-Checked 'gh' @('repo', 'view', $targetRepository, '--json', 'name')
    if (-not $DeploymentDirectory) {
        $DeploymentDirectory = Join-Path $projectRoot ('.local/pages-' + [guid]::NewGuid().ToString('N'))
    }
    $deploymentPath = [IO.Path]::GetFullPath($DeploymentDirectory)
    if (Test-Path -LiteralPath $deploymentPath) { throw 'Choose a new deployment directory; existing folders are never overwritten.' }
    Invoke-Checked 'git' @('clone', "https://github.com/$targetRepository.git", $deploymentPath)
    Push-Location $deploymentPath
    try {
        & git show-ref --verify --quiet "refs/remotes/origin/$branch"
        if ($LASTEXITCODE -eq 0) { Invoke-Checked 'git' @('switch', $branch) }
        else { Invoke-Checked 'git' @('switch', '--orphan', $branch) }
        # Copy only the audited build. No recursive delete, force push, or secret-bearing files.
        Get-ChildItem -LiteralPath (Join-Path $projectRoot 'dist') -Force | Copy-Item -Destination $deploymentPath -Recurse -Force
        Invoke-Checked 'git' @('add', '--all')
        & git diff --cached --quiet
        if ($LASTEXITCODE -eq 1) { Invoke-Checked 'git' @('commit', '-m', 'chore(pages): deploy verified BuzzQuizz Beeh build') }
        Invoke-Checked 'git' @('push', '-u', 'origin', $branch)
    } finally { Pop-Location }
    Write-Host 'In BuzzQuizzBeeh Settings > Pages, choose Deploy from a branch: gh-pages / (root).'
    Write-Host 'Verify https://manudiascruz.github.io/BuzzQuizzBeeh/ and deployment.json after the Pages build finishes.'
} finally { Pop-Location }
