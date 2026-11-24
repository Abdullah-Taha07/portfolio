# Optional, user-initiated capture of *public* project landing pages only.
# Uses an isolated browser profile; never logs in, never accesses private admin data.
[CmdletBinding()]
param([string]$RepoPath=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
$browser=@("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe") | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1
if(!$browser){throw 'EDGE_OR_CHROME_NOT_FOUND'}
if(!(Test-Path -LiteralPath (Join-Path $RepoPath 'index.html'))){throw 'PORTFOLIO_REPO_NOT_FOUND'}
$out=Join-Path $RepoPath 'images\public-previews'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$sites=@(@{Name='coffee';Url='https://abdullah-taha07.github.io/coffee-company/index.html'},@{Name='ecommerce';Url='https://abdullah-taha07.github.io/E-commerce/'})
foreach($site in $sites){
 $name=$site.Name; $output=Join-Path $out "$name-real-public.png"; $profile=Join-Path $env:TEMP ('portfolio-capture-'+[guid]::NewGuid().ToString('N'))
 try{
  & $browser '--headless=new' '--disable-gpu' '--no-first-run' '--disable-extensions' '--hide-scrollbars' '--window-size=1366,850' '--virtual-time-budget=5000' "--user-data-dir=$profile" "--screenshot=$output" $site.Url 2>&1 | Out-Null
  if(!(Test-Path -LiteralPath $output)){Write-Warning "CAPTURE_NOT_CREATED: $name";continue}
  $f=[System.IO.File]::OpenRead($output);try{$h=New-Object byte[] 8;$null=$f.Read($h,0,8);if(([BitConverter]::ToString($h)) -ne '89-50-4E-47-0D-0A-1A-0A'){throw "INVALID_PNG: $name"}}finally{$f.Dispose()}
  Write-Host "CAPTURE_READY_FOR_MANUAL_REVIEW: $output" -ForegroundColor Green
  $python=Get-Command py -ErrorAction SilentlyContinue
  if($python){& py -c 'from PIL import Image;import sys;Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2],"WEBP",quality=82,method=5)' $output (Join-Path $out "$name-real-public.webp") 2>$null; if($LASTEXITCODE -eq 0){Write-Host "WEBP_READY: $name" -ForegroundColor Green}}
 }finally{if(Test-Path $profile){Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue}}
}
Write-Host 'NO_GIT_ADD_NO_COMMIT_NO_PUSH_NO_DEPLOY. REVIEW ALL SCREENSHOTS BEFORE PUBLICATION.' -ForegroundColor Yellow
