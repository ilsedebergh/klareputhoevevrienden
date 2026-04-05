import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", snapshot: "home" },
  { path: "/agenda", snapshot: "agenda" },
  { path: "/fotos", snapshot: "fotos" },
  { path: "/over-ons", snapshot: "over-ons" },
  { path: "/contact", snapshot: "contact" }
];

test.describe("site layouts", () => {
  for (const pageConfig of pages) {
    test(`${pageConfig.snapshot} matches layout baseline`, async ({ page }, testInfo) => {
      await page.goto(pageConfig.path, { waitUntil: "networkidle" });
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        document.querySelectorAll("details[open]").forEach((element) => {
          element.removeAttribute("open");
        });
      });
      await page.addStyleTag({
        content: `
          *,
          *::before,
          *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            caret-color: transparent !important;
          }
        `
      });
      await expect(page).toHaveScreenshot(
        `${pageConfig.snapshot}-${testInfo.project.name}.png`,
        {
          animations: "disabled",
          fullPage: true
        }
      );
    });
  }
});
