Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function New-RoundedRectPath {
    param(
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height,
        [float]$Radius
    )

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $Radius * 2
    $path.AddArc($X, $Y, $d, $d, 180, 90)
    $path.AddArc($X + $Width - $d, $Y, $d, $d, 270, 90)
    $path.AddArc($X + $Width - $d, $Y + $Height - $d, $d, $d, 0, 90)
    $path.AddArc($X, $Y + $Height - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

function New-LinearBrush {
    param(
        [System.Drawing.RectangleF]$Rect,
        [string]$Start,
        [string]$End,
        [float]$Angle = 45
    )

    return New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $Rect,
        [System.Drawing.ColorTranslator]::FromHtml($Start),
        [System.Drawing.ColorTranslator]::FromHtml($End),
        $Angle
    )
}

function Draw-AppIcon {
    param(
        [int]$Size,
        [bool]$Round,
        [string]$OutputPath
    )

    $scale = $Size / 1024.0
    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $graphics.ScaleTransform($scale, $scale)

    if ($Round) {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $clip = New-Object System.Drawing.Drawing2D.GraphicsPath
        $clip.AddEllipse(0, 0, 1024, 1024)
        $graphics.SetClip($clip)
    } else {
        $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml("#0A6F5A"))
    }

    $full = [System.Drawing.RectangleF]::new(0, 0, 1024, 1024)
    $bgBrush = New-LinearBrush $full "#073F37" "#19A86D" 38
    $graphics.FillRectangle($bgBrush, $full)

    $glow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(36, 255, 255, 255))
    $graphics.FillEllipse($glow, 560, -120, 520, 520)
    $graphics.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 4, 60, 48))), -150, 640, 600, 520)

    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(58, 0, 0, 0))
    $shadowPath = New-RoundedRectPath 188 714 650 72 36
    $graphics.FillPath($shadowBrush, $shadowPath)

    $cream = [System.Drawing.ColorTranslator]::FromHtml("#FFF8EA")
    $deepGreen = [System.Drawing.ColorTranslator]::FromHtml("#075C4A")
    $mint = [System.Drawing.ColorTranslator]::FromHtml("#6FE0A7")
    $yellow = [System.Drawing.ColorTranslator]::FromHtml("#F7B733")
    $orange = [System.Drawing.ColorTranslator]::FromHtml("#E88921")
    $ink = [System.Drawing.ColorTranslator]::FromHtml("#073F37")

    $whiteBrush = New-Object System.Drawing.SolidBrush($cream)
    $greenBrush = New-Object System.Drawing.SolidBrush($deepGreen)
    $mintBrush = New-Object System.Drawing.SolidBrush($mint)
    $yellowBrush = New-Object System.Drawing.SolidBrush($yellow)
    $orangeBrush = New-Object System.Drawing.SolidBrush($orange)
    $inkBrush = New-Object System.Drawing.SolidBrush($ink)

    $storeBody = New-RoundedRectPath 210 385 390 330 34
    $graphics.FillPath($whiteBrush, $storeBody)
    $graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#DDF7E8"))), 248, 500, 312, 180)

    $roof = New-Object System.Drawing.PointF[] 4
    $roof[0] = [System.Drawing.PointF]::new(255, 270)
    $roof[1] = [System.Drawing.PointF]::new(548, 270)
    $roof[2] = [System.Drawing.PointF]::new(625, 392)
    $roof[3] = [System.Drawing.PointF]::new(178, 392)
    $graphics.FillPolygon($whiteBrush, $roof)

    $awningBack = New-RoundedRectPath 180 364 445 118 26
    $graphics.FillPath($greenBrush, $awningBack)
    for ($i = 0; $i -lt 5; $i++) {
        $x = 184 + ($i * 89)
        $brush = if ($i % 2 -eq 0) { $mintBrush } else { $whiteBrush }
        $graphics.FillRectangle($brush, $x, 364, 89, 82)
        $graphics.FillEllipse($brush, $x, 410, 89, 72)
    }

    $door = New-RoundedRectPath 390 525 120 190 18
    $graphics.FillPath($greenBrush, $door)
    $graphics.FillEllipse($yellowBrush, 474, 614, 15, 15)

    $crate = New-RoundedRectPath 240 555 154 152 22
    $graphics.FillPath($yellowBrush, $crate)
    $pen = New-Object System.Drawing.Pen($orange, 18)
    $graphics.DrawLine($pen, 240, 606, 394, 606)
    $graphics.DrawLine($pen, 317, 555, 317, 707)

    $fontFamily = New-Object System.Drawing.FontFamily("Segoe UI")
    $font = New-Object System.Drawing.Font($fontFamily, 84, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $graphics.DrawString("K", $font, $inkBrush, ([System.Drawing.RectangleF]::new(248, 576, 136, 106)), $format)

    $cargo = New-RoundedRectPath 480 500 260 168 28
    $graphics.FillPath((New-LinearBrush ([System.Drawing.RectangleF]::new(480, 500, 260, 168)) "#F4FFF8" "#BDEFD3" 90), $cargo)
    $graphics.FillRectangle($greenBrush, 506, 532, 92, 26)
    $graphics.FillRectangle($greenBrush, 506, 580, 168, 26)
    $graphics.FillRectangle($mintBrush, 506, 628, 130, 18)

    $cab = New-RoundedRectPath 706 542 128 126 24
    $graphics.FillPath($whiteBrush, $cab)
    $graphics.FillPolygon($whiteBrush, @(
        [System.Drawing.PointF]::new(688, 668),
        [System.Drawing.PointF]::new(724, 542),
        [System.Drawing.PointF]::new(748, 668)
    ))
    $window = New-RoundedRectPath 734 570 62 46 10
    $graphics.FillPath($greenBrush, $window)
    $graphics.FillRectangle($whiteBrush, 832, 630, 28, 18)

    $wheelPen = New-Object System.Drawing.Pen($cream, 18)
    foreach ($cx in @(555, 774)) {
        $graphics.FillEllipse($inkBrush, $cx - 42, 638, 84, 84)
        $graphics.DrawEllipse($wheelPen, $cx - 27, 653, 54, 54)
    }

    $roadPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(185, 255, 248, 234), 16)
    $roadPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $roadPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($roadPen, 185, 744, 842, 744)

    $graphics.ResetClip()
    $graphics.Dispose()

    $directory = Split-Path -Parent $OutputPath
    if (-not (Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory | Out-Null
    }
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
}

