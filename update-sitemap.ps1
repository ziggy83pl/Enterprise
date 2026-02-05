$date = Get-Date -Format "yyyy-MM-dd"
$path = "sitemap.xml"
$content = Get-Content -Path $path -Raw
$updated = $content -replace "<lastmod>.*?</lastmod>", "<lastmod>$date</lastmod>"
Set-Content -Path $path -Value $updated
Write-Host "Updated sitemap.xml lastmod to $date"
