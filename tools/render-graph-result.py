from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path("/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site")
OUT_PATH = ROOT / "assets/images/dynamicUI/graphResult-research-v2.png"

WIDTH = 1512
HEIGHT = 568

BG_TOP = (247, 244, 238)
BG_BOTTOM = (244, 240, 233)
CARD_TOP = (255, 255, 255)
CARD_BOTTOM = (249, 245, 238)
AMBER = (182, 120, 30)
AMBER_DEEP = (151, 97, 25)
GRAPHITE = (83, 86, 93)
GRAPHITE_SOFT = (108, 112, 121)
TITLE = (47, 48, 47)
BODY = (93, 90, 84)
LINE = (44, 48, 53, 34)
LINE_STRONG = (44, 48, 53, 52)

VALUES = [5.9583, 5.5833, 2.7639, 5.9306, 5.8194, 5.4467]
BAR_STYLES = ["amber", "graphite", "graphite", "amber", "graphite", "amber"]
GROUP_LABELS = ["条形状态条", "整体渲染", "环形 HUD"]

FONT_SANS = "/System/Library/Fonts/PingFang.ttc"
FONT_SERIF = "/System/Library/Fonts/Supplemental/Songti.ttc"


def vertical_gradient(size, top_color, bottom_color):
    width, height = size
    img = Image.new("RGBA", size)
    px = img.load()
    for y in range(height):
        t = y / max(height - 1, 1)
        color = tuple(int(top_color[i] * (1 - t) + bottom_color[i] * t) for i in range(3)) + (255,)
        for x in range(width):
            px[x, y] = color
    return img


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def make_noise_overlay(size, opacity=16):
    noise = Image.effect_noise(size, 8).convert("L")
    alpha = noise.point(lambda p: int(p * opacity / 255))
    layer = Image.new("RGBA", size, (255, 255, 255, 0))
    layer.putalpha(alpha)
    return layer


def gradient_bar(size, top, bottom):
    bar = Image.new("RGBA", size)
    px = bar.load()
    width, height = size
    for y in range(height):
        t = y / max(height - 1, 1)
        color = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3)) + (255,)
        for x in range(width):
            px[x, y] = color
    return bar


def draw_dashed_line(draw, start, end, dash=8, gap=8, fill=(0, 0, 0, 64), width=1):
    x1, y1 = start
    x2, y2 = end
    if y1 == y2:
        x = x1
        while x < x2:
            draw.line((x, y1, min(x + dash, x2), y2), fill=fill, width=width)
            x += dash + gap
    elif x1 == x2:
        y = y1
        while y < y2:
            draw.line((x1, y, x2, min(y + dash, y2)), fill=fill, width=width)
            y += dash + gap


def fit_cover(image, size):
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def add_thumb(base, image_path, box, radius):
    x, y, w, h = box
    card = Image.new("RGBA", (w, h), (255, 253, 249, 255))
    shadow = Image.new("RGBA", (w + 12, h + 12), (0, 0, 0, 0))
    shadow_mask = rounded_mask((w, h), radius)
    shadow_alpha = shadow_mask.filter(ImageFilter.GaussianBlur(10))
    shadow.putalpha(0)
    shadow.paste((26, 29, 34, 34), (6, 6), shadow_alpha)
    base.alpha_composite(shadow, (x - 6, y - 2))

    base.alpha_composite(card, (x, y))
    border = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, outline=(44, 48, 53, 40), width=2)
    base.alpha_composite(border, (x, y))

    thumb = fit_cover(Image.open(image_path).convert("RGBA"), (w - 18, h - 18))
    thumb_mask = rounded_mask((w - 18, h - 18), max(10, radius - 6))
    thumb_canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    thumb_canvas.paste(thumb, (9, 9), thumb_mask)
    base.alpha_composite(thumb_canvas, (x, y))


def text(draw, xy, content, font, fill, anchor=None):
    draw.text(xy, content, font=font, fill=fill, anchor=anchor)