$iosDir = Join-Path $root "ios\kariyana\Images.xcassets\AppIcon.appiconset"
$iosIcons = @(
    @{Name="AppIcon-20x20@2x.png"; Size=40},
    @{Name="AppIcon-20x20@3x.png"; Size=60},
    @{Name="AppIcon-29x29@2x.png"; Size=58},
    @{Name="AppIcon-29x29@3x.png"; Size=87},
    @{Name="AppIcon-40x40@2x.png"; Size=80},
    @{Name="AppIcon-40x40@3x.png"; Size=120},
    @{Name="AppIcon-60x60@2x.png"; Size=120},
    @{Name="AppIcon-60x60@3x.png"; Size=180},
    @{Name="AppIcon-1024x1024@1x.png"; Size=1024}
)

foreach ($icon in $iosIcons) {
    Draw-AppIcon -Size $icon.Size -Round $false -OutputPath (Join-Path $iosDir $icon.Name)
}

$androidIcons = @(
    @{Dir="mipmap-mdpi"; Size=48},
    @{Dir="mipmap-hdpi"; Size=72},
    @{Dir="mipmap-xhdpi"; Size=96},
    @{Dir="mipmap-xxhdpi"; Size=144},
    @{Dir="mipmap-xxxhdpi"; Size=192}
)

foreach ($icon in $androidIcons) {
    $dir = Join-Path $root ("android\app\src\main\res\" + $icon.Dir)
    Draw-AppIcon -Size $icon.Size -Round $false -OutputPath (Join-Path $dir "ic_launcher.png")
    Draw-AppIcon -Size $icon.Size -Round $true -OutputPath (Join-Path $dir "ic_launcher_round.png")
}

Write-Host "Generated Kariyana app icons for iOS and Android."
