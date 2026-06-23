$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$webBuild = Join-Path $projectRoot "web-build\index.html"
$startingPort = 8080
$portAttempts = 10

function Find-SalesTrackerUrl {
  for ($port = $startingPort; $port -lt ($startingPort + $portAttempts); $port++) {
    $candidateUrl = "http://localhost:$port"

    try {
      $response = Invoke-WebRequest -Uri "$candidateUrl/test" -UseBasicParsing -TimeoutSec 1
      if ($response.Content -eq "TESTING server!!!") {
        return $candidateUrl
      }
    } catch {
      # Nothing from Sales Tracker is listening on this port.
    }
  }

  return $null
}

if (-not (Test-Path $webBuild)) {
  Write-Host "Building the web app..."
  & npm.cmd run build:web

  if ($LASTEXITCODE -ne 0) {
    throw "The web build failed."
  }
}

$url = Find-SalesTrackerUrl

if (-not $url) {
  $env:NODE_ENV = "production"
  Start-Process `
    -FilePath "node.exe" `
    -ArgumentList "server/server.js" `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden

  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 500
    $url = Find-SalesTrackerUrl

    if ($url) {
      break
    }

    if ($attempt -eq 19) {
      throw "The Sales Tracker server did not start."
    }
  }
}

Start-Process $url