def main():
    page = vertical_gradient((WIDTH, HEIGHT), BG_TOP, BG_BOTTOM)
    page.alpha_composite(make_noise_overlay((WIDTH, HEIGHT), 10))

    card_x, card_y, card_w, card_h = 18, 18, 1476, 532
    card = vertical_gradient((card_w, card_h), CARD_TOP, CARD_BOTTOM)
    card.alpha_composite(make_noise_overlay((card_w, card_h), 12))

    shadow = Image.new("RGBA", (card_w + 80, card_h + 80), (0, 0, 0, 0))
    shadow_mask = rounded_mask((card_w, card_h), 30).filter(ImageFilter.GaussianBlur(22))
    shadow.paste((29, 31, 35, 26), (20, 22), shadow_mask)
    page.alpha_composite(shadow, (card_x - 20, card_y - 8))

    page.paste(card, (card_x, card_y), rounded_mask((card_w, card_h), 30))
    border = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle((0, 0, card_w - 1, card_h - 1), radius=30, outline=(44, 48, 53, 38), width=2)
    page.alpha_composite(border, (card_x, card_y))

    draw = ImageDraw.Draw(page)

    font_eyebrow = ImageFont.truetype(FONT_SANS, 16)
    font_title = ImageFont.truetype(FONT_SERIF, 34)
    font_axis = ImageFont.truetype(FONT_SANS, 18)
    font_tick = ImageFont.truetype(FONT_SERIF, 22)
    font_value = ImageFont.truetype(FONT_SERIF, 26)
    font_label = ImageFont.truetype(FONT_SANS, 22)
    font_note = ImageFont.truetype(FONT_SANS, 14)
    font_legend = ImageFont.truetype(FONT_SANS, 14)

    text(draw, (84, 96), "问卷结果", font_eyebrow, AMBER)
    text(draw, (WIDTH // 2, 80), "UI 可读性平均得分", font_title, TITLE, anchor="ma")
    draw.rounded_rectangle((WIDTH // 2 - 46, 118, WIDTH // 2 + 46, 122), radius=999, fill=AMBER)
    text(draw, (84, 138), "得分（满分 8 分）", font_axis, BODY)

    legend_x = 1188
    legend_y = 104
    draw.rounded_rectangle((legend_x, legend_y, legend_x + 18, legend_y + 10), radius=999, fill=AMBER)
    text(draw, (legend_x + 28, legend_y + 10), "自适应变色", font_legend, BODY, anchor="lm")
    draw.rounded_rectangle((legend_x + 128, legend_y, legend_x + 146, legend_y + 10), radius=999, fill=GRAPHITE)
    text(draw, (legend_x + 156, legend_y + 10), "固定色", font_legend, BODY, anchor="lm")

    chart_left, chart_top, chart_right, chart_bottom = 132, 150, 1394, 384
    chart_height = chart_bottom - chart_top
    max_score = 8

    def y_for(v):
        return chart_bottom - (v / max_score) * chart_height

    for tick in [0, 2, 4, 6, 8]:
        y = int(y_for(tick))
        if tick == 0:
            draw.line((chart_left, y, chart_right, y), fill=LINE_STRONG, width=2)
        else:
            draw_dashed_line(draw, (chart_left, y), (chart_right, y), fill=LINE, width=1)
        text(draw, (104, y + 2), str(tick), font_tick, TITLE, anchor="ra")

    draw.line((chart_left, chart_top, chart_left, chart_bottom), fill=LINE_STRONG, width=2)

    for divider_x in [559, 1001]:
        draw_dashed_line(draw, (divider_x, chart_top), (divider_x, chart_bottom + 74), fill=LINE, width=1)

    bar_centers = [248, 428, 690, 870, 1132, 1312]
    bar_width = 66
    for idx, value in enumerate(VALUES):
        x0 = int(bar_centers[idx] - bar_width / 2)
        y0 = int(y_for(value))
        y1 = chart_bottom
        h = max(y1 - y0, 1)

        if BAR_STYLES[idx] == "amber":
            fill = gradient_bar((bar_width, h), (203, 138, 41), AMBER_DEEP)
            value_fill = AMBER
        else:
            fill = gradient_bar((bar_width, h), GRAPHITE_SOFT, GRAPHITE)
            value_fill = TITLE

        mask = rounded_mask((bar_width, h), 10)
        page.paste(fill, (x0, y0), mask)

        shine = Image.new("RGBA", (bar_width, h), (255, 255, 255, 0))
        shine_draw = ImageDraw.Draw(shine)
        shine_draw.rounded_rectangle((0, 0, bar_width - 1, h - 1), radius=10, fill=(255, 255, 255, 16))
        shine = shine.filter(ImageFilter.GaussianBlur(6))
        page.alpha_composite(shine, (x0, y0))

        text(draw, (bar_centers[idx], y0 - 14), f"{value:.4f}", font_value, value_fill, anchor="ms")

    thumb_specs = [
        (338 - 66, 410, 132, 56, 14, ROOT / "assets/images/dynamicUI/Type1.jpeg"),
        (780 - 43, 402, 86, 86, 26, ROOT / "assets/images/dynamicUI/Type2.jpeg"),
        (1222 - 52, 406, 104, 76, 24, ROOT / "assets/images/dynamicUI/Type3.jpeg"),
    ]
    for x, y, w, h, r, source in thumb_specs:
        add_thumb(page, source, (x, y, w, h), r)

    for center_x, label in zip([338, 780, 1222], GROUP_LABELS):
        text(draw, (center_x, 488), label, font_label, TITLE, anchor="ma")

    text(draw, (84, 521), "注：六组分值对应三类界面样式在两种颜色规则下的可读性平均得分。", font_note, BODY)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    page.save(OUT_PATH, "PNG")
    print(OUT_PATH)


if __name__ == "__main__":
    main()
