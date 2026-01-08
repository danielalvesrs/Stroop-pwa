
Add-Type -AssemblyName System.Drawing
$source = "icons\icon-512x512.png"
if (-not (Test-Path $source)) {
    Write-Host "Source icon not found!"
    exit 1
}
$img = [System.Drawing.Image]::FromFile($source)
$sizes = 72, 96, 128, 144, 152, 192, 384
foreach ($size in $sizes) {
    $target = "icons\icon-$size" + "x$size.png"
    Write-Host "Generating $target..."
    $new = new-object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($new)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $size, $size)
    $new.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $new.Dispose()
}
$img.Dispose()
Write-Host "All icons generated."
