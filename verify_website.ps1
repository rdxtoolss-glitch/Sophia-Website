# PowerShell Website Link & Asset Validator
$ErrorActionPreference = "Stop"

$htmlFiles = Get-ChildItem -Path "f:\Projects\Sophia website\*.html"
Write-Host "Found $($htmlFiles.Count) HTML files in website workspace." -ForegroundColor Cyan

$brokenLinks = @()
$missingAssets = @()
$verifiedPages = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $verifiedPages++
    
    # 1. Check anchor links
    $hrefMatches = [regex]::Matches($content, 'href=["'']([^"'']+)["'']')
    foreach ($match in $hrefMatches) {
        $href = $match.Groups[1].Value
        
        # Skip external protocols & anchors
        if ($href -match '^(https?://|mailto:|tel:|#)') {
            continue
        }
        
        # Strip anchor fragment and query parameters
        $cleanTarget = $href.Split('#')[0].Split('?')[0]
        if ([string]::IsNullOrWhiteSpace($cleanTarget)) {
            continue
        }
        
        $resolvedPath = Join-Path $file.DirectoryName $cleanTarget
        if (-not (Test-Path $resolvedPath)) {
            $brokenLinks += [PSCustomObject]@{
                SourcePage = $file.Name
                TargetLink = $href
                ResolvedPath = $resolvedPath
            }
        }
    }
    
    # 2. Check images & scripts
    $srcMatches = [regex]::Matches($content, 'src=["'']([^"'']+)["'']')
    foreach ($match in $srcMatches) {
        $src = $match.Groups[1].Value
        if ($src -match '^(https?://|data:)') {
            continue
        }
        $cleanSrc = $src.Split('?')[0]
        $resolvedAsset = Join-Path $file.DirectoryName $cleanSrc
        if (-not (Test-Path $resolvedAsset)) {
            $missingAssets += [PSCustomObject]@{
                SourcePage = $file.Name
                MissingAsset = $src
                ResolvedPath = $resolvedAsset
            }
        }
    }
}

Write-Host "--- Verification Summary ---" -ForegroundColor Yellow
Write-Host "Pages Verified: $verifiedPages"
Write-Host "Broken Links Count: $($brokenLinks.Count)"
Write-Host "Missing Assets Count: $($missingAssets.Count)"

if ($brokenLinks.Count -gt 0) {
    Write-Host "BROKEN LINKS DETECTED:" -ForegroundColor Red
    $brokenLinks | Format-Table -AutoSize | Out-String | Write-Host -ForegroundColor Red
}

if ($missingAssets.Count -gt 0) {
    Write-Host "MISSING ASSETS DETECTED:" -ForegroundColor Red
    $missingAssets | Format-Table -AutoSize | Out-String | Write-Host -ForegroundColor Red
}

# 3. Check Google API disclosures
$indexContent = Get-Content -Path "f:\Projects\Sophia website\index.html" -Raw
$privacyContent = Get-Content -Path "f:\Projects\Sophia website\privacy.html" -Raw

$hasGooglePolicyIndex = $indexContent -match "Google API Services User Data Policy"
$hasGooglePolicyPrivacy = $privacyContent -match "Google API Services User Data Policy"
$hasLimitedUsePrivacy = $privacyContent -match "Limited Use"

Write-Host "Google Policy on index.html: $(if ($hasGooglePolicyIndex) {'PASS'} else {'FAIL'})" -ForegroundColor $(if ($hasGooglePolicyIndex) {'Green'} else {'Red'})
Write-Host "Google Policy on privacy.html: $(if ($hasGooglePolicyPrivacy) {'PASS'} else {'FAIL'})" -ForegroundColor $(if ($hasGooglePolicyPrivacy) {'Green'} else {'Red'})
Write-Host "Limited Use on privacy.html: $(if ($hasLimitedUsePrivacy) {'PASS'} else {'FAIL'})" -ForegroundColor $(if ($hasLimitedUsePrivacy) {'Green'} else {'Red'})

# 4. Check Muhammad Junaid & Mobo Devs Studio attribution
$hasFounderIndex = $indexContent -match "Muhammad Junaid"
$hasStudioIndex = $indexContent -match "Mobo Devs"
Write-Host "Muhammad Junaid on index.html: $(if ($hasFounderIndex) {'PASS'} else {'FAIL'})" -ForegroundColor $(if ($hasFounderIndex) {'Green'} else {'Red'})
Write-Host "Mobo Devs on index.html: $(if ($hasStudioIndex) {'PASS'} else {'FAIL'})" -ForegroundColor $(if ($hasStudioIndex) {'Green'} else {'Red'})

if ($brokenLinks.Count -eq 0 -and $missingAssets.Count -eq 0 -and $hasGooglePolicyIndex -and $hasGooglePolicyPrivacy) {
    Write-Host "ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "VERIFICATION FAILED" -ForegroundColor Red
    exit 1
}
