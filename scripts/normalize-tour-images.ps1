param(
    [int]$MaxDim = 800,
    [int]$MaxTrim = 20,
    [int]$TrimSizeLimit = 2000,
    [double]$BlueMin = 20.0,
    [double]$UniformFracMin = 0.85,
    [string]$BackupRoot = "$env:LOCALAPPDATA\Temp\opencode\tour-image-backup"
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$src = (Join-Path $PSScriptRoot '..') | Resolve-Path
$dataFiles = @('src/data/tours-th.json', 'src/data/tours-en.json')

$seen = @{}
foreach ($df in $dataFiles) {
    $fp = Join-Path $src ($df -replace '/', '\')
    $arr = Get-Content -Raw $fp | ConvertFrom-Json
    foreach ($t in $arr) { if ($t.image) { $seen[$t.image] = $true } }
}

function Is-Blue([System.Drawing.Color]$c) {
    return (($c.B - $c.R) -gt 15) -and (($c.B - $c.G) -gt 5)
}

function Measure-Trim([System.Drawing.Bitmap]$bmp, [string]$side) {
    $w = $bmp.Width; $h = $bmp.Height
    $t = 0
    while ($t -lt $MaxTrim) {
        $n = 0; $blue = 0; $sumDr = 0.0
        if ($side -eq 'top') {
            $y = $t
            for ($x = 0; $x -lt $w; $x++) { $n++; $c = $bmp.GetPixel($x, $y); $sumDr += $c.B - $c.R; if (Is-Blue $c) { $blue++ } }
        } elseif ($side -eq 'bottom') {
            $y = $h - 1 - $t
            for ($x = 0; $x -lt $w; $x++) { $n++; $c = $bmp.GetPixel($x, $y); $sumDr += $c.B - $c.R; if (Is-Blue $c) { $blue++ } }
        } elseif ($side -eq 'left') {
            $x = $t
            for ($y = 0; $y -lt $h; $y++) { $n++; $c = $bmp.GetPixel($x, $y); $sumDr += $c.B - $c.R; if (Is-Blue $c) { $blue++ } }
        } elseif ($side -eq 'right') {
            $x = $w - 1 - $t
            for ($y = 0; $y -lt $h; $y++) { $n++; $c = $bmp.GetPixel($x, $y); $sumDr += $c.B - $c.R; if (Is-Blue $c) { $blue++ } }
        }
        $frac = $blue / $n
        $meanDr = $sumDr / $n
        if (($frac -lt $UniformFracMin) -or ($meanDr -lt $BlueMin)) { break }
        $t++
    }
    return $t
}

function Save-ToTemp([System.Drawing.Bitmap]$bmp, [string]$tmp, [string]$img) {
    $ext = [System.IO.Path]::GetExtension($img).ToLower()
    if ($ext -eq '.jpg' -or $ext -eq '.jpeg') {
        $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
        try { $bmp.Save($tmp, $enc, $ep) } finally { $ep.Dispose() }
    } else {
        $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    }
}

$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = Join-Path $BackupRoot $ts
$origTotal = 0; $newTotal = 0; $done = 0; $skipped = 0; $failed = 0
$report = @()

foreach ($img in $seen.Keys) {
    $rel = $img -replace '/', '\'
    $fp = Join-Path $src ('public\' + $rel)
    if (-not (Test-Path -LiteralPath $fp)) { Write-Output "SKIP-MISSING: $img"; continue }
    $origBytes = (Get-Item -LiteralPath $fp).Length
    $origTotal += $origBytes

    $bmp = $null; $dst = $null; $tmp = $null; $saved = $false
    try {
        $bmp = [System.Drawing.Bitmap]::FromFile($fp)
        $srcW = $bmp.Width; $srcH = $bmp.Height

        $top = 0; $bottom = 0; $left = 0; $right = 0
        if (($bmp.Width -le $TrimSizeLimit) -and ($bmp.Height -le $TrimSizeLimit)) {
            $top = Measure-Trim $bmp 'top'
            $bottom = Measure-Trim $bmp 'bottom'
            $left = Measure-Trim $bmp 'left'
            $right = Measure-Trim $bmp 'right'
        }

        $needsWork = ($top + $bottom + $left + $right) -gt 0
        $overDim = $bmp.Width -gt $MaxDim -or $bmp.Height -gt $MaxDim
        if (-not $needsWork -and -not $overDim) { $skipped++; continue }

        $trimW = $bmp.Width - $left - $right
        $trimH = $bmp.Height - $top - $bottom
        if (($trimW -le 0) -or ($trimH -le 0)) { throw "trim leaves empty image" }

        $base = New-Object System.Drawing.Bitmap($trimW, $trimH)
        try {
            $g = [System.Drawing.Graphics]::FromImage($base)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, $trimW, $trimH)), (New-Object System.Drawing.Rectangle($left, $top, $trimW, $trimH)), [System.Drawing.GraphicsUnit]::Pixel)
            $g.Dispose()

            $nw = $trimW; $nh = $trimH
            if ($trimW -gt $MaxDim -or $trimH -gt $MaxDim) {
                $scale = $MaxDim / [Math]::Max($trimW, $trimH)
                $nw = [int][Math]::Max(1, [Math]::Round($trimW * $scale))
                $nh = [int][Math]::Max(1, [Math]::Round($trimH * $scale))
                $scaled = New-Object System.Drawing.Bitmap($nw, $nh)
                try {
                    $g2 = [System.Drawing.Graphics]::FromImage($scaled)
                    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                    $g2.DrawImage($base, (New-Object System.Drawing.Rectangle(0, 0, $nw, $nh)), (New-Object System.Drawing.Rectangle(0, 0, $trimW, $trimH)), [System.Drawing.GraphicsUnit]::Pixel)
                    $g2.Dispose()
                } finally { $g2.Dispose() }
                $base.Dispose()
                $dst = $scaled
            } else {
                $dst = $base
            }
        } catch {
            $base.Dispose()
            throw
        }

        $bkDir = Join-Path $backup (Split-Path $rel -Parent)
        $bkTarget = Join-Path $bkDir (Split-Path $rel -Leaf)
        if (-not (Test-Path -LiteralPath $bkTarget)) {
            New-Item -ItemType Directory -Path $bkDir -Force | Out-Null
            Copy-Item -LiteralPath $fp -Destination $bkTarget -Force
        }

        $tmp = "$fp.tmp"
        Save-ToTemp $dst $tmp $img
        $saved = $true
    } catch {
        $failed++
        Write-Output "FAIL: $img => $($_.Exception.Message)"
        continue
    } finally {
        if ($dst) { $dst.Dispose() }
        if ($bmp) { $bmp.Dispose() }
    }

    if ($saved -and (Test-Path -LiteralPath $tmp)) {
        Move-Item -LiteralPath $tmp -Destination $fp -Force
        $newBytes = (Get-Item -LiteralPath $fp).Length
        $newTotal += $newBytes
        $done++
        $report += [PSCustomObject]@{
            File = $img
            Trim = "$top/$bottom/$left/$right"
            From = "$srcW x $srcH"
            To = "$nw x $nh"
            BeforeKB = [math]::Round($origBytes / 1KB, 1)
            AfterKB = [math]::Round($newBytes / 1KB, 1)
        }
    }
}

Write-Output "================================================"
Write-Output "done=$done skipped=$skipped failed=$failed"
Write-Output ("source total: {0:N1} MB -> {1:N1} MB" -f ($origTotal / 1MB), ($newTotal / 1MB))
Write-Output "backup at: $backup"
$report | Sort-Object File | Format-Table File, Trim, From, To, BeforeKB, AfterKB -AutoSize
